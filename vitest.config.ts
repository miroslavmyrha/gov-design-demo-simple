import { defineVitestConfig } from '@nuxt/test-utils/config'

// Tests run inside a Nuxt environment: auto-imports, Pinia and i18n work as in the application
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['tests/**/*.test.ts'],
  },
})
