# Gov Design System CE: Nuxt starter

The smallest working setup for [Gov Design System CE](https://designsystem.gov.cz) with Nuxt. One page, four components, rendered on the server and hydrated without a mismatch.

It follows the official [Vue starter](https://code.gov.cz/gov-cz/gov-design-system/-/tree/master/starters/vue) and differs only where server rendering makes it necessary.

## Requirements

- Node.js 22 or newer (`.nvmrc` is provided)

## Getting started

```shell
npm install
npm run dev
```

Then open the URL printed in the terminal. `npm run build` produces a server in `.output/`, `npm run preview` runs that build locally.

## How this is wired up

| What | Where |
|---|---|
| Design system config, set before the components are registered | `app/plugins/gov-design-system.client.ts` |
| Registration of the components, after hydration | `app/plugins/gov-design-system.client.ts` |
| Stylesheets and fonts | `nuxt.config.ts` (`css`) |
| Icons served from the package | `nuxt.config.ts` (`nitro.publicAssets`) |
| Custom-element compiler hint | `nuxt.config.ts` (`vue.compilerOptions`) |
| Space reserved for components not yet rendered | `app/assets/main.css` |
| Components used as Vue components | `app/app.vue` |

### Register the components after hydration

This is the one thing a Nuxt project must do differently, and the reason this starter exists.

The components are web components without shadow DOM. As soon as one is defined, it moves its children into its own markup. With server rendering the order of events is:

1. the server sends finished HTML,
2. the browser shows it,
3. Vue hydrates the page: it walks the DOM and compares it with what it would have rendered.

If the components are defined before step 3, Vue finds a tree it does not recognise, reports hydration mismatches, discards the components and renders them again. The page still looks right, so the problem is easy to miss.

The plugin therefore waits for the hook `app:suspense:resolve` and only then calls `defineCustomElements(window)`.

Measured on this starter in a production build with `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` switched on:

| Components registered | Hydration messages in the console |
|---|---|
| at once, as in a client-only Vue application | 8 |
| after hydration, as here | 0 |

In both cases the button, the icon, the label and the theme switch work, and the layout shift (CLS) stays at 0.008.

### Three consequences of registering late

**Attributes written under the wrong name.** Vue cannot set a property on an element that is not defined yet, so it writes an attribute under the property's name: `nativeType` becomes the attribute `nativetype`, while the component reads `native-type`. After registration the plugin copies such attributes to the names the components read (`passOnEarlyAttributes`).

**Layout shift.** Until a component is registered it has no height of its own. `app/assets/main.css` reserves the space with `:not(.hydrated)`, the class Stencil adds once a component has rendered. `:not(:defined)` is not enough, because an element is defined before it renders.

**`v-if` directly inside a component.** Vue remembers where its placeholder node is, and the component has moved it. When the condition changes, Vue fails on `removeChild`. Use `v-show` directly inside `gov-*` components.

### Icons keep their directory structure

`GovIcon` fetches `${iconsPath}/${type}/${name}.svg`, where `type` defaults to `components`. The starter serves the package's `lib` folder as `/assets/icons`, so the structure is kept and nothing is copied at build time.

### Labels

`GovFormInput` has no `label` prop. Labels come from `GovFormControl` + `GovFormLabel`, tied together by `identifier`, see `app/app.vue`.

## A fuller example

[gov-design-demo-simple](https://github.com/miroslavmyrha/gov-design-demo-simple) uses the same approach on a larger application with forms, themes, translations and tests.
