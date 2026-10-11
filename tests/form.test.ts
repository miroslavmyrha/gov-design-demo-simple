import { describe, expect, it } from 'vitest'
import { createFieldLabels, createFormSchema, defaultFormData } from '~/schemas/form'
import { useFormValidation } from '~/composables/useFormValidation'

// messages are the translation keys, so the tests do not depend on a language
const t = (key: string) => key
const valid = { name: 'Jan Novák', email: 'Jan@Example.cz', note: '', option: '', gender: 'm', agreeTerms: true }

describe('form schema', () => {
  const schema = createFormSchema(t)

  it('accepts a filled form and tidies the values', () => {
    const result = schema.safeParse({ ...valid, name: '  Jan Novák  ' })

    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({ name: 'Jan Novák', email: 'jan@example.cz' })
  })

  it.each([
    ['name', 'J', 'form.validation.nameMinLength'],
    ['name', 'x'.repeat(51), 'form.validation.nameMaxLength'],
    ['email', '', 'form.validation.emailRequired'],
    ['email', 'jan(at)example.cz', 'form.validation.emailInvalid'],
    ['note', 'x'.repeat(501), 'form.validation.noteMaxLength'],
    ['gender', '', 'form.validation.genderRequired'],
    ['agreeTerms', false, 'form.validation.termsRequired'],
  ])('refuses %s = %j', (field, value, message) => {
    const result = schema.safeParse({ ...valid, [field]: value })

    expect(result.success).toBe(false)
    expect(result.error?.issues.find(issue => issue.path[0] === field)?.message).toBe(message)
  })

  it('has a label for every field', () => {
    expect(Object.keys(createFieldLabels(t)).sort()).toEqual(Object.keys(defaultFormData).sort())
  })
})

describe('form validation', () => {
  const setup = () => useFormValidation({ schema: createFormSchema(t), initialData: defaultFormData, fieldLabels: createFieldLabels(t) })

  it('keeps errors to itself until the field is left or the form is sent', () => {
    const form = setup()

    expect(form.isFormValid.value).toBe(false)
    expect(form.shouldShowError('name')).toBe(false)

    form.markTouched('name')
    expect(form.shouldShowError('name')).toBe(true)
    expect(form.shouldShowError('email')).toBe(false)
    expect(form.getError('name')).toBe('form.validation.nameMinLength')
  })

  it('shows every error once the form is sent', () => {
    const form = setup()

    expect(form.validate().success).toBe(false)
    expect(form.submitted.value).toBe(true)
    expect(form.errorSummary.value.map(error => error.field)).toEqual(['name', 'email', 'gender', 'agreeTerms'])
    expect(form.errorSummary.value[0]).toEqual({ field: 'name', label: 'form.fields.name.label', message: 'form.validation.nameMinLength' })
  })

  it('reports one error per field', () => {
    const form = setup()
    form.formData.value.email = ''

    expect(form.errorSummary.value.filter(error => error.field === 'email')).toHaveLength(1)
  })

  it('passes a valid form and starts clean after a reset', () => {
    const form = setup()
    Object.assign(form.formData.value, valid)

    expect(form.isFormValid.value).toBe(true)
    expect(form.validate().success).toBe(true)

    form.reset()
    expect(form.formData.value).toEqual(defaultFormData)
    expect(form.submitted.value).toBe(false)
    expect(form.shouldShowError('name')).toBe(false)
  })
})
