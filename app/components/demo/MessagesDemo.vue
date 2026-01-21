<script setup lang="ts">
import { GovMessage } from '@gov-design-system-ce/vue'
import { getMessageColor } from '~/utils/colors'

const messageTypes = ['info', 'success', 'warning', 'error'] as const
</script>

<template>
  <DemoSection title-key="demo.messages.title">
    <GovMessage v-for="type in messageTypes" :key="type" :color="getMessageColor(type)">
      <p>{{ $t(`demo.messages.${type}`) }}</p>
    </GovMessage>
  </DemoSection>
</template>
