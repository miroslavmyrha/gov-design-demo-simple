export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()
  themeStore.initTheme()
})

// Cleanup on HMR dispose in development
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    const themeStore = useThemeStore()
    themeStore.cleanupThemeListener()
  })
}
