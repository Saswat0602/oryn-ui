import React, { useState } from 'react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
  Separator,
  Toggle,
  ScrollArea,
  Resizable,
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
  Navbar,
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarMenuBadge
} from 'oryn-ui'
import { PlaygroundConfig } from '@/components/playground/types'
import { 
  Folder, 
  FileCode, 
  Terminal, 
  Home, 
  Inbox, 
  Settings, 
  Database, 
  Users, 
  Search,
  Sparkles,
  Layers,
  PanelLeft
} from 'lucide-react'

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
      layoutPreset: 'split',
      withHandle: true,
      defaultSize: 35,
      minSize: 20,
      maxSize: 80
    },
    controls: [
      {
        name: 'layoutPreset',
        label: 'Layout Mode',
        type: 'segmented',
        defaultValue: 'split',
        options: ['split', 'nested'],
        category: 'appearance',
        description: '2-Panel split vs Nested IDE multi-pane layout'
      },
      {
        name: 'direction',
        label: 'Resize Axis',
        type: 'segmented',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        category: 'appearance',
        description: 'Primary divider orientation'
      },
      {
        name: 'withHandle',
        label: 'Grab Handle Pill',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Displays centered 6-dot pill grab handle'
      },
      {
        name: 'defaultSize',
        label: 'Initial Split (%)',
        type: 'slider',
        defaultValue: 35,
        min: 20,
        max: 80,
        step: 5,
        category: 'size',
        description: 'Starting ratio of first panel'
      },
      {
        name: 'minSize',
        label: 'Min Panel Size (%)',
        type: 'slider',
        defaultValue: 20,
        min: 10,
        max: 40,
        step: 5,
        category: 'size',
        description: 'Minimum collapse boundary'
      },
      {
        name: 'maxSize',
        label: 'Max Panel Size (%)',
        type: 'slider',
        defaultValue: 80,
        min: 60,
        max: 90,
        step: 5,
        category: 'size',
        description: 'Maximum expand boundary'
      }
    ],
    render: (props, context) => {
      if (props.layoutPreset === 'nested') {
        return (
          <div className="w-full max-w-xl h-64 rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={30} minSize={20} maxSize={45} className="p-3 bg-muted/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground pb-2 border-b border-border/50">
                    <Folder className="w-3.5 h-3.5 text-primary" />
                    <span>Project Files</span>
                  </div>
                  <div className="mt-2.5 space-y-1.5 text-[11px] text-muted-foreground font-mono">
                    <div className="flex items-center gap-1 text-foreground font-medium">📄 src/index.ts</div>
                    <div className="flex items-center gap-1 pl-2">📄 src/components.tsx</div>
                    <div className="flex items-center gap-1 pl-2">📄 package.json</div>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground/60 font-mono">Sidebar (30%)</div>
              </ResizablePanel>
              <ResizableHandle withHandle={props.withHandle} />
              <ResizablePanel defaultSize={70} className="flex-1">
                <ResizablePanelGroup direction="vertical" className="h-full">
                  <ResizablePanel defaultSize={65} minSize={30} className="p-3.5 bg-muted/30 font-mono text-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Source Editor</span>
                      </div>
                      <div className="text-foreground leading-relaxed">
                        <span className="text-primary font-bold">export default</span> function App() &#123;<br />
                        &nbsp;&nbsp;return &lt;<span className="text-blue-400">ResizablePanelGroup</span> /&gt;<br />
                        &#125;
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground/60">Editor Pane (65%)</div>
                  </ResizablePanel>
                  <ResizableHandle withHandle={props.withHandle} />
                  <ResizablePanel defaultSize={35} minSize={20} className="p-3 bg-zinc-950 text-emerald-400 font-mono text-[11px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-zinc-500 text-[10px] mb-1">
                        <Terminal className="w-3 h-3" />
                        <span>INTEGRATED TERMINAL</span>
                      </div>
                      <div className="text-emerald-400">$ oryn-ui compile success (0 errors)</div>
                    </div>
                    <div className="text-[10px] text-zinc-600">Terminal Pane (35%)</div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )
      }

      return (
        <div className="w-full max-w-md h-52 rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
          <Resizable
            direction={props.direction}
            defaultSize={props.defaultSize}
            minSize={props.minSize}
            maxSize={props.maxSize}
            withHandle={props.withHandle}
            onResize={(sz) => context.onEvent('onResize', `${Math.round(sz)}%`)}
            className="h-full"
          >
            <Resizable.Panel className="p-4 text-xs font-medium text-foreground/80 flex flex-col items-center justify-center h-full bg-muted/20">
              <span className="font-semibold text-primary">Explorer Pane</span>
              <span className="text-[10px] text-muted-foreground mt-1 font-mono">
                {Math.round(props.defaultSize)}% width
              </span>
            </Resizable.Panel>
            <Resizable.Panel className="p-4 text-xs font-medium text-foreground/80 flex flex-col items-center justify-center h-full bg-muted/40">
              <span className="font-semibold text-foreground">Content Stage</span>
              <span className="text-[10px] text-muted-foreground mt-1 font-mono">
                {100 - Math.round(props.defaultSize)}% remaining
              </span>
            </Resizable.Panel>
          </Resizable>
        </div>
      )
    },
    generateCode: (props) => {
      if (props.layoutPreset === 'nested') {
        return `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from 'oryn-ui'

export default function NestedResizableDemo() {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-80 rounded-xl border border-border bg-card">
      <ResizablePanel defaultSize={30} minSize={20} maxSize={40} className="p-4 bg-muted/20">
        <h4 className="text-xs font-semibold">Sidebar</h4>
      </ResizablePanel>
      <ResizableHandle withHandle={${props.withHandle}} />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={65} minSize={30} className="p-4 bg-muted/30">
            <h4 className="text-xs font-semibold">Code Editor</h4>
          </ResizablePanel>
          <ResizableHandle withHandle={${props.withHandle}} />
          <ResizablePanel defaultSize={35} minSize={20} className="p-4 bg-zinc-950 text-emerald-400 font-mono text-xs">
            $ terminal output
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`
      }

      return `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from 'oryn-ui'

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="${props.direction}"
      className="w-full h-64 rounded-xl border border-border bg-card overflow-hidden"
    >
      <ResizablePanel defaultSize={${props.defaultSize}} minSize={${props.minSize}} maxSize={${props.maxSize}} className="p-4 bg-muted/20 flex flex-col justify-center items-center">
        <span className="font-semibold text-xs text-primary">Explorer Pane</span>
      </ResizablePanel>
      <ResizableHandle withHandle={${props.withHandle}} />
      <ResizablePanel defaultSize={${100 - props.defaultSize}} className="p-4 bg-muted/40 flex flex-col justify-center items-center">
        <span className="font-semibold text-xs text-foreground">Content Stage</span>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`
    }
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
      variant: 'sidebar',
      collapsible: 'icon',
      side: 'left',
      defaultOpen: true,
      showBadges: true,
      showSearch: true
    },
    controls: [
      {
        name: 'variant',
        label: 'Sidebar Variant',
        type: 'segmented',
        defaultValue: 'sidebar',
        options: ['sidebar', 'floating', 'inset'],
        category: 'appearance',
        description: 'Visual container style'
      },
      {
        name: 'collapsible',
        label: 'Collapsible Mode',
        type: 'segmented',
        defaultValue: 'icon',
        options: ['icon', 'offcanvas', 'none'],
        category: 'appearance',
        description: 'Collapses to icon rail, offcanvas drawer, or fixed'
      },
      {
        name: 'side',
        label: 'Dock Side',
        type: 'segmented',
        defaultValue: 'left',
        options: ['left', 'right'],
        category: 'appearance',
        description: 'Screen edge dock position'
      },
      {
        name: 'defaultOpen',
        label: 'Default Open',
        type: 'boolean',
        defaultValue: true,
        category: 'state',
        description: 'Initial expanded state'
      },
      {
        name: 'showBadges',
        label: 'Show Menu Badges',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Displays notification counts on menu items'
      },
      {
        name: 'showSearch',
        label: 'Quick Search Input',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Enables filter search box in sidebar header'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-md h-80 rounded-2xl border border-border/80 bg-background overflow-hidden shadow-md flex flex-col">
        <SidebarProvider defaultOpen={props.defaultOpen} className="h-full min-h-0 flex-1">
          <Sidebar
            variant={props.variant}
            collapsible={props.collapsible}
            side={props.side}
            className="border-r border-border/60 bg-card/60"
          >
            <SidebarHeader className="border-b border-border/50 p-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                    O
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground leading-none">ORYN Cloud</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">Enterprise v3.2</span>
                  </div>
                </div>
                <SidebarTrigger className="h-7 w-7" />
              </div>
              {props.showSearch && (
                <div className="mt-2 relative">
                  <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search nav..."
                    className="w-full h-7 pl-7 pr-2 rounded-md bg-muted/50 border border-border/50 text-[11px] text-foreground placeholder:text-muted-foreground/60 outline-none"
                    readOnly
                  />
                </div>
              )}
            </SidebarHeader>

            <SidebarContent className="p-2 space-y-3">
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <Home className="w-4 h-4 text-primary shrink-0" />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Inbox className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>Deployments</span>
                      {props.showBadges && <SidebarMenuBadge>12</SidebarMenuBadge>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Database className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>Edge Clusters</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>Team Members</span>
                      {props.showBadges && <SidebarMenuBadge>3</SidebarMenuBadge>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>Security &amp; Keys</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/50 p-2">
              <div className="flex items-center gap-2 px-1 py-1">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold flex items-center justify-center">
                  SR
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-foreground truncate">Saswat Ranjan</span>
                  <span className="text-[10px] text-muted-foreground truncate">admin@oryn.dev</span>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Inset Main Stage */}
          <div className="flex-1 p-4 bg-muted/20 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-medium text-muted-foreground">Main Content Inset</span>
            <span className="text-[11px] text-muted-foreground/60 mt-0.5">Toggle sidebar with top-right button</span>
          </div>
        </SidebarProvider>
      </div>
    ),
    generateCode: (props) => `import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarMenuBadge
} from 'oryn-ui'
import { Home, Inbox, Database, Users, Settings } from 'lucide-react'

export default function SidebarDemo() {
  return (
    <SidebarProvider defaultOpen={${props.defaultOpen}}>
      <Sidebar 
        variant="${props.variant}" 
        collapsible="${props.collapsible}" 
        side="${props.side}"
      >
        <SidebarHeader className="p-3 flex items-center justify-between border-b">
          <span className="font-bold text-sm">ORYN Cloud</span>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Home className="w-4 h-4" />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Inbox className="w-4 h-4" />
                  <span>Deployments</span>
                  ${props.showBadges ? '<SidebarMenuBadge>12</SidebarMenuBadge>' : ''}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Database className="w-4 h-4" />
                  <span>Edge Clusters</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-3 border-t">
          <div className="text-xs text-muted-foreground">Signed in as Admin</div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}`
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
