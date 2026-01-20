<script setup lang="ts">
interface CardConfig {
  key: string
  icon?: string
  hasButton?: boolean
  promotion?: boolean
}

const cards: CardConfig[] = [
  { key: 'basic' },
  { key: 'info', icon: 'info-circle' },
  { key: 'withAction', hasButton: true, promotion: true },
]
</script>

<template>
  <DemoSection title-key="demo.card.title">
    <div class="grid-base grid-auto-250">
      <gov-card v-for="card in cards" :key="card.key" :promotion="card.promotion ?? false">
        <div class="card-content">
          <div v-if="card.icon" class="card-icon">
            <gov-icon :name="card.icon" />
          </div>
          <h3 class="gov-text--l">{{ $t(`demo.card.${card.key}.title`) }}</h3>
          <p>{{ $t(`demo.card.${card.key}.content`) }}</p>
          <gov-button v-if="card.hasButton" color="primary" type="solid" size="s">
            {{ $t('demo.card.actionButton') }}
          </gov-button>
        </div>
      </gov-card>
    </div>
  </DemoSection>
</template>

<style scoped>
.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
}

.card-icon {
  color: var(--gov-color-primary);
  font-size: 1.5rem;
}
</style>
