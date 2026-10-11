import { defineStore } from 'pinia'
import type { Theme } from '~/types/app'

export const STORAGE_KEY_THEME = 'app-theme'
const VALID_THEMES: Theme[] = ['light', 'dark', 'system']
const DARK_MODE_QUERY = '(prefers-color-scheme: dark)'
/** Order in which the toggle goes through the themes */
const NEXT_THEME: Record<Theme, Theme> = { light: 'dark', dark: 'system', system: 'light' }

function safeLocalStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeLocalStorageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Safari Private Mode or quota exceeded - silently fail
  }
}

export const useThemeStore = defineStore('theme', () => {
  // until the user chooses, the theme follows the system
  const theme = ref<Theme>('system')
  // what the system prefers; kept in a ref so that the effective theme reacts to a change
  const systemPrefersDark = ref(false)

  let themeMediaQuery: MediaQueryList | null = null
  let themeChangeHandler: ((e: MediaQueryListEvent) => void) | null = null

  const effectiveTheme = computed<'light' | 'dark'>(() => {
    if (theme.value === 'system') {
      return systemPrefersDark.value ? 'dark' : 'light'
    }
    return theme.value
  })

  const nextTheme = computed<Theme>(() => NEXT_THEME[theme.value])

  function applyTheme(): void {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', effectiveTheme.value)
    }
  }

  function setTheme(newTheme: Theme): void {
    if (!VALID_THEMES.includes(newTheme)) return
    theme.value = newTheme
    if (import.meta.client) {
      safeLocalStorageSet(STORAGE_KEY_THEME, newTheme)
      applyTheme()
    }
  }

  /** Light, dark, by the system, and round again */
  function toggleTheme(): void {
    setTheme(nextTheme.value)
  }

  function initTheme(): void {
    if (import.meta.client) {
      if (!themeMediaQuery) {
        themeMediaQuery = window.matchMedia(DARK_MODE_QUERY)
        themeChangeHandler = (event) => {
          systemPrefersDark.value = event.matches
          applyTheme()
        }
        themeMediaQuery.addEventListener('change', themeChangeHandler)
      }
      systemPrefersDark.value = themeMediaQuery.matches

      const savedTheme = safeLocalStorageGet(STORAGE_KEY_THEME) as Theme | null
      if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        theme.value = savedTheme
      }
      applyTheme()
    }
  }

  function cleanupThemeListener(): void {
    if (themeMediaQuery && themeChangeHandler) {
      themeMediaQuery.removeEventListener('change', themeChangeHandler)
      themeMediaQuery = null
      themeChangeHandler = null
    }
  }

  return {
    theme,
    effectiveTheme,
    nextTheme,
    setTheme,
    toggleTheme,
    initTheme,
    cleanupThemeListener,
  }
})
