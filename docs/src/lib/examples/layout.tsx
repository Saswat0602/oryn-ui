"use client"

import React, { useState } from 'react'
import { 
  Drawer,
  Layout, 
  Modal, 
  Navbar, 
  Popover, 
  PopoverTrigger,
  PopoverContent,
  Resizable, 
  ResizablePanel,
  ResizableHandle,
  ScrollArea, 
  ScrollBar,
  Sheet, 
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sidebar, 
  Tooltip,
  Button,
  Input
} from 'oryn-ui'
import { 
  Home, 
  BarChart, 
  Users, 
  FileText, 
  Calendar, 
  Mail, 
  Settings, 
  User,
  Heart,
  Star,
  ShoppingCart,
  MessageCircle,
  Info,
  Briefcase,
  Image,
  Award,
  Zap,
  Palette,
  Check,
  Sliders,
  Bell,
  PanelLeft,
  Share2,
  Copy,
  Layers,
  Folder,
  FileCode,
  Shield
} from 'lucide-react'

// 1. Interactive Drawer Demo
function InteractiveDrawerDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right')
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'full'>('md')
  
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg">
      {/* Position Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Position:</span>
        {(['right', 'left', 'top', 'bottom'] as const).map((pos) => (
          <button
            key={pos}
            onClick={() => setPosition(pos)}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
              position === pos 
                ? 'bg-primary text-primary-foreground shadow-xs' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {pos.charAt(0).toUpperCase() + pos.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Size Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Size:</span>
        {(['sm', 'md', 'lg', 'full'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
              size === s 
                ? 'bg-primary text-primary-foreground shadow-xs' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>
      
      {/* Open Button */}
      <Button onClick={() => setIsOpen(true)}>
        Open {position.charAt(0).toUpperCase() + position.slice(1)} Drawer ({size.toUpperCase()})
      </Button>
      
      {/* Drawer */}
      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        position={position}
        size={size}
        className="bg-card border-border"
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Drawer Overview</h3>
            <p className="text-xs text-muted-foreground">
              Sliding panel from the <span className="font-semibold text-foreground">{position}</span> edge in size <span className="font-semibold text-foreground">{size}</span>.
            </p>
          </div>
          <div className="rounded-lg border border-border p-3 bg-muted/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-foreground">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Full focus trap & Escape key dismiss</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Body scroll lock on mount</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Smooth CSS spring slide transitions</span>
            </div>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Close Drawer
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

// 2. Interactive Modal Demo
function InteractiveModalDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Modal Size:</span>
        {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
              size === s
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      <Button onClick={() => setIsOpen(true)}>
        Open {size.toUpperCase()} Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
        title="Project Settings"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Configure enterprise workspace configurations, access control policies, and deployment rules.
          </p>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Repository Name</label>
            <Input defaultValue="oryn-ui" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Production Branch</label>
            <Input defaultValue="master" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Deploy Target</label>
            <Input defaultValue="iad1 (Washington, D.C.)" />
          </div>
        </div>
      </Modal>
    </div>
  )
}

