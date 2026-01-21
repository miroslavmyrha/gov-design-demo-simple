<script setup lang="ts">
import {
  GovFormControl,
  GovFormInput,
  GovFormLabel,
  GovFormMessage,
} from '@gov-design-system-ce/vue'

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
  <GovFormControl :class="{ 'has-error': showError }">
    <GovFormLabel slot="top">
      {{ label }}{{ required ? ' *' : '' }}
    </GovFormLabel>
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
    <GovFormMessage
      v-if="showError && error"
      slot="bottom"
      color="error"
    >
      {{ error }}
    </GovFormMessage>
  </GovFormControl>
</template>
