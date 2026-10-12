import { fileURLToPath } from 'node:url'

const icons = fileURLToPath(new URL('./node_modules/@gov-design-system-ce/icons/lib', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',

  // Styles. Order matters: tokens first, then the rest.
  css: [
    '@gov-design-system-ce/styles/tokens.css',
    '@gov-design-system-ce/styles/styles.css',
    '@gov-design-system-ce/styles/layout.css',
    '@gov-design-system-ce/styles/components.css',
    '@gov-design-system-ce/styles/animations.css',
    '@gov-design-system-ce/fonts/lib/roboto.css',
    '~/assets/main.css',
  ],

  vue: {
    compilerOptions: {
      // Without this Vue treats every <gov-*> tag as a Vue component it cannot find.
      isCustomElement: (tag) => tag.startsWith('gov-'),
    },
  },

  nitro: {
    // Icons are plain .svg files and are not bundled. They are served straight from the
    // package, with its directory structure kept: /assets/icons/components/chevron-right.svg
    publicAssets: [{ dir: icons, baseURL: '/assets/icons', maxAge: 60 * 60 * 24 * 30 }],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'cs' },
      title: 'Gov Design System CE: Nuxt starter',
    },
  },
})