// 3. Interactive Popover Demo
function InteractivePopoverDemo() {
  return (
    <div className="flex items-center justify-center py-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Sliders className="h-4 w-4" />
            <span>Layer Dimensions</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-3">
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-foreground">Dimensions</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Set width, height, and maximum boundary constraints.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-xs text-muted-foreground">Width</label>
                <Input defaultValue="100%" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-xs text-muted-foreground">Max Width</label>
                <Input defaultValue="1280px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-xs text-muted-foreground">Height</label>
                <Input defaultValue="auto" className="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// 4. Interactive Sheet Demo
function InteractiveSheetDemo() {
  const [side, setSide] = useState<'right' | 'left' | 'top' | 'bottom'>('right')
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(['right', 'left', 'top', 'bottom'] as const).map((s) => (
          <button
            key={s}
            onClick={() => {
              setSide(s)
              setOpen(true)
            }}
            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors cursor-pointer ${
              side === s
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Open {s.charAt(0).toUpperCase() + s.slice(1)} Sheet
          </button>
        ))}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Edit User Profile</SheetTitle>
            <SheetDescription>
              Make changes to your user credentials and access permissions here.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Full Name</label>
              <Input defaultValue="Saswat Mohanty" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Organization Role</label>
              <Input defaultValue="Senior Systems Architect" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Corporate Email</label>
              <Input defaultValue="saswat@oryn-ui.dev" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </SheetClose>
            <Button size="sm" onClick={() => setOpen(false)}>Save Changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// 5. Interactive Resizable Demo
function InteractiveResizableDemo() {
  return (
    <div className="w-full max-w-xl">
      <Resizable
        direction="horizontal"
        defaultSize={180}
        minSize={120}
        maxSize={280}
        className="h-64 rounded-xl border border-border shadow-xs"
      >
        <ResizablePanel defaultSize={180} className="p-3 bg-muted/30">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Project Explorer
          </div>
          <div className="space-y-1 text-xs text-foreground">
            <div className="px-2 py-1 rounded-md bg-muted/50 font-medium flex items-center gap-1.5">
              <Folder className="h-3.5 w-3.5 text-primary" />
              <span>components</span>
            </div>
            <div className="px-2 py-1 text-muted-foreground flex items-center gap-1.5">
              <Folder className="h-3.5 w-3.5" />
              <span>layout</span>
            </div>
            <div className="px-2 py-1 text-muted-foreground flex items-center gap-1.5">
              <Folder className="h-3.5 w-3.5" />
              <span>overlay</span>
            </div>
            <div className="px-2 py-1 text-muted-foreground flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5 text-muted-foreground/70" />
              <span>package.json</span>
            </div>
          </div>
        </ResizablePanel>

        <div className="flex-1 p-4 bg-background flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-foreground">Interactive Workspace</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Drag the vertical separator handle horizontally to resize panels, or focus it and use left/right arrow keys.
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-border/50 pt-2">
            <span>Branch: master</span>
            <span className="text-emerald-500 font-medium">● Ready</span>
          </div>
        </div>
      </Resizable>
    </div>
  )
}

// 6. Interactive ScrollArea Demo
function InteractiveScrollAreaDemo() {
  const tags = Array.from({ length: 30 }).map((_, i) => `v3.2.${i + 1}-rc`)

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center">
      <div className="w-56 rounded-xl border border-border bg-card shadow-xs">
        <div className="p-3 border-b border-border text-xs font-semibold text-foreground">
          Release Tags (Vertical)
        </div>
        <ScrollArea className="h-52 p-2">
          <div className="space-y-1">
            {tags.map((tag) => (
              <div 
                key={tag} 
                className="px-2.5 py-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors font-mono text-[11px] cursor-pointer"
              >
                {tag}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="w-full sm:w-64 rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs">
        <div className="text-xs font-semibold text-foreground">
          Horizontal Scrolling
        </div>
        <ScrollArea orientation="horizontal" className="w-full pb-2">
          <div className="flex gap-2 w-max pb-1">
            {['React 19', 'Next.js 16', 'TypeScript 5', 'Tailwind CSS v4', 'Turbopack', 'WAI-ARIA', 'Radix Parity', 'Zero Bloat'].map((topic) => (
              <span key={topic} className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-foreground shrink-0 border border-border/60">
                {topic}
              </span>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

// 7. Interactive LayoutShell Demo
function InteractiveLayoutShellDemo() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="w-full max-w-2xl rounded-xl border border-border overflow-hidden bg-background shadow-xs">
      {/* Top Navbar */}
      <div className="h-12 border-b border-border bg-card px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-[10px]">M</div>
          <span className="font-semibold text-xs text-foreground">ORYN UI Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium"
          >
            {collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex h-56">
        {/* Sidebar */}
        <div className={`border-r border-border bg-muted/30 p-2 transition-all duration-200 flex flex-col justify-between ${collapsed ? 'w-14' : 'w-44'}`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
              <Home className="h-3.5 w-3.5 shrink-0" />
              {!collapsed && <span>Dashboard</span>}
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground text-xs font-medium">
              <BarChart className="h-3.5 w-3.5 shrink-0" />
              {!collapsed && <span>Analytics</span>}
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground text-xs font-medium">
              <Settings className="h-3.5 w-3.5 shrink-0" />
              {!collapsed && <span>Settings</span>}
            </div>
          </div>
          <div className="px-2 py-1 text-[10px] text-muted-foreground truncate font-mono">
            {!collapsed && 'v3.2.0'}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-card">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-foreground">Workspace Overview</h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Active</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg border border-border/80 bg-background">
              <div className="text-[10px] text-muted-foreground">Total Requests</div>
              <div className="text-base font-bold text-foreground">1.24M</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border/80 bg-background">
              <div className="text-[10px] text-muted-foreground">Avg Latency</div>
              <div className="text-base font-bold text-emerald-500">18ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const layoutExamples = {
  drawer: [
    {
      title: 'Interactive Multi-Direction Drawer',
      description: 'Slide-out drawer panel supporting 4 directions (right, left, top, bottom) and custom sizes',
      code: `import { Drawer, Button } from 'oryn-ui'
import { useState } from 'react'

export function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'right' | 'left' | 'top' | 'bottom'>('right')

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        size="md"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Drawer Panel</h3>
          <p className="text-xs text-muted-foreground">
            Drawer sliding smoothly from the {position} edge with body scroll lock.
          </p>
        </div>
      </Drawer>
    </>
  )
}`,
      preview: <InteractiveDrawerDemo />
    }
  ],

  modal: [
    {
      title: 'Interactive Modal Dialog',
      description: 'Modal with backdrop blur, focus trap, customizable sizes, header, and action buttons',
      code: `import { Modal, Button, Input } from 'oryn-ui'
import { useState } from 'react'

export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Project Settings</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="md"
        title="Project Settings"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Configure workspace configurations and deployment preferences.
          </p>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Repository Name</label>
            <Input defaultValue="oryn-ui" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Production Branch</label>
            <Input defaultValue="master" />
          </div>
        </div>
      </Modal>
    </>
  )
}`,
      preview: <InteractiveModalDemo />
    }
  ],

  popover: [
    {
      title: 'Composable Popover (Radix / shadcn Style)',
      description: 'Floating contextual popover anchored to a trigger button with automatic viewport flipping',
      code: `import { Popover, PopoverTrigger, PopoverContent, Button, Input } from 'oryn-ui'

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Layer Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-3">
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-foreground">Dimensions</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Set width, height, and maximum boundary constraints.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-2">
              <label className="text-xs text-muted-foreground">Width</label>
              <Input defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label className="text-xs text-muted-foreground">Height</label>
              <Input defaultValue="auto" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
      preview: <InteractivePopoverDemo />
    }
  ],

  sheet: [
    {
      title: 'Slide-Over Sheet (4 Directions)',
      description: 'Side drawer dialog with focus trap, backdrop blur, and direction choices (right, left, top, bottom)',
      code: `import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetFooter, 
  SheetClose, 
  Button, 
  Input 
} from 'oryn-ui'

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit User Profile</SheetTitle>
          <SheetDescription>
            Make changes to your user account and access permissions here.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Full Name</label>
            <Input defaultValue="Saswat Mohanty" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Corporate Email</label>
            <Input defaultValue="saswat@oryn-ui.dev" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </SheetClose>
          <Button size="sm">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}`,
      preview: <InteractiveSheetDemo />
    }
  ],

  resizable: [
    {
      title: 'Interactive Resizable Panels',
      description: 'Split pane container with draggable divider handle and keyboard arrow key resizing',
      code: `import { Resizable, ResizablePanel, ResizableHandle } from 'oryn-ui'

export function ResizableDemo() {
  return (
    <Resizable
      direction="horizontal"
      defaultSize={180}
      minSize={120}
      maxSize={280}
      className="h-64 rounded-xl border border-border"
    >
      <ResizablePanel defaultSize={180} className="p-3 bg-muted/30">
        <div className="text-xs font-semibold text-muted-foreground">Explorer</div>
        <div className="space-y-1 text-xs mt-2">
          <div>📁 components</div>
          <div>📁 layout</div>
        </div>
      </ResizablePanel>

      <div className="flex-1 p-4 bg-background">
        <h4 className="text-sm font-semibold">Workspace</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Drag the separator handle to resize.
        </p>
      </div>
    </Resizable>
  )
}`,
      preview: <InteractiveResizableDemo />
    }
  ],

  'scroll-area': [
    {
      title: 'Custom Scroll Area (Vertical & Horizontal)',
      description: 'Custom scrollable viewport with native momentum scrolling and sleek themed scrollbars',
      code: `import { ScrollArea } from 'oryn-ui'

export function ScrollAreaDemo() {
  const tags = Array.from({ length: 30 }).map((_, i) => \`v3.2.\${i + 1}-rc\`)

  return (
    <ScrollArea className="h-52 w-56 rounded-xl border border-border p-2">
      <div className="space-y-1">
        {tags.map((tag) => (
          <div key={tag} className="px-2 py-1 text-xs font-mono">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`,
      preview: <InteractiveScrollAreaDemo />
    }
  ],

  // Alias for scrollarea slug
  scrollarea: [
    {
      title: 'Custom Scroll Area (Vertical & Horizontal)',
      description: 'Custom scrollable viewport with native momentum scrolling and sleek themed scrollbars',
      code: `import { ScrollArea } from 'oryn-ui'

export function ScrollAreaDemo() {
  const tags = Array.from({ length: 30 }).map((_, i) => \`v3.2.\${i + 1}-rc\`)

  return (
    <ScrollArea className="h-52 w-56 rounded-xl border border-border p-2">
      <div className="space-y-1">
        {tags.map((tag) => (
          <div key={tag} className="px-2 py-1 text-xs font-mono">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`,
      preview: <InteractiveScrollAreaDemo />
    }
  ],

  layout: [
    {
      title: 'Interactive Application Shell',
      description: 'Enterprise dashboard layout featuring sticky topbar, collapsible navigation sidebar, and main workspace',
      code: `import { Layout } from 'oryn-ui'

export function AppShellDemo() {
  return (
    <Layout
      showNavbar={true}
      showSidebar={true}
      sidebarWidth={240}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold">Workspace Overview</h2>
      </div>
    </Layout>
  )
}`,
      preview: <InteractiveLayoutShellDemo />
    }
  ],

  'layout-shell': [
    {
      title: 'Interactive Application Shell',
      description: 'Enterprise dashboard layout featuring sticky topbar, collapsible navigation sidebar, and main workspace',
      code: `import { Layout } from 'oryn-ui'

export function AppShellDemo() {
  return (
    <Layout
      showNavbar={true}
      showSidebar={true}
      sidebarWidth={240}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold">Workspace Overview</h2>
      </div>
    </Layout>
  )
}`,
      preview: <InteractiveLayoutShellDemo />
    }
  ],

  navbar: [
    {
      title: 'Enterprise Header Navbar',
      description: 'Sleek, responsive black & white enterprise header with dropdown navigation, embedded search, notification center, and user profile',
      code: `import { Navbar } from 'oryn-ui'
import { Home, Layers, Settings, BarChart, Shield, Zap } from 'lucide-react'

export function NavbarDemo() {
  const items = [
    { id: 'overview', label: 'Overview', icon: Home, active: true },
    { 
      id: 'deployments', 
      label: 'Deployments', 
      icon: Layers,
      dropdown: [
        { label: 'Production Clusters', action: () => {} },
        { label: 'Staging Preview', action: () => {} },
        { label: 'Canary Releases', action: () => {} }
      ]
    },
    { id: 'analytics', label: 'Analytics', icon: BarChart, badge: 'Live' },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <Navbar 
      brand="CloudScale" 
      navItems={items} 
      showSearch 
      showNotifications 
      notificationCount={3}
      showProfile
      profileName="Alex Morgan"
      profileRole="DevOps Lead"
      showCTA
      ctaText="Deploy"
    />
  )
}`,
      preview: (
        <div className="w-full max-w-4xl rounded-xl border border-border overflow-hidden bg-background shadow-xs">
          <Navbar
            brand="CloudScale"
            navItems={[
              { id: 'overview', label: 'Overview', icon: Home, active: true },
              { 
                id: 'deployments', 
                label: 'Deployments', 
                icon: Layers,
                dropdown: [
                  { label: 'Production Clusters', action: () => {} },
                  { label: 'Staging Preview', action: () => {} },
                  { label: 'Canary Releases', action: () => {} }
                ]
              },
              { id: 'analytics', label: 'Analytics', icon: BarChart, badge: 'Live' },
              { id: 'settings', label: 'Settings', icon: Settings }
            ]}
            showSearch
            searchPlaceholder="Search infrastructure..."
            showNotifications
            notificationCount={3}
            notificationItems={[
              { id: '1', title: 'Deployment completed', message: 'Cluster us-east-1 deployed v2.14.0', time: '2m ago' },
              { id: '2', title: 'High CPU alert', message: 'Worker-04 threshold exceeded 90%', time: '14m ago' }
            ]}
            showProfile
            profileName="Alex Morgan"
            profileRole="DevOps Lead"
            showCTA
            ctaText="Deploy"
          />
        </div>
      )
    }
  ],

  sidebar: [
    {
      title: 'Collapsible Enterprise Sidebar',
      description: 'Sleek multi-section application navigation with search filtering, badges, keyboard shortcuts, collapsed tooltips, and user profile footer',
      code: `import { Sidebar } from 'oryn-ui'
import { Home, BarChart, Users, Settings, Shield, Layers } from 'lucide-react'

export function SidebarDemo() {
  const sections = [
    {
      title: 'Platform',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, active: true, shortcut: '⌘D' },
        { id: 'analytics', label: 'Analytics', icon: BarChart, badge: 'Live', shortcut: '⌘A' },
        { id: 'clusters', label: 'Clusters', icon: Layers }
      ]
    },
    {
      title: 'Management',
      items: [
        { id: 'team', label: 'Team Members', icon: Users, badge: 8 },
        { id: 'security', label: 'Security & SSO', icon: Shield },
        { id: 'settings', label: 'Project Settings', icon: Settings }
      ]
    }
  ]

  return (
    <Sidebar
      title="Acme Cloud"
      subtitle="Production Environment"
      sections={sections}
      showSearch
      showAvatar
      userName="Sarah Jenkins"
      userRole="Platform Engineer"
      showToggleButton
    />
  )
}`,
      preview: (
        <div className="w-full max-w-sm rounded-xl border border-border overflow-hidden bg-card shadow-xs h-[480px] flex">
          <Sidebar
            title="Acme Cloud"
            subtitle="Production Environment"
            sections={[
              {
                title: 'Platform',
                items: [
                  { id: 'dashboard', label: 'Dashboard', icon: Home, active: true, shortcut: '⌘D' },
                  { id: 'analytics', label: 'Analytics', icon: BarChart, badge: 'Live', shortcut: '⌘A' },
                  { id: 'clusters', label: 'Clusters', icon: Layers }
                ]
              },
              {
                title: 'Management',
                items: [
                  { id: 'team', label: 'Team Members', icon: Users, badge: 8 },
                  { id: 'security', label: 'Security & SSO', icon: Shield },
                  { id: 'settings', label: 'Project Settings', icon: Settings }
                ]
              }
            ]}
            showSearch
            searchPlaceholder="Filter nav..."
            showAvatar
            userName="Sarah Jenkins"
            userRole="Platform Engineer"
            showToggleButton
            width="w-full"
          />
        </div>
      )
    }
  ],

  tooltip: [
    {
      title: 'Accessible Hover Tooltip',
      description: 'Directional floating tooltip popup on hover and focus with keyboard escape dismiss',
      code: `import { Tooltip, Button } from 'oryn-ui'

export function TooltipDemo() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Add item to workspace">
        <Button variant="outline">Hover me</Button>
      </Tooltip>
      <Tooltip content="Tooltip positioned on bottom" side="bottom">
        <Button variant="outline">Bottom Tooltip</Button>
      </Tooltip>
    </div>
  )
}`,
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4 py-4">
          <Tooltip content="Add item to workspace">
            <Button variant="outline" size="sm">Hover me (Top)</Button>
          </Tooltip>
          <Tooltip content="Directional tooltip on bottom" side="bottom">
            <Button variant="outline" size="sm">Bottom Tooltip</Button>
          </Tooltip>
          <Tooltip content="Directional tooltip on right" side="right">
            <Button variant="outline" size="sm">Right Tooltip</Button>
          </Tooltip>
        </div>
      )
    }
  ]
}
