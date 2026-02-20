<script setup lang="ts">
import {
  GovFormControl,
  GovFormLabel,
  GovFormMessage,
  GovFormSelect,
} from '@gov-design-system-ce/vue'

defineProps<{
  modelValue: string
  label: string
  placeholder?: string
  required?: boolean
  options: Array<{ value: string; label: string }>
  showError?: boolean
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()
</script>

<template>
  <GovFormControl :invalid="showError">
    <GovFormLabel slot="top" :required="required">
      {{ label }}
    </GovFormLabel>
    <GovFormSelect :model-value="modelValue" :invalid="showError" @update:model-value="emit('update:modelValue', $event)" @gov-blur="emit('blur')">
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </GovFormSelect>
    <GovFormMessage
      v-if="showError && error"
      slot="bottom"
      color="error"
    >
      {{ error }}
    </GovFormMessage>
  </GovFormControl>
</template>
