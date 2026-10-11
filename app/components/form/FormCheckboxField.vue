<script setup lang="ts">
import {
  GovFormCheckbox,
  GovFormControl,
  GovFormLabel,
  GovFormMessage,
} from '@gov-design-system-ce/vue'

defineProps<{
  modelValue: boolean
  label: string
  required?: boolean
  showError?: boolean
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: []
}>()
</script>

<template>
  <GovFormControl :invalid="showError">
    <GovFormCheckbox
      :model-value="modelValue"
      :invalid="showError"
      @update:model-value="emit('update:modelValue', $event)"
      @gov-change="emit('change')"
    >
      <GovFormLabel slot="label" :required="required">
        {{ label }}
      </GovFormLabel>
    </GovFormCheckbox>
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
