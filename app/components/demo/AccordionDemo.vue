<script setup lang="ts">
const sections = ['section1', 'section2', 'section3'] as const
</script>

<template>
  <DemoSection title-key="demo.accordion.title">
    <gov-accordion>
      <gov-accordion-item v-for="section in sections" :key="section">
        <h3 slot="label">{{ $t(`demo.accordion.${section}.label`) }}</h3>
        <p>{{ $t(`demo.accordion.${section}.content`) }}</p>
      </gov-accordion-item>
    </gov-accordion>
  </DemoSection>
</template>
