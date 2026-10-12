import { defineCustomElements } from '@gov-design-system-ce/components/loader'

declare global {
  interface Window {
    GOV_DS_CONFIG?: {
      canValidateWcagOnRender?: boolean
      iconsLazyLoad?: boolean
      iconsPath?: string
    }
  }
}

/**
 * Gives the components the properties Vue set on them before they were defined.
 *
 * On an element that is not defined yet Vue cannot set a property, so it writes an attribute
 * under the property's name: `nativeType` ends up as the attribute `nativetype`. The component
 * reads `native-type` and never sees it. Once a component is defined it tells which attributes
 * it reads (observedAttributes), so each misnamed attribute is copied to the right name.
 */
function passOnEarlyAttributes(): void {
  for (const element of document.querySelectorAll('*')) {
    if (!element.localName.startsWith('gov-')) continue

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
  // 1. Configure the design system before the components are registered.
  window.GOV_DS_CONFIG = {
    // Prints accessibility problems to the console. Off in production.
    canValidateWcagOnRender: import.meta.dev,
    // Root-absolute: a relative path would 404 every icon on any sub-route.
    iconsPath: '/assets/icons',
  }

  // 2. Register the web components only AFTER Vue has taken over the page the server sent.
  //    The components have no shadow DOM: once defined, they move their children into their
  //    own markup. If that happens before hydration, Vue finds a tree it does not recognise,
  //    throws the components away and builds them again. See the README.
  nuxtApp.hook('app:suspense:resolve', async () => {
    await defineCustomElements(window)
    passOnEarlyAttributes()
  })
})
