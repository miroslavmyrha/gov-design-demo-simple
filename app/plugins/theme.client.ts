export default defineNuxtPlugin((nuxtApp) => {
  const appStore = useAppStore()
  appStore.initTheme()

  nuxtApp.hook('app:beforeMount', () => {
    appStore.initTheme()
  })

  nuxtApp.hook('app:unmount' as never, () => {
    appStore.cleanupThemeListener()
  })
})
