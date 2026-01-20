import { defineStore } from 'pinia'
import type { Theme, Locale, Notification, AppState } from '~/types/app'

const STORAGE_KEY_THEME = 'app-theme'
const STORAGE_KEY_LOCALE = 'app-locale'
const DEFAULT_NOTIFICATION_TIMEOUT = 5000
const MAX_NOTIFICATIONS = 50
const VALID_THEMES: Theme[] = ['light', 'dark', 'system']

let themeMediaQuery: MediaQueryList | null = null
let themeChangeHandler: ((e: MediaQueryListEvent) => void) | null = null

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

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
    locale: 'cs',
    notifications: [],
    isLoading: false,
    loadingMessage: '',
  }),

  getters: {
    effectiveTheme(): 'light' | 'dark' {
      if (this.theme === 'system') {
        if (import.meta.client) {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return 'light'
      }
      return this.theme
    },
  },

  actions: {
    setTheme(theme: Theme): void {
      this.theme = theme
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY_THEME, theme)
        this.applyTheme()
      }
    },

    toggleTheme(): void {
      const newTheme = this.effectiveTheme === 'light' ? 'dark' : 'light'
      this.setTheme(newTheme)
    },

    applyTheme(): void {
      if (import.meta.client) {
        document.documentElement.setAttribute('data-theme', this.effectiveTheme)
      }
    },

    initTheme(): void {
      if (import.meta.client) {
        const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as Theme | null
        if (savedTheme && VALID_THEMES.includes(savedTheme)) {
          this.theme = savedTheme
        }
        this.applyTheme()

        if (!themeMediaQuery) {
          themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          themeChangeHandler = () => {
            if (this.theme === 'system') {
              this.applyTheme()
            }
          }
          themeMediaQuery.addEventListener('change', themeChangeHandler)
        }
      }
    },

    cleanupThemeListener(): void {
      if (themeMediaQuery && themeChangeHandler) {
        themeMediaQuery.removeEventListener('change', themeChangeHandler)
        themeMediaQuery = null
        themeChangeHandler = null
      }
    },

    setLocale(locale: Locale): void {
      this.locale = locale
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY_LOCALE, locale)
        document.documentElement.setAttribute('lang', locale)
      }
    },

    addNotification(notification: Omit<Notification, 'id'>): string {
      const id = generateNotificationId()
      const newNotification: Notification = { ...notification, id }

      this.notifications.push(newNotification)

      while (this.notifications.length > MAX_NOTIFICATIONS) {
        const removed = this.notifications.shift()
        if (removed) {
          clearNotificationTimeout(removed.id)
        }
      }

      if (notification.timeout !== 0) {
        const timeout = notification.timeout ?? DEFAULT_NOTIFICATION_TIMEOUT
        const timeoutId = setTimeout(() => this.removeNotification(id), timeout)
        notificationTimeouts.set(id, timeoutId)
      }

      return id
    },

    removeNotification(id: string): void {
      clearNotificationTimeout(id)
      const index = this.notifications.findIndex((n) => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    clearNotifications(): void {
      this.notifications.forEach((n) => clearNotificationTimeout(n.id))
      this.notifications = []
    },

    showSuccess(message: string, timeout?: number): string {
      return this.addNotification({ type: 'success', message, timeout })
    },

    setLoading(isLoading: boolean, message = ''): void {
      this.isLoading = isLoading
      this.loadingMessage = message
    },
  },
})
