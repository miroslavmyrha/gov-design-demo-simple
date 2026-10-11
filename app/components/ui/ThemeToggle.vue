<script setup lang="ts">
import { GovButton, GovIcon } from '@gov-design-system-ce/vue'
import type { Theme } from '~/types/app'

defineProps<{
  variant: 'desktop' | 'mobile'
}>()

const themeStore = useThemeStore()
const { t } = useI18n()

const ICONS: Record<Theme, string> = { light: 'sun', dark: 'moon', system: 'gear' }
const NAMES: Record<Theme, string> = { light: 'theme.light', dark: 'theme.dark', system: 'theme.system' }
const SWITCH_LABELS: Record<Theme, string> = {
  light: 'theme.switchToLight',
  dark: 'theme.switchToDark',
  system: 'theme.switchToSystem',
}

// the icon and the name show the current theme, the label says what a click will do
const themeConfig = computed(() => ({
  icon: ICONS[themeStore.theme],
  label: t(SWITCH_LABELS[themeStore.nextTheme]),
  displayName: t(NAMES[themeStore.theme]),
}))
</script>

<template>
  <GovButton
    v-if="variant === 'desktop'"
    class="desktop-theme-toggle"
    type="outlined"
    size="s"
    :aria-label="themeConfig.label"
    :title="themeConfig.displayName"
    @gov-click="themeStore.toggleTheme()"
  >
    <GovIcon :name="themeConfig.icon" />
  </GovButton>

  <div v-else class="mobile-theme-toggle">
    <button class="theme-toggle-btn" :aria-label="themeConfig.label" @click="themeStore.toggleTheme()">
      <GovIcon :name="themeConfig.icon" />
      <span>{{ themeConfig.displayName }}</span>
    </button>
  </div>
</template>
