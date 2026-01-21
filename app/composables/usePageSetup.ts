import { APP_NAME, ORG_NAME } from '~/data/app'

interface BreadcrumbItem {
  nameKey: string
  url: string
}

interface PageSetupOptions {
  /** SEO key for translations (seo.{key}.title, seo.{key}.description) */
  seoKey: string
  /** Page title key for structured data */
  titleKey: string
  /** Page description key for structured data */
  descriptionKey: string
  /** Breadcrumb items (optional, skipped for home page) */
  breadcrumbs?: BreadcrumbItem[]
  /** Whether this is the home page (adds WebSite + Organization instead of WebPage) */
  isHome?: boolean
}

/**
 * Unified page setup composable that handles:
 * - SEO meta tags (usePageSeo)
 * - Structured data (useStructuredData)
 * - Breadcrumbs
 */
export function usePageSetup(options: PageSetupOptions) {
  const { t } = useI18n()

  // SEO meta tags
  usePageSeo(options.seoKey)

  // Structured data
  const { addStructuredData, createWebSite, createOrganization, createWebPage, createBreadcrumbs } =
    useStructuredData()

  if (options.isHome) {
    // Home page: WebSite + Organization
    addStructuredData([
      createWebSite({
        name: APP_NAME,
        description: t(options.descriptionKey),
      }),
      createOrganization({
        name: ORG_NAME,
        logo: '/og-image.svg',
      }),
    ])
  } else {
    // Other pages: WebPage + Breadcrumbs
    const webPage = createWebPage({
      name: t(options.titleKey),
      description: t(options.descriptionKey),
    })

    if (options.breadcrumbs && options.breadcrumbs.length > 0) {
      const breadcrumbs = createBreadcrumbs(
        options.breadcrumbs.map((item) => ({ name: t(item.nameKey), url: item.url }))
      )
      addStructuredData([webPage, breadcrumbs])
    } else {
      addStructuredData([webPage])
    }
  }

  return { t }
}
