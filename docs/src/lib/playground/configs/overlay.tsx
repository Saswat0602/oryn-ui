import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  Modal,
  Drawer,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from 'mad-ui-components'
import { PlaygroundConfig } from '@/components/playground/types'

// Interactive wrapper component for Drawer
function DrawerPlaygroundWrapper({ position, size, overlay }: any) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={() => setOpen(true)} variant="outline">
        Open {size.toUpperCase()} Drawer ({position})
      </Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        position={position}
        size={size}
        overlay={overlay}
      >
        <div className="p-6 space-y-4">
          <h3 className="text-base font-semibold text-foreground">Drawer Configuration</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Slide-out drawer positioned on the {position} of the viewport with size {size}.
          </p>
          <Button size="sm" onClick={() => setOpen(false)}>
            Close Drawer
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

// Interactive wrapper component for Modal
function ModalPlaygroundWrapper({ size, overlayBlur }: any) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={() => setOpen(true)}>
        Open Modal ({size})
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Production Environment Secrets"
        size={size}
        overlayBlur={overlayBlur}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        }
      >
        <div className="space-y-3 py-2 text-xs text-muted-foreground">
          <p>Rotating environment variables will immediately invalidate cached worker tokens.</p>
        </div>
      </Modal>
    </div>
  )
}

