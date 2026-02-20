export default {
  nav: {
    home: 'Úvod',
    components: 'Komponenty',
    forms: 'Formuláře',
    about: 'O projektu',
    skipToContent: 'Přeskočit na hlavní obsah',
    openMenu: 'Otevřít menu',
    mainNavigation: 'Hlavní navigace',
    mobileNavigation: 'Mobilní navigace',
    footerNavigation: 'Odkazy v patičce',
  },

  theme: {
    switchToDark: 'Přepnout na tmavý režim',
    switchToLight: 'Přepnout na světlý režim',
    light: 'Světlý mód',
    dark: 'Tmavý mód',
  },

  language: {
    label: 'Jazyk',
    select: 'Vyberte jazyk',
  },

  common: {
    loading: 'Načítání...',
    error: 'Nastala chyba',
    tryAgain: 'Zkusit znovu',
    submit: 'Odeslat',
    reset: 'Vymazat',
    required: 'povinné',
  },

  footer: {
    copyright: '© {year} Gov Design System Demo',
    description: 'Demo šablona pro Gov Design System CE s Nuxt 4, Vue 3 a TypeScript',
  },

  home: {
    title: 'Gov Design System Demo',
    subtitle: 'Ukázková šablona pro integraci Gov Design System CE s Nuxt 4, Vue 3 a TypeScript',
    viewComponents: 'Prohlédnout komponenty',
    aboutProject: 'O projektu',
    quickLinks: 'Rychlé odkazy',
    componentPreview: 'Ukázka komponent',
    componentPreviewDescription: 'Rychlý přehled některých komponent. Pro kompletní ukázku navštivte stránku Komponenty.',
    viewAllComponents: 'Zobrazit všechny komponenty →',
    loadingComponents: 'Načítání komponent...',
    errorLoadingComponents: 'Nastala chyba při načítání komponent',
    features: {
      components: {
        title: 'Komponenty',
        description: 'Tlačítka, karty, accordion, taby, zprávy a další',
      },
      forms: {
        title: 'Formuláře',
        description: 'Formulářové komponenty s Zod validací',
      },
      about: {
        title: 'O projektu',
        description: 'Technologický stack a struktura projektu',
      },
    },
  },

  components: {
    title: 'Přehled komponent',
    subtitle: 'Interaktivní ukázky komponent z Gov Design System CE',
    loading: 'Načítání komponent...',
    errorLoading: 'Nastala chyba při načítání komponent',
  },

  forms: {
    title: 'Formuláře',
    subtitle: 'Formulářové komponenty s Zod validací a okamžitou zpětnou vazbou',
    loading: 'Načítání formuláře...',
    errorLoading: 'Nastala chyba při načítání formuláře',
    validationRulesTitle: 'Validační pravidla',
    validationRulesDescription: 'Tento formulář využívá Zod schéma s následujícími pravidly:',
    validationRules: {
      name: {
        label: 'Jméno',
        rule1: 'Povinné pole',
        rule2: 'Minimálně 2 znaky',
        rule3: 'Maximálně 50 znaků',
      },
      email: {
        label: 'Email',
        rule1: 'Povinné pole',
        rule2: 'Musí být platná e-mailová adresa',
      },
      note: {
        label: 'Poznámka',
        rule1: 'Volitelné pole',
        rule2: 'Maximálně 500 znaků',
      },
      gender: {
        label: 'Pohlaví',
        rule1: 'Povinný výběr',
      },
      agreeTerms: {
        label: 'Souhlas s podmínkami',
        rule1: 'Musí být zaškrtnuto',
      },
    },
  },

  about: {
    title: 'O projektu',
    subtitle: 'Demo šablona pro integraci Gov Design System CE s Nuxt 4, Vue 3 a TypeScript',
    techStackTitle: 'Technologický stack',
    keyFeaturesTitle: 'Klíčové vlastnosti',
    projectStructureTitle: 'Struktura projektu',
    linksTitle: 'Odkazy',
    techStack: {
      nuxt: { description: 'Full-stack Vue framework' },
      vue: { description: 'Progresivní JavaScript framework' },
      typescript: { description: 'Typově bezpečný JavaScript' },
      govds: { description: 'Český vládní design systém' },
      zod: { description: 'TypeScript-first schema validace' },
      pinia: { description: 'State management pro Vue' },
    },
    features: {
      accessibility: {
        title: 'Přístupnost',
        description: 'WCAG 2.1 Level AA, keyboard navigace',
      },
      typescript: {
        title: 'TypeScript',
        description: 'Plná typová bezpečnost, inferované typy ze Zod schémat',
      },
      localization: {
        title: 'Lokalizace',
        description: 'České chybové hlášky, české UI texty, cs-CZ locale',
      },
      performance: {
        title: 'Výkon',
        description: 'SSR, lazy loading, optimalizované bundle, Vite build',
      },
    },
    projectStructure: {
      app: {
        title: 'app/',
        description: 'Hlavní aplikační složka obsahující:',
        items: {
          pages: 'Stránky aplikace (file-based routing)',
          components: 'Vue komponenty (demo, form, layout, ui)',
          composables: 'Znovupoužitelné composition functions',
          data: 'Statická konfigurační data',
          layouts: 'Layout komponenty',
          plugins: 'Vue pluginy (Gov DS, theme)',
          schemas: 'Zod validační schémata',
          stores: 'Pinia stores',
          styles: 'CSS soubory (layout, header, footer)',
          types: 'TypeScript definice',
          utils: 'Utility funkce',
        },
      },
      public: {
        title: 'public/',
        description: 'Statické soubory:',
        items: {
          icons: 'Gov DS ikony (components, complex, colored)',
          favicon: 'Ikona webu',
        },
      },
    },
  },

  form: {
    title: 'Formulář s Zod validací',
    errorsTitle: 'Formulář obsahuje chyby:',
    successMessage: 'Formulář byl úspěšně odeslán!',
    errorCount: 'Formulář obsahuje {count} chybu. Zkontrolujte prosím vyplněná pole. | Formulář obsahuje {count} chyby. Zkontrolujte prosím vyplněná pole. | Formulář obsahuje {count} chyb. Zkontrolujte prosím vyplněná pole.',
    fields: {
      name: {
        label: 'Jméno',
        placeholder: 'Zadejte jméno',
      },
      email: {
        label: 'Email',
        placeholder: "vas{'@'}email.cz",
      },
      note: {
        label: 'Poznámka',
        placeholder: 'Napište poznámku...',
      },
      option: {
        label: 'Vyberte možnost',
        placeholder: '-- Vyberte --',
        options: {
          option1: 'Možnost 1',
          option2: 'Možnost 2',
          option3: 'Možnost 3',
        },
      },
      gender: {
        label: 'Pohlaví',
        male: 'Muž',
        female: 'Žena',
      },
      agreeTerms: {
        label: 'Souhlasím s podmínkami',
      },
    },
    validation: {
      nameRequired: 'Jméno je povinné',
      nameMinLength: 'Jméno musí mít alespoň 2 znaky',
      nameMaxLength: 'Jméno může mít maximálně 50 znaků',
      emailRequired: 'Email je povinný',
      emailInvalid: 'Zadejte platnou e-mailovou adresu',
      noteMaxLength: 'Poznámka může mít maximálně 500 znaků',
      genderRequired: 'Vyberte pohlaví',
      termsRequired: 'Musíte souhlasit s podmínkami',
    },
  },

  error: {
    backToHome: 'Zpět na úvodní stránku',
    debug: 'Debug',
    codes: {
      400: {
        title: 'Neplatný požadavek',
        message: 'Požadavek nelze zpracovat. Zkontrolujte prosím zadané údaje.',
      },
      401: {
        title: 'Nepřihlášen',
        message: 'Pro přístup k této stránce se musíte přihlásit.',
      },
      403: {
        title: 'Přístup odepřen',
        message: 'Nemáte oprávnění k zobrazení této stránky.',
      },
      404: {
        title: 'Stránka nenalezena',
        message: 'Požadovaná stránka neexistuje nebo byla přesunuta.',
      },
      500: {
        title: 'Chyba serveru',
        message: 'Došlo k neočekávané chybě. Zkuste to prosím později.',
      },
    },
  },

  demo: {
    buttons: {
      title: 'Tlačítka',
      primary: 'Primary',
      secondary: 'Secondary',
      disabled: 'Disabled',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
    },
    messages: {
      title: 'Zprávy / Alerty',
      info: 'Toto je informační zpráva.',
      success: 'Operace byla úspěšná!',
      warning: 'Pozor, toto je varování.',
      error: 'Nastala chyba při zpracování.',
    },
    accordion: {
      title: 'Accordion',
      section1: {
        label: 'První sekce',
        content: 'Obsah první sekce accordion komponenty.',
      },
      section2: {
        label: 'Druhá sekce',
        content: 'Obsah druhé sekce accordion komponenty.',
      },
      section3: {
        label: 'Třetí sekce',
        content: 'Obsah třetí sekce accordion komponenty.',
      },
    },
    tabs: {
      title: 'Záložky',
      tab1: {
        label: 'První záložka',
        content: 'Obsah první záložky.',
      },
      tab2: {
        label: 'Druhá záložka',
        content: 'Obsah druhé záložky.',
      },
      tab3: {
        label: 'Třetí záložka',
        content: 'Obsah třetí záložky.',
      },
    },
    chips: {
      title: 'Chipy a Tagy',
      primary: 'Chip Primary',
      secondary: 'Chip Secondary',
    },
    card: {
      title: 'Karty',
      actionButton: 'Akce',
      basic: {
        title: 'Základní karta',
        content: 'Jednoduchá karta s nadpisem a obsahem.',
      },
      info: {
        title: 'Informační karta',
        content: 'Karta pro zobrazení důležitých informací.',
      },
      withAction: {
        title: 'Karta s akcí',
        content: 'Karta s tlačítkem pro interakci.',
      },
    },
    breadcrumbs: {
      title: 'Breadcrumbs',
      accessibleLabel: 'Drobečková navigace',
      home: 'Úvod',
      category: 'Kategorie',
      currentPage: 'Aktuální stránka',
    },
    pagination: {
      title: 'Stránkování',
    },
  },

  seo: {
    home: {
      title: 'Gov Design System - Demo komponent',
      description: 'Interaktivní ukázka Gov Design System CE komponent s Nuxt 4, Vue 3 reaktivitou a Zod validací formulářů.',
    },
    components: {
      title: 'Komponenty | Gov Design System Demo',
      description: 'Přehled všech dostupných komponent z Gov Design System CE - tlačítka, karty, zprávy, chipy a další.',
    },
    forms: {
      title: 'Formuláře | Gov Design System Demo',
      description: 'Ukázka formulářových komponent s Zod validací a českými chybovými hláškami.',
    },
    about: {
      title: 'O projektu | Gov Design System Demo',
      description: 'Informace o demo projektu Gov Design System CE s Nuxt 4, Vue 3 a TypeScript.',
    },
  },
}
