interface PageSeoOptions {
  ogImage?: string
  ogType?: 'website' | 'article'
}

// Note: SVG placeholder created, convert to PNG (1200x630) for production
const DEFAULT_OG_IMAGE = '/og-image.svg'

export function usePageSeo(seoKey: string, options: PageSeoOptions = {}) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()

  const baseUrl = config.public.siteUrl || ''
  const ogImage = options.ogImage || DEFAULT_OG_IMAGE
  const ogType = options.ogType || 'website'

  useSeoMeta({
    title: () => t(`seo.${seoKey}.title`),
    ogTitle: () => t(`seo.${seoKey}.title`),
    description: () => t(`seo.${seoKey}.description`),
    ogDescription: () => t(`seo.${seoKey}.description`),
    ogType,
    ogImage: () => `${baseUrl}${ogImage}`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogUrl: () => `${baseUrl}${route.path}`,
    ogLocale: () => locale.value === 'cs' ? 'cs_CZ' : 'en_US',
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
