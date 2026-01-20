<script setup lang="ts">
const { t } = useI18n()

const tabs = ['tab1', 'tab2', 'tab3'] as const
</script>

<template>
  <DemoSection title-key="demo.tabs.title">
    <gov-tabs>
      <gov-tabs-item v-for="tab in tabs" :key="tab" :label="t(`demo.tabs.${tab}.label`)">
        <p>{{ $t(`demo.tabs.${tab}.content`) }}</p>
      </gov-tabs-item>
    </gov-tabs>
  </DemoSection>
</template>
