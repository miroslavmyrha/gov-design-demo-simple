<script setup lang="ts">
defineProps<{
  errorTitle: string
}>()
</script>

<template>
  <NuxtErrorBoundary>
    <slot />

    <template #error="{ error, clearError }">
      <ErrorMessage
        :title="errorTitle"
        :error="error"
        :clear-error="clearError"
      />
    </template>
  </NuxtErrorBoundary>
</template>
