<script setup lang="ts">
import { GovLoading } from '@gov-design-system-ce/vue'

const appStore = useAppStore()
const { t } = useI18n()
</script>

<template>
  <Teleport to="body">
    <div v-if="appStore.isLoading" class="global-loading">
      <GovLoading :label="appStore.loadingMessage || t('common.loading')" />
    </div>
  </Teleport>
</template>

<style scoped>
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gov-color-bg-canvas, rgba(255, 255, 255, 0.9));
  z-index: 9999;
}
</style>
