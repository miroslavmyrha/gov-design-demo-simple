<script setup lang="ts">
import { GovChip } from '@gov-design-system-ce/vue'

const chips = [
  { color: 'primary', type: 'solid', key: 'primary' },
  { color: 'secondary', type: 'outlined', key: 'secondary' },
] as const
</script>

<template>
  <DemoSection title-key="demo.chips.title">
    <div class="demo-row">
      <GovChip
        v-for="chip in chips"
        :key="chip.key"
        :color="chip.color"
        :type="chip.type"
        size="m"
      >
        {{ $t(`demo.chips.${chip.key}`) }}
      </GovChip>
    </div>
  </DemoSection>
</template>
