import { renderToString } from '@gov-design-system-ce/components/dist/hydrate'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', async (response) => {
    if (!response.body || typeof response.body !== 'string') {
      return
    }

    try {
      const result = await renderToString(response.body)
      response.body = result.html
    } catch (error) {
      if (import.meta.dev) {
        console.error('[Gov DS SSR] Hydration error:', error instanceof Error ? error.message : 'Unknown error')
      }
    }
  })
})
