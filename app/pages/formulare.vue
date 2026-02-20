<script setup lang="ts">
import { GovAccordion, GovAccordionItem } from '@gov-design-system-ce/vue'
import { FIELD_RULE_KEYS, VALIDATION_FIELDS } from '~/data/forms'

const { t } = useI18n()

usePageSeo('forms')

const { addStructuredData, createWebPage, createBreadcrumbs } = useStructuredData()
addStructuredData([
  createWebPage({ name: t('seo.forms.title'), description: t('seo.forms.description') }),
  createBreadcrumbs([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.forms'), url: '/formulare' },
  ]),
])
</script>

<template>
  <div class="gov-container">
    <UiPageHeader :title="$t('forms.title')" :subtitle="$t('forms.subtitle')" />

    <UiErrorBoundaryWrapper :error-title="$t('forms.errorLoading')">
      <LazyDemoFormDemo />
    </UiErrorBoundaryWrapper>

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
