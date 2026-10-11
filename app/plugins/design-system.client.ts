import { ComponentLibrary } from '@gov-design-system-ce/vue/plugin'

declare global {
  interface Window {
    GOV_DS_CONFIG?: {
      iconsPath?: string
      iconsLazyLoad?: boolean
    }
  }
}

const TAG_PREFIX = 'gov-'

/**
 * Gives the components the properties Vue set on them before they were defined.
 *
 * On an element that is not defined yet Vue cannot set a property, so it writes an attribute
 * under the property's name: `nativeType` ends up as the attribute `nativetype`. The component
 * reads `native-type` and never sees it; a submit button would stay an ordinary button.
 * The attribute names a component reads are known once it is defined (observedAttributes),
 * so each misnamed attribute is copied to the name the component understands.
 */
function passOnEarlyAttributes(): void {
  for (const element of document.querySelectorAll('*')) {
    if (!element.localName.startsWith(TAG_PREFIX)) continue

    const component = customElements.get(element.localName) as { observedAttributes?: string[] } | undefined
    for (const name of component?.observedAttributes ?? []) {
      const written = name.replaceAll('-', '')
      if (written !== name && element.hasAttribute(written) && !element.hasAttribute(name)) {
        element.setAttribute(name, element.getAttribute(written) ?? '')
      }
    }
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  window.GOV_DS_CONFIG = {
    iconsPath: '/icons',
    iconsLazyLoad: true,
  }

  // The components are web components without shadow DOM: as soon as they are defined, they start
  // moving their children into their own markup. If that happens before Vue has taken over the
  // page the server sent, Vue finds a tree it does not recognise, throws the components away and
  // builds them again. So they are defined only after hydration; until then the page shows their
  // content (texts, labels) without the components' own markup.
  nuxtApp.hook('app:suspense:resolve', async () => {
    try {
      await ComponentLibrary.install?.(nuxtApp.vueApp)
      passOnEarlyAttributes()
    } catch (error) {
      console.error('[Gov DS] Failed to initialize component library:', error)
    }
  })
})
