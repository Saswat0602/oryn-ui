import React, { useState } from 'react'
import { 
  Accordion, 
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  DateTimePicker, 
  InputOTP, 
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  RadioGroup, 
  RadioGroupItem, 
  Tabs, 
  TabsList,
  TabsTrigger,
  TabsContent,
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription,
  FormMessage, 
  Input,
  Button,
  PasswordInput,
  NumberInput,
  MultiSelect,
  DateRangePicker,
  TimePicker,
  ColorPicker,
  FileUpload,
  PromptInput,
  type DateRange,
  type MultiSelectOption,
  Calendar as MadCalendar 
} from 'oryn-ui'
import { Calendar as CalendarIcon, Clock, Sliders, Palette, CalendarDays, Zap, User, Shield, Bell, Home as HomeIcon, Folder, FileText, Layers, Slash } from 'lucide-react'

// Breadcrumb Designs Demo Component
function BreadcrumbDesignsDemo() {
  const [selectedVariant, setSelectedVariant] = useState('default')
  
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Smartphones' }
  ]

  const variants = ['default', 'minimal', 'outlined', 'modern', 'card', 'pill', 'gradient', 'steps']

  return (
    <div className="space-y-6">
      {/* Variant Selector */}
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant}
            onClick={() => setSelectedVariant(variant)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedVariant === variant 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {variant}
          </button>
        ))}
      </div>

      {/* Breadcrumb Display */}
      <div className="p-4 bg-muted/30 border border-border rounded-lg">
        <Breadcrumbs 
          items={items} 
          variant={selectedVariant as 'default' | 'minimal' | 'outlined' | 'modern' | 'card' | 'pill' | 'gradient' | 'steps'}
          showHomeIcon={selectedVariant !== 'steps'}
        />
      </div>
    </div>
  )
}

