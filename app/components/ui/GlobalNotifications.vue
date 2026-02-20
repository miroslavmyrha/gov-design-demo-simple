<script setup lang="ts">
import { GovMessage } from '@gov-design-system-ce/vue'
import { getMessageColor } from '~/utils/colors'

const notificationStore = useNotificationStore()
</script>

<template>
  <Teleport to="body">
    <div class="notifications-container">
      <TransitionGroup name="notification">
        <GovMessage
          v-for="notification in notificationStore.notifications"
          :key="notification.id"
          :color="getMessageColor(notification.type)"
          class="notification-item"
        >
          {{ notification.message }}
        </GovMessage>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.notifications-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

.notification-item {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
