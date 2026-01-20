import type { ZodSchema } from 'zod'
import type { MaybeRefOrGetter } from 'vue'

export interface FieldError {
  field: string
  label: string
  message: string
}

export interface UseFormValidationOptions<T> {
  schema: MaybeRefOrGetter<ZodSchema<T>>
  initialData: T
  fieldLabels?: MaybeRefOrGetter<Record<string, string>>
}
