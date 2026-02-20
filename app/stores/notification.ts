import { defineStore } from 'pinia'
import type { Notification } from '~/types/app'

const DEFAULT_NOTIFICATION_TIMEOUT = 5000
const MAX_NOTIFICATIONS = 50

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  const notificationTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

  function generateNotificationId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  }

  function clearNotificationTimeout(id: string): void {
    const timeoutId = notificationTimeouts.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      notificationTimeouts.delete(id)
    }
  }

  function addNotification(notification: Omit<Notification, 'id'>): string {
    const id = generateNotificationId()
    const newNotification: Notification = { ...notification, id }

    notifications.value.push(newNotification)

    while (notifications.value.length > MAX_NOTIFICATIONS) {
      const removed = notifications.value.shift()
      if (removed) {
        clearNotificationTimeout(removed.id)
      }
    }

    if (notification.timeout !== 0) {
      const timeout = notification.timeout ?? DEFAULT_NOTIFICATION_TIMEOUT
      const timeoutId = setTimeout(() => removeNotification(id), timeout)
      notificationTimeouts.set(id, timeoutId)
    }

    return id
  }

  function removeNotification(id: string): void {
    clearNotificationTimeout(id)
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function clearAllNotifications(): void {
    for (const timeoutId of notificationTimeouts.values()) {
      clearTimeout(timeoutId)
    }
    notificationTimeouts.clear()
    notifications.value = []
  }

  function showSuccess(message: string, timeout?: number): string {
    return addNotification({ type: 'success', message, timeout })
  }

  function $dispose(): void {
    clearAllNotifications()
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    $dispose,
  }
})
