<script setup lang="ts">
const { t } = useI18n()

usePageSeo('components')

const { addStructuredData, createWebPage, createBreadcrumbs } = useStructuredData()
addStructuredData([
  createWebPage({ name: t('seo.components.title'), description: t('seo.components.description') }),
  createBreadcrumbs([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.components'), url: '/komponenty' },
  ]),
])
</script>

<template>
  <div class="gov-container">
    <UiPageHeader :title="$t('components.title')" :subtitle="$t('components.subtitle')" />

    <UiErrorBoundaryWrapper :error-title="$t('components.errorLoading')">
      <LazyDemoButtonsDemo />
      <LazyDemoAccordionDemo />
      <LazyDemoTabsDemo />
      <LazyDemoMessagesDemo />
      <LazyDemoChipsDemo />
      <LazyDemoCardDemo />
      <LazyDemoBreadcrumbsDemo />
      <LazyDemoPaginationDemo />
    </UiErrorBoundaryWrapper>
  </div>
</template>
