import React, { useState } from 'react'
import { 
  Combobox, 
  Command, 
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  Menubar, 
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  NavigationMenu, 
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Stepper,
  Button
} from '@oryn/ui'
import { Search, Settings, User, CreditCard, HelpCircle, FileText, Layout, BarChart, Shield, Zap, Sparkles, BookOpen, Layers } from 'lucide-react'

export interface ComponentExample {
  title: string
  description?: string
  code: string
  preview: React.ReactNode
}

export const navigationExamples: Record<string, ComponentExample[]> = {
  combobox: [
    {
      title: 'Basic Combobox',
      description: 'A searchable dropdown select component with keyboard navigation',
      code: `import { Combobox } from '@oryn/ui'

export function ComboboxExample() {
  const options = [
    { value: 'nextjs', label: 'Next.js App Router' },
    { value: 'react', label: 'React 19' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'typescript', label: 'TypeScript' }
  ]

  return (
    <div className="w-full max-w-sm">
      <Combobox options={options} placeholder="Select framework..." />
    </div>
  )
}`,
      preview: (
        <div className="w-full max-w-sm">
          <Combobox 
            options={[
              { value: 'nextjs', label: 'Next.js App Router' },
              { value: 'react', label: 'React 19' },
              { value: 'tailwind', label: 'Tailwind CSS' },
              { value: 'typescript', label: 'TypeScript' }
            ]} 
            placeholder="Select framework..." 
          />
        </div>
      )
    }
  ],

  command: [
    {
      title: 'Command Palette',
      description: 'Fast, composable command menu with filtering and keyboard accessibility',
      code: `import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem, 
  CommandSeparator 
} from '@oryn/ui'
import { Search, Settings, User, CreditCard, HelpCircle } from 'lucide-react'

export function CommandExample() {
  return (
    <Command className="rounded-xl border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Profile Settings</span>
          </CommandItem>
          <CommandItem className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span>Billing & Invoices</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span>Workspace Preferences</span>
          </CommandItem>
          <CommandItem className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span>Support & Documentation</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,
      preview: (
        <div className="w-full max-w-md">
          <Command className="rounded-xl border shadow-sm">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Profile Settings</span>
                </CommandItem>
                <CommandItem className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Billing & Invoices</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>Workspace Preferences</span>
                </CommandItem>
                <CommandItem className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Support & Documentation</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )
    }
  ],

  menubar: [
    {
      title: 'Desktop Menubar',
      description: 'Application menubar with dropdown menus and nested items',
      code: `import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarContent, 
  MenubarItem, 
  MenubarSeparator 
} from '@oryn/ui'

export function MenubarExample() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Always Show Bookmarks Bar</MenubarItem>
          <MenubarItem>Reload Page</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
      preview: (
        <div className="w-full max-w-lg flex items-center justify-center p-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Always Show Bookmarks Bar</MenubarItem>
                <MenubarItem>Reload Page</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      )
    }
  ],

  'navigation-menu': [
    {
      title: 'Enterprise Mega Navigation Menu',
      description: 'Full-featured navigation menu with multi-column flyout panels, rich descriptions, and portal positioning that never clips',
      code: `import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger, 
  NavigationMenuContent, 
  NavigationMenuLink 
} from '@oryn/ui'
import { BarChart, Shield, Zap, Sparkles, BookOpen, Layers } from 'lucide-react'

export function NavigationMenuExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 w-[420px] grid grid-cols-2 gap-3">
            <NavigationMenuLink href="#analytics" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-start">
              <BarChart className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-xs text-foreground">Analytics Engine</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Real-time event tracking and dashboards.</div>
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink href="#security" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-start">
              <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-xs text-foreground">Cloud Security</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Zero-trust access and audit logging.</div>
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink href="#compute" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-start">
              <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-xs text-foreground">Edge Compute</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Serverless functions at low latency.</div>
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink href="#ai" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-start">
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-xs text-foreground">AI Integration</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Embedded LLM generation tools.</div>
              </div>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
          <NavigationMenuContent className="p-3 w-72 space-y-1">
            <NavigationMenuLink href="#docs" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-center">
              <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="font-medium text-xs text-foreground">Documentation</div>
                <div className="text-[10px] text-muted-foreground">Guides and architecture overview</div>
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink href="#components" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-center">
              <Layers className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="font-medium text-xs text-foreground">Component Library</div>
                <div className="text-[10px] text-muted-foreground">57+ accessible UI primitives</div>
              </div>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing" className="px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`,
      preview: (
        <div className="w-full flex items-start justify-center min-h-[220px] pt-4 pb-16">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 w-[420px] grid grid-cols-2 gap-3">
                  <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-start">
                    <BarChart className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs text-foreground">Analytics Engine</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Real-time event tracking and dashboards.</div>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-start">
                    <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs text-foreground">Cloud Security</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Zero-trust access and audit logging.</div>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-start">
                    <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs text-foreground">Edge Compute</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Serverless functions at low latency.</div>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-start">
                    <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs text-foreground">AI Integration</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Embedded LLM generation tools.</div>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 w-72 space-y-1">
                  <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-center">
                    <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div>
                      <div className="font-medium text-xs text-foreground">Documentation</div>
                      <div className="text-[10px] text-muted-foreground">Guides and architecture overview</div>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-accent transition-colors flex gap-2.5 items-center">
                    <Layers className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div>
                      <div className="font-medium text-xs text-foreground">Component Library</div>
                      <div className="text-[10px] text-muted-foreground">57+ accessible UI primitives</div>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )
    }
  ],

  pagination: [
    {
      title: 'Controlled Pagination',
      description: 'Standard pagination controller with direct page selection and previous/next actions',
      code: `import { Pagination } from '@oryn/ui'
import { useState } from 'react'

export function PaginationExample() {
  const [page, setPage] = useState(2)

  return (
    <Pagination 
      currentPage={page} 
      totalPages={10} 
      onPageChange={setPage} 
    />
  )
}`,
      preview: (
        <div className="w-full flex justify-center py-4">
          <Pagination 
            currentPage={3} 
            totalPages={10} 
            onPageChange={(page) => console.log('Page:', page)} 
          />
        </div>
      )
    },
    {
      title: 'Composable Compound Pagination',
      description: 'Declarative Radix and shadcn styled compound pagination component with semantic list semantics',
      code: `import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationPrevious, 
  PaginationNext, 
  PaginationEllipsis 
} from '@oryn/ui'

export function CompoundPaginationExample() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`,
      preview: (
        <div className="w-full flex justify-center py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>12</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )
    }
  ],

  stepper: [
    {
      title: 'Workflow Stepper Wizard',
      description: 'Horizontal step tracker with active state highlighting, step completion icons, and interactive navigation',
      code: `import { Stepper, Button } from '@oryn/ui'
import { useState } from 'react'

const STEPS = [
  { title: 'Project Details', description: 'Name and repository settings' },
  { title: 'Environment', description: 'Configure build variables' },
  { title: 'Deployment', description: 'Review and trigger launch' }
]

export function StepperExample() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="w-full max-w-xl space-y-6">
      <Stepper
        steps={STEPS}
        activeStep={activeStep}
        onStepChange={setActiveStep}
      />
      <div className="flex justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <Button
          variant="outline"
          size="sm"
          disabled={activeStep === 0}
          onClick={() => setActiveStep(prev => prev - 1)}
        >
          Previous
        </Button>
        <Button
          size="sm"
          disabled={activeStep === STEPS.length - 1}
          onClick={() => setActiveStep(prev => prev + 1)}
        >
          Next Step
        </Button>
      </div>
    </div>
  )
}`,
      preview: <StepperDemo />
    }
  ]
}

function StepperDemo() {
  const [activeStep, setActiveStep] = React.useState(1)
  const steps = [
    { title: 'Project Details', description: 'Name & repository' },
    { title: 'Environment', description: 'Build variables' },
    { title: 'Deployment', description: 'Launch to prod' }
  ]

  return (
    <div className="w-full max-w-xl space-y-6 p-4">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onStepChange={setActiveStep}
      />
      <div className="flex justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <Button
          variant="outline"
          size="sm"
          disabled={activeStep === 0}
          onClick={() => setActiveStep(prev => prev - 1)}
        >
          Previous
        </Button>
        <Button
          size="sm"
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep(prev => prev + 1)}
        >
          Next Step
        </Button>
      </div>
    </div>
  )
}
