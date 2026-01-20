<script setup lang="ts">
const { isKeyboardUser, handleSkipLink } = useAccessibility()
</script>

<template>
  <div class="layout-wrapper" :class="{ 'keyboard-user': isKeyboardUser }">
    <a
      href="#main-content"
      class="skip-link"
      @click.prevent="handleSkipLink('main-content')"
    >
      {{ $t('nav.skipToContent') }}
    </a>

    <LayoutAppHeader />

    <main id="main-content" class="main-content" tabindex="-1">
      <slot></slot>
    </main>

    <LayoutAppFooter />
  </div>
</template>
