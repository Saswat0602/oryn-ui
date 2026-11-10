import React from 'react'
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
} from '@oryn/ui'
import { PlaygroundConfig } from '@/components/playground/types'

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
    defaultProps: {},
    controls: [],
    render: () => (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-foreground">Core UI</h4>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    75+ accessible headless components with zero external dependencies.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-foreground">Theme Presets</h4>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    Curated color schemes with CSS variable isolation.
                  </p>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
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
      <div className="w-full max-w-md">
        <Stepper
          orientation={props.orientation}
          clickable={props.clickable}
          defaultStep={props.activeStep}
          onStepChange={(s: any) => context.onEvent('onStepChange', s)}
          steps={[
            { title: 'Project Setup', description: 'Configure repository' },
            { title: 'Environment', description: 'Add secrets' },
            { title: 'Deploy', description: 'Publish to Edge' }
          ]}
        />
      </div>
    )
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
    )
  },

  'tree-view': {
    slug: 'tree-view',
    title: 'TreeView',
    componentName: 'TreeView',
    defaultProps: {},
    controls: [],
    render: (_, context) => (
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
          onSelect={(node: any) => context.onEvent('onSelect', node?.label)}
        />
      </div>
    )
  }
}
