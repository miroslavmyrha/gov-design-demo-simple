export type MessageType = 'info' | 'success' | 'warning' | 'error'
export type GovColor = 'primary' | 'success' | 'warning' | 'error'

export function getMessageColor(type: MessageType | string): GovColor {
  return type === 'info' ? 'primary' : (type as GovColor)
}
