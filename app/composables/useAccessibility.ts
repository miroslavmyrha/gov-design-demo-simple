const ANNOUNCE_DELAY = 100
const LIVE_REGION_ID = 'a11y-live-region'

// Shared state across all components
const isKeyboardUser = ref(false)
let announceTimeoutId: ReturnType<typeof setTimeout> | null = null
let listenersRegistered = false

function handleKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Tab') {
    isKeyboardUser.value = true
  }
}

function handleMouseDown(): void {
  isKeyboardUser.value = false
}

export function useAccessibility() {
  /**
   * Announces a message to screen readers via ARIA live region.
   * The live region is a singleton element that persists in the DOM
   * for the entire app lifecycle (intentionally not removed on unmount
   * as it's shared across all components and screen readers expect it
   * to be persistent).
   */
  function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!import.meta.client) return

    if (announceTimeoutId) {
      clearTimeout(announceTimeoutId)
      announceTimeoutId = null
    }

    let liveRegion = document.getElementById(LIVE_REGION_ID)

    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = LIVE_REGION_ID
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      document.body.appendChild(liveRegion)
    }

    liveRegion.setAttribute('aria-live', priority)
    liveRegion.textContent = ''
    announceTimeoutId = setTimeout(() => {
      liveRegion!.textContent = message
      announceTimeoutId = null
    }, ANNOUNCE_DELAY)
  }

  function handleSkipLink(targetId: string): void {
    if (!import.meta.client) return

    const target = document.getElementById(targetId)
    if (target) {
      target.setAttribute('tabindex', '-1')
      target.focus()
      target.removeAttribute('tabindex')
    }
  }

  onMounted(() => {
    if (import.meta.client && !listenersRegistered) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleMouseDown)
      listenersRegistered = true
    }
  })

  return {
    isKeyboardUser: readonly(isKeyboardUser),
    announce,
    handleSkipLink,
  }
}
