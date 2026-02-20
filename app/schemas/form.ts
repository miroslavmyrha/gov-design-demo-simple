import { z } from 'zod'

export type TranslateFunction = (key: string) => string

export function createFormSchema(t: TranslateFunction) {
  return z.object({
    name: z.string()
      .trim()
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

const FIELD_KEYS = ['name', 'email', 'note', 'option', 'gender', 'agreeTerms'] as const

export function createFieldLabels(t: TranslateFunction): Record<string, string> {
  return Object.fromEntries(
    FIELD_KEYS.map(key => [key, t(`form.fields.${key}.label`)]),
  )
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
