export interface FeatureCard {
  titleKey: string
  descriptionKey: string
  link: string
  icon: string
}

export const FEATURE_CONFIGS: FeatureCard[] = [
  { titleKey: 'components', descriptionKey: 'components', link: '/komponenty', icon: 'list' },
  { titleKey: 'forms', descriptionKey: 'forms', link: '/formulare', icon: 'book' },
  { titleKey: 'about', descriptionKey: 'about', link: '/o-projektu', icon: 'info' },
]
