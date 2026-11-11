export interface ComponentProp {
  name: string
  type: string
  required: boolean
  default?: string | number | boolean
  description: string
  deprecated?: boolean
}

export const COMPONENT_PROPS: Record<string, ComponentProp[]> = {
  button: [
    {
      name: 'variant',
      type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
      required: false,
      default: 'default',
      description: 'The visual style variant of the button'
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg' | 'icon'",
      required: false,
      default: 'default',
      description: 'The size of the button'
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Whether the button is in a loading state with spinner'
    },
    {
      name: 'leftIcon',
      type: 'React.ReactNode',
      required: false,
      description: 'Icon to display on the left side of the button text'
    },
    {
      name: 'rightIcon',
      type: 'React.ReactNode',
      required: false,
      description: 'Icon to display on the right side of the button text'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Whether the button should take the full width of its container'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Prevents user interactions and applies disabled styling'
    },
    {
      name: 'asChild',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Renders the button as its child element using the Slot primitive'
    }
  ],

  card: [
    {
      name: 'variant',
      type: "'default' | 'elevated' | 'outlined' | 'ghost'",
      required: false,
      default: 'default',
      description: 'Visual elevation and border styling of the card container'
    },
    {
      name: 'hoverable',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Applies smooth elevation and upward translation when hovered'
    },
    {
      name: 'clickable',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Enables active click scaling and pointer cursor'
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Custom Tailwind CSS utility classes'
    }
  ],

  input: [
    {
      name: 'type',
      type: 'string',
      required: false,
      default: 'text',
      description: 'HTML input type attribute (e.g. text, password, email, number)'
    },
    {
      name: 'error',
      type: 'boolean | string',
      required: false,
      default: false,
      description: 'Renders the input with red validation error styling'
    },
    {
      name: 'success',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Renders the input with emerald success state styling'
    },
    {
      name: 'leftIcon',
      type: 'React.ReactNode',
      required: false,
      description: 'Icon displayed inside the left edge of the input'
    },
    {
      name: 'rightIcon',
      type: 'React.ReactNode',
      required: false,
      description: 'Icon displayed inside the right edge of the input'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Expands the input width to 100% of its parent container'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disables user input and cursor events'
    }
  ],

  label: [
    {
      name: 'htmlFor',
      type: 'string',
      required: false,
      description: 'ID of the form input element this label is associated with'
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Displays a subtle red asterisk indicator for mandatory fields'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: 'md',
      description: 'Typography size variant of the label'
    }
  ],

  checkbox: [
    {
      name: 'checked',
      type: "boolean | 'indeterminate'",
      required: false,
      description: 'Controlled checked state supporting boolean or indeterminate'
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Initial state when used in uncontrolled mode'
    },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean) => void',
      required: false,
      description: 'Callback fired whenever the checkbox state changes'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: 'md',
      description: 'Dimension variant of the checkbox square'
    },
    {
      name: 'error',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Renders red border styling on validation failure'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disables toggle interaction and applies muted opacity'
    }
  ],

  radio: [
    {
      name: 'checked',
      type: 'boolean',
      required: false,
      description: 'Controlled selected state of the individual radio option'
    },
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'Unique string identifier for this option within the group'
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Adjacent descriptive text rendered next to the radio circle'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Prevents selection of this specific radio option'
    }
  ],

  select: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled value of the currently selected option'
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      description: 'Initial value for uncontrolled mode'
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback triggered when the user picks a new option'
    },
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled dropdown open state'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback triggered when the dropdown opens or closes'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disables the select trigger and menu'
    }
  ],

  switch: [
    {
      name: 'checked',
      type: 'boolean',
      required: false,
      description: 'Controlled toggle state'
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Initial state for uncontrolled usage'
    },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean) => void',
      required: false,
      description: 'Callback fired when the switch is toggled'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: 'md',
      description: 'Dimension scale of the switch track and thumb'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disables switch toggle interactions'
    }
  ],

  progress: [
    {
      name: 'value',
      type: 'number',
      required: false,
      default: 0,
      description: 'Current percentage value between 0 and max (defaults to 100)'
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      default: 100,
      description: 'Maximum permitted progress value'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: 'md',
      description: 'Height thickness of the progress bar track'
    },
    {
      name: 'variant',
      type: "'default' | 'success' | 'warning' | 'error' | 'gradient'",
      required: false,
      default: 'default',
      description: 'Semantic color variant of the completed fill indicator'
    },
    {
      name: 'animated',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Enables smooth CSS transitions on value updates'
    }
  ],

  slider: [
    {
      name: 'value',
      type: 'number | [number, number]',
      required: false,
      description: 'Controlled slider value or tuple for dual-thumb range mode'
    },
    {
      name: 'defaultValue',
      type: 'number | [number, number]',
      required: false,
      default: 0,
      description: 'Initial value for uncontrolled mode'
    },
    {
      name: 'min',
      type: 'number',
      required: false,
      default: 0,
      description: 'Minimum permitted numeric value'
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      default: 100,
      description: 'Maximum permitted numeric value'
    },
    {
      name: 'step',
      type: 'number',
      required: false,
      default: 1,
      description: 'Granular step interval between ticks'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disables slider drag and keyboard interactions'
    },
    {
      name: 'onChange',
      type: '(value: number | [number, number]) => void',
      required: false,
      description: 'Callback fired on slider thumb displacement'
    }
  ],

  rating: [
    {
      name: 'value',
      type: 'number',
      required: false,
      description: 'Controlled star rating score'
    },
    {
      name: 'defaultValue',
      type: 'number',
      required: false,
      default: 0,
      description: 'Initial rating score in uncontrolled mode'
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      default: 5,
      description: 'Total number of rating stars to render'
    },
    {
      name: 'allowHalf',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Enables half-star precision rating selection'
    },
    {
      name: 'readOnly',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Renders the rating stars in non-interactive display mode'
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      required: false,
      description: 'Callback fired when a star rating is clicked'
    }
  ],

  skeleton: [
    {
      name: 'variant',
      type: "'text' | 'circular' | 'rectangular'",
      required: false,
      default: 'text',
      description: 'Geometric shape archetype for placeholder shimmer rendering'
    },
    {
      name: 'width',
      type: 'string | number',
      required: false,
      description: 'Explicit width override (e.g. 100% or numeric pixel value)'
    },
    {
      name: 'height',
      type: 'string | number',
      required: false,
      description: 'Explicit height override (e.g. 2rem or numeric pixel value)'
    },
    {
      name: 'animate',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Toggles pulse animation on the skeleton background'
    }
  ],

  textarea: [
    {
      name: 'error',
      type: 'boolean | string',
      required: false,
      default: false,
      description: 'Applies red validation error border and ring styles'
    },
    {
      name: 'success',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Applies emerald success validation styles'
    },
    {
      name: 'resize',
      type: "'none' | 'vertical' | 'horizontal' | 'both'",
      required: false,
      default: 'vertical',
      description: 'Controls CSS resize handle capability'
    },
    {
      name: 'rows',
      type: 'number',
      required: false,
      default: 3,
      description: 'Initial visible line count height'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Expands textarea to 100% of container width'
    }
  ],

  accordion: [
    {
      name: 'type',
      type: "'single' | 'multiple'",
      required: false,
      default: 'single',
      description: 'Determines whether only one item or multiple items can be expanded simultaneously'
    },
    {
      name: 'collapsible',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Allows an active single-mode item to be closed when clicked again'
    },
    {
      name: 'value',
      type: 'string | string[]',
      required: false,
      description: 'Controlled value of currently expanded item(s)'
    },
    {
      name: 'defaultValue',
      type: 'string | string[]',
      required: false,
      description: 'Initial expanded item value for uncontrolled mode'
    },
    {
      name: 'onValueChange',
      type: '(value: string | string[]) => void',
      required: false,
      description: 'Callback fired when accordion items expand or collapse'
    }
  ],

  breadcrumbs: [
    {
      name: 'items',
      type: 'Array<{ label: string; href?: string; icon?: React.ReactNode }>',
      required: true,
      description: 'Ordered list of navigation breadcrumb links and leaf labels'
    },
    {
      name: 'separator',
      type: 'React.ReactNode',
      required: false,
      description: 'Custom separator icon element between items (defaults to ChevronRight)'
    },
    {
      name: 'variant',
      type: "'default' | 'minimal' | 'outlined' | 'modern' | 'card' | 'pill' | 'gradient' | 'steps'",
      required: false,
      default: 'default',
      description: 'Visual layout presentation style for the breadcrumb track'
    },
    {
      name: 'showHomeIcon',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Displays a home icon glyph before the first root crumb'
    }
  ],

  calendar: [
    {
      name: 'mode',
      type: "'single' | 'multiple' | 'range'",
      required: false,
      default: 'single',
      description: 'Selection mode for individual days, multiple days, or date ranges'
    },
    {
      name: 'selected',
      type: 'Date | Date[] | { from: Date; to?: Date }',
      required: false,
      description: 'Controlled selected date or date range'
    },
    {
      name: 'onSelect',
      type: '(date: any) => void',
      required: false,
      description: 'Callback fired when the user selects a date on the calendar grid'
    },
    {
      name: 'disabled',
      type: 'boolean | ((date: Date) => boolean)',
      required: false,
      description: 'Predicate or boolean to disable selection of specific days'
    }
  ],

  'datetime-picker': [
    {
      name: 'mode',
      type: "'date' | 'time' | 'both'",
      required: false,
      default: 'both',
      description: 'Configures calendar date picker, digital time picker, or unified view'
    },
    {
      name: 'value',
      type: 'Date | null',
      required: false,
      description: 'Controlled Date object value'
    },
    {
      name: 'onChange',
      type: '(date: Date | null) => void',
      required: false,
      description: 'Callback fired on date or time selection'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: 'Select date & time',
      description: 'Input trigger placeholder string'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disables picker popup triggers and inputs'
    }
  ],

  'input-otp': [
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'Controlled OTP numeric or character string'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: true,
      description: 'Callback triggered whenever pin slots are updated'
    },
    {
      name: 'length',
      type: 'number',
      required: false,
      default: 6,
      description: 'Total number of individual digit verification slots'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Prevents typing and focus within all pin slots'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: '○',
      description: 'Empty slot visual glyph placeholder'
    }
  ],

  'radio-group': [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled string value of the active selected radio option'
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      description: 'Initial active option value for uncontrolled mode'
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired on radio option selection'
    },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal'",
      required: false,
      default: 'vertical',
      description: 'Directional layout alignment and arrow-key roving tabindex flow'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disables all child radio options simultaneously'
    }
  ],

  form: [
    {
      name: 'form',
      type: 'UseFormReturn<any>',
      required: false,
      description: 'Optional react-hook-form instance to connect form-level context'
    },
    {
      name: 'onSubmit',
      type: '(e: React.FormEvent<HTMLFormElement>) => void',
      required: false,
      description: 'Standard form submission event handler'
    },
    {
      name: 'errors',
      type: 'Record<string, string | FormFieldError>',
      required: false,
      description: 'Standalone error map for zero-dependency native validation'
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Custom Tailwind class string applied to root form container'
    }
  ],

  tabs: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled value of active tab panel'
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      description: 'Initial active tab value for uncontrolled mode'
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when switching tabs'
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      default: 'horizontal',
      description: 'Renders tabs horizontally or vertically with roving keyboard navigation'
    }
  ],

  drawer: [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled visibility state of the slide-out drawer'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when drawer open state toggles'
    },
    {
      name: 'position',
      type: "'left' | 'right' | 'top' | 'bottom'",
      required: false,
      default: 'right',
      description: 'Viewport edge from which the drawer animates'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      required: false,
      default: 'md',
      description: 'Dimension width or height scale of the drawer sheet'
    }
  ],

  'layout-shell': [
    {
      name: 'header',
      type: 'React.ReactNode',
      required: false,
      description: 'Sticky or static top header bar slot'
    },
    {
      name: 'sidebar',
      type: 'React.ReactNode',
      required: false,
      description: 'Collapsible or permanent left sidebar navigation slot'
    },
    {
      name: 'footer',
      type: 'React.ReactNode',
      required: false,
      description: 'Bottom page footer slot'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Main body content rendered inside scrollable canvas'
    }
  ],

  modal: [
    {
      name: 'open',
      type: 'boolean',
      required: true,
      description: 'Visibility state of the modal dialog'
    },
    {
      name: 'onClose',
      type: '() => void',
      required: true,
      description: 'Callback triggered to dismiss the modal'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      description: 'Semantic modal header title string'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      required: false,
      default: 'md',
      description: 'Max-width viewport constraint for modal container'
    }
  ],

  navbar: [
    {
      name: 'brand',
      type: 'React.ReactNode',
      required: false,
      description: 'Logo, icon, or organization brand mark rendered on the left'
    },
    {
      name: 'items',
      type: 'Array<{ label: string; href: string; active?: boolean }>',
      required: false,
      description: 'Navigation link items rendered in center navigation slot'
    },
    {
      name: 'actions',
      type: 'React.ReactNode',
      required: false,
      description: 'Right-side action slot (e.g. search, theme toggle, avatar profile)'
    },
    {
      name: 'sticky',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Affixes navbar to viewport top with backdrop blur'
    }
  ],

  sidebar: [
    {
      name: 'collapsed',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Controlled collapsed/expanded state of the sidebar'
    },
    {
      name: 'onCollapse',
      type: '(collapsed: boolean) => void',
      required: false,
      description: 'Callback triggered when sidebar collapses or expands'
    },
    {
      name: 'collapsible',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Enables interactive collapse toggle button'
    },
    {
      name: 'width',
      type: 'string | number',
      required: false,
      default: '16rem',
      description: 'Expanded pixel or rem width constraint'
    }
  ],

  resizable: [
    {
      name: 'direction',
      type: "'horizontal' | 'vertical'",
      required: false,
      default: 'horizontal',
      description: 'Axis along which child split panels can be resized'
    },
    {
      name: 'defaultSize',
      type: 'number',
      required: false,
      default: 50,
      description: 'Initial percentage width or height allocated to the primary panel'
    },
    {
      name: 'minSize',
      type: 'number',
      required: false,
      default: 15,
      description: 'Minimum panel size percentage limit'
    },
    {
      name: 'maxSize',
      type: 'number',
      required: false,
      default: 85,
      description: 'Maximum panel size percentage limit'
    }
  ],

  'scroll-area': [
    {
      name: 'type',
      type: "'auto' | 'always' | 'scroll' | 'hover'",
      required: false,
      default: 'hover',
      description: 'Visibility behavior of customized floating scrollbar thumbs'
    },
    {
      name: 'scrollHideDelay',
      type: 'number',
      required: false,
      default: 600,
      description: 'Milliseconds before scrollbar fades out after mouse leaves'
    }
  ],

  separator: [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      default: 'horizontal',
      description: 'Orientation direction of the visual dividing rule'
    },
    {
      name: 'decorative',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Omits ARIA separator role when purely used for cosmetic aesthetics'
    }
  ],

  sheet: [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled visibility state of the modal overlay sheet'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when sheet visibility toggles'
    },
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      required: false,
      default: 'right',
      description: 'Screen edge from which the sheet emerges'
    }
  ],

  toggle: [
    {
      name: 'pressed',
      type: 'boolean',
      required: false,
      description: 'Controlled active press state of the toggle button'
    },
    {
      name: 'defaultPressed',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Initial pressed state for uncontrolled usage'
    },
    {
      name: 'onPressedChange',
      type: '(pressed: boolean) => void',
      required: false,
      description: 'Callback fired when toggle state toggles'
    },
    {
      name: 'variant',
      type: "'default' | 'outline'",
      required: false,
      default: 'default',
      description: 'Border and background styling aesthetic'
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      required: false,
      default: 'default',
      description: 'Button scale size'
    }
  ],

  collapsible: [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled expanded state'
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Initial expanded state in uncontrolled mode'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired on expand or collapse'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Prevents expand interaction'
    }
  ],

  dialog: [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state of the modal dialog'
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Initial open state for uncontrolled mode'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when dialog open state changes'
    },
    {
      name: 'modal',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Locks background scroll and traps keyboard focus inside dialog'
    }
  ],

  'alert-dialog': [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state of the alert confirmation dialog'
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Initial open state for uncontrolled mode'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when alert dialog opens or dismisses'
    }
  ],

  'dropdown-menu': [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state of the dropdown menu'
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Initial open state for uncontrolled mode'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when dropdown menu opens or closes'
    },
    {
      name: 'modal',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Prevents interaction with outside elements while open'
    }
  ],

  popover: [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled visibility of the popover card'
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Initial visibility in uncontrolled mode'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired on popover open/close'
    },
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      required: false,
      default: 'bottom',
      description: 'Preferred placement edge relative to trigger'
    }
  ],

  tooltip: [
    {
      name: 'content',
      type: 'React.ReactNode',
      required: true,
      description: 'Descriptive text or helper content shown inside tooltip bubble'
    },
    {
      name: 'delayDuration',
      type: 'number',
      required: false,
      default: 300,
      description: 'Hover delay milliseconds before tooltip appears'
    },
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      required: false,
      default: 'top',
      description: 'Preferred placement edge relative to child trigger'
    }
  ],

  'context-menu': [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state of right-click context menu'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired on context menu open or dismiss'
    }
  ],

  'hover-card': [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state of the hover card'
    },
    {
      name: 'openDelay',
      type: 'number',
      required: false,
      default: 400,
      description: 'Hover delay milliseconds before card is shown'
    },
    {
      name: 'closeDelay',
      type: 'number',
      required: false,
      default: 200,
      description: 'Grace period milliseconds before card is hidden after mouse leaves'
    }
  ],

  'navigation-menu': [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled string value of active navigation dropdown item'
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      description: 'Initial active menu item value'
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired on active navigation item change'
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      default: 'horizontal',
      description: 'Layout axis of navigation bar'
    }
  ],

  menubar: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled active top-level menu value'
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when active menu changes'
    },
    {
      name: 'loop',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Wraps keyboard navigation around when reaching first or last menu item'
    }
  ],

  command: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled search query value for the command palette'
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback triggered as user types search query'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: 'Type a command or search...',
      description: 'Search input placeholder text'
    }
  ],

  combobox: [
    {
      name: 'options',
      type: 'Array<{ label: string; value: string; disabled?: boolean }>',
      required: true,
      description: 'Available selectable options list'
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled selected option value'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired on option selection'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: 'Select option...',
      description: 'Combobox trigger placeholder'
    },
    {
      name: 'emptyText',
      type: 'string',
      required: false,
      default: 'No results found.',
      description: 'Text shown when search yields 0 matches'
    }
  ],

  pagination: [
    {
      name: 'currentPage',
      type: 'number',
      required: true,
      description: 'Currently active 1-indexed page number'
    },
    {
      name: 'totalPages',
      type: 'number',
      required: true,
      description: 'Total number of pages available'
    },
    {
      name: 'onPageChange',
      type: '(page: number) => void',
      required: true,
      description: 'Callback fired on page click or navigation'
    },
    {
      name: 'siblingCount',
      type: 'number',
      required: false,
      default: 1,
      description: 'Number of sibling page buttons displayed on each side of active page'
    },
    {
      name: 'showEdges',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Displays first and last page jump buttons'
    }
  ],

  table: [
    {
      name: 'striped',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Applies alternating zebra background stripes to table rows'
    },
    {
      name: 'hoverable',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Highlights table rows on pointer hover'
    },
    {
      name: 'bordered',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Applies outer border and cell separators'
    },
    {
      name: 'compact',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Reduces cell padding for high-density information display'
    }
  ],

  'data-table': [
    {
      name: 'data',
      type: 'TData[]',
      required: true,
      description: 'Array of data records to render in the table'
    },
    {
      name: 'columns',
      type: 'DataTableColumn<TData>[]',
      required: true,
      description: 'Column configuration defining keys, headers, sorting, and cell renderers'
    },
    {
      name: 'searchable',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Displays a live search input filtering rows in real time'
    },
    {
      name: 'selectable',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Enables row checkboxes with indeterminate Select All header'
    },
    {
      name: 'pagination',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Enables bottom pagination toolbar with page size selector'
    },
    {
      name: 'pageSize',
      type: 'number',
      required: false,
      default: 10,
      description: 'Initial number of records displayed per page'
    },
    {
      name: 'virtualized',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Enables high-performance zero-dependency windowed rendering for large datasets'
    },
    {
      name: 'onRowClick',
      type: '(row: TData) => void',
      required: false,
      description: 'Optional callback fired when a row is clicked'
    }
  ],

  chart: [
    {
      name: 'type',
      type: "'bar' | 'line' | 'pie' | 'doughnut'",
      required: true,
      description: 'Chart presentation format'
    },
    {
      name: 'data',
      type: 'ChartData',
      required: true,
      description: 'Labels, datasets, and value points'
    },
    {
      name: 'height',
      type: 'number | string',
      required: false,
      default: 300,
      description: 'Height constraint for chart canvas container'
    }
  ],

  alert: [
    {
      name: 'variant',
      type: "'default' | 'info' | 'success' | 'warning' | 'destructive'",
      required: false,
      default: 'default',
      description: 'Semantic alert color scheme and intent'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      description: 'Bold callout title rendered above description'
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      required: false,
      description: 'Semantic icon glyph displayed inside left margin'
    },
    {
      name: 'dismissible',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Displays a close button on the right edge'
    },
    {
      name: 'onDismiss',
      type: '() => void',
      required: false,
      description: 'Callback fired when the close button is clicked'
    }
  ],

  toast: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Headline message of the toast notification'
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      description: 'Secondary contextual information'
    },
    {
      name: 'variant',
      type: "'default' | 'success' | 'warning' | 'error' | 'info'",
      required: false,
      default: 'default',
      description: 'Semantic accent styling'
    },
    {
      name: 'duration',
      type: 'number',
      required: false,
      default: 4000,
      description: 'Milliseconds before notification automatically dismisses'
    }
  ],

  sonner: [
    {
      name: 'position',
      type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'",
      required: false,
      default: 'bottom-right',
      description: 'Screen anchor position for stacked toast stream'
    },
    {
      name: 'expand',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Expands toast notifications on pointer hover'
    },
    {
      name: 'richColors',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Applies semantic green/red/amber background tints'
    }
  ],

  avatar: [
    {
      name: 'src',
      type: 'string',
      required: false,
      description: 'Image URL for user avatar'
    },
    {
      name: 'alt',
      type: 'string',
      required: false,
      default: 'Avatar',
      description: 'Accessible image alternative text'
    },
    {
      name: 'fallback',
      type: 'React.ReactNode',
      required: false,
      description: 'Initials or icon rendered while image loads or on error'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      required: false,
      default: 'md',
      description: 'Dimension diameter of avatar circle'
    },
    {
      name: 'shape',
      type: "'circle' | 'square'",
      required: false,
      default: 'circle',
      description: 'Geometric rounding style'
    }
  ],

  badge: [
    {
      name: 'variant',
      type: "'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'",
      required: false,
      default: 'default',
      description: 'Visual accent styling of the badge pill'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: 'md',
      description: 'Dimension scale of the badge'
    },
    {
      name: 'dot',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Renders a subtle glowing status indicator dot'
    },
    {
      name: 'removable',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Displays a remove cross button'
    },
    {
      name: 'onRemove',
      type: '() => void',
      required: false,
      description: 'Callback fired when remove button is clicked'
    }
  ],

  'aspect-ratio': [
    {
      name: 'ratio',
      type: 'number',
      required: false,
      default: 16 / 9,
      description: 'Width-to-height numerical ratio (e.g. 16/9, 4/3, 1/1)'
    }
  ],

  carousel: [
    {
      name: 'slides',
      type: 'React.ReactNode[]',
      required: true,
      description: 'Slide elements rendered inside horizontal carousel track'
    },
    {
      name: 'autoplay',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Enables automatic periodic slide advance'
    },
    {
      name: 'interval',
      type: 'number',
      required: false,
      default: 5000,
      description: 'Milliseconds per slide during autoplay'
    },
    {
      name: 'showArrows',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Renders previous/next navigation buttons'
    },
    {
      name: 'showDots',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Renders indicator pagination dots along the bottom'
    }
  ],

  typography: [
    {
      name: 'variant',
      type: "'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'lead' | 'large' | 'small' | 'muted' | 'code' | 'blockquote'",
      required: false,
      default: 'p',
      description: 'Typography hierarchy scale and font weight preset'
    },
    {
      name: 'as',
      type: 'string',
      required: false,
      description: 'Custom underlying semantic HTML element override'
    }
  ],
  'button-group': [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      default: 'horizontal',
      description: 'Orientation layout of the button group'
    },
    {
      name: 'attached',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Whether adjacent buttons have collapsed borders'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Whether the group spans the full container width'
    }
  ],
  'input-group': [
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      required: false,
      default: 'default',
      description: 'The size of the input group and its children'
    }
  ],
  'password-input': [
    {
      name: 'showToggle',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Whether to show the reveal password toggle eye button'
    },
    {
      name: 'strengthMeter',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Whether to display the password strength score bar'
    },
    {
      name: 'strengthScore',
      type: 'number',
      required: false,
      default: 0,
      description: 'Password strength score from 0 to 4'
    },
    {
      name: 'onVisibilityChange',
      type: '(visible: boolean) => void',
      required: false,
      description: 'Callback fired when password visibility is toggled'
    }
  ],
  'number-input': [
    {
      name: 'value',
      type: 'number | ""',
      required: false,
      description: 'Controlled numeric value'
    },
    {
      name: 'defaultValue',
      type: 'number | ""',
      required: false,
      description: 'Initial uncontrolled numeric value'
    },
    {
      name: 'onChange',
      type: '(value: number | undefined) => void',
      required: false,
      description: 'Callback fired when the numeric value changes'
    },
    {
      name: 'min',
      type: 'number',
      required: false,
      description: 'Minimum allowed numeric value'
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      description: 'Maximum allowed numeric value'
    },
    {
      name: 'step',
      type: 'number',
      required: false,
      default: 1,
      description: 'Step interval for incrementing or decrementing'
    },
    {
      name: 'precision',
      type: 'number',
      required: false,
      description: 'Number of decimal places to format the value'
    },
    {
      name: 'clampValueOnBlur',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Whether to clamp values to min/max on blur'
    },
    {
      name: 'hideStepper',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Whether to hide the increment and decrement buttons'
    },
    {
      name: 'inputSize',
      type: "'sm' | 'default' | 'lg'",
      required: false,
      default: 'default',
      description: 'The height and font size of the input'
    }
  ],
  'spinner': [
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      required: false,
      default: 'md',
      description: 'Size dimension of the spinner'
    },
    {
      name: 'variant',
      type: "'default' | 'primary' | 'secondary' | 'muted' | 'white'",
      required: false,
      default: 'default',
      description: 'Color theme variant of the spinner'
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      default: 'Loading...',
      description: 'Accessible screen reader label for the loading state'
    },
    {
      name: 'strokeWidth',
      type: 'number',
      required: false,
      default: 3,
      description: 'Stroke thickness of the circular spinner path'
    }
  ],
  'empty-state': [
    {
      name: 'icon',
      type: 'any',
      required: false,
      description: 'Icon component or React node for the graphic'
    },
    {
      name: 'title',
      type: 'React.ReactNode',
      required: false,
      description: 'Primary headline for the empty state'
    },
    {
      name: 'description',
      type: 'React.ReactNode',
      required: false,
      description: 'Supporting subtext describing the zero data situation'
    },
    {
      name: 'action',
      type: 'React.ReactNode',
      required: false,
      description: 'Action buttons or trigger slots'
    },
    {
      name: 'variant',
      type: "'default' | 'dashed' | 'outline'",
      required: false,
      default: 'default',
      description: 'Container frame border style'
    }
  ],
  'kbd': [
    {
      name: 'variant',
      type: "'default' | 'outline' | 'subtle'",
      required: false,
      default: 'default',
      description: 'Visual badge style for the key'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md'",
      required: false,
      default: 'sm',
      description: 'Key badge dimension and font size'
    },
    {
      name: 'keys',
      type: 'string[]',
      required: false,
      description: 'List of keys to format and render as badges'
    }
  ],
  'multi-select': [
    {
      name: 'options',
      type: 'MultiSelectOption[]',
      required: true,
      description: 'Array of selectable option objects with label, value, and disabled status'
    },
    {
      name: 'value',
      type: 'string[]',
      required: false,
      description: 'Controlled array of active selected value strings'
    },
    {
      name: 'defaultValue',
      type: 'string[]',
      required: false,
      description: 'Initial selected values for uncontrolled mode'
    },
    {
      name: 'onChange',
      type: '(value: string[]) => void',
      required: false,
      description: 'Callback fired when selection array changes'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: 'Select options...',
      description: 'Placeholder label when no options are selected'
    },
    {
      name: 'maxSelected',
      type: 'number',
      required: false,
      description: 'Maximum number of items displayed before collapsing into +N more badge'
    },
    {
      name: 'searchable',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Enables real-time search filtering within dropdown menu'
    },
    {
      name: 'clearable',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Shows quick clear button to remove all selections'
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      required: false,
      default: 'default',
      description: 'Trigger dimension and badge padding'
    }
  ],
  'date-range-picker': [
    {
      name: 'value',
      type: 'DateRange',
      required: false,
      description: 'Controlled active date range object containing from and to dates'
    },
    {
      name: 'defaultValue',
      type: 'DateRange',
      required: false,
      description: 'Initial date range for uncontrolled mode'
    },
    {
      name: 'onChange',
      type: '(range: DateRange) => void',
      required: false,
      description: 'Callback fired when date selection changes'
    },
    {
      name: 'presets',
      type: 'DateRangePreset[]',
      required: false,
      description: 'Quick-select range preset buttons (Today, Yesterday, Last 7 days, etc.)'
    },
    {
      name: 'minDate',
      type: 'Date',
      required: false,
      description: 'Earliest allowable selectable date constraint'
    },
    {
      name: 'maxDate',
      type: 'Date',
      required: false,
      description: 'Latest allowable selectable date constraint'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: 'Select date range',
      description: 'Placeholder label displayed when range is unselected'
    }
  ],
  'time-picker': [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled time string formatted as HH:MM or HH:MM AM/PM'
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      default: '12:00 PM',
      description: 'Initial time string for uncontrolled mode'
    },
    {
      name: 'onChange',
      type: '(time: string) => void',
      required: false,
      description: 'Callback fired when time value updates'
    },
    {
      name: 'format',
      type: "'12h' | '24h'",
      required: false,
      default: '12h',
      description: 'Display and stepping format mode'
    },
    {
      name: 'step',
      type: 'number',
      required: false,
      default: 1,
      description: 'Minute increment step for chevron arrows'
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      required: false,
      default: 'default',
      description: 'Input box dimension'
    }
  ],
  'color-picker': [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled color string (hex format like #3b82f6)'
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      default: '#3b82f6',
      description: 'Initial hex color for uncontrolled operation'
    },
    {
      name: 'onChange',
      type: '(color: string) => void',
      required: false,
      description: 'Callback dispatched on every drag or direct input update'
    },
    {
      name: 'format',
      type: "'hex' | 'rgb' | 'hsl'",
      required: false,
      default: 'hex',
      description: 'Initial color readout and numeric input mode'
    },
    {
      name: 'showAlpha',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether to show the transparency opacity slider'
    },
    {
      name: 'showEyeDropper',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to enable the native browser EyeDropper API tool'
    },
    {
      name: 'showPresets',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to render the quick-swatch palette grid'
    },
    {
      name: 'presets',
      type: 'string[]',
      required: false,
      default: 'DEFAULT_PRESETS',
      description: 'Array of custom hex colors for the swatch palette'
    },
    {
      name: 'inline',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Render the picker canvas inline rather than in a floating popover'
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      required: false,
      default: 'default',
      description: 'Trigger button size dimensions'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables trigger interaction and color modification'
    }
  ],
  'file-upload': [
    {
      name: 'accept',
      type: 'string',
      required: false,
      description: 'Comma-separated file extensions or MIME types allowed for upload'
    },
    {
      name: 'multiple',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Enables multi-file selection and drop'
    },
    {
      name: 'maxSize',
      type: 'number',
      required: false,
      description: 'Maximum allowable file size in bytes before rejecting'
    },
    {
      name: 'maxFiles',
      type: 'number',
      required: false,
      description: 'Maximum number of concurrent files allowed'
    },
    {
      name: 'value',
      type: 'File[]',
      required: false,
      description: 'Controlled array of active files'
    },
    {
      name: 'onChange',
      type: '(files: File[]) => void',
      required: false,
      description: 'Callback fired when files are added or removed'
    },
    {
      name: 'variant',
      type: "'dropzone' | 'compact'",
      required: false,
      default: 'dropzone',
      description: 'Visual layout style: full dashed drag area or compact button bar'
    }
  ],
  'stepper': [
    {
      name: 'steps',
      type: 'StepItem[]',
      required: true,
      description: 'List of step definitions with title, optional description, and icon'
    },
    {
      name: 'activeStep',
      type: 'number',
      required: false,
      description: 'Zero-based index of current active step (controlled)'
    },
    {
      name: 'defaultStep',
      type: 'number',
      required: false,
      default: 0,
      description: 'Initial step index for uncontrolled mode'
    },
    {
      name: 'onStepChange',
      type: '(step: number) => void',
      required: false,
      description: 'Callback fired when user clicks an unlocked step'
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      default: 'horizontal',
      description: 'Layout axis direction for step nodes and connector lines'
    },
    {
      name: 'clickable',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Allows clicking previous completed steps to navigate backwards'
    }
  ],
  'stat-card': [
    {
      name: 'title',
      type: 'React.ReactNode',
      required: true,
      description: 'Statistic title or metric category label'
    },
    {
      name: 'value',
      type: 'React.ReactNode',
      required: true,
      description: 'Primary numeric or formatted metric display value'
    },
    {
      name: 'description',
      type: 'React.ReactNode',
      required: false,
      description: 'Supporting caption or benchmark context'
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      required: false,
      description: 'Visual icon badge displayed in top corner'
    },
    {
      name: 'trend',
      type: 'StatCardTrend',
      required: false,
      description: 'Percentage change trend indicator with direction (up, down, neutral) and badge'
    },
    {
      name: 'variant',
      type: "'default' | 'outline' | 'subtle'",
      required: false,
      default: 'default',
      description: 'Container background and border frame appearance'
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      required: false,
      default: 'default',
      description: 'Card padding and text size scaling'
    }
  ],
  'timeline': [
    {
      name: 'items',
      type: 'TimelineItemData[]',
      required: false,
      description: 'Structured array of chronological event items'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'Composable subcomponents (TimelineItem, TimelineNode, TimelineContent)'
    }
  ],
  'tree-view': [
    {
      name: 'data',
      type: 'TreeNode[]',
      required: true,
      description: 'Hierarchical node tree data array with id, label, icon, and children'
    },
    {
      name: 'selectedId',
      type: 'string',
      required: false,
      description: 'Controlled identifier of the currently selected node'
    },
    {
      name: 'onSelect',
      type: '(node: TreeNode) => void',
      required: false,
      description: 'Callback fired when a tree item is selected'
    },
    {
      name: 'expandedIds',
      type: 'string[]',
      required: false,
      description: 'Controlled array of expanded node IDs'
    },
    {
      name: 'onToggleExpand',
      type: '(id: string, expanded: boolean) => void',
      required: false,
      description: 'Callback fired when a branch node is expanded or collapsed'
    }
  ],
  'banner': [
    {
      name: 'variant',
      type: "'default' | 'info' | 'success' | 'warning' | 'destructive'",
      required: false,
      default: 'default',
      description: 'Visual semantic status theme and border tint'
    },
    {
      name: 'title',
      type: 'React.ReactNode',
      required: false,
      description: 'Prominent headline or alert tag'
    },
    {
      name: 'action',
      type: 'React.ReactNode',
      required: false,
      description: 'Call to action button or link slot'
    },
    {
      name: 'dismissible',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Shows close button to dismiss the banner'
    },
    {
      name: 'storageKey',
      type: 'string',
      required: false,
      description: 'Unique key to persist dismissed state across page reloads in localStorage'
    }
  ],
  'prompt-input': [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled string value of the prompt textarea'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: 'Ask anything or type a prompt...',
      description: 'Placeholder guidance text inside textarea'
    },
    {
      name: 'onSubmit',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired on Enter key or Send button click'
    },
    {
      name: 'onStop',
      type: '() => void',
      required: false,
      description: 'Callback fired when clicking the Stop generating square button'
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Toggles between Send arrow and Stop generation button'
    },
    {
      name: 'startActions',
      type: 'React.ReactNode',
      required: false,
      description: 'Left-aligned action button slots (e.g. file attachment, model dropdown)'
    },
    {
      name: 'endActions',
      type: 'React.ReactNode',
      required: false,
      description: 'Right-aligned action slots preceding the send trigger'
    }
  ],
  'message-bubble': [
    {
      name: 'role',
      type: "'user' | 'assistant' | 'system'",
      required: false,
      default: 'user',
      description: 'Message author role determining alignment, background colors, and avatar style'
    },
    {
      name: 'avatar',
      type: 'React.ReactNode',
      required: false,
      description: 'Custom avatar component or image node'
    },
    {
      name: 'author',
      type: 'React.ReactNode',
      required: false,
      description: 'Display name of user or AI model'
    },
    {
      name: 'timestamp',
      type: 'React.ReactNode',
      required: false,
      description: 'Timestamp or relative time string'
    },
    {
      name: 'copyable',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Shows quick 1-click copy action button'
    },
    {
      name: 'isStreaming',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Renders animated trailing blinking cursor during active token generation'
    }
  ],
  'reasoning-disclosure': [
    {
      name: 'title',
      type: 'React.ReactNode',
      required: false,
      default: 'Reasoning Process',
      description: 'Heading label for thought process trigger'
    },
    {
      name: 'summary',
      type: 'React.ReactNode',
      required: false,
      description: 'Collapsed single-line preview snippet'
    },
    {
      name: 'duration',
      type: 'string | number',
      required: false,
      description: 'Elapsed thinking duration (e.g. 3.2s or 3200)'
    },
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled expansion state'
    },
    {
      name: 'isStreaming',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Displays pulsing thinking indicator and sparkles icon'
    }
  ],
  'tool-call-card': [
    {
      name: 'name',
      type: 'string',
      required: true,
      description: 'Identifier of the executed tool or agent action (e.g. search_web)'
    },
    {
      name: 'status',
      type: "'pending' | 'running' | 'success' | 'error'",
      required: false,
      default: 'success',
      description: 'Current execution status badge'
    },
    {
      name: 'args',
      type: 'Record<string, any> | string',
      required: false,
      description: 'Parameters or JSON payload passed into tool'
    },
    {
      name: 'result',
      type: 'any',
      required: false,
      description: 'Output or returned payload from tool'
    },
    {
      name: 'duration',
      type: 'string | number',
      required: false,
      description: 'Execution duration formatted with units'
    }
  ]
}

