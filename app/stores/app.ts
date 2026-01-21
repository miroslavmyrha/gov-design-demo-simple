import { defineStore } from 'pinia'
import type { Theme, Notification } from '~/types/app'

const STORAGE_KEY_THEME = 'app-theme'
const DEFAULT_NOTIFICATION_TIMEOUT = 5000
const MAX_NOTIFICATIONS = 50
const VALID_THEMES: Theme[] = ['light', 'dark', 'system']

export const useAppStore = defineStore('app', () => {
  // State
  const theme = ref<Theme>('light')
  const notifications = ref<Notification[]>([])
  const isLoading = ref(false)
  const loadingMessage = ref('')

  // Private state (not exposed)
  let themeMediaQuery: MediaQueryList | null = null
  let themeChangeHandler: ((e: MediaQueryListEvent) => void) | null = null
  const notificationTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

  // Getters
  const effectiveTheme = computed<'light' | 'dark'>(() => {
    if (theme.value === 'system') {
      if (import.meta.client) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return 'light'
    }
    return theme.value
  })

  // Private functions
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

  // Actions
  function applyTheme(): void {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', effectiveTheme.value)
    }
  }

  function setTheme(newTheme: Theme): void {
    theme.value = newTheme
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY_THEME, newTheme)
      applyTheme()
    }
  }

  function toggleTheme(): void {
    const newTheme = effectiveTheme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  function initTheme(): void {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as Theme | null
      if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        theme.value = savedTheme
      }
      applyTheme()

      if (!themeMediaQuery) {
        themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        themeChangeHandler = () => {
          if (theme.value === 'system') {
            applyTheme()
          }
        }
        themeMediaQuery.addEventListener('change', themeChangeHandler)
      }
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

  function showSuccess(message: string, timeout?: number): string {
    return addNotification({ type: 'success', message, timeout })
  }

  function setLoading(loading: boolean, message = ''): void {
    isLoading.value = loading
    loadingMessage.value = message
  }

  return {
    // State
    theme,
    notifications,
    isLoading,
    loadingMessage,
    // Getters
    effectiveTheme,
    // Actions
    setTheme,
    toggleTheme,
    applyTheme,
    initTheme,
    addNotification,
    removeNotification,
    showSuccess,
    setLoading,
  }
})
