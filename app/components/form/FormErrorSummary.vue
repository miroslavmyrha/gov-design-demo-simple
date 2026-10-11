<script setup lang="ts">
import { GovMessage } from '@gov-design-system-ce/vue'
import type { FieldError } from '~/types/forms'

defineProps<{
  errors: FieldError[]
  title?: string
}>()

const root = ref<HTMLElement | null>(null)

defineExpose({
  /** Moves the focus to the summary, so that keyboard and screen reader users land on the errors */
  focus: () => root.value?.focus(),
})
</script>

<template>
  <div v-if="errors.length > 0" ref="root" role="alert" tabindex="-1" class="form-error-summary">
    <GovMessage color="error">
    <strong>{{ title || $t('form.errorsTitle') }}</strong>
    <ul>
      <li v-for="error in errors" :key="error.field">
        <strong>{{ error.label }}:</strong> {{ error.message }}
      </li>
    </ul>
    </GovMessage>
  </div>
</template>

<style scoped>
.form-error-summary {
  margin-bottom: 1.5rem;
}

.form-error-summary ul {
  margin: 0.5rem 0 0 1.5rem;
  padding: 0;
}

.form-error-summary li {
  margin: 0.25rem 0;
}
</style>