// DateTime Picker Demo Component
function DateTimePickerDemo() {
  const [dateValue, setDateValue] = useState<Date | null>(null)
  const [timeValue, setTimeValue] = useState<Date | null>(null)
  const [bothValue, setBothValue] = useState<Date | null>(new Date())

  return (
    <div className="min-h-[500px] bg-card p-6 rounded-xl border border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-3">Modern DateTime Picker</h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            A highly reusable, modern DateTime picker component with excellent UI/UX, multiple modes, and full user control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-xs">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <CalendarIcon className="mr-2 text-primary" size={20} />
              Date Only
            </h3>
            <div className="max-w-sm">
              <DateTimePicker
                mode="date"
                value={dateValue}
                onChange={(d) => setDateValue(d)}
                placeholder="Select a date"
              />
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Selected:</p>
              <p className="font-mono text-sm">
                {dateValue ? dateValue.toLocaleDateString() : 'None'}
              </p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-xs">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Clock className="mr-2 text-primary" size={20} />
              Time Only (12hr)
            </h3>
            <div className="max-w-sm">
              <DateTimePicker
                mode="time"
                timeFormat="12"
                value={timeValue}
                onChange={(d) => setTimeValue(d)}
                placeholder="Select time"
              />
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Selected:</p>
              <p className="font-mono text-sm">
                {timeValue
                  ? timeValue.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: '2-digit' })
                  : 'None'}
              </p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-xs md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <CalendarIcon className="mr-1 text-primary" size={20} />
              <Clock className="mr-2 text-primary" size={20} />
              Date &amp; Time
            </h3>
            <div className="max-w-sm">
              <DateTimePicker
                mode="both"
                timeFormat="12"
                value={bothValue}
                onChange={(d) => setBothValue(d)}
                placeholder="Select date & time"
              />
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Selected:</p>
              <p className="font-mono text-sm">
                {bothValue
                  ? `${bothValue.toLocaleDateString()} ${bothValue.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: '2-digit' })}`
                  : 'None'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Component Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Sliders size={16} className="text-primary" /> Highly Configurable</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Three modes: date, time, or both</li>
                <li>• 12/24 hour time format support</li>
                <li>• Customizable placeholders</li>
                <li>• Disabled state support</li>
                <li>• Custom CSS classes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Palette size={16} className="text-primary" /> Modern Design</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Clean, minimal interface</li>
                <li>• Smooth animations & transitions</li>
                <li>• Responsive design</li>
                <li>• Focus states & accessibility</li>
                <li>• Modern color scheme</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><CalendarDays size={16} className="text-primary" /> Smart Calendar</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Clickable month/year headers</li>
                <li>• Modal selectors for quick navigation</li>
                <li>• Today highlighting</li>
                <li>• Previous/next month navigation</li>
                <li>• Weekend styling</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Zap size={16} className="text-primary" /> User Experience</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Click outside to close</li>
                <li>• Tab navigation between date/time</li>
                <li>• Intuitive time selection</li>
                <li>• Real-time value updates</li>
                <li>• Keyboard accessible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export interface ComponentExample {
  title: string
  description?: string
  code: string
  preview: React.ReactNode
}

export const formsExamples: Record<string, ComponentExample[]> = {
  accordion: [
    {
      title: 'Basic Accordion',
      description: 'A simple accordion component with smooth animations',
      code: `import { Accordion } from 'oryn-ui'

export function AccordionExample() {
  const items = [
    {
      id: 'item-1',
      title: 'What is React?',
      content: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".'
    },
    {
      id: 'item-2',
      title: 'What is TypeScript?',
      content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds static type definitions to JavaScript.'
    }
  ]

  return <Accordion items={items} />
}`,
      preview: (
        <div className="w-full max-w-md">
          <Accordion 
            items={[
              {
                id: 'item-1',
                title: 'What is React?',
                content: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".'
              },
              {
                id: 'item-2',
                title: 'What is TypeScript?',
                content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds static type definitions to JavaScript.'
              }
            ]} 
          />
        </div>
      )
    },
    {
      title: 'Multiple Open Accordion',
      description: 'Accordion that allows multiple items to be open simultaneously',
      code: `import { Accordion } from 'oryn-ui'

export function MultipleAccordion() {
  const items = [
    {
      id: 'item-1',
      title: 'Frontend Technologies',
      content: 'React, Vue, Angular, Svelte'
    },
    {
      id: 'item-2',
      title: 'Backend Technologies',
      content: 'Node.js, Python, Java, Go'
    },
    {
      id: 'item-3',
      title: 'Database Technologies',
      content: 'PostgreSQL, MongoDB, Redis, MySQL'
    }
  ]

  return <Accordion items={items} allowMultiple={true} />
}`,
      preview: (
        <div className="w-full max-w-md">
          <Accordion 
            items={[
              {
                id: 'item-1',
                title: 'Frontend Technologies',
                content: 'React, Vue, Angular, Svelte'
              },
              {
                id: 'item-2',
                title: 'Backend Technologies',
                content: 'Node.js, Python, Java, Go'
              },
              {
                id: 'item-3',
                title: 'Database Technologies',
                content: 'PostgreSQL, MongoDB, Redis, MySQL'
              }
            ]} 
            allowMultiple={true}
          />
        </div>
      )
    },
    {
      title: 'Custom Icon Position',
      description: 'Accordion with icon positioned on the left side',
      code: `import { Accordion } from 'oryn-ui'
import { ChevronRight } from 'lucide-react'

export function CustomIconAccordion() {
  const items = [
    {
      id: 'item-1',
      title: 'Getting Started',
      content: 'Learn the basics of our platform'
    },
    {
      id: 'item-2',
      title: 'Advanced Features',
      content: 'Explore advanced functionality'
    }
  ]

  return (
    <Accordion 
      items={items} 
      iconPosition="left"
      customIcon={ChevronRight}
    />
  )
}`,
      preview: (
        <div className="w-full max-w-md">
          <Accordion 
            items={[
              {
                id: 'item-1',
                title: 'Getting Started',
                content: 'Learn the basics of our platform'
              },
              {
                id: 'item-2',
                title: 'Advanced Features',
                content: 'Explore advanced functionality'
              }
            ]} 
            iconPosition="left"
          />
        </div>
      )
    },
    {
      title: 'Rich Content',
      description: 'Accordion with complex content including lists and formatting',
      code: `import { Accordion } from 'oryn-ui'

export function EnterpriseAccordion() {
  const items = [
    {
      id: 'item-1',
      title: 'Getting Started',
      content: 'Learn the basics of our platform and how to get started quickly.'
    },
    {
      id: 'item-2',
      title: 'Advanced Features',
      content: 'Explore advanced features and customization options.'
    },
    {
      id: 'item-3',
      title: 'API Reference',
      content: 'Complete API documentation and examples.'
    }
  ]

  return (
    <Accordion
      items={items}
      allowMultiple={true}
      type="multiple"
      aria-label="Documentation sections"
    />
  )
}`,
      preview: (
        <div className="w-full max-w-md">
          <Accordion
            items={[
              {
                id: 'item-1',
                title: 'Getting Started',
                content: 'Learn the basics of our platform and how to get started quickly.'
              },
              {
                id: 'item-2',
                title: 'Advanced Features',
                content: 'Explore advanced features and customization options.'
              },
              {
                id: 'item-3',
                title: 'API Reference',
                content: 'Complete API documentation and examples.'
              }
            ]}
            type="multiple"
            aria-label="Documentation sections"
          />
        </div>
      )
    }
  ],

  breadcrumbs: [
    {
      title: 'Minimal & Chevron Styles',
      description: 'Clean minimalist breadcrumb paths with configurable separators such as forward slashes or chevrons',
      code: `import { Breadcrumbs } from 'oryn-ui'

export function BreadcrumbsSeparatorDemo() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Workspace', href: '/workspace' },
    { label: 'Design System', href: '/workspace/design-system' },
    { label: 'Navigation' }
  ]

  return (
    <div className="space-y-4">
      {/* Default Slash Separator */}
      <Breadcrumbs items={items} separator="/" />

      {/* Chevron Separator */}
      <Breadcrumbs 
        items={items} 
        separator={<span className="text-muted-foreground/60">›</span>} 
      />
    </div>
  )
}`,
      preview: (
        <div className="space-y-4 p-4 w-full">
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">Slash separator</span>
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '#' },
                { label: 'Workspace', href: '#' },
                { label: 'Design System', href: '#' },
                { label: 'Navigation' }
              ]} 
              separator="/" 
            />
          </div>
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">Chevron separator</span>
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '#' },
                { label: 'Workspace', href: '#' },
                { label: 'Design System', href: '#' },
                { label: 'Navigation' }
              ]} 
              separator={<span className="text-muted-foreground/60 font-semibold">›</span>} 
            />
          </div>
        </div>
      )
    },
    {
      title: 'Pill & Outlined Badge Styles with Icons',
      description: 'Card-backed, pill, and bordered badge breadcrumbs equipped with Lucide vector icons',
      code: `import { Breadcrumbs } from 'oryn-ui'
import { Home, Folder, Layers, FileText } from 'lucide-react'

export function BreadcrumbsBadgesDemo() {
  const items = [
    { label: 'Root', href: '/', icon: <Home className="w-3.5 h-3.5 inline mr-1" /> },
    { label: 'Components', href: '/components', icon: <Folder className="w-3.5 h-3.5 inline mr-1" /> },
    { label: 'Forms', href: '/components/forms', icon: <Layers className="w-3.5 h-3.5 inline mr-1" /> },
    { label: 'Breadcrumbs.tsx', icon: <FileText className="w-3.5 h-3.5 inline mr-1" /> }
  ]

  return (
    <div className="space-y-4">
      {/* Outlined Badge Variant */}
      <Breadcrumbs items={items} variant="outlined" />

      {/* Pill Badge Variant */}
      <Breadcrumbs items={items} variant="pill" />

      {/* Card Elevated Variant */}
      <Breadcrumbs items={items} variant="card" />
    </div>
  )
}`,
      preview: (
        <div className="space-y-3.5 p-2 w-full">
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">Outlined Badge</span>
            <Breadcrumbs 
              variant="outlined"
              items={[
                { label: 'Root', href: '#', icon: <HomeIcon className="w-3.5 h-3.5 inline mr-1" /> },
                { label: 'Components', href: '#', icon: <Folder className="w-3.5 h-3.5 inline mr-1" /> },
                { label: 'Forms', href: '#', icon: <Layers className="w-3.5 h-3.5 inline mr-1" /> },
                { label: 'Breadcrumbs.tsx', icon: <FileText className="w-3.5 h-3.5 inline mr-1" /> }
              ]}
            />
          </div>
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">Pill Badge</span>
            <Breadcrumbs 
              variant="pill"
              items={[
                { label: 'Root', href: '#', icon: <HomeIcon className="w-3.5 h-3.5 inline mr-1" /> },
                { label: 'Components', href: '#', icon: <Folder className="w-3.5 h-3.5 inline mr-1" /> },
                { label: 'Forms', href: '#', icon: <Layers className="w-3.5 h-3.5 inline mr-1" /> },
                { label: 'Breadcrumbs.tsx', icon: <FileText className="w-3.5 h-3.5 inline mr-1" /> }
              ]}
            />
          </div>
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">Card Container</span>
            <Breadcrumbs 
              variant="card"
              items={[
                { label: 'Root', href: '#', icon: <HomeIcon className="w-3.5 h-3.5 inline mr-1" /> },
                { label: 'Components', href: '#', icon: <Folder className="w-3.5 h-3.5 inline mr-1" /> },
                { label: 'Forms', href: '#', icon: <Layers className="w-3.5 h-3.5 inline mr-1" /> },
                { label: 'Breadcrumbs.tsx', icon: <FileText className="w-3.5 h-3.5 inline mr-1" /> }
              ]}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Collapsed Path with Ellipsis',
      description: 'Compact breadcrumb for deeply nested routes that collapses intermediate segments into an ellipsis',
      code: `import { Breadcrumbs } from 'oryn-ui'

export function CollapsedBreadcrumbsDemo() {
  const deepItems = [
    { label: 'Home', href: '/' },
    { label: 'Enterprise', href: '/enterprise' },
    { label: 'Organizations', href: '/enterprise/orgs' },
    { label: 'Acme Corp', href: '/enterprise/orgs/acme' },
    { label: 'Engineering', href: '/enterprise/orgs/acme/engineering' },
    { label: 'Deployments', href: '/enterprise/orgs/acme/engineering/deployments' },
    { label: 'Production Pipeline' }
  ]

  return (
    <Breadcrumbs 
      items={deepItems} 
      maxItems={4} 
      showHomeIcon 
    />
  )
}`,
      preview: (
        <div className="p-4 w-full">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '#' },
              { label: 'Enterprise', href: '#' },
              { label: 'Organizations', href: '#' },
              { label: 'Acme Corp', href: '#' },
              { label: 'Engineering', href: '#' },
              { label: 'Deployments', href: '#' },
              { label: 'Production Pipeline' }
            ]} 
            maxItems={4} 
            showHomeIcon 
          />
        </div>
      )
    },
    {
      title: 'Declarative Compound Breadcrumb',
      description: 'Radix & shadcn compatible composable compound breadcrumbs with active page and semantic list semantics',
      code: `import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbPage,
  BreadcrumbEllipsis 
} from 'oryn-ui'

export function CompoundBreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
      preview: (
        <div className="p-4 w-full flex items-center justify-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )
    }
  ],

  'datetime-picker': [
    {
      title: 'Modern Date & Time Picker',
      description: 'Beautiful, modern date and time picker with horizontal time selection and custom Select components - choose date, time, or both together',
      code: `import { DateTimePicker } from 'oryn-ui'
import { useState } from 'react'

export function DateTimePickerDemo() {
  const [selectedMode, setSelectedMode] = useState<'date' | 'time' | 'both'>('both')
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex gap-2">
        {(['date', 'time', 'both'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={\`px-4 py-2 text-sm rounded-md transition-colors \${
              selectedMode === mode 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }\`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* DateTime Picker */}
      <div className="max-w-sm">
        <DateTimePicker 
          mode={selectedMode}
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder={\`Select \${selectedMode}\`}
        />
      </div>

      {/* Selected Value Display */}
      {selectedDate && (
        <div className="p-3 bg-muted rounded-md border border-border">
          <p className="text-sm text-foreground">
            <strong>Selected:</strong> {selectedDate.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}`,
      preview: (
        <DateTimePickerDemo />
      )
    }
  ],


  'input-otp': [
    {
      title: 'Grouped OTP with Separator',
      description: 'A composable one-time password input with separated groups, active focus rings, and clipboard paste support',
      code: `import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from 'oryn-ui'
import { useState } from 'react'

export function InputOTPExample() {
  const [value, setValue] = useState('')

  return (
    <div className="space-y-3">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-muted-foreground">
        Entered Code: {value || 'None'}
      </p>
    </div>
  )
}`,
      preview: <InputOTPDemo />
    },
    {
      title: 'Masked Security Pin',
      description: 'Masked input for 4-digit security PINs and credentials',
      code: `import { InputOTP, InputOTPGroup, InputOTPSlot } from 'oryn-ui'
import { useState } from 'react'

export function MaskedPINExample() {
  const [pin, setPin] = useState('')

  return (
    <InputOTP maxLength={4} value={pin} onChange={setPin} mask type="number">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  )
}`,
      preview: <MaskedPINDemo />
    }
  ],

  'radio-group': [
    {
      title: 'Basic Radio Group',
      description: 'A simple radio group component',
      code: `import { RadioGroup } from 'oryn-ui'

export function RadioGroupExample() {
  return (
    <RadioGroup>
      <RadioGroupItem value="option1">Option 1</RadioGroupItem>
      <RadioGroupItem value="option2">Option 2</RadioGroupItem>
      <RadioGroupItem value="option3">Option 3</RadioGroupItem>
    </RadioGroup>
  )
}`,
      preview: (
        <div className="w-full max-w-sm">
          <RadioGroup>
            <RadioGroupItem value="option1">Option 1</RadioGroupItem>
            <RadioGroupItem value="option2">Option 2</RadioGroupItem>
            <RadioGroupItem value="option3">Option 3</RadioGroupItem>
          </RadioGroup>
        </div>
      )
    }
  ],

  tabs: [
    {
      title: 'Compound Tabs (Radix / shadcn Style)',
      description: 'Composable tabs with accessible keyboard roving focus, TabPanels, and form cards',
      code: `import { Tabs, TabsList, TabsTrigger, TabsContent, Input, Button } from 'oryn-ui'

export function AccountTabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="rounded-xl border border-border bg-card p-4 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Account Information</h4>
            <p className="text-xs text-muted-foreground">Make changes to your personal account profile here.</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">Display Name</label>
            <Input defaultValue="Saswat Mohanty" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">Email</label>
            <Input defaultValue="saswat@example.com" />
          </div>
          <Button size="sm">Save Changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="rounded-xl border border-border bg-card p-4 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Security & Password</h4>
            <p className="text-xs text-muted-foreground">Change your password here. After saving, you will be logged out.</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">Current Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">New Password</label>
            <Input type="password" />
          </div>
          <Button size="sm">Update Password</Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}`,
      preview: (
        <div className="w-full max-w-md">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="rounded-xl border border-border bg-card p-4 space-y-4 shadow-2xs">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-foreground">Account Information</h4>
                  <p className="text-xs text-muted-foreground">Make changes to your personal account profile here.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Display Name</label>
                  <Input defaultValue="Saswat Mohanty" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Email</label>
                  <Input defaultValue="saswat@example.com" />
                </div>
                <Button size="sm">Save Changes</Button>
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div className="rounded-xl border border-border bg-card p-4 space-y-4 shadow-2xs">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-foreground">Security & Password</h4>
                  <p className="text-xs text-muted-foreground">Change your password here. After saving, you will be logged out.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Current Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">New Password</label>
                  <Input type="password" />
                </div>
                <Button size="sm">Update Password</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )
    },
    {
      title: 'Underline Tabs with Icons',
      description: 'Header style tabs with semantic Lucide vector icons and active border indicator',
      code: `import { Tabs } from 'oryn-ui'
import { User, Shield, Bell } from 'lucide-react'

export function UnderlineTabsDemo() {
  const items = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="h-4 w-4" />,
      content: <div className="p-4 rounded-lg bg-muted/40 text-xs">Manage personal information and company profile.</div>
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Shield className="h-4 w-4" />,
      content: <div className="p-4 rounded-lg bg-muted/40 text-xs">Configure two-factor authentication and active sessions.</div>
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="h-4 w-4" />,
      badge: 3,
      content: <div className="p-4 rounded-lg bg-muted/40 text-xs">Customize email and in-app alerts preferences.</div>
    }
  ]

  return <Tabs variant="underline" items={items} />
}`,
      preview: (
        <div className="w-full max-w-md">
          <Tabs 
            variant="underline"
            items={[
              {
                id: 'profile',
                label: 'Profile',
                icon: <User className="h-4 w-4" />,
                content: <div className="p-4 rounded-lg bg-muted/40 text-xs text-foreground">Manage personal information and company profile.</div>
              },
              {
                id: 'security',
                label: 'Security',
                icon: <Shield className="h-4 w-4" />,
                content: <div className="p-4 rounded-lg bg-muted/40 text-xs text-foreground">Configure two-factor authentication and active sessions.</div>
              },
              {
                id: 'notifications',
                label: 'Notifications',
                icon: <Bell className="h-4 w-4" />,
                badge: 3,
                content: <div className="p-4 rounded-lg bg-muted/40 text-xs text-foreground">Customize email and in-app alerts preferences.</div>
              }
            ]} 
          />
        </div>
      )
    },
    {
      title: 'Pills Tabs with Badges',
      description: 'Rounded pill triggers with active primary accent and counter badges',
      code: `import { Tabs } from 'oryn-ui'

export function PillsTabsDemo() {
  const items = [
    { id: 'all', label: 'All Tasks', badge: 12, content: 'Showing 12 total tasks across your projects.' },
    { id: 'pending', label: 'Pending', badge: 4, content: '4 tasks require your immediate review.' },
    { id: 'completed', label: 'Completed', badge: 8, content: '8 tasks finished in the current sprint.' }
  ]

  return <Tabs variant="pills" items={items} />
}`,
      preview: (
        <div className="w-full max-w-md">
          <Tabs 
            variant="pills"
            items={[
              { id: 'all', label: 'All Tasks', badge: 12, content: <div className="p-4 rounded-lg bg-muted/40 text-xs text-foreground">Showing 12 total tasks across your projects.</div> },
              { id: 'pending', label: 'Pending', badge: 4, content: <div className="p-4 rounded-lg bg-muted/40 text-xs text-foreground">4 tasks require your immediate review.</div> },
              { id: 'completed', label: 'Completed', badge: 8, content: <div className="p-4 rounded-lg bg-muted/40 text-xs text-foreground">8 tasks finished in the current sprint.</div> }
            ]} 
          />
        </div>
      )
    }
  ],

  form: [
    {
      title: 'Composable Form System',
      description: 'Context-driven accessible form fields with automatic ARIA linking and validation feedback',
      code: `import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage, 
  Input, 
  Button 
} from 'oryn-ui'
import { useState } from 'react'

export function ProfileForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ username?: string; email?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: { username?: string; email?: string } = {}
    if (username.length < 3) errs.username = 'Username must be at least 3 characters.'
    if (!email.includes('@')) errs.email = 'Please provide a valid corporate email.'
    setErrors(errs)
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <FormField name="username" error={errors.username}>
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="alex.chen" />
          </FormControl>
          <FormDescription>Your public display handle.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="email" error={errors.email}>
        <FormItem>
          <FormLabel>Work Email</FormLabel>
          <FormControl>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@company.com" />
          </FormControl>
          <FormDescription>Used for billing and security alerts.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit">Save Changes</Button>
    </Form>
  )
}`,
      preview: <FormDemo />
    }
  ],

  calendar: [
    {
      title: 'Interactive Calendar',
      description: 'A responsive calendar with month navigation and date selection',
      code: `import { Calendar } from 'oryn-ui'
import { useState } from 'react'

export function CalendarExample() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex justify-center p-4">
      <Calendar 
        value={date} 
        onChange={setDate} 
      />
    </div>
  )
}`,
      preview: <CalendarDemo />
    }
  ],

  'password-input': [
    {
      title: 'Password with Reveal & Strength Meter',
      description: 'Security password input with visibility toggle button and score meter',
      code: `import { PasswordInput } from 'oryn-ui'
import { useState } from 'react'

export function PasswordInputExample() {
  const [password, setPassword] = useState('')
  return (
    <div className="w-full max-w-sm space-y-3">
      <PasswordInput
        placeholder="Enter master password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        strengthMeter
        strengthScore={Math.min(4, Math.floor(password.length / 3))}
      />
    </div>
  )
}`,
      preview: <PasswordInputDemo />
    }
  ],

  'number-input': [
    {
      title: 'Number Stepper with Clamp Bounds',
      description: 'Numeric stepper with step buttons, keyboard arrow controls, and clamp validation',
      code: `import { NumberInput } from 'oryn-ui'
import { useState } from 'react'

export function NumberInputExample() {
  const [qty, setQty] = useState<number | undefined>(3)
  return (
    <div className="w-full max-w-xs space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Seat Quantity</label>
      <NumberInput
        min={1}
        max={50}
        step={1}
        value={qty}
        onChange={setQty}
      />
    </div>
  )
}`,
      preview: <NumberInputDemo />
    }
  ],

  'multi-select': [
    {
      title: 'Searchable Tag Multi-Select',
      description: 'Multi-value option selection with inline pill removal, search query filter, and max item badges',
      code: `import { MultiSelect } from 'oryn-ui'
import { useState } from 'react'

const ROLES = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Software Engineer', value: 'swe' },
  { label: 'Product Designer', value: 'designer' },
  { label: 'DevOps / SRE', value: 'devops' },
  { label: 'Billing Specialist', value: 'billing' }
]

export function MultiSelectExample() {
  const [selected, setSelected] = useState(['admin', 'swe'])

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Assigned Team Roles</label>
      <MultiSelect
        options={ROLES}
        value={selected}
        onChange={setSelected}
        placeholder="Choose roles..."
      />
    </div>
  )
}`,
      preview: <MultiSelectDemo />
    }
  ],

  'date-range-picker': [
    {
      title: 'Date Range with Preset Shortcuts',
      description: 'Dual-calendar range selector with fast preset buttons for common billing intervals',
      code: `import { DateRangePicker, DateRange } from 'oryn-ui'
import { useState } from 'react'

export function DateRangePickerExample() {
  const [range, setRange] = useState<DateRange>({
    from: new Date(2026, 9, 1),
    to: new Date(2026, 9, 31)
  })

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Audit Time Window</label>
      <DateRangePicker
        value={range}
        onChange={setRange}
      />
    </div>
  )
}`,
      preview: <DateRangePickerDemo />
    }
  ],

  'time-picker': [
    {
      title: 'Segmented Time Selector',
      description: 'Time picker supporting 12-hour AM/PM and 24-hour modes with minute stepper controls',
      code: `import { TimePicker } from 'oryn-ui'
import { useState } from 'react'

export function TimePickerExample() {
  const [time, setTime] = useState('09:30 AM')

  return (
    <div className="w-full max-w-xs space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Office Check-in Time</label>
      <TimePicker
        value={time}
        onChange={setTime}
        format="12h"
      />
    </div>
  )
}`,
      preview: <TimePickerDemo />
    }
  ],

  'color-picker': [
    {
      title: 'Interactive Popover Color Picker',
      description: 'Floating popover color picker with 2D saturation-value area, rainbow hue slider, direct hex/rgb/hsl inputs, and curated palette swatches',
      code: `import { ColorPicker } from 'oryn-ui'
import { useState } from 'react'

export function ColorPickerExample() {
  const [color, setColor] = useState('#4f46e5')

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Brand Accent Color
        </label>
        <p className="text-xs text-muted-foreground">Click to open the interactive color picker</p>
      </div>

      <ColorPicker
        value={color}
        onChange={setColor}
        showAlpha={false}
        showEyeDropper={true}
      />
    </div>
  )
}`,
      preview: <ColorPickerDemo />
    },
    {
      title: 'Embedded Inline Color Picker Canvas',
      description: 'Full 2D gradient canvas with alpha transparency slider rendered inline for design toolbars and inspector sidebars',
      code: `import { ColorPicker } from 'oryn-ui'
import { useState } from 'react'

export function InlineColorPickerExample() {
  const [color, setColor] = useState('#10b981')

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      inline={true}
      showAlpha={true}
      showEyeDropper={true}
    />
  )
}`,
      preview: <ColorPickerInlineDemo />
    }
  ],

  'file-upload': [
    {
      title: 'Drag & Drop File Upload Zone',
      description: 'Dropzone with drag feedback, file size limits, removal triggers, and thumbnail previews',
      code: `import { FileUpload } from 'oryn-ui'
import { useState } from 'react'

export function FileUploadExample() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="w-full max-w-md space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Identity Documents</label>
      <FileUpload
        value={files}
        onChange={setFiles}
        maxSize={10 * 1024 * 1024}
        maxFiles={3}
        accept="image/*,application/pdf"
        title="Upload passport or national ID"
        description="PDF, PNG, JPG up to 10MB"
      />
    </div>
  )
}`,
      preview: <FileUploadDemo />
    }
  ],

  'prompt-input': [
    {
      title: 'AI Prompt Input Box',
      description: 'Auto-expanding multi-line textarea with submit and stop actions, loading states, and keyboard Enter shortcuts',
      code: `import { PromptInput } from 'oryn-ui'
import { useState } from 'react'

export function PromptInputExample() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (text: string) => {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPrompt('')
    }, 2000)
  }

  return (
    <div className="w-full max-w-xl space-y-3">
      <PromptInput
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={handleSubmit}
        loading={loading}
        onStop={() => setLoading(false)}
        placeholder="Ask anything or generate code with AI..."
        showAttachButton
        maxRows={6}
      />
    </div>
  )
}`,
      preview: <PromptInputDemo />
    }
  ]
}

function InputOTPDemo() {
  const [value, setValue] = useState('482')

  return (
    <div className="w-full max-w-sm p-4 space-y-3">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-muted-foreground font-mono">
        Value: {value ? value : '<empty>'}
      </p>
    </div>
  )
}

function MaskedPINDemo() {
  const [pin, setPin] = useState('12')

  return (
    <div className="w-full max-w-sm p-4 space-y-3">
      <InputOTP maxLength={4} value={pin} onChange={setPin} mask type="number">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-muted-foreground font-mono">
        Pin length: {pin.length} / 4
      </p>
    </div>
  )
}

function PasswordInputDemo() {
  const [password, setPassword] = useState('SecretKey123!')
  return (
    <div className="w-full max-w-sm p-4">
      <PasswordInput
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        strengthMeter
        showRequirements
      />
    </div>
  )
}

function NumberInputDemo() {
  const [qty, setQty] = useState<number | undefined>(5)
  return (
    <div className="w-full max-w-xs p-4">
      <NumberInput
        min={1}
        max={20}
        step={1}
        value={qty}
        onChange={setQty}
      />
    </div>
  )
}

function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className="flex justify-center p-4">
      <MadCalendar value={date} onChange={setDate} />
    </div>
  )
}

function FormDemo() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!username.trim() || username.length < 3) {
      nextErrors.username = 'Username must be at least 3 characters.'
    }
    if (!email.trim() || !email.includes('@')) {
      nextErrors.email = 'Please provide a valid corporate email.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div className="w-full max-w-md p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <Form onSubmit={handleSubmit} className="space-y-4">
        <FormField name="username" error={errors.username}>
          <FormItem>
            <FormLabel>Workspace Username</FormLabel>
            <FormControl>
              <Input
                placeholder="alex.developer"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (errors.username) setErrors(prev => ({ ...prev, username: '' }))
                }}
              />
            </FormControl>
            <FormDescription>Your public display handle in this team.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="email" error={errors.email}>
          <FormItem>
            <FormLabel>Work Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                }}
              />
            </FormControl>
            <FormDescription>Used for billing and security alerts.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <div className="pt-2">
          <Button type="submit" className="w-full">
            {submitted ? 'Saved Successfully!' : 'Save Profile'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

const SAMPLE_ROLES: MultiSelectOption[] = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Software Engineer', value: 'swe' },
  { label: 'Product Designer', value: 'designer' },
  { label: 'DevOps / SRE', value: 'devops' },
  { label: 'Billing Specialist', value: 'billing' }
]

