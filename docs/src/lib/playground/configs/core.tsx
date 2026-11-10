import React from 'react'
import { Sparkles, Search, Lock } from 'lucide-react'
import { 
  Button, 
  ButtonGroup, 
  ButtonGroupItem,
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Checkbox, 
  Input, 
  InputGroup, 
  InputGroupAddon,
  Label, 
  Progress, 
  Radio, 
  Rating, 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem,
  Skeleton, 
  Slider, 
  Switch, 
  Textarea 
} from 'mad-ui-components'
import { PlaygroundConfig } from '@/components/playground/types'

export const corePlaygrounds: Record<string, PlaygroundConfig> = {
  button: {
    slug: 'button',
    title: 'Button',
    componentName: 'Button',
    defaultProps: {
      variant: 'default',
      size: 'default',
      iconPlacement: 'none',
      disabled: false,
      loading: false,
      fullWidth: false,
      children: 'Deploy Project'
    },
    controls: [
      {
        name: 'variant',
        label: 'Style Variant',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Destructive', value: 'destructive' },
          { label: 'Outline', value: 'outline' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Ghost', value: 'ghost' },
          { label: 'Link', value: 'link' }
        ],
        category: 'appearance',
        description: 'Visual treatment and color emphasis'
      },
      {
        name: 'size',
        label: 'Button Size',
        type: 'segmented',
        defaultValue: 'default',
        options: [
          { label: 'SM', value: 'sm' },
          { label: 'Default', value: 'default' },
          { label: 'LG', value: 'lg' },
          { label: 'Icon', value: 'icon' }
        ],
        category: 'size',
        description: 'Height and horizontal padding dimensions'
      },
      {
        name: 'iconPlacement',
        label: 'Icon Placement',
        type: 'segmented',
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' }
        ],
        category: 'appearance',
        description: 'Places a decorative vector icon alongside label'
      },
      {
        name: 'children',
        label: 'Button Text',
        type: 'text',
        defaultValue: 'Deploy Project',
        category: 'content',
        description: 'Inner label content'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables user interactions and applies muted styling'
      },
      {
        name: 'loading',
        label: 'Loading Spinner',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Replaces icon/content with an animated spinner'
      },
      {
        name: 'fullWidth',
        label: 'Full Width',
        type: 'boolean',
        defaultValue: false,
        category: 'options',
        description: 'Expands button to fill 100% of container width'
      }
    ],
    render: (props, context) => {
      const icon = <Sparkles className="w-4 h-4" />
      return (
        <Button
          variant={props.variant}
          size={props.size}
          disabled={props.disabled}
          loading={props.loading}
          fullWidth={props.fullWidth}
          leftIcon={props.iconPlacement === 'left' ? icon : undefined}
          rightIcon={props.iconPlacement === 'right' ? icon : undefined}
          onClick={() => context.onEvent('onClick', { timestamp: Date.now() })}
        >
          {props.size === 'icon' ? <Sparkles className="w-4 h-4" /> : props.children}
        </Button>
      )
    }
  },

  'button-group': {
    slug: 'button-group',
    title: 'ButtonGroup',
    componentName: 'ButtonGroup',
    defaultProps: {
      segmented: false,
      orientation: 'horizontal',
      size: 'md',
      disabled: false
    },
    controls: [
      {
        name: 'segmented',
        label: 'Segmented Control',
        type: 'boolean',
        defaultValue: false,
        category: 'appearance',
        description: 'Renders as an interactive radio/segmented toggle'
      },
      {
        name: 'orientation',
        label: 'Orientation',
        type: 'segmented',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        category: 'appearance',
        description: 'Layout axis direction'
      },
      {
        name: 'size',
        label: 'Button Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Controls padding across all buttons in group'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables all buttons in the group'
      }
    ],
    render: (props, context) => (
      <ButtonGroup
        segmented={props.segmented}
        orientation={props.orientation}
        size={props.size}
        disabled={props.disabled}
        defaultValue="monthly"
        onValueChange={(val: any) => context.onEvent('onValueChange', val)}
      >
        <ButtonGroupItem value="weekly">Weekly</ButtonGroupItem>
        <ButtonGroupItem value="monthly">Monthly</ButtonGroupItem>
        <ButtonGroupItem value="yearly">Yearly</ButtonGroupItem>
      </ButtonGroup>
    )
  },

  card: {
    slug: 'card',
    title: 'Card',
    componentName: 'Card',
    defaultProps: {
      variant: 'default',
      hoverable: false,
      clickable: false,
      title: 'Security Preferences',
      description: 'Manage two-factor authentication and session controls.'
    },
    controls: [
      {
        name: 'variant',
        label: 'Card Variant',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Elevated', value: 'elevated' },
          { label: 'Outlined', value: 'outlined' },
          { label: 'Ghost', value: 'ghost' }
        ],
        category: 'appearance',
        description: 'Surface styling and border treatment'
      },
      {
        name: 'hoverable',
        label: 'Hover Physics',
        type: 'boolean',
        defaultValue: false,
        category: 'options',
        description: 'Applies smooth elevation and upward translation on hover'
      },
      {
        name: 'clickable',
        label: 'Clickable State',
        type: 'boolean',
        defaultValue: false,
        category: 'options',
        description: 'Enables active click scale and cursor pointer'
      },
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        defaultValue: 'Security Preferences',
        category: 'content',
        description: 'Header title text'
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        defaultValue: 'Manage two-factor authentication and session controls.',
        category: 'content',
        description: 'Header subtitle text'
      }
    ],
    render: (props, context) => (
      <Card 
        variant={props.variant} 
        hoverable={props.hoverable} 
        clickable={props.clickable}
        className="w-full max-w-sm"
        onClick={props.clickable ? () => context.onEvent('onClick', { card: 'clicked' }) : undefined}
      >
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Hardware security keys are recommended for administrator accounts.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save Changes</Button>
        </CardFooter>
      </Card>
    )
  },

  checkbox: {
    slug: 'checkbox',
    title: 'Checkbox',
    componentName: 'Checkbox',
    defaultProps: {
      size: 'md',
      disabled: false,
      label: 'Enable Automated Security Scanning'
    },
    controls: [
      {
        name: 'size',
        label: 'Checkbox Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Bounding dimension of checkbox indicator'
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        defaultValue: 'Enable Automated Security Scanning',
        category: 'content',
        description: 'Accessible accompanying text label'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Prevents state changes and fades styling'
      }
    ],
    render: (props, context) => (
      <Checkbox
        size={props.size}
        disabled={props.disabled}
        label={props.label}
        defaultChecked={true}
        onCheckedChange={(checked) => context.onEvent('onCheckedChange', checked)}
      />
    )
  },

  input: {
    slug: 'input',
    title: 'Input',
    componentName: 'Input',
    defaultProps: {
      type: 'text',
      placeholder: 'Enter API access token...',
      error: false,
      success: false,
      disabled: false,
      iconPlacement: 'none',
      fullWidth: true
    },
    controls: [
      {
        name: 'type',
        label: 'Input Type',
        type: 'select',
        defaultValue: 'text',
        options: [
          { label: 'Text', value: 'text' },
          { label: 'Email', value: 'email' },
          { label: 'Password', value: 'password' },
          { label: 'Number', value: 'number' }
        ],
        category: 'appearance',
        description: 'Standard HTML input type'
      },
      {
        name: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'Enter API access token...',
        category: 'content',
        description: 'Watermark hint shown when input is empty'
      },
      {
        name: 'iconPlacement',
        label: 'Icons',
        type: 'segmented',
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'Both', value: 'both' }
        ],
        category: 'appearance',
        description: 'Displays search or lock icon inside input edge'
      },
      {
        name: 'error',
        label: 'Error State',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Highlights border in destructive red for validation error'
      },
      {
        name: 'success',
        label: 'Success State',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Highlights border in emerald green for valid input'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables typing and keyboard focus'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-sm">
        <Input
          type={props.type}
          placeholder={props.placeholder}
          error={props.error}
          success={props.success}
          disabled={props.disabled}
          fullWidth={props.fullWidth}
          leftIcon={props.iconPlacement === 'left' || props.iconPlacement === 'both' ? <Search className="w-4 h-4" /> : undefined}
          rightIcon={props.iconPlacement === 'right' || props.iconPlacement === 'both' ? <Lock className="w-4 h-4" /> : undefined}
          onChange={(e) => context.onEvent('onChange', e.target.value)}
        />
      </div>
    )
  },

  'input-group': {
    slug: 'input-group',
    title: 'InputGroup',
    componentName: 'InputGroup',
    defaultProps: {
      size: 'default',
      placeholder: 'acme.corp'
    },
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'segmented',
        defaultValue: 'default',
        options: ['sm', 'default', 'lg'],
        category: 'size',
        description: 'Unified dimension for addons and input'
      },
      {
        name: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'acme.corp',
        category: 'content',
        description: 'Domain placeholder'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm">
        <InputGroup size={props.size}>
          <InputGroupAddon placement="left">https://</InputGroupAddon>
          <Input placeholder={props.placeholder} />
          <InputGroupAddon placement="right">.vercel.app</InputGroupAddon>
        </InputGroup>
      </div>
    )
  },

  label: {
    slug: 'label',
    title: 'Label',
    componentName: 'Label',
    defaultProps: {
      required: true,
      children: 'Production Database Secret'
    },
    controls: [
      {
        name: 'children',
        label: 'Label Text',
        type: 'text',
        defaultValue: 'Production Database Secret',
        category: 'content',
        description: 'Label content'
      },
      {
        name: 'required',
        label: 'Required Indicator',
        type: 'boolean',
        defaultValue: true,
        category: 'state',
        description: 'Adds an accessible red asterisk'
      }
    ],
    render: (props) => (
      <Label required={props.required}>
        {props.children}
      </Label>
    )
  },

  progress: {
    slug: 'progress',
    title: 'Progress',
    componentName: 'Progress',
    defaultProps: {
      value: 65,
      size: 'md',
      variant: 'default',
      showLabel: true
    },
    controls: [
      {
        name: 'value',
        label: 'Progress Value',
        type: 'slider',
        defaultValue: 65,
        min: 0,
        max: 100,
        step: 5,
        category: 'content',
        description: 'Completion percentage between 0 and 100'
      },
      {
        name: 'variant',
        label: 'Color Variant',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default (Primary)', value: 'default' },
          { label: 'Success', value: 'success' },
          { label: 'Warning', value: 'warning' },
          { label: 'Destructive', value: 'destructive' }
        ],
        category: 'appearance',
        description: 'Bar fill color'
      },
      {
        name: 'size',
        label: 'Bar Thickness',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Height dimension of track'
      },
      {
        name: 'showLabel',
        label: 'Show Percentage Text',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Displays numeric label'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm space-y-2">
        <Progress
          value={props.value}
          size={props.size}
          variant={props.variant}
          showLabel={props.showLabel}
        />
      </div>
    )
  },

  radio: {
    slug: 'radio',
    title: 'Radio',
    componentName: 'Radio',
    defaultProps: {
      size: 'md',
      disabled: false,
      label: 'Deploy to Multi-Region Cluster'
    },
    controls: [
      {
        name: 'size',
        label: 'Radio Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Radio button indicator dimension'
      },
      {
        name: 'label',
        label: 'Radio Label',
        type: 'text',
        defaultValue: 'Deploy to Multi-Region Cluster',
        category: 'content',
        description: 'Label beside radio button'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables choice selection'
      }
    ],
    render: (props, context) => (
      <Radio
        size={props.size}
        disabled={props.disabled}
        label={props.label}
        defaultChecked={true}
        onChange={(e) => context.onEvent('onChange', e.target.checked)}
      />
    )
  },

  rating: {
    slug: 'rating',
    title: 'Rating',
    componentName: 'Rating',
    defaultProps: {
      precision: 0.5,
      max: 5,
      size: 'md',
      readOnly: false,
      clearable: true,
      defaultValue: 4.5
    },
    controls: [
      {
        name: 'precision',
        label: 'Star Precision',
        type: 'segmented',
        defaultValue: 0.5,
        options: [
          { label: 'Half Stars (0.5)', value: 0.5 },
          { label: 'Full Stars (1.0)', value: 1 }
        ],
        category: 'options',
        description: 'Allows half-star granular selection'
      },
      {
        name: 'max',
        label: 'Max Stars',
        type: 'segmented',
        defaultValue: 5,
        options: [5, 10],
        category: 'options',
        description: 'Total number of star icons to display'
      },
      {
        name: 'size',
        label: 'Star Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Icon dimensions'
      },
      {
        name: 'readOnly',
        label: 'Read Only',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Displays static rating without hover or click interactions'
      },
      {
        name: 'clearable',
        label: 'Clearable',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Allows clicking current value to reset rating to 0'
      }
    ],
    render: (props, context) => (
      <div className="flex flex-col items-center gap-2">
        <Rating
          precision={props.precision}
          max={props.max}
          size={props.size}
          readOnly={props.readOnly}
          clearable={props.clearable}
          defaultValue={props.defaultValue}
          onChange={(val: number) => context.onEvent('onChange', val)}
        />
      </div>
    )
  },

  select: {
    slug: 'select',
    title: 'Select',
    componentName: 'Select',
    defaultProps: {
      disabled: false,
      placeholder: 'Select deployment region...'
    },
    controls: [
      {
        name: 'placeholder',
        label: 'Placeholder Text',
        type: 'text',
        defaultValue: 'Select deployment region...',
        category: 'content',
        description: 'Prompt when no value is selected'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables opening dropdown trigger'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-xs">
        <Select 
          disabled={props.disabled}
          onValueChange={(val: any) => context.onEvent('onValueChange', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iad1">US East (N. Virginia - iad1)</SelectItem>
            <SelectItem value="sfo1">US West (San Francisco - sfo1)</SelectItem>
            <SelectItem value="fra1">Europe (Frankfurt - fra1)</SelectItem>
            <SelectItem value="hnd1">Asia Pacific (Tokyo - hnd1)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  },

  skeleton: {
    slug: 'skeleton',
    title: 'Skeleton',
    componentName: 'Skeleton',
    defaultProps: {
      variant: 'rectangular',
      animation: 'pulse'
    },
    controls: [
      {
        name: 'variant',
        label: 'Shape Variant',
        type: 'select',
        defaultValue: 'rectangular',
        options: [
          { label: 'Rectangular', value: 'rectangular' },
          { label: 'Circular', value: 'circular' },
          { label: 'Text', value: 'text' }
        ],
        category: 'appearance',
        description: 'Pre-set geometry for placeholder'
      },
      {
        name: 'animation',
        label: 'Animation',
        type: 'segmented',
        defaultValue: 'pulse',
        options: ['pulse', 'wave', 'none'],
        category: 'appearance',
        description: 'Loading shimmer effect'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-xs space-y-3">
        {props.variant === 'circular' ? (
          <Skeleton variant="circular" animation={props.animation} className="h-16 w-16" />
        ) : props.variant === 'text' ? (
          <div className="space-y-2">
            <Skeleton variant="text" animation={props.animation} className="h-4 w-full" />
            <Skeleton variant="text" animation={props.animation} className="h-4 w-3/4" />
          </div>
        ) : (
          <Skeleton variant="rectangular" animation={props.animation} className="h-28 w-full rounded-lg" />
        )}
      </div>
    )
  },

  slider: {
    slug: 'slider',
    title: 'Slider',
    componentName: 'Slider',
    defaultProps: {
      defaultValue: [45],
      min: 0,
      max: 100,
      step: 5,
      disabled: false
    },
    controls: [
      {
        name: 'min',
        label: 'Minimum Bound',
        type: 'slider',
        defaultValue: 0,
        min: 0,
        max: 50,
        category: 'options',
        description: 'Lower limit of slider'
      },
      {
        name: 'max',
        label: 'Maximum Bound',
        type: 'slider',
        defaultValue: 100,
        min: 50,
        max: 200,
        category: 'options',
        description: 'Upper limit of slider'
      },
      {
        name: 'step',
        label: 'Step Increment',
        type: 'segmented',
        defaultValue: 5,
        options: [1, 5, 10, 20],
        category: 'options',
        description: 'Granularity of slider thumb movement'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Prevents drag or keyboard adjustments'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-sm px-2">
        <Slider
          defaultValue={props.defaultValue}
          min={props.min}
          max={props.max}
          step={props.step}
          disabled={props.disabled}
          onValueChange={(val: any) => context.onEvent('onValueChange', val)}
        />
      </div>
    )
  },

  switch: {
    slug: 'switch',
    title: 'Switch',
    componentName: 'Switch',
    defaultProps: {
      size: 'md',
      disabled: false,
      label: 'Automatic Branch Deployments'
    },
    controls: [
      {
        name: 'size',
        label: 'Switch Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Physical toggle dimensions'
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        defaultValue: 'Automatic Branch Deployments',
        category: 'content',
        description: 'Accompanying text label'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables switch interaction'
      }
    ],
    render: (props, context) => (
      <Switch
        size={props.size}
        disabled={props.disabled}
        label={props.label}
        defaultChecked={true}
        onCheckedChange={(checked) => context.onEvent('onCheckedChange', checked)}
      />
    )
  },

  textarea: {
    slug: 'textarea',
    title: 'Textarea',
    componentName: 'Textarea',
    defaultProps: {
      rows: 4,
      disabled: false,
      error: false,
      placeholder: 'Describe deployment pipeline objectives...'
    },
    controls: [
      {
        name: 'rows',
        label: 'Visible Rows',
        type: 'slider',
        defaultValue: 4,
        min: 2,
        max: 8,
        step: 1,
        category: 'size',
        description: 'Default vertical line height height'
      },
      {
        name: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'Describe deployment pipeline objectives...',
        category: 'content',
        description: 'Empty state hint'
      },
      {
        name: 'error',
        label: 'Error State',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Red validation error border'
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
        <Textarea
          rows={props.rows}
          disabled={props.disabled}
          error={props.error}
          placeholder={props.placeholder}
          onChange={(e) => context.onEvent('onChange', e.target.value)}
        />
      </div>
    )
  }
}
