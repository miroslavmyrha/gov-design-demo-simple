<script setup lang="ts">
import {
  GovFormSelect,
  GovFormRadioGroup,
  GovFormCheckbox,
} from '@gov-design-system-ce/vue'
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

interface SelectOption {
  value: string
  labelKey: string
}

const appStore = useAppStore()
const { announce } = useAccessibility()
const { t } = useI18n()

const formKey = ref(0)

const localizedSchema = computed(() => createFormSchema(t))
const localizedFieldLabels = computed(() => createFieldLabels(t))

const selectOptions: SelectOption[] = [
  { value: '1', labelKey: 'form.fields.option.options.option1' },
  { value: '2', labelKey: 'form.fields.option.options.option2' },
  { value: '3', labelKey: 'form.fields.option.options.option3' },
]

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
    appStore.showSuccess(t('form.successMessage'))
    announce(t('form.successMessage'), 'polite')
    resetForm()
  } else {
    const errorCount = result.error.issues.length
    announce(t('form.errorCount', { count: errorCount }, errorCount), 'assertive')
  }
}

function resetForm(): void {
  reset()
  formKey.value++
}
</script>

<template>
  <DemoSection title-key="form.title">
    <FormErrorSummary v-if="submitted" :errors="errorSummary" />

    <form @submit.prevent="handleSubmit">
      <FormField
        v-for="field in textFields"
        :key="field.key + '-' + formKey"
        :model-value="String(formData[field.key] ?? '')"
        :label="$t(`form.fields.${field.key}.label`)"
        :placeholder="$t(`form.fields.${field.key}.placeholder`)"
        :input-type="field.inputType"
        :required="field.required"
        :multiline="field.multiline"
        :rows="field.rows"
        :show-error="shouldShowError(field.key)"
        :error="getError(field.key)"
        :show-success="field.showSuccess && isFieldValid(field.key) && String(formData[field.key] ?? '').length > 0"
        @update:model-value="(v: string) => formData[field.key] = v"
        @blur="markTouched(field.key)"
      />

      <gov-form-control>
        <gov-form-label slot="top">{{ $t('form.fields.option.label') }}</gov-form-label>
        <GovFormSelect :key="'select-' + formKey" v-model="formData.option">
          <option value="">{{ $t('form.fields.option.placeholder') }}</option>
          <option v-for="opt in selectOptions" :key="opt.value" :value="opt.value">
            {{ $t(opt.labelKey) }}
          </option>
        </GovFormSelect>
      </gov-form-control>

      <gov-form-control :class="{ 'has-error': shouldShowError('gender') }">
        <gov-form-label slot="top">{{ $t('form.fields.gender.label') }} *</gov-form-label>
        <GovFormRadioGroup
          :key="'radio-' + formKey"
          v-model="formData.gender"
          gap="m"
          @gov-change="markTouched('gender')"
        >
          <gov-form-radio value="m">
            <gov-form-label slot="label">{{ $t('form.fields.gender.male') }}</gov-form-label>
          </gov-form-radio>
          <gov-form-radio value="f">
            <gov-form-label slot="label">{{ $t('form.fields.gender.female') }}</gov-form-label>
          </gov-form-radio>
        </GovFormRadioGroup>
        <gov-form-message
          v-if="shouldShowError('gender')"
          slot="bottom"
          color="error"
        >
          {{ getError('gender') }}
        </gov-form-message>
      </gov-form-control>

      <gov-form-control :class="{ 'has-error': shouldShowError('agreeTerms') }">
        <GovFormCheckbox
          :key="'checkbox-' + formKey"
          v-model="formData.agreeTerms"
          @gov-change="markTouched('agreeTerms')"
        >
          <gov-form-label slot="label">{{ $t('form.fields.agreeTerms.label') }} *</gov-form-label>
        </GovFormCheckbox>
        <gov-form-message
          v-if="shouldShowError('agreeTerms')"
          slot="bottom"
          color="error"
        >
          {{ getError('agreeTerms') }}
        </gov-form-message>
      </gov-form-control>

      <div class="demo-row">
        <gov-button
          color="primary"
          size="m"
          type="solid"
          native-type="submit"
          :disabled="!isFormValid"
        >
          {{ $t('common.submit') }}
        </gov-button>
        <gov-button
          color="secondary"
          size="m"
          type="solid"
          native-type="button"
          @gov-click="resetForm"
        >
          {{ $t('common.reset') }}
        </gov-button>
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

.has-error {
  border-left: 3px solid var(--icon-error);
  padding-left: 0.5rem;
}
</style>
