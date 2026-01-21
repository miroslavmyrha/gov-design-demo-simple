<script setup lang="ts">
import { GovAccordion, GovAccordionItem } from '@gov-design-system-ce/vue'
import { FIELD_RULE_KEYS, VALIDATION_FIELDS } from '~/data/forms'

const { t } = usePageSetup({
  seoKey: 'forms',
  titleKey: 'forms.title',
  descriptionKey: 'forms.subtitle',
  breadcrumbs: [
    { nameKey: 'nav.home', url: '/' },
    { nameKey: 'nav.forms', url: '/formulare' },
  ],
})
</script>

<template>
  <div class="gov-container">
    <h1 class="gov-text--2xl">{{ $t('forms.title') }}</h1>
    <p class="gov-text--l">{{ $t('forms.subtitle') }}</p>

    <NuxtErrorBoundary>
      <LazyDemoFormDemo />

      <template #error="{ error, clearError }">
        <ErrorMessage
          :title="$t('forms.errorLoading')"
          :error="error"
          :clear-error="clearError"
        />
      </template>
    </NuxtErrorBoundary>

    <DemoSection title-key="forms.validationRulesTitle">
      <p>{{ $t('forms.validationRulesDescription') }}</p>

      <GovAccordion>
        <GovAccordionItem v-for="fieldId in VALIDATION_FIELDS" :key="fieldId">
          <h3 slot="label">{{ t(`forms.validationRules.${fieldId}.label`) }}</h3>
          <ul>
            <li v-for="ruleKey in FIELD_RULE_KEYS[fieldId]" :key="ruleKey">
              {{ t(`forms.validationRules.${fieldId}.${ruleKey}`) }}
            </li>
          </ul>
        </GovAccordionItem>
      </GovAccordion>
    </DemoSection>
  </div>
</template>
