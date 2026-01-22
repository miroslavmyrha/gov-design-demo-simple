<script setup lang="ts">
import { GovButton, GovIcon } from '@gov-design-system-ce/vue'
import { ORG_NAME } from '~/data/app'

const appStore = useAppStore()
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
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

const stopRouteWatch = watch(() => currentRoute.path, () => {
  closeMobileMenu()
})

onBeforeUnmount(() => {
  stopRouteWatch()
})
</script>

<template>
  <header class="app-header">
    <div class="gov-container">
      <div class="header-content">
        <div class="header-logo">
          <NuxtLink to="/" class="logo-link">
            <span class="logo-text">{{ ORG_NAME }}</span>
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

          <GovButton
            class="desktop-theme-toggle"
            type="outlined"
            size="s"
            :wcag-label="appStore.effectiveTheme === 'light' ? $t('theme.switchToDark') : $t('theme.switchToLight')"
            @gov-click="appStore.toggleTheme()"
          >
            <GovIcon :name="appStore.effectiveTheme === 'light' ? 'moon' : 'sun'" />
          </GovButton>

          <button
            class="mobile-menu-toggle"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-nav"
            :aria-label="$t('nav.openMenu')"
            @click="toggleMobileMenu"
          >
            <GovIcon :name="mobileMenuOpen ? 'x-lg' : 'list'" />
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
            <GovIcon :name="appStore.effectiveTheme === 'light' ? 'sun' : 'moon'" />
            <span>{{ appStore.effectiveTheme === 'light' ? $t('theme.light') : $t('theme.dark') }}</span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>
