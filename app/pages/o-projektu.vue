<script setup lang="ts">
import { TECH_STACK, FEATURES, PROJECT_STRUCTURE, EXTERNAL_LINKS } from '~/data/about'

usePageSetup({
  seoKey: 'about',
  titleKey: 'about.title',
  descriptionKey: 'about.intro',
  breadcrumbs: [
    { nameKey: 'nav.home', url: '/' },
    { nameKey: 'nav.about', url: '/o-projektu' },
  ],
})
</script>

<template>
  <div class="gov-container">
    <h1 class="gov-text--2xl">{{ $t('about.title') }}</h1>
    <p class="gov-text--l">{{ $t('about.subtitle') }}</p>

    <!-- Tech Stack -->
    <DemoSection title-key="about.techStackTitle">
      <div class="grid-base grid-auto-200">
        <gov-card v-for="tech in TECH_STACK" :key="tech.name" class="tech-card">
          <div class="tech-content">
            <h3 class="tech-name">{{ tech.name }}</h3>
            <gov-chip size="s" color="primary">{{ tech.version }}</gov-chip>
            <p class="tech-description">{{ $t(`about.techStack.${tech.descriptionKey}.description`) }}</p>
          </div>
        </gov-card>
      </div>
    </DemoSection>

    <!-- Key Features -->
    <DemoSection title-key="about.keyFeaturesTitle">
      <div class="grid-base grid-auto-280 grid-gap-lg">
        <div v-for="feature in FEATURES" :key="feature.titleKey" class="feature-item">
          <div class="feature-icon">
            <gov-icon :name="feature.icon" />
          </div>
          <div class="feature-content">
            <h3 class="feature-title">{{ $t(`about.features.${feature.titleKey}.title`) }}</h3>
            <p class="feature-description">{{ $t(`about.features.${feature.titleKey}.description`) }}</p>
          </div>
        </div>
      </div>
    </DemoSection>

    <!-- Project Structure -->
    <DemoSection title-key="about.projectStructureTitle">
      <gov-accordion>
        <gov-accordion-item
          v-for="section in PROJECT_STRUCTURE"
          :key="section.key"
          :is-expanded="section.isExpanded"
        >
          <h3 slot="label">{{ $t(`about.projectStructure.${section.key}.title`) }}</h3>
          <p>{{ $t(`about.projectStructure.${section.key}.description`) }}</p>
          <ul>
            <li v-for="item in section.items" :key="item">
              <code>{{ item }}{{ item.includes('.') ? '' : '/' }}</code> -
              {{ $t(`about.projectStructure.${section.key}.items.${item}`) }}
            </li>
          </ul>
        </gov-accordion-item>
      </gov-accordion>
    </DemoSection>

    <!-- External Links -->
    <DemoSection title-key="about.linksTitle">
      <div class="flex-wrap-gap">
        <gov-button
          v-for="link in EXTERNAL_LINKS"
          :key="link.href"
          type="outlined"
          :href="link.href"
          target="_blank"
        >
          {{ link.label }}
        </gov-button>
      </div>
    </DemoSection>
  </div>
</template>

<style scoped>
.tech-card {
  padding: 1rem;
}

.tech-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tech-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.tech-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.feature-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
}
</style>
