export interface FeatureCard {
  titleKey: string
  descriptionKey: string
  link: string
  icon: string
}

export interface TechStackItem {
  name: string
  version: string
  descriptionKey: string
}

export interface AboutFeature {
  icon: string
  titleKey: string
}

export interface ProjectStructureSection {
  key: string
  isExpanded?: boolean
  items: string[]
}

export interface ExternalLink {
  label: string
  href: string
}
