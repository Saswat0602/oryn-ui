import React, { useState } from 'react'
import {
  Combobox,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
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
  Stepper,
  Timeline,
  TreeView
} from 'oryn-ui'
import { PlaygroundConfig } from '@/components/playground/types'
import { BarChart, Shield, Zap, Sparkles, BookOpen, Layers } from 'lucide-react'

function InteractiveStepperDemo(props: any) {
  const [activeStep, setActiveStep] = useState(props.activeStep ?? 1)
  return (
    <div className="w-full max-w-md">
      <Stepper
        orientation={props.orientation}
        clickable={props.clickable}
        activeStep={activeStep}
        onStepChange={(s) => {
          setActiveStep(s)
          props.onStepChange?.(s)
        }}
        steps={[
          { title: 'Project Setup', description: 'Configure repository' },
          { title: 'Environment', description: 'Add secrets and keys' },
          { title: 'Deploy', description: 'Publish to Edge clusters' }
        ]}
      />
    </div>
  )
}

export const navigationPlaygrounds: Record<string, PlaygroundConfig> = {
  combobox: {
    slug: 'combobox',
    title: 'Combobox',
    componentName: 'Combobox',
    defaultProps: {
      placeholder: 'Search cloud framework...',
      disabled: false
    },
    controls: [
      {
        name: 'placeholder',
        label: 'Placeholder Text',
        type: 'text',
        defaultValue: 'Search cloud framework...',
        category: 'content',
        description: 'Input hint text'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables combobox'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-xs">
        <Combobox
          placeholder={props.placeholder}
          disabled={props.disabled}
          options={[
            { label: 'Next.js (App Router)', value: 'next' },
            { label: 'Remix / React Router', value: 'remix' },
            { label: 'SvelteKit', value: 'svelte' },
            { label: 'Astro (SSR)', value: 'astro' }
          ]}
          onValueChange={(val: any) => context.onEvent('onValueChange', val)}
        />
      </div>
    )
  },

  command: {
    slug: 'command',
    title: 'Command',
    componentName: 'Command',
    defaultProps: {
      placeholder: 'Type a command or search...'
    },
    controls: [
      {
        name: 'placeholder',
        label: 'Search Placeholder',
        type: 'text',
        defaultValue: 'Type a command or search...',
        category: 'content',
        description: 'Search box hint'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-sm rounded-xl border border-border/60 bg-card overflow-hidden shadow-xs">
        <Command>
          <CommandInput placeholder={props.placeholder} />
          <CommandList>
            <CommandEmpty>No matching results found.</CommandEmpty>
            <CommandGroup heading="Platform Suggestions">
              <CommandItem onSelect={() => context.onEvent('onSelect', 'Deploy')}>
                Deploy to Production
              </CommandItem>
              <CommandItem onSelect={() => context.onEvent('onSelect', 'Domains')}>
                Configure Custom Domains
              </CommandItem>
              <CommandItem onSelect={() => context.onEvent('onSelect', 'Logs')}>
                Stream Real-time Edge Logs
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    )
  },

  menubar: {
    slug: 'menubar',
    title: 'Menubar',
    componentName: 'Menubar',
    defaultProps: {},
    controls: [],
    render: (_, context) => (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => context.onEvent('onSelect', 'New Tab')}>
              New Window
            </MenubarItem>
            <MenubarItem onSelect={() => context.onEvent('onSelect', 'New Project')}>
              New Project...
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onSelect={() => context.onEvent('onSelect', 'Export')}>
              Export Bundle
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Deploy</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => context.onEvent('onSelect', 'Preview')}>
              Deploy Preview
            </MenubarItem>
            <MenubarItem onSelect={() => context.onEvent('onSelect', 'Production')}>
              Promote to Production
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },

  'navigation-menu': {
    slug: 'navigation-menu',
    title: 'NavigationMenu',
    componentName: 'NavigationMenu',
    defaultProps: {
      delayDuration: 150,
      showChevron: true
    },
    controls: [
      {
        name: 'delayDuration',
        label: 'Hover Delay (ms)',
        type: 'slider',
        defaultValue: 150,
        min: 50,
        max: 500,
        step: 50,
        category: 'options',
        description: 'Delay before opening/closing menu on hover'
      },
      {
        name: 'showChevron',
        label: 'Show Chevron Arrow',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Displays animated dropdown chevron icon'
      }
    ],
    render: (props) => (
      <div className="w-full flex justify-center py-4">
        <NavigationMenu delayDuration={props.delayDuration}>
          <NavigationMenuList className="p-1 rounded-xl bg-muted/40 border border-border/60">
            <NavigationMenuItem>
              <NavigationMenuTrigger showChevron={props.showChevron}>
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent usePortal={false} className="p-3 w-[380px] grid grid-cols-2 gap-2">
                <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-muted/70 transition-colors flex gap-2 items-start">
                  <BarChart className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-xs text-foreground">Analytics</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Real-time metrics</div>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-muted/70 transition-colors flex gap-2 items-start">
                  <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-xs text-foreground">Security</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Zero-trust audit</div>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-muted/70 transition-colors flex gap-2 items-start">
                  <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-xs text-foreground">Compute</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Serverless edge</div>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-muted/70 transition-colors flex gap-2 items-start">
                  <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-xs text-foreground">AI Engine</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Agentic workflows</div>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger showChevron={props.showChevron}>
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent usePortal={false} className="p-2.5 w-64 space-y-1">
                <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-muted/70 transition-colors flex gap-2.5 items-center">
                  <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium text-xs text-foreground">Documentation</div>
                    <div className="text-[10px] text-muted-foreground">Framework guides</div>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="p-2 rounded-lg hover:bg-muted/70 transition-colors flex gap-2.5 items-center">
                  <Layers className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium text-xs text-foreground">Components</div>
                    <div className="text-[10px] text-muted-foreground">76+ headless UI elements</div>
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
    ),
    generateCode: (props) => `import { NavigationMenu } from 'oryn-ui'
import { BarChart, Shield, Zap, Sparkles, BookOpen, Layers } from 'lucide-react'

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu delayDuration={${props.delayDuration}}>
      <NavigationMenu.List className="p-1 rounded-xl bg-muted/40 border border-border/60">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger showChevron={${props.showChevron}}>
            Products
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="p-3 w-[380px] grid grid-cols-2 gap-2">
            <NavigationMenu.Link href="/analytics" className="p-2 rounded-lg hover:bg-muted/70 flex gap-2 items-start">
              <BarChart className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-xs text-foreground">Analytics</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Real-time edge metrics</div>
              </div>
            </NavigationMenu.Link>
            <NavigationMenu.Link href="/security" className="p-2 rounded-lg hover:bg-muted/70 flex gap-2 items-start">
              <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-xs text-foreground">Security</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Zero-trust audit</div>
              </div>
            </NavigationMenu.Link>
            <NavigationMenu.Link href="/compute" className="p-2 rounded-lg hover:bg-muted/70 flex gap-2 items-start">
              <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-xs text-foreground">Compute</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Serverless edge</div>
              </div>
            </NavigationMenu.Link>
            <NavigationMenu.Link href="/ai" className="p-2 rounded-lg hover:bg-muted/70 flex gap-2 items-start">
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-xs text-foreground">AI Engine</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Agentic workflows</div>
              </div>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger showChevron={${props.showChevron}}>
            Resources
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="p-2.5 w-64 space-y-1">
            <NavigationMenu.Link href="/docs" className="p-2 rounded-lg hover:bg-muted/70 flex gap-2.5 items-center">
              <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="font-medium text-xs text-foreground">Documentation</div>
                <div className="text-[10px] text-muted-foreground">Framework guides</div>
              </div>
            </NavigationMenu.Link>
            <NavigationMenu.Link href="/components" className="p-2 rounded-lg hover:bg-muted/70 flex gap-2.5 items-center">
              <Layers className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="font-medium text-xs text-foreground">Components</div>
                <div className="text-[10px] text-muted-foreground">76+ headless UI elements</div>
              </div>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link href="/pricing" className="px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  )
}`
  },

  pagination: {
    slug: 'pagination',
    title: 'Pagination',
    componentName: 'Pagination',
    defaultProps: {
      totalPages: 10,
      currentPage: 3,
      showFirstLast: true,
      showPrevNext: true
    },
    controls: [
      {
        name: 'totalPages',
        label: 'Total Pages',
        type: 'slider',
        defaultValue: 10,
        min: 3,
        max: 20,
        category: 'options',
        description: 'Total number of pages available'
      },
      {
        name: 'showFirstLast',
        label: 'First/Last Controls',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Shows jump to first/last buttons'
      },
      {
        name: 'showPrevNext',
        label: 'Prev/Next Controls',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Shows previous and next buttons'
      }
    ],
    render: (props, context) => (
      <Pagination
        totalPages={props.totalPages}
        currentPage={props.currentPage}
        showFirstLast={props.showFirstLast}
        showPrevNext={props.showPrevNext}
        onPageChange={(p: any) => context.onEvent('onPageChange', p)}
      />
    )
  },

  stepper: {
    slug: 'stepper',
    title: 'Stepper',
    componentName: 'Stepper',
    defaultProps: {
      orientation: 'horizontal',
      clickable: true,
      activeStep: 1
    },
    controls: [
      {
        name: 'orientation',
        label: 'Orientation',
        type: 'segmented',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        category: 'appearance',
        description: 'Layout axis'
      },
      {
        name: 'clickable',
        label: 'Allow Step Clicking',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Allows users to navigate via step badges'
      }
    ],
    render: (props, context) => (
      <InteractiveStepperDemo
        orientation={props.orientation}
        clickable={props.clickable}
        activeStep={props.activeStep}
        onStepChange={(s: any) => context.onEvent('onStepChange', s)}
      />
    ),
    generateCode: (props) => `import { Stepper, Button } from 'oryn-ui'
import { useState } from 'react'

const steps = [
  { id: 1, title: 'Repository', description: 'Link GitHub repo' },
  { id: 2, title: 'Environment', description: 'Configure env vars' },
  { id: 3, title: 'Deploy', description: 'Trigger edge build' },
]

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="space-y-6 w-full max-w-md">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        orientation="${props.orientation}"
        clickable={${props.clickable}}
        onStepClick={setCurrentStep}
      />
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          size="sm"
          disabled={currentStep === steps.length}
          onClick={() => setCurrentStep((s) => Math.min(steps.length, s + 1))}
        >
          {currentStep === steps.length ? 'Completed' : 'Next Step'}
        </Button>
      </div>
    </div>
  )
}`
  },

  timeline: {
    slug: 'timeline',
    title: 'Timeline',
    componentName: 'Timeline',
    defaultProps: {},
    controls: [],
    render: () => (
      <div className="w-full max-w-sm">
        <Timeline
          items={[
            { id: '1', status: 'completed', title: 'Commit pushed to master', description: 'Triggered by @saswat0602' },
            { id: '2', status: 'completed', title: 'CI pipeline passed', description: '76 smoke tests verified' },
            { id: '3', status: 'current', title: 'Deploying to Edge clusters', description: 'Provisioning iad1 and sfo1' }
          ]}
        />
      </div>
    ),
    generateCode: () => `import { Timeline } from 'oryn-ui'

const items = [
  { id: '1', status: 'completed' as const, title: 'Commit pushed to master', description: 'Triggered by @saswat0602' },
  { id: '2', status: 'completed' as const, title: 'CI pipeline passed', description: '76 smoke tests verified' },
  { id: '3', status: 'current' as const, title: 'Deploying to Edge clusters', description: 'Provisioning iad1 and sfo1' }
]

export default function TimelineDemo() {
  return (
    <div className="w-full max-w-sm">
      <Timeline items={items} />
    </div>
  )
}`
  },

  'tree-view': {
    slug: 'tree-view',
    title: 'TreeView',
    componentName: 'TreeView',
    defaultProps: {
      defaultExpanded: true
    },
    controls: [
      {
        name: 'defaultExpanded',
        label: 'Default Expand Branches',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Auto-expands root directories on load'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-xs p-3 rounded-xl border border-border/60 bg-card text-xs">
        <TreeView
          data={[
            {
              id: 'src',
              label: 'src',
              children: [
                { id: 'components', label: 'components' },
                { id: 'hooks', label: 'hooks' },
                { id: 'theme', label: 'theme' }
              ]
            },
            {
              id: 'docs',
              label: 'docs',
              children: [
                { id: 'app', label: 'app' },
                { id: 'lib', label: 'lib' }
              ]
            }
          ]}
          defaultExpandedIds={props.defaultExpanded ? ['src', 'docs'] : []}
          onSelect={(node: any) => context.onEvent('onSelect', node?.label)}
        />
      </div>
    ),
    generateCode: (props) => `import { TreeView, TreeNode } from 'oryn-ui'
import { useState } from 'react'

const fileTree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'components', label: 'components' },
      { id: 'hooks', label: 'hooks' },
      { id: 'theme', label: 'theme' }
    ]
  },
  {
    id: 'docs',
    label: 'docs',
    children: [
      { id: 'app', label: 'app' },
      { id: 'lib', label: 'lib' }
    ]
  }
]

export default function TreeViewDemo() {
  const [selectedId, setSelectedId] = useState<string>('components')

  return (
    <div className="w-full max-w-xs p-3 rounded-xl border border-border/60 bg-card text-xs">
      <TreeView
        data={fileTree}
        selectedId={selectedId}
        onSelect={(node) => setSelectedId(node.id)}
        defaultExpandedIds={${props.defaultExpanded ? "['src', 'docs']" : "[]"}}
      />
    </div>
  )
}`
  }
}