function MultiSelectDemo() {
  const [selected, setSelected] = useState(['admin', 'swe'])

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Assigned Team Roles</label>
      <MultiSelect
        options={SAMPLE_ROLES}
        value={selected}
        onChange={setSelected}
        placeholder="Choose roles..."
      />
      <p className="text-xs text-zinc-500">Selected values: {selected.join(', ') || 'None'}</p>
    </div>
  )
}

function DateRangePickerDemo() {
  const [range, setRange] = useState<DateRange>({
    from: new Date(2026, 9, 1),
    to: new Date(2026, 9, 31)
  })

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Audit Time Window</label>
      <DateRangePicker
        value={range}
        onChange={setRange}
      />
    </div>
  )
}

function TimePickerDemo() {
  const [time, setTime] = useState('09:30 AM')

  return (
    <div className="w-full max-w-xs space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Office Check-in Time</label>
      <TimePicker
        value={time}
        onChange={setTime}
        format="12h"
      />
      <p className="text-xs text-zinc-500">Formatted time: {time}</p>
    </div>
  )
}

function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="w-full max-w-md space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Identity Documents</label>
      <FileUpload
        value={files}
        onChange={setFiles}
        maxSize={10 * 1024 * 1024}
        maxFiles={3}
        accept="image/*,application/pdf"
        title="Upload passport or national ID"
        description="PDF, PNG, JPG up to 10MB"
      />
    </div>
  )
}

