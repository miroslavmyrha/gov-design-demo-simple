import { czechPlural } from '../app/utils/plural'

// Without a rule of its own vue-i18n counts Czech the English way and says "4 chyb"
export default defineI18nConfig(() => ({
  pluralRules: {
    cs: czechPlural,
  },
}))
