import { z } from 'zod'

export type TranslateFunction = (key: string) => string

export function createFormSchema(t: TranslateFunction) {
  return z.object({
    name: z.string()
      .trim()
      .min(1, t('form.validation.nameRequired'))
      .min(2, t('form.validation.nameMinLength'))
      .max(50, t('form.validation.nameMaxLength')),
    email: z.string()
      .trim()
      .toLowerCase()
      .min(1, t('form.validation.emailRequired'))
      .email({ message: t('form.validation.emailInvalid') }),
    note: z.string()
      .trim()
      .max(500, t('form.validation.noteMaxLength'))
      .optional(),
    option: z.string().optional(),
    gender: z.string().min(1, t('form.validation.genderRequired')),
    agreeTerms: z.boolean().refine(val => val === true, {
      message: t('form.validation.termsRequired'),
    }),
  })
}

export function createFieldLabels(t: TranslateFunction): Record<string, string> {
  return {
    name: t('form.fields.name.label'),
    email: t('form.fields.email.label'),
    note: t('form.fields.note.label'),
    option: t('form.fields.option.label'),
    gender: t('form.fields.gender.label'),
    agreeTerms: t('form.fields.agreeTerms.label'),
  }
}

export type FormData = z.infer<ReturnType<typeof createFormSchema>>

export const defaultFormData: FormData = {
  name: '',
  email: '',
  note: '',
  option: '',
  gender: '',
  agreeTerms: false,
}