function PromptInputDemo() {
  const [prompt, setPrompt] = useState('Analyze our cloud microservices telemetry and suggest latency optimizations.')
  const [loading, setLoading] = useState(false)
  const [statusText, setStatusText] = useState('')

  const handleSubmit = (text: string) => {
    if (!text.trim()) return
    setLoading(true)
    setStatusText('Model is generating response...')
    setTimeout(() => {
      setLoading(false)
      setStatusText('Response generated successfully.')
      setTimeout(() => setStatusText(''), 3000)
    }, 2500)
  }

  const handleStop = () => {
    setLoading(false)
    setStatusText('Generation stopped by user.')
    setTimeout(() => setStatusText(''), 3000)
  }

  return (
    <div className="w-full max-w-xl space-y-3">
      <PromptInput
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={handleSubmit}
        loading={loading}
        onStop={handleStop}
        placeholder="Type a prompt for the AI assistant... (Shift+Enter for newline)"
        maxRows={6}
      />
      {statusText && (
        <p className="text-xs text-primary font-medium animate-pulse">
          {statusText}
        </p>
      )}
    </div>
  )
}

function ColorPickerDemo() {
  const [color, setColor] = useState('#4f46e5')
  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Brand Accent Color
        </label>
        <p className="text-xs text-muted-foreground">Click the trigger to open the interactive color picker</p>
      </div>
      <ColorPicker
        value={color}
        onChange={setColor}
        showAlpha={false}
        showEyeDropper={true}
      />
      <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border/60 bg-muted/20">
        <div 
          className="w-7 h-7 rounded-md border border-border shadow-xs shrink-0" 
          style={{ backgroundColor: color }} 
        />
        <div className="min-w-0 flex-1">
          <span className="text-xs font-mono font-semibold text-foreground block truncate uppercase">
            {color}
          </span>
          <span className="text-[10px] text-muted-foreground">Active selection</span>
        </div>
      </div>
    </div>
  )
}

function ColorPickerInlineDemo() {
  const [color, setColor] = useState('#10b981')
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 py-2">
      <ColorPicker
        value={color}
        onChange={setColor}
        inline={true}
        showAlpha={true}
        showEyeDropper={true}
      />
      <span className="text-xs font-mono text-muted-foreground">
        Selected: <strong className="text-foreground uppercase">{color}</strong>
      </span>
    </div>
  )
}
