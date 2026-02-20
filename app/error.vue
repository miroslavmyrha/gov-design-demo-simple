<script setup lang="ts">
import type { NuxtError } from '#app'
import { GovButton } from '@gov-design-system-ce/vue'

const VALID_ERROR_CODES = [400, 401, 403, 404, 500] as const
type ErrorCode = (typeof VALID_ERROR_CODES)[number]

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const isDev = import.meta.dev

const statusCode = computed(() => props.error?.statusCode || 500)

const safeCode = computed<ErrorCode>(() => {
  const code = statusCode.value as ErrorCode
  return VALID_ERROR_CODES.includes(code) ? code : 500
})

const errorInfo = computed(() => ({
  title: t(`error.codes.${safeCode.value}.title`),
  message: t(`error.codes.${safeCode.value}.message`),
}))

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-code">{{ statusCode }}</div>
      <h1 class="error-title">{{ errorInfo.title }}</h1>
      <p class="error-message">{{ errorInfo.message }}</p>

      <p v-if="isDev && error?.message" class="error-debug">
        {{ $t('error.debug') }}: {{ error.message }}
      </p>

      <div class="error-actions">
        <GovButton color="primary" type="solid" @gov-click="handleError">
          {{ $t('error.backToHome') }}
        </GovButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-page, #f5f5f5);
  padding: 2rem;
}

.error-container {
  text-align: center;
  max-width: 500px;
}

.error-code {
  font-size: 6rem;
  font-weight: 700;
  color: var(--text-primary-color, #2362a2);
  line-height: 1;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary, #1a1a1a);
  margin: 0 0 1rem 0;
}

.error-message {
  font-size: 1rem;
  color: var(--text-secondary, #666);
  margin: 0 0 2rem 0;
}

.error-debug {
  font-size: 0.875rem;
  color: var(--icon-warning, #d97706);
  background: var(--background-warning-subtle, #fef3c7);
  padding: 0.75rem;
  border-radius: 4px;
  margin: 0 0 2rem 0;
  word-break: break-word;
}

.error-actions {
  display: flex;
  justify-content: center;
}
</style>
