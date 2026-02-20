import type { Thing, WithContext, WebSite, WebPage, BreadcrumbList, Organization } from 'schema-dts'

const SCHEMA_CONTEXT = 'https://schema.org' as const

type StructuredData = WithContext<Thing>

/**
 * Composable for adding JSON-LD structured data to pages.
 * Helps with SEO by providing rich snippets to search engines.
 */
export function useStructuredData() {
  const config = useRuntimeConfig()
  const route = useRoute()

  const baseUrl = config.public.siteUrl || ''

  /**
   * Add JSON-LD script to the page head
   */
  function addStructuredData(data: StructuredData | StructuredData[]): void {
    const jsonLd = JSON.stringify(data)

    useHead({
      script: [
        {
          type: 'application/ld+json',
          textContent: jsonLd,
        },
      ],
    })
  }

  /**
   * Create Organization schema
   */
  function createOrganization(options: {
    name: string
    url?: string
    logo?: string
  }): WithContext<Organization> {
    return {
      '@context': SCHEMA_CONTEXT,
      '@type': 'Organization',
      name: options.name,
      url: options.url || baseUrl,
      ...(options.logo && { logo: `${baseUrl}${options.logo}` }),
    }
  }

  /**
   * Create WebSite schema
   */
  function createWebSite(options: {
    name: string
    description?: string
  }): WithContext<WebSite> {
    return {
      '@context': SCHEMA_CONTEXT,
      '@type': 'WebSite',
      name: options.name,
      url: baseUrl,
      ...(options.description && { description: options.description }),
    }
  }

  /**
   * Create WebPage schema
   */
  function createWebPage(options: {
    name: string
    description?: string
  }): WithContext<WebPage> {
    return {
      '@context': SCHEMA_CONTEXT,
      '@type': 'WebPage',
      name: options.name,
      url: `${baseUrl}${route.path}`,
      ...(options.description && { description: options.description }),
    }
  }

  /**
   * Create BreadcrumbList schema
   */
  function createBreadcrumbs(
    items: Array<{ name: string; url: string }>
  ): WithContext<BreadcrumbList> {
    return {
      '@context': SCHEMA_CONTEXT,
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem' as const,
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
      })),
    }
  }

  return {
    addStructuredData,
    createOrganization,
    createWebSite,
    createWebPage,
    createBreadcrumbs,
  }
}
