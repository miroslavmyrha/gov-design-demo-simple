import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useThemeStore } from '~/stores/theme'
import { useNotificationStore } from '~/stores/notification'
import { czechPlural } from '~/utils/plural'

/** A system colour scheme that can be changed during the test */
function stubSystem(prefersDark: boolean) {
  const listeners: Array<(event: { matches: boolean }) => void> = []
  const query = {
    matches: prefersDark,
    addEventListener: (_: string, listener: (event: { matches: boolean }) => void) => listeners.push(listener),
    removeEventListener: () => undefined,
  }
  vi.stubGlobal('matchMedia', () => query)
  return (dark: boolean) => {
    query.matches = dark
    listeners.forEach(listener => listener({ matches: dark }))
  }
}

beforeEach(() => {
  setActivePinia(createPinia())
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('theme', () => {
  it('follows the system until the user chooses', () => {
    const setSystem = stubSystem(true)
    const theme = useThemeStore()
    theme.initTheme()

    expect(theme.theme).toBe('system')
    expect(theme.effectiveTheme).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')

    setSystem(false)
    expect(theme.effectiveTheme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('goes through light, dark and system and remembers the choice', () => {
    stubSystem(true)
    const theme = useThemeStore()
    theme.initTheme()

    theme.toggleTheme()
    expect([theme.theme, theme.effectiveTheme, localStorage.getItem('app-theme')]).toEqual(['light', 'light', 'light'])
    theme.toggleTheme()
    expect([theme.theme, theme.effectiveTheme]).toEqual(['dark', 'dark'])
    theme.toggleTheme()
    expect([theme.theme, theme.effectiveTheme, localStorage.getItem('app-theme')]).toEqual(['system', 'dark', 'system'])
  })

  it('keeps a saved choice over the system and ignores a broken one', () => {
    stubSystem(true)
    localStorage.setItem('app-theme', 'light')
    const theme = useThemeStore()
    theme.initTheme()
    expect(theme.effectiveTheme).toBe('light')

    setActivePinia(createPinia())
    localStorage.setItem('app-theme', 'purple')
    const fresh = useThemeStore()
    fresh.initTheme()
    expect(fresh.theme).toBe('system')
  })
})

describe('notifications', () => {
  it('removes a notification after its time', () => {
    vi.useFakeTimers()
    const store = useNotificationStore()

    store.showSuccess('Uloženo', 1000)
    expect(store.notifications).toHaveLength(1)

    vi.advanceTimersByTime(1000)
    expect(store.notifications).toHaveLength(0)
  })

  it('keeps a notification without a timeout until it is removed', () => {
    vi.useFakeTimers()
    const store = useNotificationStore()

    const id = store.addNotification({ type: 'error', message: 'Chyba', timeout: 0 })
    vi.advanceTimersByTime(60_000)
    expect(store.notifications).toHaveLength(1)

    store.removeNotification(id)
    expect(store.notifications).toHaveLength(0)
  })

  it('holds fifty at most and drops the oldest', () => {
    const store = useNotificationStore()
    for (let index = 1; index <= 52; index++) {
      store.addNotification({ type: 'info', message: `Zpráva ${index}`, timeout: 0 })
    }

    expect(store.notifications).toHaveLength(50)
    expect(store.notifications[0]?.message).toBe('Zpráva 3')
  })
})

describe('Czech plural', () => {
  it.each([[1, 0], [2, 1], [4, 1], [5, 2], [0, 2], [21, 2]])('%i uses form %i', (count, form) => {
    expect(czechPlural(count)).toBe(form)
  })

  it('stays within the forms a message has', () => {
    // "a | b" has two forms: five must not ask for a third
    expect(czechPlural(5, 2)).toBe(1)
    expect(czechPlural(3, 1)).toBe(0)
  })
})
