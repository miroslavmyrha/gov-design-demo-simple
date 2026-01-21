export default {
  nav: {
    home: 'Home',
    components: 'Components',
    forms: 'Forms',
    about: 'About',
    skipToContent: 'Skip to main content',
    openMenu: 'Open menu',
    mainNavigation: 'Main navigation',
    mobileNavigation: 'Mobile navigation',
    footerNavigation: 'Footer links',
  },

  theme: {
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode',
    light: 'Light mode',
    dark: 'Dark mode',
  },

  language: {
    label: 'Language',
    select: 'Select language',
  },

  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    tryAgain: 'Try again',
    backToHome: 'Back to home page',
    submit: 'Submit',
    reset: 'Reset',
    required: 'required',
  },

  footer: {
    copyright: '© {year} Gov Design System Demo',
    description: 'Demo template for Gov Design System CE with Nuxt 4, Vue 3 and TypeScript',
  },

  home: {
    title: 'Gov Design System Demo',
    subtitle: 'Demo template for Gov Design System CE integration with Nuxt 4, Vue 3 and TypeScript',
    viewComponents: 'View components',
    aboutProject: 'About',
    quickLinks: 'Quick links',
    componentPreview: 'Component preview',
    componentPreviewDescription: 'Quick overview of some components. For a complete demo, visit the Components page.',
    viewAllComponents: 'View all components →',
    loadingComponents: 'Loading components...',
    errorLoadingComponents: 'An error occurred while loading components',
    features: {
      components: {
        title: 'Components',
        description: 'Buttons, cards, accordion, tabs, messages and more',
      },
      forms: {
        title: 'Forms',
        description: 'Form components with Zod validation',
      },
      about: {
        title: 'About',
        description: 'Technology stack and project structure',
      },
    },
  },

  components: {
    title: 'Component overview',
    subtitle: 'Interactive examples of Gov Design System CE components',
    loading: 'Loading components...',
    errorLoading: 'An error occurred while loading components',
  },

  forms: {
    title: 'Forms',
    subtitle: 'Form components with Zod validation and instant feedback',
    loading: 'Loading form...',
    errorLoading: 'An error occurred while loading the form',
    validationRulesTitle: 'Validation rules',
    validationRulesDescription: 'This form uses a Zod schema with the following rules:',
    validationRules: {
      name: {
        label: 'Name',
        rule1: 'Required field',
        rule2: 'Minimum 2 characters',
        rule3: 'Maximum 50 characters',
      },
      email: {
        label: 'Email',
        rule1: 'Required field',
        rule2: 'Must be a valid email address',
      },
      note: {
        label: 'Note',
        rule1: 'Optional field',
        rule2: 'Maximum 500 characters',
      },
      gender: {
        label: 'Gender',
        rule1: 'Required selection',
      },
      terms: {
        label: 'Terms agreement',
        rule1: 'Must be checked',
      },
    },
  },

  about: {
    title: 'About',
    subtitle: 'Demo template for Gov Design System CE integration with Nuxt 4, Vue 3 and TypeScript',
    techStackTitle: 'Technology stack',
    keyFeaturesTitle: 'Key features',
    projectStructureTitle: 'Project structure',
    linksTitle: 'Links',
    techStack: {
      nuxt: { description: 'Full-stack Vue framework' },
      vue: { description: 'Progressive JavaScript framework' },
      typescript: { description: 'Type-safe JavaScript' },
      govds: { description: 'Czech government design system' },
      zod: { description: 'TypeScript-first schema validation' },
      pinia: { description: 'State management for Vue' },
    },
    features: {
      accessibility: {
        title: 'Accessibility',
        description: 'WCAG 2.1 Level AA, keyboard navigation',
      },
      typescript: {
        title: 'TypeScript',
        description: 'Full type safety, inferred types from Zod schemas',
      },
      localization: {
        title: 'Localization',
        description: 'Czech error messages, Czech UI texts, cs-CZ locale',
      },
      performance: {
        title: 'Performance',
        description: 'SSR, lazy loading, optimized bundle, Vite build',
      },
    },
    projectStructure: {
      app: {
        title: 'app/',
        description: 'Main application folder containing:',
        items: {
          pages: 'Application pages (file-based routing)',
          components: 'Vue components (demo, form, layout, ui)',
          composables: 'Reusable composition functions',
          data: 'Static configuration data',
          layouts: 'Layout components',
          plugins: 'Vue plugins (Gov DS, theme)',
          schemas: 'Zod validation schemas',
          stores: 'Pinia stores',
          styles: 'CSS files (layout, header, footer)',
          types: 'TypeScript definitions',
          utils: 'Utility functions',
        },
      },
      public: {
        title: 'public/',
        description: 'Static files:',
        items: {
          icons: 'Gov DS icons (components, complex, colored)',
          favicon: 'Website icon',
        },
      },
    },
  },

  form: {
    title: 'Form with Zod validation',
    errorsTitle: 'The form contains errors:',
    successMessage: 'Form submitted successfully!',
    errorCount: 'The form contains {count} error. Please check the filled fields. | The form contains {count} errors. Please check the filled fields.',
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Enter your name',
      },
      email: {
        label: 'Email',
        placeholder: "your{'@'}email.com",
      },
      note: {
        label: 'Note',
        placeholder: 'Write a note...',
      },
      option: {
        label: 'Select an option',
        placeholder: '-- Select --',
        options: {
          option1: 'Option 1',
          option2: 'Option 2',
          option3: 'Option 3',
        },
      },
      gender: {
        label: 'Gender',
        male: 'Male',
        female: 'Female',
      },
      agreeTerms: {
        label: 'I agree to the terms',
      },
    },
    validation: {
      nameRequired: 'Name is required',
      nameMinLength: 'Name must be at least 2 characters',
      nameMaxLength: 'Name can be at most 50 characters',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      noteMaxLength: 'Note can be at most 500 characters',
      genderRequired: 'Please select a gender',
      termsRequired: 'You must agree to the terms',
    },
  },

  error: {
    backToHome: 'Back to home page',
    debug: 'Debug',
    codes: {
      400: {
        title: 'Bad request',
        message: 'The request could not be processed. Please check your input.',
      },
      401: {
        title: 'Unauthorized',
        message: 'You must be logged in to access this page.',
      },
      403: {
        title: 'Access denied',
        message: 'You do not have permission to view this page.',
      },
      404: {
        title: 'Page not found',
        message: 'The requested page does not exist or has been moved.',
      },
      500: {
        title: 'Server error',
        message: 'An unexpected error occurred. Please try again later.',
      },
    },
  },

  demo: {
    buttons: {
      title: 'Buttons',
      primary: 'Primary',
      secondary: 'Secondary',
      disabled: 'Disabled',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
    },
    messages: {
      title: 'Messages / Alerts',
      info: 'This is an informational message.',
      success: 'Operation was successful!',
      warning: 'Warning, please pay attention.',
      error: 'An error occurred during processing.',
    },
    accordion: {
      title: 'Accordion',
      section1: {
        label: 'First section',
        content: 'Content of the first accordion section.',
      },
      section2: {
        label: 'Second section',
        content: 'Content of the second accordion section.',
      },
      section3: {
        label: 'Third section',
        content: 'Content of the third accordion section.',
      },
    },
    tabs: {
      title: 'Tabs',
      tab1: {
        label: 'First tab',
        content: 'Content of the first tab.',
      },
      tab2: {
        label: 'Second tab',
        content: 'Content of the second tab.',
      },
      tab3: {
        label: 'Third tab',
        content: 'Content of the third tab.',
      },
    },
    chips: {
      title: 'Chips and Tags',
      primary: 'Chip Primary',
      secondary: 'Chip Secondary',
    },
    card: {
      title: 'Cards',
      actionButton: 'Action',
      basic: {
        title: 'Basic card',
        content: 'Simple card with title and content.',
      },
      info: {
        title: 'Info card',
        content: 'Card for displaying important information.',
      },
      withAction: {
        title: 'Action card',
        content: 'Card with a button for interaction.',
      },
    },
    breadcrumbs: {
      title: 'Breadcrumbs',
      accessibleLabel: 'Breadcrumb navigation',
      home: 'Home',
      category: 'Category',
      currentPage: 'Current page',
    },
    pagination: {
      title: 'Pagination',
    },
  },

  seo: {
    home: {
      title: 'Gov Design System - Component Demo',
      description: 'Interactive demonstration of Gov Design System CE components with Nuxt 4, Vue 3 reactivity and Zod form validation.',
    },
    components: {
      title: 'Components | Gov Design System Demo',
      description: 'Overview of all available components from Gov Design System CE - buttons, cards, messages, chips and more.',
    },
    forms: {
      title: 'Forms | Gov Design System Demo',
      description: 'Demonstration of form components with Zod validation and Czech error messages.',
    },
    about: {
      title: 'About | Gov Design System Demo',
      description: 'Information about the Gov Design System CE demo project with Nuxt 4, Vue 3 and TypeScript.',
    },
  },
}
