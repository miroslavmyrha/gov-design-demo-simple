export default defineNuxtPlugin(() => {
  const appStore = useAppStore()
  appStore.initTheme()
})
