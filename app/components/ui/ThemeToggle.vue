<script setup lang="ts">
import { GovButton, GovIcon } from '@gov-design-system-ce/vue'

defineProps<{
  variant: 'desktop' | 'mobile'
}>()

const themeStore = useThemeStore()
const { t } = useI18n()

const themeConfig = computed(() => {
  const isLight = themeStore.effectiveTheme === 'light'
  return {
    icon: isLight ? 'moon' : 'sun',
    label: isLight ? t('theme.switchToDark') : t('theme.switchToLight'),
    displayName: isLight ? t('theme.light') : t('theme.dark'),
  }
})
</script>

<template>
  <GovButton
    v-if="variant === 'desktop'"
    class="desktop-theme-toggle"
    type="outlined"
    size="s"
    :aria-label="themeConfig.label"
    @gov-click="themeStore.toggleTheme()"
  >
    <GovIcon :name="themeConfig.icon" />
  </GovButton>

  <div v-else class="mobile-theme-toggle">
    <button class="theme-toggle-btn" @click="themeStore.toggleTheme()">
      <GovIcon :name="themeConfig.icon" />
      <span>{{ themeConfig.displayName }}</span>
    </button>
  </div>
</template>
