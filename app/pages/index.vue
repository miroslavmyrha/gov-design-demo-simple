<script setup lang="ts">
import { GovButton, GovCard, GovIcon } from '@gov-design-system-ce/vue'
import { FEATURE_CONFIGS } from '~/data/home'

const { t } = usePageSetup({
  seoKey: 'home',
  titleKey: 'home.title',
  descriptionKey: 'home.subtitle',
  isHome: true,
})

const localePath = useLocalePath()

const features = computed(() =>
  FEATURE_CONFIGS.map(config => ({
    title: t(`home.features.${config.titleKey}.title`),
    description: t(`home.features.${config.descriptionKey}.description`),
    link: localePath(config.link),
    icon: config.icon,
  })),
)
</script>

<template>
  <div class="gov-container">
    <section class="hero-section">
      <h1 class="gov-text--2xl">{{ $t('home.title') }}</h1>
      <p class="gov-text--l">
        {{ $t('home.subtitle') }}
      </p>

      <div class="hero-actions">
        <GovButton color="primary" type="solid" size="l" :href="localePath('/komponenty')">
          {{ $t('home.viewComponents') }}
        </GovButton>
        <GovButton color="secondary" type="outlined" size="l" :href="localePath('/o-projektu')">
          {{ $t('home.aboutProject') }}
        </GovButton>
      </div>
    </section>

    <section class="features-section">
      <h2 class="gov-text--xl">{{ $t('home.quickLinks') }}</h2>

      <div class="grid-base grid-auto-280 grid-gap-lg">
        <NuxtLink
          v-for="feature in features"
          :key="feature.title"
          :to="feature.link"
          class="feature-card"
        >
          <GovCard>
            <div class="feature-content">
              <div class="feature-icon">
                <GovIcon :name="feature.icon" />
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </GovCard>
        </NuxtLink>
      </div>
    </section>

    <DemoSection title-key="home.componentPreview">
      <p>{{ $t('home.componentPreviewDescription') }}</p>

      <NuxtErrorBoundary>
        <LazyDemoButtonsDemo />
        <LazyDemoMessagesDemo />

        <div class="more-link">
          <GovButton type="link" :href="localePath('/komponenty')">
            {{ $t('home.viewAllComponents') }}
          </GovButton>
        </div>

        <template #error="{ error, clearError }">
          <ErrorMessage
            :title="$t('home.errorLoadingComponents')"
            :error="error"
            :clear-error="clearError"
          />
        </template>
      </NuxtErrorBoundary>
    </DemoSection>
  </div>
</template>

<style scoped>
.hero-section {
  text-align: center;
  padding: 3rem 0;
  border-bottom: 1px solid var(--border-subtlest);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.features-section {
  margin-bottom: 2rem;
}

.feature-card {
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-2px);
}

.feature-content {
  padding: 1rem;
}

.more-link {
  margin-top: 1.5rem;
  text-align: center;
}
</style>
