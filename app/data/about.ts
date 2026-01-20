import type { TechStackItem, AboutFeature, ProjectStructureSection, ExternalLink } from '~/types/ui'

export const TECH_STACK: TechStackItem[] = [
  { name: 'Nuxt 4', version: '4.2.x', descriptionKey: 'nuxt' },
  { name: 'Vue 3', version: '3.5.x', descriptionKey: 'vue' },
  { name: 'TypeScript', version: '5.x', descriptionKey: 'typescript' },
  { name: 'Gov Design System CE', version: '4.2.x', descriptionKey: 'govds' },
  { name: 'Zod', version: '4.x', descriptionKey: 'zod' },
  { name: 'Pinia', version: '3.x', descriptionKey: 'pinia' },
]

export const FEATURES: AboutFeature[] = [
  { icon: 'person-fill', titleKey: 'accessibility' },
  { icon: 'gear', titleKey: 'typescript' },
  { icon: 'geo-alt-fill', titleKey: 'localization' },
  { icon: 'lightbulb-fill', titleKey: 'performance' },
]

export const PROJECT_STRUCTURE: ProjectStructureSection[] = [
  {
    key: 'app',
    isExpanded: true,
    items: ['pages', 'components', 'composables', 'layouts', 'plugins', 'schemas', 'stores', 'styles', 'types', 'utils'],
  },
  { key: 'public', items: ['icons', 'favicon'] },
]

export const EXTERNAL_LINKS: ExternalLink[] = [
  { label: 'Gov Design System', href: 'https://designsystem.gov.cz/' },
  { label: 'Nuxt', href: 'https://nuxt.com/docs' },
  { label: 'Vue.js', href: 'https://vuejs.org/guide/' },
  { label: 'Zod', href: 'https://zod.dev/' },
]
