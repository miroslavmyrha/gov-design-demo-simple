import type { Notification } from '~/types/app'

export function getMessageColor(type: Notification['type']): string {
  return type === 'info' ? 'primary' : type
}
