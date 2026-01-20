import { ref, computed, toValue } from 'vue'
import type { FieldError, UseFormValidationOptions } from '~/types/forms'

export function useFormValidation<T extends Record<string, unknown>>({
  schema,
  initialData,
  fieldLabels = {},
}: UseFormValidationOptions<T>) {
  const formData = ref({ ...initialData } as T)
  const touched = ref<Record<string, boolean>>({})
  const submitted = ref(false)

  const allErrors = computed(() => {
    const currentSchema = toValue(schema)
    const result = currentSchema.safeParse(formData.value)
    if (result.success) return {}

    const errors: Record<string, string> = {}
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string
      if (!errors[field]) {
        errors[field] = issue.message
      }
    })
    return errors
  })

  const isFormValid = computed(() => Object.keys(allErrors.value).length === 0)

  const errorSummary = computed<FieldError[]>(() => {
    const labels = toValue(fieldLabels)
    return Object.entries(allErrors.value).map(([field, message]) => ({
      field,
      label: labels[field] || field,
      message,
    }))
  })

  function shouldShowError(field: string): boolean {
    return (touched.value[field] || submitted.value) && !!allErrors.value[field]
  }

  function getError(field: string): string {
    return allErrors.value[field] || ''
  }

  function markTouched(field: string): void {
    touched.value[field] = true
  }

  function validate() {
    submitted.value = true
    const currentSchema = toValue(schema)
    return currentSchema.safeParse(formData.value)
  }

  function reset(): void {
    formData.value = { ...initialData } as T
    touched.value = {}
    submitted.value = false
  }

  function isFieldValid(field: string): boolean {
    return !allErrors.value[field]
  }

  return {
    formData,
    submitted,
    isFormValid,
    errorSummary,
    shouldShowError,
    getError,
    markTouched,
    validate,
    reset,
    isFieldValid,
  }
}
