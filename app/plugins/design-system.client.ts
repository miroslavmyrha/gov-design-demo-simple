import { defineNuxtPlugin } from '#app'
import { ComponentLibrary } from '@gov-design-system-ce/vue/dist/plugin'

declare global {
  interface Window {
    GOV_DS_CONFIG?: {
      iconsPath?: string
      iconsLazyLoad?: boolean
    }
  }
}

export default defineNuxtPlugin(({ vueApp }) => {
  window.GOV_DS_CONFIG = {
    iconsPath: '/icons',
    iconsLazyLoad: true,
  }

  try {
    vueApp.use(ComponentLibrary)
  } catch (error) {
    if (import.meta.dev) {
      console.error('[Gov DS] Failed to initialize component library:', error)
    }
  }
})
