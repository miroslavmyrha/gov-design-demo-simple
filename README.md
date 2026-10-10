# Gov Design System CE + Nuxt 4

Demo integrace [Gov Design System CE](https://designsystem.gov.cz) s Nuxt 4. Není to oficiální projekt státní správy, jen ukázka, jak design systém napojit.

Co v ní je: čtyři stránky česky a anglicky, formulář s validací (Zod) a souhrnem chyb, světlý a tmavý motiv včetně volby podle systému, bezpečnostní hlavičky (`nuxt-security`) a vykreslení komponent už na serveru.

![Screenshot - Úvodní stránka](docs/screenshot-home.png)

![Screenshot - Formuláře](docs/screenshot-form.png)

## Napojení komponent

### 1. Instalace

```bash
pnpm add @gov-design-system-ce/components @gov-design-system-ce/styles @gov-design-system-ce/fonts @gov-design-system-ce/icons @gov-design-system-ce/vue
```

Ikony si komponenty stahují samy z adresy `iconsPath` (viz plugin níže), takže musí být ve složce `public`:

```bash
cp -r node_modules/@gov-design-system-ce/icons/lib public/icons
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

### 3. Pluginy

Client plugin - registrace komponent:
```typescript
// app/plugins/design-system.client.ts
import { ComponentLibrary } from '@gov-design-system-ce/vue/dist/plugin'

export default defineNuxtPlugin(({ vueApp }) => {
  window.GOV_DS_CONFIG = {
    iconsPath: '/icons',
    iconsLazyLoad: true,
  }
  vueApp.use(ComponentLibrary)
})
```

Server plugin - SSR hydratace:
```typescript
// server/plugins/design-system.ts
import { defineNitroPlugin } from 'nitropack/runtime'
import { renderToString } from '@gov-design-system-ce/components/dist/hydrate/index.mjs'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', async (response) => {
    if (!response.body || typeof response.body !== 'string') return

    try {
      const result = await renderToString(response.body)
      response.body = result.html
    } catch (error) {
      // Fallback na client-side rendering
    }
  })
})
```

### 4. Použití komponent

Všechny komponenty se importují z `@gov-design-system-ce/vue` a používají PascalCase:

```vue
<script setup>
import { GovButton, GovFormInput, GovMessage } from '@gov-design-system-ce/vue'

const name = ref('')
</script>

<template>
  <GovFormInput v-model="name" placeholder="Jméno" />
  <GovButton color="primary">Odeslat</GovButton>
  <GovMessage color="success">Úspěch</GovMessage>
</template>
```

Sloty se definují HTML atributem `slot=`, ne Vue direktivou `v-slot`:
```vue
<script setup>
import { GovFormControl, GovFormLabel, GovFormInput } from '@gov-design-system-ce/vue'
</script>

<template>
  <GovFormControl>
    <GovFormLabel slot="top" identifier="name">Jméno</GovFormLabel>
    <GovFormInput v-model="name" identifier="name" />
  </GovFormControl>
</template>
```

Popisek a pole spojuje stejný `identifier`. Bez něj se popisek jen zobrazí vedle pole a čtečka obrazovky pole přečte beze jména. V komponentě, která se na stránce opakuje, ho vygenerujte přes `useId()`.

## Poznámky

- Oficiální design system české státní správy
- Přístupnost řeší komponenty jen zčásti: spojení popisku s polem (`identifier`), souhrn chyb a ohlášení změn čtečce jsou na aplikaci
- Formulářové komponenty podporují `v-model`
- Textarea: `<GovFormInput :multiline="true" :rows="4" />`
- CSP: vyžaduje `style-src 'unsafe-inline'` (Stencil.js generuje inline styly)
- CSP: `script-src` musí povolit inline skript Nuxtu, nejlépe přes nonce (`'nonce-{{nonce}}' 'strict-dynamic'` v `nuxt-security`). Se samotným `'self'` se stránka vykreslí, ale v prohlížeči neoživí, a ve vývojovém režimu se to neprojeví
- Znak `|` v překladech odděluje tvary množného čísla. Jako obyčejný znak (třeba v titulku stránky) se píše `{'|'}`
- Čeština má tři tvary množného čísla; pravidlo je v `i18n/i18n.config.ts`

## Spuštění

Potřebujete Node.js 20 nebo novější a pnpm (`corepack enable`).

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Příkaz | Co dělá |
|---|---|
| `pnpm build`, `pnpm preview` | produkční sestavení a jeho spuštění |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | kontrola typů |
| `pnpm test` | unit testy (Vitest) |

Produkční sestavení si před nasazením vyzkoušejte v prohlížeči: bezpečnostní hlavičky jsou v něm přísnější než při vývoji.

### Nastavení

| Proměnná | K čemu |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | veřejná adresa webu pro kanonické odkazy a náhledy na sociálních sítích; bez ní se použije adresa, na které stránka běží |

## Struktura

```
app/components   komponenty (demo, form, layout, ui)
app/composables  validace formuláře, přístupnost, SEO
app/schemas      schéma formuláře (Zod)
app/stores       motiv a oznámení (Pinia)
i18n/locales     překlady cs a en
server/plugins   vykreslení komponent design systému na serveru
tests            unit testy
```

## Odkazy

- [Gov Design System](https://designsystem.gov.cz)
- [Nuxt](https://nuxt.com)
