const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630
// PNG: social networks do not show SVG previews
const DEFAULT_OG_IMAGE = '/og-image.png'
const LOCALE_MAP: Record<string, string> = { cs: 'cs_CZ', en: 'en_US' }

interface PageSeoOptions {
  ogImage?: string
  ogType?: 'website' | 'article'
}

export function usePageSeo(seoKey: string, options: PageSeoOptions = {}) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()

  // canonical and Open Graph addresses must be absolute: without a configured site URL
  // the address the page was requested on is used
  const baseUrl = (config.public.siteUrl || useRequestURL().origin).replace(/\/$/, '')
  const ogImage = options.ogImage || DEFAULT_OG_IMAGE
  const ogType = options.ogType || 'website'

  useSeoMeta({
    title: () => t(`seo.${seoKey}.title`),
    ogTitle: () => t(`seo.${seoKey}.title`),
    description: () => t(`seo.${seoKey}.description`),
    ogDescription: () => t(`seo.${seoKey}.description`),
    ogType,
    ogImage: () => `${baseUrl}${ogImage}`,
    ogImageWidth: OG_IMAGE_WIDTH,
    ogImageHeight: OG_IMAGE_HEIGHT,
    ogUrl: () => `${baseUrl}${route.path}`,
    ogLocale: () => LOCALE_MAP[locale.value] || LOCALE_MAP.en,
    twitterCard: 'summary_large_image',
    twitterImage: () => `${baseUrl}${ogImage}`,
  })

  // Add canonical URL
  useHead({
    link: [
      {
        rel: 'canonical',
        href: () => `${baseUrl}${route.path}`,
      },
    ],
  })
}
