<script setup lang="ts">
import { GovAccordion, GovAccordionItem } from '@gov-design-system-ce/vue'

const sections = ['section1', 'section2', 'section3'] as const
</script>

<template>
  <DemoSection title-key="demo.accordion.title">
    <GovAccordion>
      <GovAccordionItem v-for="section in sections" :key="section">
        <h3 slot="label">{{ $t(`demo.accordion.${section}.label`) }}</h3>
        <p>{{ $t(`demo.accordion.${section}.content`) }}</p>
      </GovAccordionItem>
    </GovAccordion>
  </DemoSection>
</template>
