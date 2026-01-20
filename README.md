# Gov Design System CE + Nuxt 4

Demo integrace Gov Design System CE s Nuxt 4.

## Napojení komponent

### 1. Instalace

```bash
pnpm add @gov-design-system-ce/components @gov-design-system-ce/styles @gov-design-system-ce/fonts @gov-design-system-ce/icons @gov-design-system-ce/vue
```

### 2. Nuxt konfigurace

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '@gov-design-system-ce/fonts/lib/roboto.css',
    '@gov-design-system-ce/styles/tokens.css',
    '@gov-design-system-ce/styles/styles.css',
    '@gov-design-system-ce/styles/content.css',
    '@gov-design-system-ce/styles/components.css',
  ],
  build: {
    transpile: ['@gov-design-system-ce/vue'],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('gov-'),
    },
  },
})
```

### 3. Client plugin

```typescript
// app/plugins/design-system.client.ts
import { defineGovDesignSystem } from '@gov-design-system-ce/components/dist/custom-elements'

export default defineNuxtPlugin(() => {
  window.GOV_DS_CONFIG = {
    iconsPath: '/icons',
    iconsLazyLoad: true,
  }
  defineGovDesignSystem()
})
```

### 4. SSR hydratace (volitelné)

```typescript
// server/plugins/design-system.ts
import { renderToString } from '@gov-design-system-ce/components/dist/hydrate'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', async (response) => {
    if (response.body && typeof response.body === 'string') {
      const result = await renderToString(response.body)
      response.body = result.html
    }
  })
})
```

### 5. Použití komponent

Formulářové komponenty s v-model:
```vue
<script setup>
import { GovFormInput, GovFormCheckbox } from '@gov-design-system-ce/vue'
const name = ref('')
</script>

<template>
  <GovFormInput v-model="name" placeholder="Jméno" />
</template>
```

Statické komponenty:
```vue
<template>
  <ClientOnly>
    <gov-button color="primary">Tlačítko</gov-button>
    <gov-message color="success">Úspěch</gov-message>
  </ClientOnly>
</template>
```

## Výhody

- Oficiální design system české státní správy
- Konzistentní vzhled napříč státními weby
- Přístupnost (WCAG 2.1 AA) řešena v komponentách
- Vue wrappery pro formuláře s v-model
- SSR hydratace pro lepší initial load
- Aktivně vyvíjeno a udržováno

## Poznámky

- Web Components fungují pouze na klientu (nutné `<ClientOnly>`)
- SSR hydratace může selhat, fallback na client-side
- Vyžaduje `unsafe-inline` v CSP (Stencil.js injektuje styly do Shadow DOM)
- Customizace stylů omezena kvůli Shadow DOM
- Slot syntax je HTML native (`slot="label"`), ne Vue (`v-slot`)
- Textarea se řeší přes `<GovFormInput :multiline="true">`

## Spuštění

```bash
pnpm install
pnpm dev
```

## Odkazy

- [Gov Design System](https://designsystem.gov.cz)
- [Nuxt](https://nuxt.com)
