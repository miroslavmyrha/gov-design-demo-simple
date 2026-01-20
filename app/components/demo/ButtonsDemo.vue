<script setup lang="ts">
const variantButtons = [
  { color: 'primary', label: 'primary', disabled: false },
  { color: 'secondary', label: 'secondary', disabled: false },
  { color: 'primary', label: 'disabled', disabled: true },
] as const

const sizeButtons = [
  { size: 's', label: 'small' },
  { size: 'm', label: 'medium' },
  { size: 'l', label: 'large' },
] as const
</script>

<template>
  <DemoSection title-key="demo.buttons.title">
    <div class="demo-row">
      <gov-button
        v-for="btn in variantButtons"
        :key="btn.label"
        :color="btn.color"
        type="solid"
        size="m"
        :disabled="btn.disabled"
      >
        {{ $t(`demo.buttons.${btn.label}`) }}
      </gov-button>
    </div>
    <div class="demo-row">
      <gov-button
        v-for="btn in sizeButtons"
        :key="btn.size"
        color="primary"
        type="solid"
        :size="btn.size"
      >
        {{ $t(`demo.buttons.${btn.label}`) }}
      </gov-button>
    </div>
  </DemoSection>
</template>
