export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

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
      title: 'Gov Design System Demo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Demo šablona pro Gov Design System CE s Nuxt 4, Vue 3 a Zod validací' },
        { name: 'author', content: 'Česká republika' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'cs_CZ' },
        { property: 'og:site_name', content: 'Gov Design System Demo' },
        { name: 'twitter:card', content: 'summary' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],

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

  image: {
    quality: 80,
    format: ['webp', 'avif', 'png', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
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
    '~/assets/css/demo.css',
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
      apiBase: '',
      appEnv: 'development',
      siteUrl: '',
    },
  },

  experimental: {
    componentIslands: true,
    payloadExtraction: true,
  },
})
