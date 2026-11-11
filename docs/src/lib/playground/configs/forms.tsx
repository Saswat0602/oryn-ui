import React, { useState } from 'react'
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent,
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Calendar,
  DateRangePicker,
  DateTimePicker,
  FileUpload,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  MultiSelect,
  NumberInput,
  PasswordInput,
  PromptInput,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TimePicker,
  ColorPicker,
  Label
} from 'oryn-ui'
import { PlaygroundConfig } from '@/components/playground/types'

// Interactive wrapper for InputOTP
function InputOTPPlaygroundWrapper({ maxLength, mask, disabled, onComplete }: any) {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        maxLength={maxLength}
        value={value}
        onChange={(v: string) => {
          setValue(v)
          if (v.length === maxLength) {
            onComplete?.(v)
          }
        }}
        mask={mask}
        disabled={disabled}
      >
        {maxLength === 6 ? (
          <div className="flex items-center gap-2">
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
          </div>
        ) : (
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        )}
      </InputOTP>
      <span className="text-[11px] text-muted-foreground font-mono">
        Current Value: &quot;{value}&quot;
      </span>
    </div>
  )
}

export const formsPlaygrounds: Record<string, PlaygroundConfig> = {
  accordion: {
    slug: 'accordion',
    title: 'Accordion',
    componentName: 'Accordion',
    defaultProps: {
      type: 'single',
      collapsible: true
    },
    controls: [
      {
        name: 'type',
        label: 'Expansion Type',
        type: 'segmented',
        defaultValue: 'single',
        options: ['single', 'multiple'],
        category: 'options',
        description: 'Allows single or concurrent item expansion'
      },
      {
        name: 'collapsible',
        label: 'Collapsible',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Allows closing the active item in single mode'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-md">
        <Accordion
          type={props.type as any}
          collapsible={props.collapsible}
          defaultValue="item-1"
          onValueChange={(val: any) => context.onEvent('onValueChange', val)}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Edge Middleware?</AccordionTrigger>
            <AccordionContent>
              Edge Middleware executes before a request is processed by cache or functions, enabling geo-routing and authentication rewrites.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does Server Actions revalidation work?</AccordionTrigger>
            <AccordionContent>
              Server Actions integrate directly with the Next.js cache, revalidating cache tags and paths atomically upon completion.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I deploy custom Docker containers?</AccordionTrigger>
            <AccordionContent>
              Yes, Madrixa UI services and Vercel compute support OCI-compliant container daemons.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  },

  breadcrumbs: {
    slug: 'breadcrumbs',
    title: 'Breadcrumbs',
    componentName: 'Breadcrumbs',
    defaultProps: {
      separator: '/'
    },
    controls: [
      {
        name: 'separator',
        label: 'Separator Style',
        type: 'segmented',
        defaultValue: '/',
        options: ['/', '>', '•'],
        category: 'appearance',
        description: 'Visual character dividing path segments'
      }
    ],
    render: (props) => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Organization</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{props.separator}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Production Cluster</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{props.separator}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Security Policies</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  },

  calendar: {
    slug: 'calendar',
    title: 'Calendar',
    componentName: 'Calendar',
    defaultProps: {
      disabled: false,
      design: 'modern'
    },
    controls: [
      {
        name: 'design',
        label: 'Design Theme',
        type: 'select',
        defaultValue: 'modern',
        options: [
          { label: 'Modern', value: 'modern' },
          { label: 'Classic', value: 'classic' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Card', value: 'card' }
        ],
        category: 'appearance',
        description: 'Visual presentation style'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Prevents day selection'
      }
    ],
    render: (props, context) => (
      <div className="p-2 rounded-xl border border-border/60 bg-card shadow-xs">
        <Calendar
          design={props.design}
          disabled={props.disabled}
          onChange={(date: any) => context.onEvent('onChange', date?.toISOString())}
        />
      </div>
    )
  },

  'date-range-picker': {
    slug: 'date-range-picker',
    title: 'DateRangePicker',
    componentName: 'DateRangePicker',
    defaultProps: {
      disabled: false,
      placeholder: 'Select reporting date range...'
    },
    controls: [
      {
        name: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'Select reporting date range...',
        category: 'content',
        description: 'Prompt when range is unselected'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables trigger'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-sm">
        <DateRangePicker
          disabled={props.disabled}
          placeholder={props.placeholder}
          onChange={(range: any) => context.onEvent('onChange', range)}
        />
      </div>
    )
  },

  'datetime-picker': {
    slug: 'datetime-picker',
    title: 'DateTimePicker',
    componentName: 'DateTimePicker',
    defaultProps: {
      mode: 'both',
      timeFormat: '12',
      disabled: false,
      placeholder: 'Select deployment window...'
    },
    controls: [
      {
        name: 'mode',
        label: 'Picker Mode',
        type: 'segmented',
        defaultValue: 'both',
        options: ['date', 'time', 'both'],
        category: 'options',
        description: 'Configures calendar, clock, or both'
      },
      {
        name: 'timeFormat',
        label: 'Clock Format',
        type: 'segmented',
        defaultValue: '12',
        options: ['12', '24'],
        category: 'options',
        description: 'AM/PM or 24-hour mode'
      },
      {
        name: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'Select deployment window...',
        category: 'content',
        description: 'Watermark hint'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables picker'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-sm">
        <DateTimePicker
          mode={props.mode}
          timeFormat={props.timeFormat}
          disabled={props.disabled}
          placeholder={props.placeholder}
          onChange={(dt: any) => context.onEvent('onChange', dt)}
        />
      </div>
    )
  },

  'file-upload': {
    slug: 'file-upload',
    title: 'FileUpload',
    componentName: 'FileUpload',
    defaultProps: {
      maxFiles: 3,
      disabled: false
    },
    controls: [
      {
        name: 'maxFiles',
        label: 'Max Files Allowed',
        type: 'segmented',
        defaultValue: 3,
        options: [1, 3, 5],
        category: 'options',
        description: 'Upload queue capacity'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables drop zone'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-md">
        <FileUpload
          maxFiles={props.maxFiles}
          disabled={props.disabled}
          onChange={(files: any) => context.onEvent('onChange', `${files.length} files selected`)}
        />
      </div>
    )
  },

  form: {
    slug: 'form',
    title: 'Form',
    componentName: 'Form',
    defaultProps: {
      disabled: false
    },
    controls: [
      {
        name: 'disabled',
        label: 'Form Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables inputs within the form'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm space-y-4 p-4 rounded-xl border border-border/60 bg-card">
        <div className="space-y-1.5">
          <Label required>Project Name</Label>
          <input 
            className="w-full rounded-md border border-border px-3 py-1.5 text-xs bg-background" 
            placeholder="my-next-app" 
            disabled={props.disabled}
          />
          <p className="text-[11px] text-muted-foreground">Unique identifier on Vercel Edge.</p>
        </div>
      </div>
    )
  },

  'input-otp': {
    slug: 'input-otp',
    title: 'InputOTP',
    componentName: 'InputOTP',
    defaultProps: {
      maxLength: 6,
      mask: false,
      disabled: false
    },
    controls: [
      {
        name: 'maxLength',
        label: 'OTP Length',
        type: 'segmented',
        defaultValue: 6,
        options: [4, 6],
        category: 'options',
        description: 'Total number of verification digit slots'
      },
      {
        name: 'mask',
        label: 'Mask Digits (PIN)',
        type: 'boolean',
        defaultValue: false,
        category: 'appearance',
        description: 'Hides numerical digits with bullet dots (•)'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables input slot editing'
      }
    ],
    render: (props, context) => (
      <InputOTPPlaygroundWrapper
        maxLength={props.maxLength}
        mask={props.mask}
        disabled={props.disabled}
        onComplete={(code: string) => context.onEvent('onComplete', code)}
      />
    )
  },

  'multi-select': {
    slug: 'multi-select',
    title: 'MultiSelect',
    componentName: 'MultiSelect',
    defaultProps: {
      placeholder: 'Select cluster tags...',
      disabled: false
    },
    controls: [
      {
        name: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'Select cluster tags...',
        category: 'content',
        description: 'Hint when selection is empty'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables multi-select'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-sm">
        <MultiSelect
          placeholder={props.placeholder}
          disabled={props.disabled}
          options={[
            { label: 'Production (iad1)', value: 'prod' },
            { label: 'Staging (sfo1)', value: 'stage' },
            { label: 'Serverless Functions', value: 'fns' },
            { label: 'Edge Middleware', value: 'edge' }
          ]}
          defaultValue={['prod', 'edge']}
          onChange={(selected: any) => context.onEvent('onChange', selected)}
        />
      </div>
    )
  },

  'number-input': {
    slug: 'number-input',
    title: 'NumberInput',
    componentName: 'NumberInput',
    defaultProps: {
      min: 1,
      max: 100,
      step: 1,
      size: 'md',
      disabled: false
    },
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Height and stepper button dimensions'
      },
      {
        name: 'step',
        label: 'Step Amount',
        type: 'segmented',
        defaultValue: 1,
        options: [1, 5, 10],
        category: 'options',
        description: 'Increment/decrement value per click'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables stepper buttons and input'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-xs">
        <NumberInput
          min={props.min}
          max={props.max}
          step={props.step}
          size={props.size}
          disabled={props.disabled}
          defaultValue={12}
          onChange={(val: any) => context.onEvent('onChange', val)}
        />
      </div>
    )
  },

  'password-input': {
    slug: 'password-input',
    title: 'PasswordInput',
    componentName: 'PasswordInput',
    defaultProps: {
      strengthMeter: true,
      showRequirements: true,
      size: 'md',
      disabled: false,
      placeholder: 'Enter secure master key...'
    },
    controls: [
      {
        name: 'strengthMeter',
        label: 'Password Strength Meter',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Renders dynamic complexity progress bar'
      },
      {
        name: 'showRequirements',
        label: 'Show Requirements Checklist',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Displays real-time criteria badges'
      },
      {
        name: 'size',
        label: 'Input Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Field height and font size'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables editing'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-sm">
        <PasswordInput
          strengthMeter={props.strengthMeter}
          showRequirements={props.showRequirements}
          size={props.size}
          disabled={props.disabled}
          placeholder={props.placeholder}
          onChange={(e) => context.onEvent('onChange', e.target.value.length ? '***' : '')}
        />
      </div>
    )
  },

  'prompt-input': {
    slug: 'prompt-input',
    title: 'PromptInput',
    componentName: 'PromptInput',
    defaultProps: {
      placeholder: 'Ask AI assistant to generate component...',
      loading: false,
      disabled: false
    },
    controls: [
      {
        name: 'placeholder',
        label: 'Placeholder Text',
        type: 'text',
        defaultValue: 'Ask AI assistant to generate component...',
        category: 'content',
        description: 'Prompt guidance'
      },
      {
        name: 'loading',
        label: 'Streaming / Loading',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables submit and displays loader'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables prompt input'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-md">
        <PromptInput
          placeholder={props.placeholder}
          loading={props.loading}
          disabled={props.disabled}
          onSubmit={(text: any) => context.onEvent('onSubmit', text)}
        />
      </div>
    )
  },

  'radio-group': {
    slug: 'radio-group',
    title: 'RadioGroup',
    componentName: 'RadioGroup',
    defaultProps: {
      disabled: false
    },
    controls: [
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables entire radio group'
      }
    ],
    render: (props, context) => (
      <RadioGroup
        disabled={props.disabled}
        defaultValue="pro"
        onValueChange={(val: any) => context.onEvent('onValueChange', val)}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="starter" id="r-starter" />
          <Label htmlFor="r-starter">Starter ($0/mo)</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="pro" id="r-pro" />
          <Label htmlFor="r-pro">Pro ($20/mo)</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="enterprise" id="r-ent" />
          <Label htmlFor="r-ent">Enterprise (Custom)</Label>
        </div>
      </RadioGroup>
    )
  },

  tabs: {
    slug: 'tabs',
    title: 'Tabs',
    componentName: 'Tabs',
    defaultProps: {
      variant: 'default',
      orientation: 'horizontal'
    },
    controls: [
      {
        name: 'variant',
        label: 'Tabs Variant',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Pills', value: 'pills' },
          { label: 'Bordered', value: 'bordered' },
          { label: 'Underline', value: 'underline' }
        ],
        category: 'appearance',
        description: 'Visual indicator styling'
      },
      {
        name: 'orientation',
        label: 'Orientation',
        type: 'segmented',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        category: 'appearance',
        description: 'Tab strip axis layout'
      }
    ],
    render: (props, context) => (
      <Tabs
        variant={props.variant}
        orientation={props.orientation}
        defaultValue="overview"
        onValueChange={(tab: any) => context.onEvent('onValueChange', tab)}
        className="w-full max-w-md"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-4 rounded-lg border border-border/50 bg-card text-xs">
          Production clusters healthy across 3 availability zones.
        </TabsContent>
        <TabsContent value="deployments" className="p-4 rounded-lg border border-border/50 bg-card text-xs">
          Latest commit deployed 4 minutes ago via GitHub Actions.
        </TabsContent>
        <TabsContent value="settings" className="p-4 rounded-lg border border-border/50 bg-card text-xs">
          Configure domains, SSL certificates, and environment variables.
        </TabsContent>
      </Tabs>
    )
  },

  'time-picker': {
    slug: 'time-picker',
    title: 'TimePicker',
    componentName: 'TimePicker',
    defaultProps: {
      format: '12h',
      disabled: false
    },
    controls: [
      {
        name: 'format',
        label: 'Clock Format',
        type: 'segmented',
        defaultValue: '12h',
        options: ['12h', '24h'],
        category: 'options',
        description: '12-hour or 24-hour time notation'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables clock'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-xs">
        <TimePicker
          format={props.format}
          disabled={props.disabled}
          onChange={(time: any) => context.onEvent('onChange', time)}
        />
      </div>
    )
  },

  'color-picker': {
    slug: 'color-picker',
    title: 'ColorPicker',
    componentName: 'ColorPicker',
    defaultProps: {
      format: 'hex',
      showAlpha: false,
      inline: false,
      disabled: false,
      size: 'default'
    },
    controls: [
      {
        name: 'format',
        label: 'Color Format',
        type: 'segmented',
        defaultValue: 'hex',
        options: ['hex', 'rgb', 'hsl'],
        category: 'appearance',
        description: 'Readout and numeric input mode'
      },
      {
        name: 'size',
        label: 'Trigger Size',
        type: 'segmented',
        defaultValue: 'default',
        options: ['sm', 'default', 'lg'],
        category: 'size',
        description: 'Trigger button size'
      },
      {
        name: 'showAlpha',
        label: 'Alpha Opacity Channel',
        type: 'boolean',
        defaultValue: false,
        category: 'options',
        description: 'Enable alpha transparency slider'
      },
      {
        name: 'inline',
        label: 'Inline Canvas',
        type: 'boolean',
        defaultValue: false,
        category: 'options',
        description: 'Render picker canvas directly inline'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables color interaction'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-xs flex flex-col items-center justify-center">
        <ColorPicker
          format={props.format}
          size={props.size}
          showAlpha={props.showAlpha}
          inline={props.inline}
          disabled={props.disabled}
          onChange={(color: any) => context.onEvent('onChange', color)}
        />
      </div>
    )
  }
}
