<script setup lang="ts">
import { GovFormInput } from '@gov-design-system-ce/vue'

type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color'

defineProps<{
  modelValue: string
  label: string
  placeholder?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  inputType?: InputType
  error?: string
  showError?: boolean
  showSuccess?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

function handleInput(value: string) {
  emit('update:modelValue', value)
}

function handleBlur() {
  emit('blur')
}
</script>

<template>
  <gov-form-control :class="{ 'has-error': showError }">
    <gov-form-label slot="top">
      {{ label }}{{ required ? ' *' : '' }}
    </gov-form-label>
    <GovFormInput
      :model-value="modelValue"
      :placeholder="placeholder"
      :multiline="multiline"
      :rows="rows"
      :input-type="inputType"
      :invalid="showError"
      :success="showSuccess"
      @update:model-value="handleInput"
      @gov-blur="handleBlur"
    />
    <gov-form-message
      v-if="showError && error"
      slot="bottom"
      color="error"
    >
      {{ error }}
    </gov-form-message>
  </gov-form-control>
</template>
