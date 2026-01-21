<script setup lang="ts">
const appStore = useAppStore()

useHead(() => ({
  htmlAttrs: {
    'data-theme': appStore.effectiveTheme,
  },
}))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiGlobalNotifications />
  </div>
</template>
