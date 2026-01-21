<script setup lang="ts">
import { GovButton, GovMessage } from '@gov-design-system-ce/vue'

defineProps<{
  title?: string
  error: Error
  clearError: () => void
}>()
</script>

<template>
  <GovMessage color="error">
    <strong>{{ title || $t('common.error') }}</strong>
    <p>{{ error.message }}</p>
    <GovButton
      color="primary"
      type="solid"
      size="s"
      @gov-click="clearError"
    >
      {{ $t('common.tryAgain') }}
    </GovButton>
  </GovMessage>
</template>
