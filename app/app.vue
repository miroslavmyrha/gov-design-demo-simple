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
    <UiGlobalLoading />
    <UiGlobalNotifications />
  </div>
</template>
