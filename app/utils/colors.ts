import type { Notification } from '~/types/app'

export type GovMessageColor = 'error' | 'success' | 'warning' | 'primary' | 'neutral'

export function getMessageColor(type: Notification['type']): GovMessageColor {
  return type === 'info' ? 'primary' : type
}
