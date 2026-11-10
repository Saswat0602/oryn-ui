import React from 'react'
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Slider,
  Progress,
  Rating,
  Skeleton,
  Textarea,
  Radio,
  Label,
  ButtonGroup,
  ButtonGroupItem,
  InputGroup,
  InputGroupAddon
} from 'oryn-ui'
import { Mail, Search, Download, Upload, Check, User, ArrowRight, Heart, ShoppingCart } from 'lucide-react'
import * as snippets from '@/data/core-snippets'

export interface ComponentExample {
  title: string
  description?: string
  code: string
  preview: React.ReactNode
}

export const coreExamples: Record<string, ComponentExample[]> = {
  button: [
    {
      title: 'Button Variants',
      description: 'All available button variants with distinct visual styles and semantic colors.',
      code: snippets.button.variants,
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      )
    },
    {
      title: 'Button Sizes',
      description: 'Different button sizes for various use cases, including icon-only variant.',
      code: snippets.button.sizes,
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Search"><Search className="h-4 w-4" /></Button>
        </div>
      )
    },
    {
      title: 'Buttons with Icons',
      description: 'Enhance buttons with left and right icons for better visual communication.',
      code: snippets.button.withIcons,
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button leftIcon={<Download className="h-4 w-4" />}>Download</Button>
          <Button leftIcon={<Upload className="h-4 w-4" />} variant="secondary">Upload</Button>
          <Button rightIcon={<ArrowRight className="h-4 w-4" />} variant="outline">Next</Button>
          <Button leftIcon={<Heart className="h-4 w-4" />} variant="destructive">Like</Button>
          <Button leftIcon={<ShoppingCart className="h-4 w-4" />}>Add to Cart</Button>
        </div>
      )
    },
    {
      title: 'Loading States',
      description: 'Show loading feedback with animated spinner for async operations.',
      code: snippets.button.loading,
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button loading>Processing</Button>
          <Button variant="secondary" loading>Saving...</Button>
          <Button variant="outline" loading>Loading</Button>
        </div>
      )
    },
    {
      title: 'Full Width Button',
      description: 'Button that spans the full width of its container, perfect for forms.',
      code: snippets.button.fullWidth,
      preview: (
        <div className="w-full max-w-sm mx-auto space-y-2">
          <Button fullWidth leftIcon={<Check className="h-4 w-4" />}>
            Submit Form
          </Button>
        </div>
      )
    }
  ],

  input: [
    {
      title: 'Basic Inputs',
      description: 'Simple input fields with different types.',
      code: snippets.input.basic,
      preview: (
        <div className="w-full max-w-md mx-auto space-y-4">
          <Input placeholder="Enter text..." />
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
        </div>
      )
    },
    {
      title: 'Inputs with Icons',
      description: 'Input fields with left and right icons for better UX.',
      code: snippets.input.withIcons,
      preview: (
        <div className="w-full max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <Input
              leftIcon={<Mail className="h-4 w-4 text-muted-foreground" />}
              placeholder="Email address"
            />
            <p className="text-xs text-muted-foreground">With mail icon</p>
          </div>
          <div className="space-y-2">
            <Input
              leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
              placeholder="Search..."
            />
            <p className="text-xs text-muted-foreground">With search icon</p>
          </div>
          <div className="space-y-2">
            <Input
              leftIcon={<User className="h-4 w-4 text-muted-foreground" />}
              placeholder="Username"
            />
            <p className="text-xs text-muted-foreground">With user icon</p>
          </div>
        </div>
      )
    },
    {
      title: 'Input States',
      description: 'Error and success states with visual feedback.',
      code: snippets.input.states,
      preview: (
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <Label htmlFor="error">Error State</Label>
            <Input
              id="error"
              error
              placeholder="Enter password"
            />
            <p className="text-sm text-destructive">
              Password must be at least 8 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="success">Success State</Label>
            <Input
              id="success"
              success
              value="john_doe"
              readOnly
            />
            <p className="text-sm text-green-600 dark:text-green-400">
              Username is available!
            </p>
          </div>
        </div>
      )
    }
  ],

  card: [
    {
      title: 'Card Variants',
      description: 'Four distinct visual styles for different use cases.',
      code: snippets.card.variants,
      preview: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Border with subtle shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Standard card with border and shadow for general use.</p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Floating shadow appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Elevated card with subtle shadow for prominent content.</p>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>Thick border, no shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Emphasized border without shadow for clear separation.</p>
            </CardContent>
          </Card>

          <Card variant="ghost">
            <CardHeader>
              <CardTitle>Ghost Card</CardTitle>
              <CardDescription>Minimal styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Subtle card with minimal visual weight.</p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: 'Interactive Cards',
      description: 'Cards with hover and click effects for enhanced user experience.',
      code: snippets.card.interactive,
      preview: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Card hoverable>
            <CardHeader>
              <CardTitle>Hoverable Card</CardTitle>
              <CardDescription>Hover to see elevation effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Smooth elevation on hover for interactive items.</p>
            </CardContent>
          </Card>

          <Card hoverable clickable onClick={() => alert('Card clicked!')}>
            <CardHeader>
              <CardTitle>Clickable Card</CardTitle>
              <CardDescription>Click for button action</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Responds to user clicks with smooth feedback.</p>
            </CardContent>
          </Card>
        </div>
      )
    }
  ],

  checkbox: [
    {
      title: 'Checkbox with Label',
      description: 'Basic checkbox with label and description.',
      code: snippets.checkbox.basic,
      preview: (
        <div className="space-y-4">
          <Checkbox label="Accept terms and conditions" />
          <Checkbox
            label="Email notifications"
            description="Receive emails about your account activity"
          />
        </div>
      )
    },
    {
      title: 'Checkbox Sizes',
      description: 'Different checkbox sizes for various contexts.',
      code: snippets.checkbox.sizes,
      preview: (
        <div className="space-y-4">
          <Checkbox size="sm" label="Small checkbox" />
          <Checkbox size="md" label="Medium checkbox (default)" />
          <Checkbox size="lg" label="Large checkbox" />
        </div>
      )
    },
    {
      title: 'Indeterminate State',
      description: 'Checkbox in indeterminate state for partial selection.',
      code: snippets.checkbox.indeterminate,
      preview: (
        <div className="space-y-2">
          <Checkbox label="Select all items" indeterminate />
          <p className="text-xs text-muted-foreground ml-7">Used for &quot;select all&quot; functionality</p>
        </div>
      )
    }
  ],

  radio: [
    {
      title: 'Radio Group',
      description: 'Group of radio buttons with labels and descriptions.',
      code: snippets.radio.group,
      preview: (
        <div className="space-y-3">
          <Radio name="plan" label="Free" description="Perfect for getting started" />
          <Radio name="plan" label="Pro" description="For professional use" />
          <Radio name="plan" label="Enterprise" description="For large teams" />
        </div>
      )
    },
    {
      title: 'Radio Sizes',
      description: 'Different radio button sizes.',
      code: snippets.radio.sizes,
      preview: (
        <div className="space-y-3">
          <Radio size="sm" label="Small radio" />
          <Radio size="md" label="Medium radio (default)" />
          <Radio size="lg" label="Large radio" />
        </div>
      )
    }
  ],

  switch: [
    {
      title: 'Switch with Label',
      description: 'Toggle switch with label and description.',
      code: snippets.switches.basic,
      preview: (
        <div className="space-y-4">
          <Switch label="Enable notifications" />
          <Switch
            label="Marketing emails"
            description="Receive emails about new features and updates"
          />
        </div>
      )
    },
    {
      title: 'Switch Sizes',
      description: 'Different switch sizes.',
      code: snippets.switches.sizes,
      preview: (
        <div className="space-y-4">
          <Switch size="sm" label="Small switch" />
          <Switch size="md" label="Medium switch (default)" />
          <Switch size="lg" label="Large switch" />
        </div>
      )
    }
  ],

  progress: [
    {
      title: 'Progress Variants',
      description: 'Different progress bar variants with semantic colors.',
      code: snippets.progress.variants,
      preview: (
        <div className="space-y-6 w-full">
          <div className="space-y-2">
            <Progress value={40} variant="default" showLabel label="Default Progress" />
            <p className="text-xs text-muted-foreground">40% complete</p>
          </div>
          <div className="space-y-2">
            <Progress value={100} variant="success" showLabel label="Success Progress" />
            <p className="text-xs text-green-600 dark:text-green-400">100% complete</p>
          </div>
          <div className="space-y-2">
            <Progress value={60} variant="warning" showLabel label="Warning Progress" />
            <p className="text-xs text-yellow-600 dark:text-yellow-400">60% complete</p>
          </div>
          <div className="space-y-2">
            <Progress value={30} variant="destructive" showLabel label="Error Progress" />
            <p className="text-xs text-destructive">30% complete</p>
          </div>
        </div>
      )
    },
    {
      title: 'Progress Sizes',
      description: 'Different progress bar heights.',
      code: snippets.progress.sizes,
      preview: (
        <div className="space-y-6 w-full">
          <div className="space-y-2">
            <Progress value={60} size="sm" />
            <p className="text-xs text-muted-foreground">Small (sm)</p>
          </div>
          <div className="space-y-2">
            <Progress value={60} size="md" />
            <p className="text-xs text-muted-foreground">Medium (md)</p>
          </div>
          <div className="space-y-2">
            <Progress value={60} size="lg" />
            <p className="text-xs text-muted-foreground">Large (lg)</p>
          </div>
        </div>
      )
    }
  ],

  rating: [
    {
      title: 'Interactive Half-Star Rating',
      description: 'Interactive star rating with 0.5 precision, hover preview, and keyboard arrow controls',
      code: `import { Rating } from 'oryn-ui'
import { useState } from 'react'

export function RatingExample() {
  const [rating, setRating] = useState(4.5)

  return (
    <div className="space-y-4">
      <Rating
        value={rating}
        onChange={setRating}
        precision={0.5}
        showValue
        label="Customer Review"
      />
    </div>
  )
}`,
      preview: <InteractiveRatingDemo />
    },
    {
      title: 'Rating Sizes & States',
      description: 'Multiple scale sizes and read-only display states',
      code: `import { Rating } from 'oryn-ui'

export function RatingSizesExample() {
  return (
    <div className="space-y-4">
      <Rating value={5} size="sm" readOnly showValue label="Small (sm)" />
      <Rating value={4} size="md" readOnly showValue label="Medium (md)" />
      <Rating value={4.5} size="lg" precision={0.5} readOnly showValue label="Large (lg)" />
    </div>
  )
}`,
      preview: (
        <div className="space-y-5 p-4">
          <Rating value={5} size="sm" readOnly showValue label="Small (sm)" />
          <Rating value={4} size="md" readOnly showValue label="Medium (md)" />
          <Rating value={4.5} size="lg" precision={0.5} readOnly showValue label="Large (lg)" />
        </div>
      )
    }
  ],

  skeleton: [
    {
      title: 'Skeleton Variants',
      description: 'Different skeleton shapes for various content types.',
      code: snippets.skeleton.variants,
      preview: (
        <div className="space-y-6 w-full">
          <div className="space-y-2">
            <Skeleton variant="text" className="h-4 w-full" />
            <p className="text-xs text-muted-foreground">Text skeleton</p>
          </div>
          <div className="space-y-2">
            <Skeleton variant="circular" className="h-12 w-12" />
            <p className="text-xs text-muted-foreground">Circular (avatar)</p>
          </div>
          <div className="space-y-2">
            <Skeleton variant="rectangular" className="h-32 w-full" />
            <p className="text-xs text-muted-foreground">Rectangular (image)</p>
          </div>
          <div className="space-y-2">
            <Skeleton variant="rounded" className="h-24 w-full" />
            <p className="text-xs text-muted-foreground">Rounded (card)</p>
          </div>
        </div>
      )
    },
    {
      title: 'Multi-line Skeleton',
      description: 'Multiple skeleton lines for text content.',
      code: snippets.skeleton.multiLine,
      preview: (
        <div className="space-y-2 w-full">
          <Skeleton lines={3} />
          <p className="text-xs text-muted-foreground">3 lines of text skeleton</p>
        </div>
      )
    }
  ],

  textarea: [
    {
      title: 'Basic Textarea',
      description: 'Simple textarea input.',
      code: snippets.textarea.basic,
      preview: (
        <div className="w-full max-w-md mx-auto">
          <Textarea placeholder="Enter your message..." />
        </div>
      )
    },
    {
      title: 'Textarea with Label',
      description: 'Textarea with label and helper text.',
      code: snippets.textarea.withLabel,
      preview: (
        <div className="w-full max-w-md mx-auto space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Type your message here" />
          <p className="text-sm text-muted-foreground">Your message will be sent to the team.</p>
        </div>
      )
    }
  ],

  label: [
    {
      title: 'Basic Label',
      description: 'Simple form label.',
      code: snippets.label.basic,
      preview: (
        <div className="w-full max-w-sm space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
      )
    },
    {
      title: 'Required Field',
      description: 'Label with required indicator.',
      code: snippets.label.required,
      preview: (
        <div className="w-full max-w-sm space-y-2">
          <Label htmlFor="name" required>Full Name</Label>
          <Input id="name" />
        </div>
      )
    }
  ],

  select: [
    {
      title: 'Basic Select',
      description: 'Simple select dropdown.',
      code: snippets.select.basic,
      preview: (
        <div className="w-full max-w-sm">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }
  ],

  slider: [
    {
      title: 'Basic Slider',
      description: 'Single-value track slider with live feedback and smooth drag interaction.',
      code: snippets.slider.basic,
      preview: <InteractiveSliderDemo />
    },
    {
      title: 'Range Slider',
      description: 'Dual-thumb slider for selecting lower and upper bound ranges.',
      code: snippets.slider.range,
      preview: <InteractiveRangeSliderDemo />
    }
  ],

  'button-group': [
    {
      title: 'Segmented Control with Selection State',
      description: 'Single-select segmented button group with active pill indicator and responsive keyboard navigation',
      code: `import { ButtonGroup, ButtonGroupItem } from 'oryn-ui'
import { useState } from 'react'

export function SegmentedControlExample() {
  const [view, setView] = useState('month')

  return (
    <ButtonGroup segmented value={view} onValueChange={setView}>
      <ButtonGroupItem value="day">Day</ButtonGroupItem>
      <ButtonGroupItem value="week">Week</ButtonGroupItem>
      <ButtonGroupItem value="month">Month</ButtonGroupItem>
      <ButtonGroupItem value="year">Year</ButtonGroupItem>
    </ButtonGroup>
  )
}`,
      preview: <SegmentedButtonGroupDemo />
    },
    {
      title: 'Attached Action Group',
      description: 'Connected buttons with shared borders and seamless corner radius merging',
      code: `import { ButtonGroup, Button } from 'oryn-ui'

export function AttachedGroupExample() {
  return (
    <ButtonGroup orientation="horizontal" attached>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Duplicate</Button>
      <Button variant="outline">Archive</Button>
    </ButtonGroup>
  )
}`,
      preview: (
        <div className="p-4 flex flex-col gap-4">
          <ButtonGroup orientation="horizontal" attached>
            <Button variant="outline">Copy</Button>
            <Button variant="outline">Duplicate</Button>
            <Button variant="outline">Archive</Button>
          </ButtonGroup>
        </div>
      )
    }
  ],

  'input-group': [
    {
      title: 'Input Group with Addons',
      description: 'Text inputs with prefix and suffix addons for currencies, protocols, and domains',
      code: `import { InputGroup, InputGroupAddon, Input, Button } from 'oryn-ui'

export function InputGroupExample() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <Input placeholder="example" />
        <InputGroupAddon>.com</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>$</InputGroupAddon>
        <Input placeholder="0.00" />
        <InputGroupAddon>USD</InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: (
        <div className="flex flex-col gap-4 max-w-sm p-4">
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <Input placeholder="example" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>

          <InputGroup>
            <InputGroupAddon>$</InputGroupAddon>
            <Input placeholder="0.00" />
            <InputGroupAddon>USD</InputGroupAddon>
          </InputGroup>
        </div>
      )
    }
  ]
}

function InteractiveSliderDemo() {
  const [val, setVal] = React.useState(60)
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Volume Level</span>
        <span className="font-mono font-semibold">{val}%</span>
      </div>
      <Slider 
        value={val} 
        onChange={(v: any) => typeof v === 'number' && setVal(v)} 
        min={0} 
        max={100} 
        step={1} 
      />
    </div>
  )
}

function InteractiveRangeSliderDemo() {
  const [range, setRange] = React.useState<[number, number]>([25, 75])
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Price Filter</span>
        <span className="font-mono font-semibold">${range[0]} - ${range[1]}</span>
      </div>
      <Slider 
        value={range} 
        onChange={(v: any) => Array.isArray(v) && setRange([v[0] ?? 0, v[1] ?? 100])} 
        range 
        min={0} 
        max={100} 
      />
    </div>
  )
}

function InteractiveRatingDemo() {
  const [rating, setRating] = React.useState(4.5)
  return (
    <div className="w-full max-w-sm p-4 space-y-4">
      <Rating
        value={rating}
        onChange={setRating}
        precision={0.5}
        showValue
        label="Rate Experience"
      />
      <p className="text-xs text-muted-foreground font-mono">
        Current Rating: {rating} / 5.0
      </p>
    </div>
  )
}

function SegmentedButtonGroupDemo() {
  const [view, setView] = React.useState('month')
  return (
    <div className="p-4 space-y-3">
      <ButtonGroup segmented value={view} onValueChange={setView}>
        <ButtonGroupItem value="day">Day</ButtonGroupItem>
        <ButtonGroupItem value="week">Week</ButtonGroupItem>
        <ButtonGroupItem value="month">Month</ButtonGroupItem>
        <ButtonGroupItem value="year">Year</ButtonGroupItem>
      </ButtonGroup>
      <p className="text-xs text-muted-foreground font-mono">
        Active Segment: {view}
      </p>
    </div>
  )
}
