export default defineNuxtPlugin((nuxtApp) => {
  const themeStore = useThemeStore(nuxtApp.$pinia as import('pinia').Pinia)
  themeStore.initTheme()

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      themeStore.cleanupThemeListener()
    })
  }
})
