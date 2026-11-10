// Static code snippets for Core components documentation
// Extracted to keep example TSX components clean, scannable, and maintainable.

export const button = {
  variants: `import { Button } from 'oryn-ui'

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`,

  sizes: `import { Button } from 'oryn-ui'
import { Search } from 'lucide-react'

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Search"><Search className="h-4 w-4" /></Button>
    </div>
  )
}`,

  withIcons: `import { Button } from 'oryn-ui'
import { Download, Upload, ArrowRight, Heart, ShoppingCart } from 'lucide-react'

export function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button leftIcon={<Download className="h-4 w-4" />}>Download</Button>
      <Button leftIcon={<Upload className="h-4 w-4" />} variant="secondary">Upload</Button>
      <Button rightIcon={<ArrowRight className="h-4 w-4" />} variant="outline">Next</Button>
      <Button leftIcon={<Heart className="h-4 w-4" />} variant="destructive">Like</Button>
      <Button leftIcon={<ShoppingCart className="h-4 w-4" />}>Add to Cart</Button>
    </div>
  )
}`,

  loading: `import { Button } from 'oryn-ui'

export function ButtonLoading() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button loading>Processing</Button>
      <Button variant="secondary" loading>Saving...</Button>
      <Button variant="outline" loading>Loading</Button>
    </div>
  )
}`,

  fullWidth: `import { Button } from 'oryn-ui'
import { Check } from 'lucide-react'

export function ButtonFullWidth() {
  return (
    <Button fullWidth leftIcon={<Check className="h-4 w-4" />}>
      Submit Form
    </Button>
  )
}`
}

export const input = {
  basic: `import { Input } from 'oryn-ui'

export function InputBasic() {
  return (
    <div className="space-y-4">
      <Input placeholder="Enter text..." />
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
    </div>
  )
}`,

  withIcons: `import { Input } from 'oryn-ui'
import { Mail, Search, User, Lock } from 'lucide-react'

export function InputWithIcons() {
  return (
    <div className="space-y-4">
      <Input 
        leftIcon={<Mail className="h-4 w-4" />}
        placeholder="Email address"
      />
      <Input 
        leftIcon={<Search className="h-4 w-4" />}
        placeholder="Search..."
      />
      <Input 
        leftIcon={<User className="h-4 w-4" />}
        placeholder="Username"
      />
      <Input 
        leftIcon={<Lock className="h-4 w-4" />}
        type="password"
        placeholder="Password"
      />
    </div>
  )
}`,

  states: `import { Input, Label } from 'oryn-ui'

export function InputStates() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="error">With Error</Label>
        <Input 
          id="error"
          error
          placeholder="Enter password"
        />
        <p className="text-sm text-destructive mt-1">
          Password must be at least 8 characters
        </p>
      </div>
      
      <div>
        <Label htmlFor="success">With Success</Label>
        <Input 
          id="success"
          success
          value="john_doe"
        />
        <p className="text-sm text-green-600 mt-1">
          Username is available!
        </p>
      </div>
    </div>
  )
}`
}

export const card = {
  variants: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'oryn-ui'

export function CardVariants() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <CardDescription>No border, prominent shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Floating appearance with elevated shadow effect.</p>
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
}`,

  interactive: `import { Card, CardHeader, CardTitle, CardContent } from 'oryn-ui'

export function InteractiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card hoverable>
        <CardHeader>
          <CardTitle>Hoverable Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Hover to see lift effect</p>
        </CardContent>
      </Card>
      
      <Card hoverable clickable onClick={() => alert('Clicked!')}>
        <CardHeader>
          <CardTitle>Clickable Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Click me for interaction</p>
        </CardContent>
      </Card>
    </div>
  )
}`
}

export const checkbox = {
  basic: `import { Checkbox } from 'oryn-ui'

export function CheckboxBasic() {
  return (
    <div className="space-y-4">
      <Checkbox label="Accept terms and conditions" />
      <Checkbox 
        label="Email notifications"
        description="Receive emails about your account activity"
      />
    </div>
  )
}`,

  sizes: `import { Checkbox } from 'oryn-ui'

export function CheckboxSizes() {
  return (
    <div className="space-y-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default)" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  )
}`,

  indeterminate: `import { Checkbox } from 'oryn-ui'

export function CheckboxIndeterminate() {
  return (
    <Checkbox label="Select all items" indeterminate />
  )
}`
}

export const radio = {
  group: `import { Radio } from 'oryn-ui'

