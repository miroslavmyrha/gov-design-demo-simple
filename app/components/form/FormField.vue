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

// the label points at the input by this id; without it assistive technology reads an unnamed field
const fieldId = useId()

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
  <GovFormControl :invalid="showError" :success="showSuccess">
    <GovFormLabel slot="top" :identifier="fieldId" :required="required">
      {{ label }}
    </GovFormLabel>
    <GovFormInput
      :identifier="fieldId"
      :required="required"
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
    <!--
      Shown and hidden, never added or removed: the design system's component moves its children
      into its own markup, and Vue cannot insert a node next to a placeholder that has moved.
    -->
    <GovFormMessage
      v-show="showError && error"
      slot="bottom"
      color="error"
    >
      {{ error }}
    </GovFormMessage>
  </GovFormControl>
</template>
