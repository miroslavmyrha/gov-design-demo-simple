import { defineStore } from 'pinia'
import type { Theme } from '~/types/app'

const STORAGE_KEY_THEME = 'app-theme'
const VALID_THEMES: Theme[] = ['light', 'dark', 'system']
const DARK_MODE_QUERY = '(prefers-color-scheme: dark)'

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
  const theme = ref<Theme>('light')

  let themeMediaQuery: MediaQueryList | null = null
  let themeChangeHandler: ((e: MediaQueryListEvent) => void) | null = null

  const effectiveTheme = computed<'light' | 'dark'>(() => {
    if (theme.value === 'system') {
      if (import.meta.client) {
        const mediaQuery = themeMediaQuery ?? window.matchMedia(DARK_MODE_QUERY)
        return mediaQuery.matches ? 'dark' : 'light'
      }
      return 'light'
    }
    return theme.value
  })

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

  function toggleTheme(): void {
    const newTheme = effectiveTheme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  function initTheme(): void {
    if (import.meta.client) {
      const savedTheme = safeLocalStorageGet(STORAGE_KEY_THEME) as Theme | null
      if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        theme.value = savedTheme
      }
      applyTheme()

      if (!themeMediaQuery) {
        themeMediaQuery = window.matchMedia(DARK_MODE_QUERY)
        themeChangeHandler = () => {
          if (theme.value === 'system') {
            applyTheme()
          }
        }
        themeMediaQuery.addEventListener('change', themeChangeHandler)
      }
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
    toggleTheme,
    initTheme,
    cleanupThemeListener,
  }
})
