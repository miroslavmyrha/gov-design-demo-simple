/**
 * TypeScript deklarace pro Gov Design System CE komponenty
 * Poskytuje typovou bezpečnost pro web components
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Core components
      'gov-button': GovButtonAttributes
      'gov-icon': GovIconAttributes
      'gov-spacer': GovSpacerAttributes
      'gov-loading': GovLoadingAttributes

      // Form components
      'gov-form-control': GovFormControlAttributes
      'gov-form-label': GovFormLabelAttributes
      'gov-form-input': GovFormInputAttributes
      'gov-form-select': GovFormSelectAttributes
      'gov-form-checkbox': GovFormCheckboxAttributes
      'gov-form-radio': GovFormRadioAttributes
      'gov-form-radio-group': GovFormRadioGroupAttributes
      'gov-form-message': GovFormMessageAttributes
      'gov-form-file': GovFormFileAttributes
      'gov-form-autocomplete': GovFormAutocompleteAttributes
      'gov-form-search': GovFormSearchAttributes
      'gov-form-multi-select': GovFormMultiSelectAttributes

      // Navigation components
      'gov-nav': GovNavAttributes
      'gov-nav-item': GovNavItemAttributes
      'gov-breadcrumbs': GovBreadcrumbsAttributes
      'gov-breadcrumbs-item': GovBreadcrumbsItemAttributes
      'gov-pagination': GovPaginationAttributes
      'gov-tabs': GovTabsAttributes
      'gov-tabs-item': GovTabsItemAttributes
      'gov-stepper': GovStepperAttributes
      'gov-stepper-item': GovStepperItemAttributes
      'gov-side-nav': GovSideNavAttributes
      'gov-side-nav-item': GovSideNavItemAttributes

      // Layout components
      'gov-container': GovContainerAttributes
      'gov-grid': GovGridAttributes
      'gov-grid-item': GovGridItemAttributes
      'gov-card': GovCardAttributes
      'gov-accordion': GovAccordionAttributes
      'gov-accordion-item': GovAccordionItemAttributes
      'gov-modal': GovModalAttributes
      'gov-toast': GovToastAttributes

      // Feedback components
      'gov-message': GovMessageAttributes
      'gov-chip': GovChipAttributes
      'gov-tag': GovTagAttributes
      'gov-tooltip': GovTooltipAttributes
      'gov-badge': GovBadgeAttributes
      'gov-progress': GovProgressAttributes

      // Table components
      'gov-table': GovTableAttributes
      'gov-table-head': GovTableHeadAttributes
      'gov-table-body': GovTableBodyAttributes
      'gov-table-row': GovTableRowAttributes
      'gov-table-cell': GovTableCellAttributes

      // Other components
      'gov-infobar': GovInfobarAttributes
      'gov-attachments': GovAttachmentsAttributes
      'gov-attachments-item': GovAttachmentsItemAttributes
      'gov-statsbar': GovStatsbarAttributes
      'gov-statsbar-item': GovStatsbarItemAttributes
      'gov-empty-state': GovEmptyStateAttributes
      'gov-error-code': GovErrorCodeAttributes
      'gov-dropdown': GovDropdownAttributes
      'gov-dropdown-item': GovDropdownItemAttributes
      'gov-prompt': GovPromptAttributes
      'gov-wizard': GovWizardAttributes
      'gov-wizard-item': GovWizardItemAttributes
      'gov-hero': GovHeroAttributes
      'gov-timeline': GovTimelineAttributes
      'gov-timeline-item': GovTimelineItemAttributes
    }
  }
}

// Common types
type GovSize = 'xs' | 's' | 'm' | 'l' | 'xl'
type GovColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error'
type GovButtonType = 'solid' | 'outlined' | 'link'
type GovVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'

// Base attributes for all components
interface GovBaseAttributes {
  class?: string
  id?: string
  style?: string
  'wcag-label'?: string
  'wcag-described-by'?: string
  'wcag-labelled-by'?: string
}

// Button
interface GovButtonAttributes extends GovBaseAttributes {
  color?: GovColor
  size?: GovSize
  type?: GovButtonType
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
  expanded?: boolean
  'native-type'?: 'button' | 'submit' | 'reset'
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  'icon-left'?: string
  'icon-right'?: string
  'on-gov-click'?: string
}

// Icon
interface GovIconAttributes extends GovBaseAttributes {
  name?: string
  type?: 'basic' | 'complex' | 'colored'
}

// Spacer
interface GovSpacerAttributes extends GovBaseAttributes {
  size?: GovSize
}

// Loading
interface GovLoadingAttributes extends GovBaseAttributes {
  inverse?: boolean
  label?: string
}

// Form components
interface GovFormControlAttributes extends GovBaseAttributes {
  invalid?: boolean
  success?: boolean
  disabled?: boolean
}

interface GovFormLabelAttributes extends GovBaseAttributes {
  slot?: 'top' | 'label'
  required?: boolean
}

interface GovFormInputAttributes extends GovBaseAttributes {
  value?: string
  placeholder?: string
  'input-type'?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
  success?: boolean
  multiline?: boolean
  rows?: number
  maxlength?: number
  minlength?: number
  autocomplete?: string
  'on-gov-input'?: string
  'on-gov-blur'?: string
  'on-gov-focus'?: string
}

interface GovFormSelectAttributes extends GovBaseAttributes {
  value?: string
  disabled?: boolean
  invalid?: boolean
  success?: boolean
  'on-gov-change'?: string
}

interface GovFormCheckboxAttributes extends GovBaseAttributes {
  value?: string
  checked?: boolean
  disabled?: boolean
  invalid?: boolean
  'no-label'?: boolean
  'on-gov-change'?: string
}

interface GovFormRadioAttributes extends GovBaseAttributes {
  value?: string
  checked?: boolean
  disabled?: boolean
}

interface GovFormRadioGroupAttributes extends GovBaseAttributes {
  value?: string
  gap?: GovSize
  orientation?: 'horizontal' | 'vertical'
  'on-gov-change'?: string
}

interface GovFormMessageAttributes extends GovBaseAttributes {
  slot?: 'bottom'
  color?: GovColor
}

interface GovFormFileAttributes extends GovBaseAttributes {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  'max-file-size'?: number
  'on-gov-add-file'?: string
  'on-gov-remove-file'?: string
}

interface GovFormAutocompleteAttributes extends GovBaseAttributes {
  placeholder?: string
  disabled?: boolean
  'min-length'?: number
  'on-gov-input'?: string
  'on-gov-select'?: string
}

interface GovFormSearchAttributes extends GovBaseAttributes {
  placeholder?: string
  value?: string
  'on-gov-input'?: string
  'on-gov-submit'?: string
}

interface GovFormMultiSelectAttributes extends GovBaseAttributes {
  placeholder?: string
  disabled?: boolean
  'on-gov-change'?: string
}

// Navigation components
interface GovNavAttributes extends GovBaseAttributes {
  type?: 'main' | 'side'
}

interface GovNavItemAttributes extends GovBaseAttributes {
  href?: string
  active?: boolean
}

interface GovBreadcrumbsAttributes extends GovBaseAttributes {
  collapsible?: boolean
}

interface GovBreadcrumbsItemAttributes extends GovBaseAttributes {
  href?: string
}

interface GovPaginationAttributes extends GovBaseAttributes {
  current?: number
  total?: number
  'page-size'?: number
  'max-pages'?: number
  'wcag-label'?: string
  'wcag-page-label'?: string
  'on-gov-page'?: string
}

interface GovTabsAttributes extends GovBaseAttributes {
  type?: 'text' | 'chip'
}

interface GovTabsItemAttributes extends GovBaseAttributes {
  label?: string
  identifier?: string
  default?: boolean
  disabled?: boolean
}

interface GovStepperAttributes extends GovBaseAttributes {
  size?: GovSize
}

interface GovStepperItemAttributes extends GovBaseAttributes {
  label?: string
  'annotation-label'?: string
}

interface GovSideNavAttributes extends GovBaseAttributes {
  compact?: boolean
}

interface GovSideNavItemAttributes extends GovBaseAttributes {
  href?: string
  expanded?: boolean
  'is-expanded'?: boolean
}

// Layout components
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GovContainerAttributes extends GovBaseAttributes {}

interface GovGridAttributes extends GovBaseAttributes {
  columns?: number
  gap?: GovSize
}

interface GovGridItemAttributes extends GovBaseAttributes {
  'size-sm'?: number
  'size-md'?: number
  'size-lg'?: number
  'size-xl'?: number
}

interface GovCardAttributes extends GovBaseAttributes {
  label?: string
  'is-full'?: boolean
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  promotion?: boolean
}

interface GovAccordionAttributes extends GovBaseAttributes {
  size?: GovSize
  'wcag-labelled-by'?: string
}

interface GovAccordionItemAttributes extends GovBaseAttributes {
  label?: string
  identifier?: string
  'is-expanded'?: boolean
  disabled?: boolean
}

interface GovModalAttributes extends GovBaseAttributes {
  label?: string
  open?: boolean
  role?: 'dialog' | 'alertdialog'
  'wcag-close-label'?: string
  'on-gov-close'?: string
}

interface GovToastAttributes extends GovBaseAttributes {
  type?: GovColor
  time?: number
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  gravity?: 'top' | 'bottom'
  'wcag-close-label'?: string
}

// Feedback components
interface GovMessageAttributes extends GovBaseAttributes {
  color?: GovColor
  variant?: GovVariant
}

interface GovChipAttributes extends GovBaseAttributes {
  color?: GovColor
  variant?: GovVariant
  size?: GovSize
  tag?: boolean
  'focusable'?: boolean
  'icon-left'?: string
  'icon-right'?: string
  inverse?: boolean
}

interface GovTagAttributes extends GovBaseAttributes {
  color?: GovColor
  variant?: GovVariant
  size?: GovSize
  inverse?: boolean
}

interface GovTooltipAttributes extends GovBaseAttributes {
  message?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  size?: GovSize
}

interface GovBadgeAttributes extends GovBaseAttributes {
  color?: GovColor
  variant?: 'primary' | 'secondary'
  size?: GovSize
  inverse?: boolean
}

interface GovProgressAttributes extends GovBaseAttributes {
  value?: number
  max?: number
  'wcag-value'?: string
}

// Table components
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GovTableAttributes extends GovBaseAttributes {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GovTableHeadAttributes extends GovBaseAttributes {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GovTableBodyAttributes extends GovBaseAttributes {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GovTableRowAttributes extends GovBaseAttributes {}

interface GovTableCellAttributes extends GovBaseAttributes {
  header?: boolean
}

// Other components
interface GovInfobarAttributes extends GovBaseAttributes {
  headline?: string
  variant?: GovVariant
}

interface GovAttachmentsAttributes extends GovBaseAttributes {
  label?: string
}

interface GovAttachmentsItemAttributes extends GovBaseAttributes {
  label?: string
  href?: string
  'file-size'?: string
  'file-extension'?: string
}

interface GovStatsbarAttributes extends GovBaseAttributes {
  'icon-position'?: 'left' | 'top'
}

interface GovStatsbarItemAttributes extends GovBaseAttributes {
  icon?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GovEmptyStateAttributes extends GovBaseAttributes {}

interface GovErrorCodeAttributes extends GovBaseAttributes {
  code?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GovDropdownAttributes extends GovBaseAttributes {}

interface GovDropdownItemAttributes extends GovBaseAttributes {
  href?: string
}

interface GovPromptAttributes extends GovBaseAttributes {
  label?: string
  'label-tag'?: string
}

interface GovWizardAttributes extends GovBaseAttributes {
  'wcag-label'?: string
  'wcag-next-label'?: string
  'wcag-prev-label'?: string
}

interface GovWizardItemAttributes extends GovBaseAttributes {
  label?: string
  'annotation-label'?: string
}

interface GovHeroAttributes extends GovBaseAttributes {
  inverse?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GovTimelineAttributes extends GovBaseAttributes {}

interface GovTimelineItemAttributes extends GovBaseAttributes {
  label?: string
  date?: string
  collapsible?: boolean
}

export {}