export function RadioGroup() {
  return (
    <div className="space-y-3">
      <Radio name="plan" label="Free" description="Perfect for getting started" />
      <Radio name="plan" label="Pro" description="For professional use" />
      <Radio name="plan" label="Enterprise" description="For large teams" />
    </div>
  )
}`,

  sizes: `import { Radio } from 'oryn-ui'

export function RadioSizes() {
  return (
    <div className="space-y-3">
      <Radio size="sm" label="Small radio" />
      <Radio size="md" label="Medium radio (default)" />
      <Radio size="lg" label="Large radio" />
    </div>
  )
}`
}

export const switches = {
  basic: `import { Switch } from 'oryn-ui'

export function SwitchBasic() {
  return (
    <div className="space-y-4">
      <Switch label="Enable notifications" />
      <Switch 
        label="Marketing emails"
        description="Receive emails about new features and updates"
      />
    </div>
  )
}`,

  sizes: `import { Switch } from 'oryn-ui'

export function SwitchSizes() {
  return (
    <div className="space-y-4">
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch (default)" />
      <Switch size="lg" label="Large switch" />
    </div>
  )
}`
}

export const progress = {
  variants: `import { Progress } from 'oryn-ui'

export function ProgressVariants() {
  return (
    <div className="space-y-6">
      <Progress value={40} variant="default" showLabel label="Default" />
      <Progress value={100} variant="success" showLabel label="Success" />
      <Progress value={60} variant="warning" showLabel label="Warning" />
      <Progress value={30} variant="destructive" showLabel label="Error" />
    </div>
  )
}`,

  sizes: `import { Progress } from 'oryn-ui'

export function ProgressSizes() {
  return (
    <div className="space-y-6">
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </div>
  )
}`
}

export const rating = {
  basic: `import { Rating } from 'oryn-ui'

export function RatingBasic() {
  return (
    <div className="space-y-4">
      <Rating value={4} />
      <Rating value={3.5} showValue label="Product Rating" />
    </div>
  )
}`,

  sizes: `import { Rating } from 'oryn-ui'

export function RatingSizes() {
  return (
    <div className="space-y-4">
      <Rating value={5} size="sm" />
      <Rating value={5} size="md" />
      <Rating value={5} size="lg" />
    </div>
  )
}`
}

export const skeleton = {
  variants: `import { Skeleton } from 'oryn-ui'

export function SkeletonVariants() {
  return (
    <div className="space-y-6">
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="circular" className="h-12 w-12" />
      <Skeleton variant="rectangular" className="h-32 w-full" />
      <Skeleton variant="rounded" className="h-24 w-full" />
    </div>
  )
}`,

  multiLine: `import { Skeleton } from 'oryn-ui'

export function SkeletonMultiLine() {
  return <Skeleton lines={3} />
}`
}

export const textarea = {
  basic: `import { Textarea } from 'oryn-ui'

export function TextareaBasic() {
  return <Textarea placeholder="Enter your message..." />
}`,

  withLabel: `import { Textarea, Label } from 'oryn-ui'

export function TextareaWithLabel() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here" />
      <p className="text-sm text-muted-foreground">Your message will be sent to the team.</p>
    </div>
  )
}`
}

export const label = {
  basic: `import { Label, Input } from 'oryn-ui'

export function LabelBasic() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    </div>
  )
}`,

  required: `import { Label, Input } from 'oryn-ui'

export function LabelRequired() {
  return (
    <div className="space-y-2">
      <Label htmlFor="name" required>Full Name</Label>
      <Input id="name" />
    </div>
  )
}`
}

export const select = {
  basic: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'oryn-ui'

export function SelectBasic() {
  return (
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
  )
}`
}

export const slider = {
  basic: `import { Slider } from 'oryn-ui'
import { useState } from 'react'

export function SliderExample() {
  const [value, setValue] = useState(50)

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Volume Level</span>
        <span className="font-mono font-semibold">{value}%</span>
      </div>
      <Slider 
        value={value} 
        onChange={setValue} 
        min={0} 
        max={100} 
        step={1} 
      />
    </div>
  )
}`,

  range: `import { Slider } from 'oryn-ui'
import { useState } from 'react'

export function RangeSliderExample() {
  const [range, setRange] = useState<[number, number]>([20, 80])

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Price Filter</span>
        <span className="font-mono font-semibold">\${range[0]} - \${range[1]}</span>
      </div>
      <Slider 
        value={range} 
        onChange={setRange} 
        range 
        min={0} 
        max={100} 
      />
    </div>
  )
}`
}
