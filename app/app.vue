<script setup lang="ts">
const themeStore = useThemeStore()

useHead(() => ({
  htmlAttrs: {
    'data-theme': themeStore.effectiveTheme,
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
