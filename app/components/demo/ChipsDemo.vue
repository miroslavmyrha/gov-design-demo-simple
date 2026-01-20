<script setup lang="ts">
const chips = [
  { color: 'primary', type: 'solid', key: 'primary' },
  { color: 'secondary', type: 'outlined', key: 'secondary' },
] as const
</script>

<template>
  <DemoSection title-key="demo.chips.title">
    <div class="demo-row">
      <gov-chip
        v-for="chip in chips"
        :key="chip.key"
        :color="chip.color"
        :type="chip.type"
        size="m"
      >
        {{ $t(`demo.chips.${chip.key}`) }}
      </gov-chip>
    </div>
  </DemoSection>
</template>
