<script setup lang="ts">
const { t } = useI18n()

interface BreadcrumbItem {
  key: string
  href?: string
}

const items: BreadcrumbItem[] = [
  { key: 'home', href: '/' },
  { key: 'category', href: '/kategorie' },
  { key: 'currentPage' },
]
</script>

<template>
  <DemoSection title-key="demo.breadcrumbs.title">
    <gov-breadcrumbs :accessible-label="t('demo.breadcrumbs.accessibleLabel')">
      <ul>
        <li v-for="(item, index) in items" :key="item.key">
          <gov-icon v-if="index > 0" type="components" name="chevron-right" aria-hidden="true" />
          <strong v-if="!item.href">{{ $t(`demo.breadcrumbs.${item.key}`) }}</strong>
          <a v-else :href="item.href">{{ $t(`demo.breadcrumbs.${item.key}`) }}</a>
        </li>
      </ul>
    </gov-breadcrumbs>
  </DemoSection>
</template>
