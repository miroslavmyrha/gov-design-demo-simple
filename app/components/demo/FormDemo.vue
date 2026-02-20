<script setup lang="ts">
import { GovButton } from '@gov-design-system-ce/vue'
import { useFormValidation } from '~/composables/useFormValidation'
import { createFormSchema, createFieldLabels, defaultFormData } from '~/schemas/form'

interface TextFieldConfig {
  key: 'name' | 'email' | 'note'
  inputType: 'text' | 'email'
  required?: boolean
  showSuccess?: boolean
  multiline?: boolean
  rows?: number
}

const notificationStore = useNotificationStore()
const { announce } = useAccessibility()
const { t } = useI18n()

const formKey = ref(0)

const localizedSchema = computed(() => createFormSchema(t))
const localizedFieldLabels = computed(() => createFieldLabels(t))

const selectOptions = computed(() => [
  { value: '1', label: t('form.fields.option.options.option1') },
  { value: '2', label: t('form.fields.option.options.option2') },
  { value: '3', label: t('form.fields.option.options.option3') },
])

const genderOptions = computed(() => [
  { value: 'm', label: t('form.fields.gender.male') },
  { value: 'f', label: t('form.fields.gender.female') },
])

const textFields: TextFieldConfig[] = [
  { key: 'name', inputType: 'text', required: true, showSuccess: true },
  { key: 'email', inputType: 'email', required: true, showSuccess: true },
  { key: 'note', inputType: 'text', multiline: true, rows: 4 },
]

const {
  formData,
  shouldShowError,
  getError,
  markTouched,
  isFormValid,
  errorSummary,
  reset,
  submitted,
  isFieldValid,
  validate,
} = useFormValidation({
  schema: localizedSchema,
  initialData: defaultFormData,
  fieldLabels: localizedFieldLabels,
})

function handleSubmit(): void {
  const result = validate()

  if (result.success) {
    notificationStore.showSuccess(t('form.successMessage'))
    announce(t('form.successMessage'), 'polite')
    resetForm()
  } else {
    const errorCount = result.error.issues.length
    announce(t('form.errorCount', { count: errorCount }, errorCount), 'assertive')
  }
}

function shouldShowFieldSuccess(field: TextFieldConfig): boolean {
  return Boolean(field.showSuccess && isFieldValid(field.key) && String(formData.value[field.key] ?? '').length > 0)
}

function resetForm(): void {
  reset()
  formKey.value++
}
</script>

<template>
  <DemoSection title-key="form.title">
    <FormErrorSummary v-if="submitted" :errors="errorSummary" />

    <form :key="formKey" @submit.prevent="handleSubmit">
      <FormField
        v-for="field in textFields"
        :key="field.key"
        :model-value="String(formData[field.key] ?? '')"
        :label="$t(`form.fields.${field.key}.label`)"
        :placeholder="$t(`form.fields.${field.key}.placeholder`)"
        :input-type="field.inputType"
        :required="field.required"
        :multiline="field.multiline"
        :rows="field.rows"
        :show-error="shouldShowError(field.key)"
        :error="getError(field.key)"
        :show-success="shouldShowFieldSuccess(field)"
        @update:model-value="(v: string) => formData[field.key] = v"
        @blur="markTouched(field.key)"
      />

      <FormSelectField
        :model-value="formData.option ?? ''"
        @update:model-value="(v: string) => formData.option = v"
        :label="$t('form.fields.option.label')"
        :placeholder="$t('form.fields.option.placeholder')"
        :options="selectOptions"
      />

      <FormRadioField
        v-model="formData.gender"
        :label="$t('form.fields.gender.label')"
        :required="true"
        :options="genderOptions"
        :show-error="shouldShowError('gender')"
        :error="getError('gender')"
        @change="markTouched('gender')"
      />

      <FormCheckboxField
        v-model="formData.agreeTerms"
        :label="$t('form.fields.agreeTerms.label')"
        :required="true"
        :show-error="shouldShowError('agreeTerms')"
        :error="getError('agreeTerms')"
        @change="markTouched('agreeTerms')"
      />

      <div class="demo-row">
        <GovButton
          color="primary"
          size="m"
          type="solid"
          native-type="submit"
          :disabled="!isFormValid"
        >
          {{ $t('common.submit') }}
        </GovButton>
        <GovButton
          color="secondary"
          size="m"
          type="solid"
          native-type="button"
          @gov-click="resetForm"
        >
          {{ $t('common.reset') }}
        </GovButton>
      </div>
    </form>
  </DemoSection>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
