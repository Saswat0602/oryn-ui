import React from 'react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
  Separator,
  Toggle,
  ScrollArea,
  Resizable,
  Navbar,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from 'oryn-ui'
import { PlaygroundConfig } from '@/components/playground/types'

export const layoutPlaygrounds: Record<string, PlaygroundConfig> = {
  collapsible: {
    slug: 'collapsible',
    title: 'Collapsible',
    componentName: 'Collapsible',
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
        description: 'Disables toggle interaction'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-sm rounded-xl border border-border/60 bg-card p-4 space-y-2">
        <Collapsible 
          disabled={props.disabled}
          onOpenChange={(open) => context.onEvent('onOpenChange', open)}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-foreground">Advanced Network Policies</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">Toggle</Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-3 text-xs text-muted-foreground space-y-1">
            <p>• BGP Anycast routing enabled</p>
            <p>• DDoS layer-7 rate limits active</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  },

  'layout-shell': {
    slug: 'layout-shell',
    title: 'LayoutShell',
    componentName: 'Layout',
    defaultProps: {
      sidebarCollapsed: false
    },
    controls: [
      {
        name: 'sidebarCollapsed',
        label: 'Collapse Sidebar',
        type: 'boolean',
        defaultValue: false,
        category: 'appearance',
        description: 'Toggles sidebar rail mode'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-md h-48 rounded-xl border border-border/60 bg-card overflow-hidden flex flex-col shadow-xs">
        <div className="h-10 border-b border-border/50 bg-muted/40 px-3 flex items-center justify-between text-xs font-medium">
          <span className="font-bold">Madrixa Cloud</span>
          <span className="text-[11px] text-muted-foreground">Admin Portal</span>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className={`border-r border-border/50 bg-muted/20 p-2 text-xs transition-all ${props.sidebarCollapsed ? 'w-12 text-center' : 'w-32'}`}>
            {props.sidebarCollapsed ? '☰' : 'Sidebar'}
          </div>
          <div className="flex-1 p-3 text-xs text-muted-foreground">
            Main Application Content Area
          </div>
        </div>
      </div>
    )
  },

  navbar: {
    slug: 'navbar',
    title: 'Navbar',
    componentName: 'Navbar',
    defaultProps: {
      brandName: 'Madrixa UI',
      theme: 'default'
    },
    controls: [
      {
        name: 'brandName',
        label: 'Brand Name',
        type: 'text',
        defaultValue: 'Madrixa UI',
        category: 'content',
        description: 'Header logo label'
      },
      {
        name: 'theme',
        label: 'Theme',
        type: 'select',
        defaultValue: 'default',
        options: ['default', 'bordered', 'transparent', 'glass'],
        category: 'appearance',
        description: 'Visual styling'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-md rounded-lg overflow-hidden border border-border/60 shadow-xs">
        <Navbar
          brand={props.brandName}
          theme={props.theme}
          navItems={[
            { label: 'Components', href: '#' },
            { label: 'Docs', href: '#' },
            { label: 'Changelog', href: '#' }
          ]}
        />
      </div>
    )
  },

  resizable: {
    slug: 'resizable',
    title: 'Resizable',
    componentName: 'Resizable',
    defaultProps: {
      direction: 'horizontal',
      defaultSize: 50
    },
    controls: [
      {
        name: 'direction',
        label: 'Resize Axis',
        type: 'segmented',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        category: 'appearance',
        description: 'Splits panels horizontally or vertically'
      },
      {
        name: 'defaultSize',
        label: 'Initial Split (%)',
        type: 'slider',
        defaultValue: 50,
        min: 20,
        max: 80,
        step: 5,
        category: 'size',
        description: 'Starting ratio of first panel'
      }
    ],
    render: (props, context) => (
      <div className="w-full max-w-md h-48 rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
        <Resizable
          direction={props.direction}
          defaultSize={props.defaultSize}
          onResize={(sz) => context.onEvent('onResize', `${Math.round(sz)}%`)}
          className="h-full"
        >
          <Resizable.Panel className="p-4 text-xs font-medium text-foreground/80 flex flex-col items-center justify-center h-full bg-muted/20 border-r border-border/40">
            <span className="font-semibold text-primary">Explorer Pane</span>
            <span className="text-[10px] text-muted-foreground mt-1">Drag handle to resize</span>
          </Resizable.Panel>
          <Resizable.Panel className="p-4 text-xs font-medium text-foreground/80 flex flex-col items-center justify-center h-full bg-muted/40">
            <span className="font-semibold text-foreground">Editor Canvas</span>
            <span className="text-[10px] text-muted-foreground mt-1">Responsive flex-grow</span>
          </Resizable.Panel>
        </Resizable>
      </div>
    ),
    generateCode: (props) => `import { Resizable } from 'oryn-ui'

export default function ResizableDemo() {
  return (
    <div className="w-full h-64 rounded-xl border border-border bg-card overflow-hidden">
      <Resizable
        direction="${props.direction}"
        defaultSize={${props.defaultSize}}
        className="h-full"
      >
        <Resizable.Panel className="p-4 bg-muted/20 flex flex-col justify-center items-center">
          <span className="font-semibold text-xs text-primary">Explorer Pane</span>
          <span className="text-[10px] text-muted-foreground mt-1">Drag handle to resize</span>
        </Resizable.Panel>
        <Resizable.Panel className="p-4 bg-muted/40 flex flex-col justify-center items-center">
          <span className="font-semibold text-xs text-foreground">Editor Canvas</span>
          <span className="text-[10px] text-muted-foreground mt-1">Responsive flex-grow</span>
        </Resizable.Panel>
      </Resizable>
    </div>
  )
}`
  },

  'scroll-area': {
    slug: 'scroll-area',
    title: 'ScrollArea',
    componentName: 'ScrollArea',
    defaultProps: {
      orientation: 'vertical',
      scrollbarVariant: 'pill',
      scrollbarSize: 'md'
    },
    controls: [
      {
        name: 'scrollbarVariant',
        label: 'Scrollbar Style',
        type: 'select',
        defaultValue: 'pill',
        options: [
          { label: 'Pill / Accent', value: 'pill' },
          { label: 'Subtle', value: 'subtle' },
          { label: 'Default', value: 'default' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Hidden (None)', value: 'none' }
        ],
        category: 'appearance',
        description: 'Customizable visual scrollbar styling'
      },
      {
        name: 'scrollbarSize',
        label: 'Bar Thickness',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Scrollbar track width'
      },
      {
        name: 'orientation',
        label: 'Scroll Orientation',
        type: 'segmented',
        defaultValue: 'vertical',
        options: ['vertical', 'horizontal', 'both'],
        category: 'appearance',
        description: 'Direction of custom scrollbar'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-card p-3 shadow-xs">
        <ScrollArea
          orientation={props.orientation}
          scrollbarVariant={props.scrollbarVariant}
          scrollbarSize={props.scrollbarSize}
          className="h-44 w-full"
        >
          <div className="p-3 space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <h4 className="font-semibold text-foreground">Changelog Releases</h4>
              <span className="text-[10px] text-primary font-mono font-bold">12 entries</span>
            </div>
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between text-muted-foreground p-1.5 rounded-lg hover:bg-muted/40 transition-colors">
                <span>• v3.{i}.0 – Upgraded zero-dependency primitives &amp; themes</span>
                <span className="text-[10px] font-mono text-muted-foreground/60">Nov {i + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    ),
    generateCode: (props) => `import { ScrollArea } from 'oryn-ui'

export default function ScrollAreaDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-3">
      <ScrollArea
        orientation="${props.orientation}"
        scrollbarVariant="${props.scrollbarVariant}"
        scrollbarSize="${props.scrollbarSize}"
        className="h-44 w-full"
      >
        <div className="p-3 space-y-2.5 text-xs">
          <h4 className="font-semibold text-foreground pb-2 border-b border-border/40">Changelog</h4>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="text-muted-foreground p-1 rounded hover:bg-muted/40">
              • Release v3.{i}.0 – High-craft UI improvements
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}`
  },

  separator: {
    slug: 'separator',
    title: 'Separator',
    componentName: 'Separator',
    defaultProps: {
      orientation: 'horizontal',
      lineStyle: 'solid',
      thickness: 'thin'
    },
    controls: [
      {
        name: 'orientation',
        label: 'Orientation',
        type: 'segmented',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        category: 'appearance',
        description: 'Divider direction'
      },
      {
        name: 'lineStyle',
        label: 'Line Pattern',
        type: 'segmented',
        defaultValue: 'solid',
        options: ['solid', 'dashed', 'dotted'],
        category: 'appearance',
        description: 'Border stroke style'
      },
      {
        name: 'thickness',
        label: 'Thickness',
        type: 'segmented',
        defaultValue: 'thin',
        options: ['thin', 'medium', 'thick'],
        category: 'size',
        description: 'Line stroke width'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-xs p-4 rounded-xl border border-border/60 bg-card text-xs space-y-3">
        <div>Root Package (oryn-ui)</div>
        <Separator
          orientation={props.orientation}
          lineStyle={props.lineStyle}
          thickness={props.thickness}
          className={props.orientation === 'vertical' ? 'h-8 inline-block mx-2' : ''}
        />
        <div>Documentation Portal (docs/)</div>
      </div>
    )
  },

  sidebar: {
    slug: 'sidebar',
    title: 'Sidebar',
    componentName: 'Sidebar',
    defaultProps: {
      defaultCollapsed: false
    },
    controls: [
      {
        name: 'defaultCollapsed',
        label: 'Collapsed Rail Mode',
        type: 'boolean',
        defaultValue: false,
        category: 'appearance',
        description: 'Shrinks navigation items to icon-only rail'
      }
    ],
    render: (props) => (
      <div className="w-64 h-56 rounded-xl border border-border/60 bg-card overflow-hidden shadow-xs flex">
        <Sidebar defaultCollapsed={props.defaultCollapsed} className="w-full">
          <SidebarHeader>
            <div className="px-3 py-2 text-xs font-bold text-foreground">Acme Cloud</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Deployments</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Edge Functions</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Analytics</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    )
  },

  toggle: {
    slug: 'toggle',
    title: 'Toggle',
    componentName: 'Toggle',
    defaultProps: {
      variant: 'default',
      size: 'md',
      disabled: false
    },
    controls: [
      {
        name: 'variant',
        label: 'Toggle Variant',
        type: 'segmented',
        defaultValue: 'default',
        options: ['default', 'outline'],
        category: 'appearance',
        description: 'Surface styling'
      },
      {
        name: 'size',
        label: 'Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Button dimension'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        category: 'state',
        description: 'Disables press interaction'
      }
    ],
    render: (props, context) => (
      <Toggle
        variant={props.variant}
        size={props.size}
        disabled={props.disabled}
        defaultPressed={true}
        onPressedChange={(pressed) => context.onEvent('onPressedChange', pressed)}
      >
        <span className="font-bold">B</span>
      </Toggle>
    )
  }
}
