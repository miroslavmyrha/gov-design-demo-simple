<script setup lang="ts">
import { getMessageColor } from '~/utils/colors'

const messageTypes = ['info', 'success', 'warning', 'error'] as const
</script>

<template>
  <DemoSection title-key="demo.messages.title">
    <gov-message v-for="type in messageTypes" :key="type" :color="getMessageColor(type)">
      <p>{{ $t(`demo.messages.${type}`) }}</p>
    </gov-message>
  </DemoSection>
</template>
