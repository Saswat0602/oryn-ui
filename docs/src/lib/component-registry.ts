import { ComponentCategory } from '@/types/component'

// Component registry with all available components
export const COMPONENT_REGISTRY = {
  // Core Components
  'button': {
    category: 'Core' as ComponentCategory,
    title: 'Button',
    description: 'Accessible, customizable button component with multiple variants, sizes, and states',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'action', 'interactive', 'enterprise', 'accessibility']
  },
  'input': {
    category: 'Core' as ComponentCategory,
    title: 'Input',
    description: 'Versatile text input component with support for custom prefixes, suffixes, and states',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'input', 'text', 'enterprise', 'validation']
  },
  'label': {
    category: 'Core' as ComponentCategory,
    title: 'Label',
    description: 'A label component for form elements and accessibility',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'label', 'accessibility']
  },
  'card': {
    category: 'Core' as ComponentCategory,
    title: 'Card',
    description: 'Flexible card container for organizing content with header, content, and footer sections',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'content', 'container', 'enterprise', 'interactive']
  },
  'checkbox': {
    category: 'Core' as ComponentCategory,
    title: 'Checkbox',
    description: 'A checkbox component for boolean input',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'checkbox', 'boolean']
  },
  'radio': {
    category: 'Core' as ComponentCategory,
    title: 'Radio',
    description: 'A radio button component for single selection',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'radio', 'selection']
  },
  'select': {
    category: 'Core' as ComponentCategory,
    title: 'Select',
    description: 'A select dropdown component for choosing from options',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'select', 'dropdown']
  },
  'switch': {
    category: 'Core' as ComponentCategory,
    title: 'Switch',
    description: 'A toggle switch component for boolean input',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'switch', 'toggle']
  },
  'progress': {
    category: 'Core' as ComponentCategory,
    title: 'Progress',
    description: 'Linear progress indicator with custom color, size, and animation support',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['feedback', 'progress', 'status', 'enterprise', 'accessibility']
  },
  'slider': {
    category: 'Core' as ComponentCategory,
    title: 'Slider',
    description: 'Range slider component supporting keyboard navigation, custom steps, and tooltips',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'slider', 'range', 'enterprise', 'accessibility']
  },
  'rating': {
    category: 'Core' as ComponentCategory,
    title: 'Rating',
    description: 'A rating component for displaying and selecting ratings',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'rating', 'stars']
  },
  'skeleton': {
    category: 'Core' as ComponentCategory,
    title: 'Skeleton',
    description: 'A skeleton loading component for content placeholders',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['feedback', 'loading', 'placeholder']
  },
  'textarea': {
    category: 'Core' as ComponentCategory,
    title: 'Textarea',
    description: 'Enterprise-level textarea component with character counting, auto-resize, validation, and enterprise features',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'textarea', 'multiline', 'enterprise', 'accessibility']
  },
  'button-group': {
    category: 'Core' as ComponentCategory,
    title: 'Button Group',
    description: 'Container for grouping adjacent buttons with seamless border merging and focus rings',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['button', 'group', 'toolbar', 'action']
  },
  'input-group': {
    category: 'Core' as ComponentCategory,
    title: 'Input Group',
    description: 'Composite input wrapper with text addons and prefix/suffix action slots',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['input', 'group', 'addon', 'prefix', 'suffix']
  },

  // Form Components
  'accordion': {
    category: 'Layout' as ComponentCategory,
    title: 'Accordion',
    description: 'Clean and simple accordion component with smooth animations, customizable icons, and flexible content support',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'accordion', 'collapsible', 'animation', 'content']
  },
  'breadcrumbs': {
    category: 'Navigation' as ComponentCategory,
    title: 'Breadcrumbs',
    description: 'A breadcrumb navigation component',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['navigation', 'breadcrumbs', 'path']
  },
  'datetime-picker': {
    category: 'Form' as ComponentCategory,
    title: 'DateTime Picker',
    description: 'Beautiful, modern date and time picker with horizontal time selection and custom Select components - choose date, time, or both together',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'datetime', 'date', 'time', 'picker', 'calendar']
  },
  'input-otp': {
    category: 'Form' as ComponentCategory,
    title: 'Input OTP',
    description: 'An OTP input component for verification codes',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'otp', 'verification']
  },
  'radio-group': {
    category: 'Form' as ComponentCategory,
    title: 'Radio Group',
    description: 'A radio group component for managing multiple radio buttons',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'radiogroup', 'selection']
  },
  'tabs': {
    category: 'Layout' as ComponentCategory,
    title: 'Tabs',
    description: 'A tabs component for organizing content into switchable panels',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['navigation', 'tabs', 'panels']
  },
  'calendar': {
    category: 'Form' as ComponentCategory,
    title: 'Calendar',
    description: 'A responsive calendar component supporting single and range date selection, month navigation, and custom date constraints.',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'calendar', 'date', 'picker', 'schedule']
  },
  'form': {
    category: 'Form' as ComponentCategory,
    title: 'Form',
    description: 'Composable form components with React Hook Form integration, validation messages, and accessible field labels.',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'validation', 'input', 'field', 'react-hook-form']
  },
  'password-input': {
    category: 'Form' as ComponentCategory,
    title: 'Password Input',
    description: 'Password field with integrated reveal toggle, strength meter, and caps-lock detection',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'password', 'security', 'input']
  },
  'number-input': {
    category: 'Form' as ComponentCategory,
    title: 'Number Input',
    description: 'Numeric stepper input with increment buttons, clamp bounds, and arrow key support',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'number', 'stepper']
  },
  'multi-select': {
    category: 'Form' as ComponentCategory,
    title: 'Multi Select',
    description: 'Searchable multi-tag selector with pill removal, keyboard navigation, and max badges',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'select', 'tags']
  },
  'date-range-picker': {
    category: 'Form' as ComponentCategory,
    title: 'Date Range Picker',
    description: 'Dual-calendar date range selector with quick preset shortcuts and constraint validation',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'date', 'calendar']
  },
  'time-picker': {
    category: 'Form' as ComponentCategory,
    title: 'Time Picker',
    description: 'Segmented time selector supporting 12h/24h formats and minute stepping',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'time', 'clock']
  },
  'color-picker': {
    category: 'Form' as ComponentCategory,
    title: 'Color Picker',
    description: 'Interactive color picker with 2D saturation gradient, rainbow hue slider, alpha opacity channel, eye dropper, and curated palettes',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'color', 'picker', 'palette']
  },
  'file-upload': {
    category: 'Form' as ComponentCategory,
    title: 'File Upload',
    description: 'Drag-and-drop file upload zone with preview cards, size limits, and file removal',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['form', 'upload', 'files']
  },
  'prompt-input': {
    category: 'AI & Agents' as ComponentCategory,
    title: 'Prompt Input',
    description: 'AI prompt input box with auto-expanding textarea, attachments, token counters, and cancel actions',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['ai', 'agent', 'prompt', 'chat', 'llm']
  },

  // Layout Components
  'layout-shell': {
    category: 'Layout' as ComponentCategory,
    title: 'Layout Shell',
    description: 'Responsive enterprise application shell with collapsible sidebar, sticky topbar, and main container',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'shell', 'sidebar', 'structure']
  },
  'modal': {
    category: 'Layout' as ComponentCategory,
    title: 'Modal',
    description: 'Dialog overlay with built-in isOpen/onClose state management, focus trap, and customizable sizing',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'modal', 'overlay', 'dialog']
  },
  'popover': {
    category: 'Layout' as ComponentCategory,
    title: 'Popover',
    description: 'Floating contextual popover anchored to a trigger button with automatic viewport flipping and portal rendering',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'popover', 'floating', 'overlay']
  },
  'tooltip': {
    category: 'Layout' as ComponentCategory,
    title: 'Tooltip',
    description: 'Informative tooltip popup on hover and focus with directional alignment',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'tooltip', 'help', 'accessibility']
  },
  'drawer': {
    category: 'Layout' as ComponentCategory,
    title: 'Drawer',
    description: 'Docked slide-up drawer panel for mobile sheets, quick forms, and actions with smooth spring animations',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'drawer', 'slide', 'overlay']
  },
  'sheet': {
    category: 'Layout' as ComponentCategory,
    title: 'Sheet',
    description: 'Slide-over side drawer overlay with focus trap, backdrop blur, and 4 directional options (left, right, top, bottom)',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'sheet', 'overlay', 'side-panel']
  },
  'resizable': {
    category: 'Layout' as ComponentCategory,
    title: 'Resizable',
    description: 'Split pane container with draggable divider handle and keyboard arrow key resizing',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'resizable', 'panels', 'split']
  },
  'scroll-area': {
    category: 'Layout' as ComponentCategory,
    title: 'Scroll Area',
    description: 'Custom scrollable viewport with native momentum scrolling and sleek themed scrollbars',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['layout', 'scroll', 'viewport']
  },

  // Data Components
  'data-table': {
    category: 'Data Display' as ComponentCategory,
    title: 'Data Table',
    description: 'An advanced data table with sorting, filtering, and pagination',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['data', 'datatable', 'advanced']
  },
  'chart': {
    category: 'Data Display' as ComponentCategory,
    title: 'Chart',
    description: 'A chart component for data visualization',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['data', 'chart', 'visualization']
  },

  // Feedback Components

  // Navigation Components
  'navigation-menu': {
    category: 'Navigation' as ComponentCategory,
    title: 'Navigation Menu',
    description: 'A navigation menu component with dropdowns',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['navigation', 'menu', 'dropdown']
  },
  'menubar': {
    category: 'Navigation' as ComponentCategory,
    title: 'Menu Bar',
    description: 'A menu bar component for application menus',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['navigation', 'menubar', 'menu']
  },
  'command': {
    category: 'Navigation' as ComponentCategory,
    title: 'Command',
    description: 'A command palette component for quick actions',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['navigation', 'command', 'palette']
  },
  'combobox': {
    category: 'Form' as ComponentCategory,
    title: 'Combobox',
    description: 'A combobox component with search and selection',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['navigation', 'combobox', 'search']
  },
  'pagination': {
    category: 'Navigation' as ComponentCategory,
    title: 'Pagination',
    description: 'A pagination component for navigating through pages',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['navigation', 'pagination', 'pages']
  },

  // Overlay Components
  'dialog': {
    category: 'Overlay' as ComponentCategory,
    title: 'Dialog',
    description: 'Canonical, accessible modal dialog primitive with backdrop blur, focus trap, and composable triggers. Recommended over Modal for full structural flexibility.',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['overlay', 'dialog', 'modal', 'primitive']
  },
  'alert-dialog': {
    category: 'Overlay' as ComponentCategory,
    title: 'Alert Dialog',
    description: 'An alert dialog component for confirmations',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['overlay', 'alertdialog', 'confirmation']
  },
  'dropdown-menu': {
    category: 'Overlay' as ComponentCategory,
    title: 'Dropdown Menu',
    description: 'A dropdown menu component for actions',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['overlay', 'dropdown', 'menu']
  },
  'context-menu': {
    category: 'Overlay' as ComponentCategory,
    title: 'Context Menu',
    description: 'A context menu component for right-click actions',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['overlay', 'contextmenu', 'rightclick']
  },
  'hover-card': {
    category: 'Overlay' as ComponentCategory,
    title: 'Hover Card',
    description: 'A hover card component for additional information',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['overlay', 'hovercard', 'information']
  },
  'separator': {
    category: 'Overlay' as ComponentCategory,
    title: 'Separator',
    description: 'A separator component for dividing content',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['overlay', 'separator', 'divider']
  },
  'toggle': {
    category: 'Overlay' as ComponentCategory,
    title: 'Toggle',
    description: 'A toggle component for switching states',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['overlay', 'toggle', 'switch']
  },
  'collapsible': {
    category: 'Overlay' as ComponentCategory,
    title: 'Collapsible',
    description: 'Collapsible disclosure component with smooth expand and collapse transitions',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['overlay', 'collapsible', 'expand', 'enterprise', 'accessibility']
  },

  // Media Components
  'avatar': {
    category: 'Media' as ComponentCategory,
    title: 'Avatar',
    description: 'An avatar component for user profiles',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['media', 'avatar', 'profile']
  },
  'badge': {
    category: 'Media' as ComponentCategory,
    title: 'Badge',
    description: 'A badge component for labels and status',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['media', 'badge', 'label']
  },
  'aspect-ratio': {
    category: 'Media' as ComponentCategory,
    title: 'Aspect Ratio',
    description: 'An aspect ratio component for maintaining proportions',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['media', 'aspectratio', 'proportions']
  },
  'carousel': {
    category: 'Media' as ComponentCategory,
    title: 'Carousel',
    description: 'Responsive carousel slider with autoplay, arrow navigation, and dot indicators',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['media', 'carousel', 'gallery', 'enterprise', 'accessibility']
  },
  'typography': {
    category: 'Media' as ComponentCategory,
    title: 'Typography',
    description: 'Typography components for text styling',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['media', 'typography', 'text']
  },
  'kbd': {
    category: 'Media' as ComponentCategory,
    title: 'Kbd',
    description: 'Keyboard shortcut indicator badge with cross-platform key normalization',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['media', 'kbd', 'keyboard', 'shortcut']
  },

  // Navigation Components
  'navbar': {
    category: 'Navigation' as ComponentCategory,
    title: 'Navbar',
    description: 'Responsive navigation bar with brand branding, links, search input, and mobile menu',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['navbar', 'navigation', 'header', 'mobile', 'responsive', 'enterprise', 'accessibility']
  },

  'sidebar': {
    category: 'Navigation' as ComponentCategory,
    title: 'Sidebar',
    description: 'A collapsible sidebar navigation component with persistent state, multiple variants, and enterprise features for building modern web applications.',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['sidebar', 'navigation', 'collapsible']
  },
  'stepper': {
    category: 'Navigation' as ComponentCategory,
    title: 'Stepper',
    description: 'Multi-step workflow wizard indicator supporting horizontal and vertical orientations',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['navigation', 'stepper', 'wizard']
  },


  // Data Components
  'table': {
    category: 'Data Display' as ComponentCategory,
    title: 'Table',
    description: 'A powerful data table component with sorting, selection, pagination, and enterprise features for displaying and managing large datasets.',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['table', 'data', 'sorting', 'enterprise']
  },
  'stat-card': {
    category: 'Data Display' as ComponentCategory,
    title: 'Stat Card',
    description: 'Metric card displaying KPI numbers, trend badges, and icons for dashboards',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['data', 'analytics', 'kpi', 'metric']
  },
  'timeline': {
    category: 'Data Display' as ComponentCategory,
    title: 'Timeline',
    description: 'Vertical chronological activity stream and event sequence tracker with status nodes',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['data', 'timeline', 'activity', 'events']
  },
  'tree-view': {
    category: 'Data Display' as ComponentCategory,
    title: 'Tree View',
    description: 'Hierarchical navigation tree with collapsible branches and keyboard arrow navigation',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['data', 'tree', 'hierarchy', 'navigation']
  },

  // Feedback Components
  'alert': {
    category: 'Feedback' as ComponentCategory,
    title: 'Alert',
    description: 'A flexible alert component for displaying important messages with multiple variants, dismissible options, and enterprise features.',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['alert', 'notification', 'message', 'dismissible', 'enterprise', 'accessibility']
  },

  'toast': {
    category: 'Feedback' as ComponentCategory,
    title: 'Toast',
    description: 'Low-level toast notification primitive for displaying targeted status feedback. For multi-toast stacked queues, prefer Sonner.',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['toast', 'notification', 'message', 'temporary', 'primitive']
  },

  'sonner': {
    category: 'Feedback' as ComponentCategory,
    title: 'Sonner',
    description: 'Modern stacked toast notification queue with promise integration, custom actions, and automatic dismiss',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['sonner', 'toast', 'notification', 'stacked', 'queue']
  },
  'spinner': {
    category: 'Feedback' as ComponentCategory,
    title: 'Spinner',
    description: 'Accessible animated indeterminate loading indicator with screen reader support',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['feedback', 'loading', 'spinner', 'status']
  },
  'empty-state': {
    category: 'Feedback' as ComponentCategory,
    title: 'Empty State',
    description: 'Clean zero-data placeholder graphic and action container for empty views',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['feedback', 'empty', 'state', 'placeholder']
  },
  'banner': {
    category: 'Feedback' as ComponentCategory,
    title: 'Banner',
    description: 'Full-width top-level announcement banner with action links and persistent dismiss',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['feedback', 'banner', 'announcement', 'alert']
  },
  'message-bubble': {
    category: 'AI & Agents' as ComponentCategory,
    title: 'Message Bubble',
    description: 'Chat message bubble for user and AI agent responses with formatted content and copy actions',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['ai', 'agent', 'chat', 'message']
  },
  'reasoning-disclosure': {
    category: 'AI & Agents' as ComponentCategory,
    title: 'Reasoning Disclosure',
    description: 'Collapsible chain-of-thought disclosure card showing AI model thinking steps and duration',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['ai', 'agent', 'reasoning', 'disclosure', 'thinking']
  },
  'tool-call-card': {
    category: 'AI & Agents' as ComponentCategory,
    title: 'Tool Call Card',
    description: 'Structured card displaying AI agent tool invocations, arguments, execution status, and results',
    version: '3.0.0',
    status: 'stable' as const,
    tags: ['ai', 'agent', 'tool', 'function-calling']
  }
} as const

export type ComponentSlug = keyof typeof COMPONENT_REGISTRY

const REGISTRY_ALIASES: Record<string, ComponentSlug> = {
  inputotp: 'input-otp',
  radiogroup: 'radio-group',
  scrollarea: 'scroll-area',
  datatable: 'data-table',
  navigationmenu: 'navigation-menu',
  alertdialog: 'alert-dialog',
  dropdownmenu: 'dropdown-menu',
  contextmenu: 'context-menu',
  hovercard: 'hover-card',
  aspectratio: 'aspect-ratio',
  layout: 'layout-shell',
  breadcrumb: 'breadcrumbs',
}

export function getComponentBySlug(slug: string) {
  const canonical = REGISTRY_ALIASES[slug] || (slug as ComponentSlug)
  return COMPONENT_REGISTRY[canonical] || null
}

export function getAllComponents() {
  return Object.entries(COMPONENT_REGISTRY).map(([slug, meta]) => ({
    slug,
    ...meta
  }))
}

export function getComponentsByCategory(category: ComponentCategory) {
  return Object.entries(COMPONENT_REGISTRY)
    .filter(([, meta]) => meta.category === category)
    .map(([slug, meta]) => ({
      slug,
      ...meta
    }))
}
