<script setup lang="ts">
import { STORAGE_KEY_THEME } from '~/stores/theme'

const themeStore = useThemeStore()
// the language of the page follows the chosen locale (lang="en" on /en)
const localeHead = useLocaleHead({ seo: false })

useHead(() => ({
  htmlAttrs: {
    lang: localeHead.value.htmlAttrs?.lang,
    'data-theme': themeStore.effectiveTheme,
  },
  noscript: [
    {
      // Without JavaScript the components never render: show the content the reserved space would hide
      key: 'no-script-components',
      innerHTML: '<style>gov-accordion-item:not(.hydrated){height:auto;overflow:visible}</style>',
    },
  ],
  script: [
    {
      // Runs before the first paint, so that a dark theme does not flash light while the page loads.
      // The server cannot know the theme: it lives in the browser (saved choice or system preference).
      key: 'theme-init',
      tagPosition: 'head',
      innerHTML: `try{var t=localStorage.getItem(${JSON.stringify(STORAGE_KEY_THEME)});if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
    },
  ],
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
