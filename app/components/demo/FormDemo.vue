<script setup lang="ts">
import {
  GovButton,
  GovFormCheckbox,
  GovFormControl,
  GovFormLabel,
  GovFormMessage,
  GovFormRadio,
  GovFormRadioGroup,
  GovFormSelect,
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

      <GovFormControl>
        <GovFormLabel slot="top">{{ $t('form.fields.option.label') }}</GovFormLabel>
        <GovFormSelect :key="'select-' + formKey" v-model="formData.option">
          <option value="">{{ $t('form.fields.option.placeholder') }}</option>
          <option v-for="opt in selectOptions" :key="opt.value" :value="opt.value">
            {{ $t(opt.labelKey) }}
          </option>
        </GovFormSelect>
      </GovFormControl>

      <GovFormControl :class="{ 'has-error': shouldShowError('gender') }">
        <GovFormLabel slot="top">{{ $t('form.fields.gender.label') }} *</GovFormLabel>
        <GovFormRadioGroup
          :key="'radio-' + formKey"
          v-model="formData.gender"
          gap="m"
          @gov-change="markTouched('gender')"
        >
          <GovFormRadio value="m">
            <GovFormLabel slot="label">{{ $t('form.fields.gender.male') }}</GovFormLabel>
          </GovFormRadio>
          <GovFormRadio value="f">
            <GovFormLabel slot="label">{{ $t('form.fields.gender.female') }}</GovFormLabel>
          </GovFormRadio>
        </GovFormRadioGroup>
        <GovFormMessage
          v-if="shouldShowError('gender')"
          slot="bottom"
          color="error"
        >
          {{ getError('gender') }}
        </GovFormMessage>
      </GovFormControl>

      <GovFormControl :class="{ 'has-error': shouldShowError('agreeTerms') }">
        <GovFormCheckbox
          :key="'checkbox-' + formKey"
          v-model="formData.agreeTerms"
          @gov-change="markTouched('agreeTerms')"
        >
          <GovFormLabel slot="label">{{ $t('form.fields.agreeTerms.label') }} *</GovFormLabel>
        </GovFormCheckbox>
        <GovFormMessage
          v-if="shouldShowError('agreeTerms')"
          slot="bottom"
          color="error"
        >
          {{ getError('agreeTerms') }}
        </GovFormMessage>
      </GovFormControl>

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

.has-error {
  border-left: 3px solid var(--icon-error);
  padding-left: 0.5rem;
}
</style>
