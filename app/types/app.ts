export type Theme = 'light' | 'dark' | 'system'

export interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
  timeout?: number
}
