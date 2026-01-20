export type Theme = 'light' | 'dark' | 'system'

export type Locale = 'cs' | 'en'

export interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
  timeout?: number
}

export interface AppState {
  theme: Theme
  locale: Locale
  notifications: Notification[]
  isLoading: boolean
  loadingMessage: string
}
