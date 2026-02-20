<script setup lang="ts">
import {
  GovAccordion,
  GovAccordionItem,
  GovButton,
  GovCard,
  GovChip,
  GovIcon,
} from '@gov-design-system-ce/vue'
import { TECH_STACK, FEATURES, PROJECT_STRUCTURE, EXTERNAL_LINKS } from '~/data/about'

const { t } = useI18n()

usePageSeo('about')

const { addStructuredData, createWebPage, createBreadcrumbs } = useStructuredData()
addStructuredData([
  createWebPage({ name: t('seo.about.title'), description: t('seo.about.description') }),
  createBreadcrumbs([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.about'), url: '/o-projektu' },
  ]),
])
</script>

<template>
  <div class="gov-container">
    <UiPageHeader :title="$t('about.title')" :subtitle="$t('about.subtitle')" />

    <!-- Tech Stack -->
    <DemoSection title-key="about.techStackTitle">
      <div class="grid-base grid-auto-200">
        <GovCard v-for="tech in TECH_STACK" :key="tech.name" class="tech-card">
          <div class="tech-content">
            <h3 class="tech-name">{{ tech.name }}</h3>
            <GovChip size="s" color="primary">{{ tech.version }}</GovChip>
            <p class="tech-description">{{ $t(`about.techStack.${tech.descriptionKey}.description`) }}</p>
          </div>
        </GovCard>
      </div>
    </DemoSection>

    <!-- Key Features -->
    <DemoSection title-key="about.keyFeaturesTitle">
      <div class="grid-base grid-auto-280 grid-gap-lg">
        <div v-for="feature in FEATURES" :key="feature.titleKey" class="feature-item">
          <div class="feature-icon">
            <GovIcon :name="feature.icon" />
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
      <GovAccordion>
        <GovAccordionItem
          v-for="section in PROJECT_STRUCTURE"
          :key="section.key"
          :open="section.isExpanded"
        >
          <h3 slot="label">{{ $t(`about.projectStructure.${section.key}.title`) }}</h3>
          <p>{{ $t(`about.projectStructure.${section.key}.description`) }}</p>
          <ul>
            <li v-for="item in section.items" :key="item">
              <code>{{ item }}{{ item.includes('.') ? '' : '/' }}</code> -
              {{ $t(`about.projectStructure.${section.key}.items.${item}`) }}
            </li>
          </ul>
        </GovAccordionItem>
      </GovAccordion>
    </DemoSection>

    <!-- External Links -->
    <DemoSection title-key="about.linksTitle">
      <div class="flex-wrap-gap">
        <GovButton
          v-for="link in EXTERNAL_LINKS"
          :key="link.href"
          type="outlined"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.label }}
        </GovButton>
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
