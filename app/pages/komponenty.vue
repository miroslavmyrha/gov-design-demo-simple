<script setup lang="ts">
usePageSetup({
  seoKey: 'components',
  titleKey: 'components.title',
  descriptionKey: 'components.subtitle',
  breadcrumbs: [
    { nameKey: 'nav.home', url: '/' },
    { nameKey: 'nav.components', url: '/komponenty' },
  ],
})
</script>

<template>
  <div class="gov-container">
    <h1 class="gov-text--2xl">{{ $t('components.title') }}</h1>
    <p class="gov-text--l">{{ $t('components.subtitle') }}</p>

    <NuxtErrorBoundary>
      <LazyDemoButtonsDemo />
      <LazyDemoAccordionDemo />
      <LazyDemoTabsDemo />
      <LazyDemoMessagesDemo />
      <LazyDemoChipsDemo />
      <LazyDemoCardDemo />
      <LazyDemoBreadcrumbsDemo />
      <LazyDemoPaginationDemo />

      <template #error="{ error, clearError }">
        <ErrorMessage
          :title="$t('components.errorLoading')"
          :error="error"
          :clear-error="clearError"
        />
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
