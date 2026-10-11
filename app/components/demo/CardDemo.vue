<script setup lang="ts">
import { GovButton, GovCard, GovIcon } from '@gov-design-system-ce/vue'

interface CardConfig {
  key: string
  icon?: string
  hasButton?: boolean
}

const notificationStore = useNotificationStore()
const { announce } = useAccessibility()
const { t } = useI18n()

/** What the button of the card does: it tells the user, on screen and to a screen reader */
function handleAction(): void {
  const message = t('demo.card.actionDone')
  notificationStore.addNotification({ type: 'info', message })
  announce(message, 'polite')
}

const cards: CardConfig[] = [
  { key: 'basic' },
  { key: 'info', icon: 'info-circle' },
  { key: 'withAction', hasButton: true },
]
</script>

<template>
  <DemoSection title-key="demo.card.title">
    <div class="grid-base grid-auto-250">
      <GovCard v-for="card in cards" :key="card.key">
        <div class="card-content">
          <div v-if="card.icon" class="card-icon">
            <GovIcon :name="card.icon" />
          </div>
          <h3 class="gov-text--l">{{ $t(`demo.card.${card.key}.title`) }}</h3>
          <p>{{ $t(`demo.card.${card.key}.content`) }}</p>
          <GovButton v-if="card.hasButton" color="primary" type="solid" size="s" @gov-click="handleAction">
            {{ $t('demo.card.actionButton') }}
          </GovButton>
        </div>
      </GovCard>
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
