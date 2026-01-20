<script setup lang="ts">
import type { FieldError } from '~/types/forms'

defineProps<{
  errors: FieldError[]
  title?: string
}>()
</script>

<template>
  <gov-message v-if="errors.length > 0" color="error" class="form-error-summary">
    <strong>{{ title || $t('form.errorsTitle') }}</strong>
    <ul>
      <li v-for="error in errors" :key="error.field">
        <strong>{{ error.label }}:</strong> {{ error.message }}
      </li>
    </ul>
  </gov-message>
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
