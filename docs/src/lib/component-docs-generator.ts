// Component Documentation Generator
// This file helps generate documentation for all components systematically

export interface ComponentInfo {
  name: string
  category: 'core' | 'forms' | 'layout' | 'overlay' | 'media' | 'navigation' | 'data' | 'feedback'
  description: string
  status: 'stable' | 'beta' | 'new'
  complexity: 'simple' | 'moderate' | 'complex'
  props: ComponentProp[]
  examples: ComponentExample[]
  useCases: string[]
  dependencies?: string[]
}

export interface ComponentProp {
  name: string
  type: string
  default?: string
  required: boolean
  description: string
}

export interface ComponentExample {
  title: string
  description: string
  code: string
  preview?: string
}

export const COMPONENTS_DATA: ComponentInfo[] = [
  // Core Components (13)
  {
    name: 'Label',
    category: 'core',
    description: 'Accessible form labels with proper styling',
    status: 'stable',
    complexity: 'simple',
    props: [
      { name: 'htmlFor', type: 'string', required: false, description: 'Associates the label with a form control' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Label content' }
    ],
    examples: [
      {
        title: 'Basic Label',
        description: 'Simple label for form inputs',
        code: '<Label htmlFor="email">Email Address</Label>\n<Input id="email" type="email" />'
      }
    ],
    useCases: ['Form labels', 'Input descriptions', 'Accessibility']
  },
  {
    name: 'Progress',
    category: 'core',
    description: 'Progress indicator for showing completion status',
    status: 'stable',
    complexity: 'simple',
    props: [
      { name: 'value', type: 'number', required: true, description: 'Progress value (0-100)' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', required: false, description: 'Progress bar size' },
      { name: 'variant', type: '"default" | "success" | "warning" | "error"', default: '"default"', required: false, description: 'Progress bar variant' }
    ],
    examples: [
      {
        title: 'Basic Progress',
        description: 'Simple progress bar',
        code: '<Progress value={65} />'
      },
      {
        title: 'Progress Variants',
        description: 'Different progress styles',
        code: '<Progress value={75} variant="success" />\n<Progress value={45} variant="warning" />\n<Progress value={25} variant="error" />'
      }
    ],
    useCases: ['File uploads', 'Loading states', 'Task completion', 'Form progress']
  },
  
  // Forms Components (9)
  {
    name: 'Accordion',
    category: 'forms',
    description: 'Collapsible content sections for organizing information',
    status: 'stable',
    complexity: 'moderate',
    props: [
      { name: 'items', type: 'AccordionItem[]', required: true, description: 'Array of accordion items' },
      { name: 'type', type: '"single" | "multiple"', default: '"single"', required: false, description: 'Allow single or multiple open items' },
      { name: 'collapsible', type: 'boolean', default: 'true', required: false, description: 'Allow collapsing all items' }
    ],
    examples: [
      {
        title: 'Basic Accordion',
        description: 'Simple expandable content sections',
        code: `<Accordion items={[
  { id: 'item-1', trigger: 'Section 1', content: 'Content for section 1' },
  { id: 'item-2', trigger: 'Section 2', content: 'Content for section 2' }
]} />`
      }
    ],
    useCases: ['FAQ sections', 'Content organization', 'Space-saving layouts', 'Documentation']
  },
  {
    name: 'Breadcrumbs',
    category: 'forms',
    description: 'Navigation breadcrumb trail showing current page location',
    status: 'stable',
    complexity: 'simple',
    props: [
      { name: 'items', type: 'BreadcrumbItem[]', required: true, description: 'Array of breadcrumb items' },
      { name: 'separator', type: 'React.ReactNode', default: '"/"', required: false, description: 'Custom separator between items' }
    ],
    examples: [
      {
        title: 'Basic Breadcrumbs',
        description: 'Simple navigation trail',
        code: `<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Details' }
]} />`
      }
    ],
    useCases: ['Page navigation', 'Location context', 'Site hierarchy', 'User orientation']
  },
  
  // Layout Components (10)
  {
    name: 'Modal',
    category: 'layout',
    description: 'Overlay modal dialog for focused interactions',
    status: 'stable',
    complexity: 'moderate',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Modal open state' },
      { name: 'onOpenChange', type: '(open: boolean) => void', required: true, description: 'Callback when modal state changes' },
      { name: 'title', type: 'string', required: false, description: 'Modal title' },
      { name: 'description', type: 'string', required: false, description: 'Modal description' }
    ],
    examples: [
      {
        title: 'Basic Modal',
        description: 'Simple modal dialog',
        code: `<Modal 
  open={isOpen} 
  onOpenChange={setIsOpen}
  title="Confirm Action"
  description="Are you sure you want to continue?"
>
  <div className="flex gap-2">
    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="error">Confirm</Button>
  </div>
</Modal>`
      }
    ],
    useCases: ['Confirmations', 'Forms', 'Image galleries', 'Settings', 'Alerts']
  },
  
  // Media Components (5)
  {
    name: 'Avatar',
    category: 'media',
    description: 'User profile picture with fallback options',
    status: 'stable',
    complexity: 'simple',
    props: [
      { name: 'src', type: 'string', required: false, description: 'Image source URL' },
      { name: 'alt', type: 'string', required: false, description: 'Alt text for image' },
      { name: 'fallback', type: 'string', required: false, description: 'Fallback text when image fails' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', required: false, description: 'Avatar size' }
    ],
    examples: [
      {
        title: 'Basic Avatar',
        description: 'User profile picture',
        code: '<Avatar src="/user.jpg" alt="John Doe" fallback="JD" />'
      },
      {
        title: 'Avatar Sizes',
        description: 'Different avatar sizes',
        code: '<Avatar size="sm" fallback="SM" />\n<Avatar size="md" fallback="MD" />\n<Avatar size="lg" fallback="LG" />\n<Avatar size="xl" fallback="XL" />'
      }
    ],
    useCases: ['User profiles', 'Contact lists', 'Comments', 'Team members', 'Author bylines']
  }
  
  // Add more components as needed...
]

export function generateComponentDoc(component: ComponentInfo): string {
  return `"use client"

import React, { useState } from 'react'
import { ComponentDocLayout } from '@/components/component-doc-layout'
import { ${component.name} } from '@oryn/ui/${component.name.toLowerCase()}'
import { Button } from '@oryn/ui/button'

const ${component.name}Page = () => {
  const [showExample, setShowExample] = useState(false)

  const examples = [
    ${component.examples.map(example => `{
      title: "${example.title}",
      description: "${example.description}",
      code: \`${example.code}\`,
      preview: () => (
        <div className="flex flex-wrap gap-4 items-center">
          ${example.preview || '// Add preview implementation'}
        </div>
      )
    }`).join(',\n    ')}
  ]

  const props = [
    ${component.props.map(prop => `{
      name: "${prop.name}",
      type: "${prop.type}",
      default: ${prop.default ? `"${prop.default}"` : 'undefined'},
      required: ${prop.required},
      description: "${prop.description}"
    }`).join(',\n    ')}
  ]

  return (
    <ComponentDocLayout
      title="${component.name}"
      description="${component.description}"
      category="${component.category}"
      status="${component.status}"
      complexity="${component.complexity}"
      examples={examples}
      props={props}
      useCases={${JSON.stringify(component.useCases)}}
      dependencies={${component.dependencies ? JSON.stringify(component.dependencies) : '[]'}}
    />
  )
}

export default ${component.name}Page
`
}
