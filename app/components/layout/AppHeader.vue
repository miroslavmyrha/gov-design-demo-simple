<script setup lang="ts">
const appStore = useAppStore()
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const mobileMenuOpen = ref(false)

const emit = defineEmits<{
  'menu-toggle': [open: boolean]
}>()

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  emit('menu-toggle', mobileMenuOpen.value)
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
  emit('menu-toggle', false)
}

const navItems = computed(() => [
  { label: t('nav.home'), href: localePath('/') },
  { label: t('nav.components'), href: localePath('/komponenty') },
  { label: t('nav.forms'), href: localePath('/formulare') },
  { label: t('nav.about'), href: localePath('/o-projektu') },
])

const availableLocales = computed(() =>
  locales.value.filter(loc => typeof loc === 'object' && 'code' in loc) as Array<{ code: string; name: string }>
)

const currentRoute = useRoute()

function isActive(href: string): boolean {
  return currentRoute.path === href
}

async function handleLocaleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const newLocale = target.value as 'cs' | 'en'
  const newPath = switchLocalePath(newLocale)
  if (newPath) {
    await navigateTo(newPath)
  }
}

watch(() => currentRoute.path, () => {
  closeMobileMenu()
})
</script>

<template>
  <header class="app-header">
    <div class="gov-container">
      <div class="header-content">
        <div class="header-logo">
          <NuxtLink to="/" class="logo-link">
            <span class="logo-text">Gov Design System</span>
          </NuxtLink>
        </div>

        <nav class="header-nav header-nav--desktop" :aria-label="$t('nav.mainNavigation')">
          <ul class="nav-list">
            <li v-for="item in navItems" :key="item.href">
              <NuxtLink
                :to="item.href"
                :class="['nav-link', { 'nav-link--active': isActive(item.href) }]"
                :aria-current="isActive(item.href) ? 'page' : undefined"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="header-actions">
          <select
            class="language-switcher"
            :value="locale"
            :aria-label="$t('language.select')"
            @change="handleLocaleChange"
          >
            <option v-for="loc in availableLocales" :key="loc.code" :value="loc.code">
              {{ loc.name }}
            </option>
          </select>

          <gov-button
            class="desktop-theme-toggle"
            type="outlined"
            size="s"
            :wcag-label="appStore.effectiveTheme === 'light' ? $t('theme.switchToDark') : $t('theme.switchToLight')"
            @gov-click="appStore.toggleTheme()"
          >
            <gov-icon :name="appStore.effectiveTheme === 'light' ? 'moon' : 'sun'" />
          </gov-button>

          <button
            class="mobile-menu-toggle"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-nav"
            :aria-label="$t('nav.openMenu')"
            @click="toggleMobileMenu"
          >
            <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      </div>

      <nav
        v-show="mobileMenuOpen"
        id="mobile-nav"
        class="header-nav header-nav--mobile"
        :aria-label="$t('nav.mobileNavigation')"
      >
        <ul class="nav-list nav-list--mobile">
          <li v-for="item in navItems" :key="item.href">
            <NuxtLink
              :to="item.href"
              :class="['nav-link', { 'nav-link--active': isActive(item.href) }]"
              :aria-current="isActive(item.href) ? 'page' : undefined"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="mobile-theme-toggle">
          <button class="theme-toggle-btn" @click="appStore.toggleTheme()">
            <gov-icon :name="appStore.effectiveTheme === 'light' ? 'sun' : 'moon'" />
            <span>{{ appStore.effectiveTheme === 'light' ? $t('theme.light') : $t('theme.dark') }}</span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>