export const overlayPlaygrounds: Record<string, PlaygroundConfig> = {
  dialog: {
    slug: 'dialog',
    title: 'Dialog',
    componentName: 'Dialog',
    defaultProps: {
      title: 'Edit Profile Credentials',
      description: 'Make changes to your authentication profile here.'
    },
    controls: [
      {
        name: 'title',
        label: 'Dialog Title',
        type: 'text',
        defaultValue: 'Edit Profile Credentials',
        category: 'content',
        description: 'Header title text'
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        defaultValue: 'Make changes to your authentication profile here.',
        category: 'content',
        description: 'Header subtitle guidance'
      }
    ],
    render: (props) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
          <div className="py-4 text-xs text-muted-foreground">
            Dialog content renders inside a fully accessible portal with focus trap and backdrop dimming.
          </div>
          <DialogFooter>
            <Button size="sm">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },

  'alert-dialog': {
    slug: 'alert-dialog',
    title: 'AlertDialog',
    componentName: 'AlertDialog',
    defaultProps: {
      title: 'Revoke Cluster Access?',
      description: 'This action is irreversible and terminates all active SSH credentials.'
    },
    controls: [
      {
        name: 'title',
        label: 'Alert Title',
        type: 'text',
        defaultValue: 'Revoke Cluster Access?',
        category: 'content',
        description: 'Confirmation alert heading'
      },
      {
        name: 'description',
        label: 'Alert Description',
        type: 'text',
        defaultValue: 'This action is irreversible and terminates all active SSH credentials.',
        category: 'content',
        description: 'Consequence explanation'
      }
    ],
    render: (props) => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Revoke Access</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{props.title}</AlertDialogTitle>
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Revoke Immediately
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  },

  drawer: {
    slug: 'drawer',
    title: 'Drawer',
    componentName: 'Drawer',
    defaultProps: {
      position: 'right',
      size: 'md',
      overlay: true
    },
    controls: [
      {
        name: 'position',
        label: 'Edge Position',
        type: 'segmented',
        defaultValue: 'right',
        options: ['left', 'right', 'top', 'bottom'],
        category: 'appearance',
        description: 'Edge from which the drawer slides in'
      },
      {
        name: 'size',
        label: 'Drawer Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg', 'full'],
        category: 'size',
        description: 'Breadth dimension of drawer'
      },
      {
        name: 'overlay',
        label: 'Backdrop Overlay',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Darkens viewport behind drawer'
      }
    ],
    render: (props) => (
      <DrawerPlaygroundWrapper
        position={props.position}
        size={props.size}
        overlay={props.overlay}
      />
    )
  },

  modal: {
    slug: 'modal',
    title: 'Modal',
    componentName: 'Modal',
    defaultProps: {
      size: 'md',
      overlayBlur: true
    },
    controls: [
      {
        name: 'size',
        label: 'Modal Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg', 'xl'],
        category: 'size',
        description: 'Max width dimension'
      },
      {
        name: 'overlayBlur',
        label: 'Backdrop Blur',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Applies backdrop-blur to viewport background'
      }
    ],
    render: (props) => (
      <ModalPlaygroundWrapper
        size={props.size}
        overlayBlur={props.overlayBlur}
      />
    )
  },

  sheet: {
    slug: 'sheet',
    title: 'Sheet',
    componentName: 'Sheet',
    defaultProps: {
      side: 'right'
    },
    controls: [
      {
        name: 'side',
        label: 'Slide-in Side',
        type: 'segmented',
        defaultValue: 'right',
        options: ['left', 'right', 'top', 'bottom'],
        category: 'appearance',
        description: 'Origin boundary of sheet slide animation'
      }
    ],
    render: (props) => (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Sheet ({props.side})</Button>
        </SheetTrigger>
        <SheetContent side={props.side}>
          <SheetHeader>
            <SheetTitle>Deployment Inspector</SheetTitle>
            <SheetDescription>
              Review active function runtimes, environment secrets, and routing middleware.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 text-xs text-muted-foreground">
            Sheet provides slide-over inspection surfaces ideal for complex forms and settings.
          </div>
        </SheetContent>
      </Sheet>
    )
  },

  popover: {
    slug: 'popover',
    title: 'Popover',
    componentName: 'Popover',
    defaultProps: {
      align: 'center'
    },
    controls: [
      {
        name: 'align',
        label: 'Alignment',
        type: 'segmented',
        defaultValue: 'center',
        options: ['start', 'center', 'end'],
        category: 'appearance',
        description: 'Anchor alignment'
      }
    ],
    render: (props) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent align={props.align} className="w-64 p-4 space-y-2">
          <h4 className="text-xs font-semibold text-foreground">Active DNS Routes</h4>
          <p className="text-[11px] text-muted-foreground">
            Traffic routed via Cloudflare Edge to AWS iad1 region.
          </p>
        </PopoverContent>
      </Popover>
    )
  },

  tooltip: {
    slug: 'tooltip',
    title: 'Tooltip',
    componentName: 'Tooltip',
    defaultProps: {
      side: 'top',
      content: 'Copy Git commit hash to clipboard'
    },
    controls: [
      {
        name: 'side',
        label: 'Tooltip Side',
        type: 'segmented',
        defaultValue: 'top',
        options: ['top', 'right', 'bottom', 'left'],
        category: 'appearance',
        description: 'Direction tooltip renders relative to trigger'
      },
      {
        name: 'content',
        label: 'Tooltip Text',
        type: 'text',
        defaultValue: 'Copy Git commit hash to clipboard',
        category: 'content',
        description: 'Descriptive tooltip hint'
      }
    ],
    render: (props) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Hover Me</Button>
        </TooltipTrigger>
        <TooltipContent side={props.side}>{props.content}</TooltipContent>
      </Tooltip>
    )
  },

  'dropdown-menu': {
    slug: 'dropdown-menu',
    title: 'DropdownMenu',
    componentName: 'DropdownMenu',
    defaultProps: {
      align: 'center'
    },
    controls: [
      {
        name: 'align',
        label: 'Menu Alignment',
        type: 'segmented',
        defaultValue: 'center',
        options: ['start', 'center', 'end'],
        category: 'appearance',
        description: 'Alignment relative to button trigger'
      }
    ],
    render: (props, context) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Account Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={props.align} className="w-56">
          <DropdownMenuLabel>My Enterprise Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => context.onEvent('onSelect', 'Profile')}>
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => context.onEvent('onSelect', 'Billing')}>
            Billing & Invoices
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => context.onEvent('onSelect', 'API Keys')}>
            API Token Manager
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive" 
            onSelect={() => context.onEvent('onSelect', 'Sign out')}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },

  'context-menu': {
    slug: 'context-menu',
    title: 'ContextMenu',
    componentName: 'ContextMenu',
    defaultProps: {
      label: 'File: production.env'
    },
    controls: [
      {
        name: 'label',
        label: 'Context Item Label',
        type: 'text',
        defaultValue: 'File: production.env',
        category: 'content',
        description: 'Header text in context menu'
      }
    ],
    render: (props, context) => (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 text-xs text-muted-foreground select-none">
          Right-click inside this container
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuItem onSelect={() => context.onEvent('onSelect', 'Inspect')}>
            Inspect Element
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => context.onEvent('onSelect', 'Copy Source')}>
            Copy TSX Code
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => context.onEvent('onSelect', 'Reload')}>
            Reload Container
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  },

  'hover-card': {
    slug: 'hover-card',
    title: 'HoverCard',
    componentName: 'HoverCard',
    defaultProps: {
      author: '@nextjs',
      description: 'The React Framework for the Web – created and maintained by @vercel.'
    },
    controls: [
      {
        name: 'author',
        label: 'Handle',
        type: 'text',
        defaultValue: '@nextjs',
        category: 'content',
        description: 'Link handle text'
      },
      {
        name: 'description',
        label: 'Card Bio',
        type: 'text',
        defaultValue: 'The React Framework for the Web – created and maintained by @vercel.',
        category: 'content',
        description: 'Hover card summary'
      }
    ],
    render: (props) => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="font-semibold text-primary">
            {props.author}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72 p-4 space-y-2">
          <h4 className="text-xs font-semibold text-foreground">{props.author}</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {props.description}
          </p>
        </HoverCardContent>
      </HoverCard>
    )
  }
}
