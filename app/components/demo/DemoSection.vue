<script setup lang="ts">
defineProps<{
  titleKey: string
}>()
</script>

<template>
  <section class="demo-section">
    <h2 class="gov-text--xl">{{ $t(titleKey) }}</h2>
    <slot></slot>
  </section>
</template>
