<script setup lang="ts">
defineProps<{
  title?: string
  error: Error
  clearError: () => void
}>()
</script>

<template>
  <gov-message color="error">
    <strong>{{ title || $t('common.error') }}</strong>
    <p>{{ error.message }}</p>
    <gov-button
      color="primary"
      type="solid"
      size="s"
      @gov-click="clearError"
    >
      {{ $t('common.tryAgain') }}
    </gov-button>
  </gov-message>
</template>
