// The rules come from the @nuxt/eslint module, which knows the auto-imports of this project
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Gov Design System components are web components: `slot="top"` is their native slot
    // attribute, not the Vue 2 syntax this rule is after
    'vue/no-deprecated-slot-attribute': 'off',
  },
})
