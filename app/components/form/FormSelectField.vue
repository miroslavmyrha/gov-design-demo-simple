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

const fieldId = useId()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()
</script>

<template>
  <GovFormControl :invalid="showError">
    <GovFormLabel slot="top" :identifier="fieldId" :required="required">
      {{ label }}
    </GovFormLabel>
    <GovFormSelect :identifier="fieldId" :required="required" :model-value="modelValue" :invalid="showError" @update:model-value="emit('update:modelValue', $event)" @gov-blur="emit('blur')">
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </GovFormSelect>
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
