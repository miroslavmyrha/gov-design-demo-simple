<script setup lang="ts">
import { GovTabs, GovTabsItem } from '@gov-design-system-ce/vue'

const { t } = useI18n()

const tabs = ['tab1', 'tab2', 'tab3'] as const
</script>

<template>
  <DemoSection title-key="demo.tabs.title">
    <GovTabs>
      <GovTabsItem v-for="tab in tabs" :key="tab" :label="t(`demo.tabs.${tab}.label`)">
        <p>{{ $t(`demo.tabs.${tab}.content`) }}</p>
      </GovTabsItem>
    </GovTabs>
  </DemoSection>
</template>
