<script setup lang="ts">
import type { ExternalLink } from '~/types/ui'

const { t } = useI18n()

const currentYear = new Date().getFullYear()

const footerLinks: ExternalLink[] = [
  { label: 'Gov Design System', href: 'https://designsystem.gov.cz/' },
  { label: 'Nuxt', href: 'https://nuxt.com/' },
  { label: 'Vue.js', href: 'https://vuejs.org/' },
]
</script>

<template>
  <footer class="app-footer">
    <div class="gov-container">
      <div class="footer-content">
        <div class="footer-info">
          <p class="footer-copyright">
            {{ t('footer.copyright', { year: currentYear }) }}
          </p>
          <p class="footer-description">
            {{ t('footer.description') }}
          </p>
        </div>

        <nav class="footer-nav" :aria-label="t('nav.footerNavigation')">
          <ul class="footer-links">
            <li v-for="link in footerLinks" :key="link.href">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>
