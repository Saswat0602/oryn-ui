import React, { useState } from 'react'
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Collapsible, 
  ContextMenu, 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  HoverCard, 
  Separator, 
  Toggle 
} from '@oryn/ui'

export interface ComponentExample {
  title: string
  description?: string
  code: string
  preview: React.ReactNode
}

export const overlayExamples: Record<string, ComponentExample[]> = {
  'alert-dialog': [
    {
      title: 'Interactive Alert Dialog',
      description: 'A modal dialog for confirming sensitive or destructive actions',
      code: `import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@oryn/ui'
import { useState } from 'react'

export function AlertDialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button 
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-destructive text-destructive-foreground font-medium rounded-lg"
      >
        Delete Account
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}`,
      preview: <AlertDialogDemo />
    }
  ],

  collapsible: [
    {
      title: 'Basic Collapsible',
      description: 'A simple collapsible component',
      code: `import { Collapsible } from '@oryn/ui'

export function CollapsibleExample() {
  return (
    <Collapsible>
      <button>Toggle</button>
      <div className="p-4">Collapsible content</div>
    </Collapsible>
  )
}`,
      preview: (
        <div className="w-full max-w-sm">
          <Collapsible>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Toggle</button>
            <div className="p-4">Collapsible content</div>
          </Collapsible>
        </div>
      )
    }
  ],

  'context-menu': [
    {
      title: 'Basic Context Menu',
      description: 'A simple context menu component',
      code: `import { ContextMenu } from '@oryn/ui'

export function ContextMenuExample() {
  return (
    <ContextMenu>
      <div className="p-4 border rounded-md">Right click me</div>
    </ContextMenu>
  )
}`,
      preview: (
        <div className="w-full max-w-sm">
          <ContextMenu>
            <div className="p-4 border rounded-md">Right click me</div>
          </ContextMenu>
        </div>
      )
    }
  ],

  dialog: [
    {
      title: 'Interactive Dialog',
      description: 'A modal window overlay for user interactions and forms',
      code: `import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@oryn/ui'
import { useState } from 'react'

export function DialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button 
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg"
      >
        Open Dialog
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile settings here.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <input type="text" defaultValue="Alex Rivera" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <DialogFooter>
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded-md mr-2">
              Cancel
            </button>
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 bg-primary text-white rounded-md">
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}`,
      preview: <DialogDemo />
    }
  ],

  'dropdown-menu': [
    {
      title: 'Basic Dropdown Menu',
      description: 'A simple dropdown menu component',
      code: `import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from '@oryn/ui'

export function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      preview: (
        <div className="w-full max-w-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Open</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    {
      title: 'Dropdown Menu with Checkboxes',
      description: 'A dropdown menu with checkbox items',
      code: `import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@oryn/ui'

export function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      preview: (
        <div className="w-full max-w-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Open</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={true}
                onCheckedChange={() => {}}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={false}
                onCheckedChange={() => {}}
                disabled
              >
                Activity Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={false}
                onCheckedChange={() => {}}
              >
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ],

  'hover-card': [
    {
      title: 'Basic Hover Card',
      description: 'A simple hover card component',
      code: `import { HoverCard } from '@oryn/ui'

export function HoverCardExample() {
  return (
    <HoverCard>
      <button>Hover me</button>
      <div className="p-4">
        <h3>Hover Card</h3>
        <p>This is hover card content.</p>
      </div>
    </HoverCard>
  )
}`,
      preview: (
        <div className="w-full max-w-sm">
          <HoverCard>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Hover me</button>
            <div className="p-4">
              <h3>Hover Card</h3>
              <p>This is hover card content.</p>
            </div>
          </HoverCard>
        </div>
      )
    }
  ],

  separator: [
    {
      title: 'Basic Separator',
      description: 'A simple separator component',
      code: `import { Separator } from '@oryn/ui'

export function SeparatorExample() {
  return (
    <div>
      <p>Content above</p>
      <Separator />
      <p>Content below</p>
    </div>
  )
}`,
      preview: (
        <div className="w-full max-w-sm">
          <p>Content above</p>
          <Separator />
          <p>Content below</p>
        </div>
      )
    }
  ],

  toggle: [
    {
      title: 'Basic Toggle',
      description: 'A simple toggle component',
      code: `import { Toggle } from '@oryn/ui'

export function ToggleExample() {
  return <Toggle>Toggle</Toggle>
}`,
      preview: <Toggle>Toggle</Toggle>
    }
  ]
}

function AlertDialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex justify-center p-4">
      <button 
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-destructive text-destructive-foreground font-medium rounded-lg hover:bg-destructive/90 transition-colors shadow-sm cursor-pointer"
      >
        Delete Account
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex justify-center p-4">
      <button 
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
      >
        Open Dialog
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile settings here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Display Name</label>
              <input type="text" defaultValue="Alex Rivera" className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Email</label>
              <input type="email" defaultValue="alex@enterprise.io" className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background" />
            </div>
          </div>
          <DialogFooter>
            <button 
              type="button" 
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-md border border-input hover:bg-muted transition-colors mr-2 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
