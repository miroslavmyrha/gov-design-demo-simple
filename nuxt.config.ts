const APP_NAME = 'Gov Design System Demo'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-22',

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'cs',
        'data-theme': 'light',
      },
      title: APP_NAME,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Demo šablona pro Gov Design System CE s Nuxt 4, Vue 3 a Zod validací' },
        { name: 'author', content: 'Česká republika' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'cs_CZ' },
        { property: 'og:site_name', content: APP_NAME },
        { name: 'twitter:card', content: 'summary' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-security',
  ],

  security: {
    ssg: false,
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        'base-uri': ['\'self\''],
        'font-src': ['\'self\'', 'https:', 'data:'],
        'form-action': ['\'self\''],
        'frame-ancestors': ['\'self\''],
        'img-src': ['\'self\'', 'data:'],
        'object-src': ['\'none\''],
        'script-src-attr': ['\'none\''],
        'style-src': ['\'self\'', 'https:', '\'unsafe-inline\''],
        'upgrade-insecure-requests': true,
      },
    },
  },

  i18n: {
    locales: [
      { code: 'cs', language: 'cs-CZ', name: 'Čeština', file: 'cs.ts' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.ts' },
    ],
    defaultLocale: 'cs',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'cs',
      redirectOn: 'root',
    },
  },

  ssr: true,

  typescript: {
    strict: true,
    typeCheck: false,
  },

  css: [
    '@gov-design-system-ce/fonts/lib/roboto.css',
    '@gov-design-system-ce/styles/tokens.css',
    '@gov-design-system-ce/styles/styles.css',
    '@gov-design-system-ce/styles/content.css',
    '@gov-design-system-ce/styles/components.css',
    '~/styles/demo.css',
    '~/styles/main.css',
  ],

  build: {
    transpile: ['@gov-design-system-ce/vue'],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('gov-'),
    },
  },

  vite: {
    optimizeDeps: {
      include: ['@gov-design-system-ce/vue', 'pinia'],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },
})
