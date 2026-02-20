<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <h1 class="gov-text--2xl">{{ title }}</h1>
  <p v-if="subtitle" class="gov-text--l">{{ subtitle }}</p>
</template>
