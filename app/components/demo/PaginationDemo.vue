<script setup lang="ts">
import { GovPagination } from '@gov-design-system-ce/vue'
</script>

<template>
  <DemoSection title-key="demo.pagination.title">
    <GovPagination :current="3" :total="10" :page-size="10" />
  </DemoSection>
</template>
