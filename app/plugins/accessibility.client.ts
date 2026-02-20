import { initAccessibilityDetection, cleanupAccessibility } from '~/composables/useAccessibility'

export default defineNuxtPlugin(() => {
  initAccessibilityDetection()
})

// Cleanup on HMR dispose in development
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    cleanupAccessibility()
  })
}
