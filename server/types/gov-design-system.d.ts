declare module '@gov-design-system-ce/components/dist/hydrate/index.mjs' {
  export function renderToString(
    html: string,
    options?: {
      prettyHtml?: boolean
      removeAttributeQuotes?: boolean
      removeHtmlComments?: boolean
    }
  ): Promise<{ html: string }>
}
