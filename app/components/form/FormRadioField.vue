<script setup lang="ts">
import {
  GovFormControl,
  GovFormLabel,
  GovFormMessage,
  GovFormRadio,
  GovFormRadioGroup,
} from '@gov-design-system-ce/vue'

defineProps<{
  modelValue: string
  label: string
  required?: boolean
  options: Array<{ value: string; label: string }>
  showError?: boolean
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: []
}>()
</script>

<template>
  <GovFormControl :invalid="showError">
    <GovFormLabel slot="top" :required="required">
      {{ label }}
    </GovFormLabel>
    <GovFormRadioGroup
      :model-value="modelValue"
      gap="m"
      @update:model-value="emit('update:modelValue', $event)"
      @gov-change="emit('change')"
    >
      <GovFormRadio v-for="opt in options" :key="opt.value" :value="opt.value">
        <GovFormLabel slot="label">{{ opt.label }}</GovFormLabel>
      </GovFormRadio>
    </GovFormRadioGroup>
    <GovFormMessage
      v-if="showError && error"
      slot="bottom"
      color="error"
    >
      {{ error }}
    </GovFormMessage>
  </GovFormControl>
</template>