// Register aliases so both kebab-case and unhyphenated registry slugs resolve seamlessly
const ALIAS_MAP: Record<string, string> = {
  inputotp: 'input-otp',
  radiogroup: 'radio-group',
  layout: 'layout-shell',
  scrollarea: 'scroll-area',
  datatable: 'data-table',
  navigationmenu: 'navigation-menu',
  alertdialog: 'alert-dialog',
  dropdownmenu: 'dropdown-menu',
  contextmenu: 'context-menu',
  hovercard: 'hover-card',
  aspectratio: 'aspect-ratio',
  buttongroup: 'button-group',
  inputgroup: 'input-group',
  passwordinput: 'password-input',
  numberinput: 'number-input',
  emptystate: 'empty-state',
  multiselect: 'multi-select',
  daterangepicker: 'date-range-picker',
  'date-range': 'date-range-picker',
  timepicker: 'time-picker',
  fileupload: 'file-upload',
  statcard: 'stat-card',
  treeview: 'tree-view',
  promptinput: 'prompt-input',
  messagebubble: 'message-bubble',
  reasoningdisclosure: 'reasoning-disclosure',
  toolcallcard: 'tool-call-card',
  'date-picker': 'datetime-picker',
  datepicker: 'datetime-picker'
}

export function getComponentProps(slug: string): ComponentProp[] {
  const direct = COMPONENT_PROPS[slug]
  if (direct) return direct

  const aliased = ALIAS_MAP[slug]
  if (aliased && COMPONENT_PROPS[aliased]) return COMPONENT_PROPS[aliased]

  const normalized = slug.replace(/-/g, '').toLowerCase()
  if (COMPONENT_PROPS[normalized]) return COMPONENT_PROPS[normalized]

  const match = Object.entries(COMPONENT_PROPS).find(([k]) => k.replace(/-/g, '').toLowerCase() === normalized)
  if (match) return match[1]

  return []
}
