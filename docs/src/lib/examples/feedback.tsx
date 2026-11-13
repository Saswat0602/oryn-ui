import React, { useState } from 'react'
import { 
  Alert, 
  Toast, 
  ToastAction,
  Toaster,
  useToast,
  toast,
  Sonner,
  Spinner, 
  EmptyState, 
  Banner, 
  Button,
  MessageBubble,
  ReasoningDisclosure,
  ToolCallCard
} from 'oryn-ui'

export interface ComponentExample {
  title: string
  description?: string
  code: string
  preview: React.ReactNode
}

export const feedbackExamples: Record<string, ComponentExample[]> = {
  alert: [
    {
      title: 'Basic Alert',
      description: 'A simple alert component',
      code: `import { Alert } from 'oryn-ui'

export function AlertExample() {
  return (
    <Alert>
      <p>This is an alert message.</p>
    </Alert>
  )
}`,
      preview: (
        <div className="w-full max-w-sm">
          <Alert>
            <p>This is an alert message.</p>
          </Alert>
        </div>
      )
    },
    {
      title: 'Alert Variants',
      description: 'Different alert variants',
      code: `import { Alert } from 'oryn-ui'

export function AlertVariants() {
  return (
    <div className="space-y-4">
      <Alert variant="default">
        <p>Default alert message.</p>
      </Alert>
      <Alert type="error">
        <p>Error alert message.</p>
      </Alert>
      <Alert type="success">
        <p>Success alert message.</p>
      </Alert>
      <Alert type="warning">
        <p>Warning alert message.</p>
      </Alert>
    </div>
  )
}`,
      preview: (
        <div className="w-full max-w-sm space-y-4">
          <Alert variant="default">
            <p>Default alert message.</p>
          </Alert>
          <Alert type="error">
            <p>Error alert message.</p>
          </Alert>
          <Alert type="success">
            <p>Success alert message.</p>
          </Alert>
          <Alert type="warning">
            <p>Warning alert message.</p>
          </Alert>
        </div>
      )
    }
  ],

  sonner: [
    {
      title: 'Interactive Sonner Toaster',
      description: 'Stackable physics-driven notifications with action buttons, promise handlers, and rich colors',
      code: `import { Sonner, toast, Button } from 'oryn-ui'

export function SonnerExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast('Event created', { description: 'Scheduled for Monday at 9:00 AM' })}
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success('Project deployed successfully', { description: 'Preview is now live' })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error('Failed to sync repository', { description: 'Rate limit exceeded' })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast('Changes saved', {
          action: {
            label: 'Undo',
            onClick: () => toast.info('Action reverted')
          }
        })}
      >
        With Action
      </Button>
      <Sonner />
    </div>
  )
}`,
      preview: <SonnerInteractiveDemo />
    }
  ],

  toast: [
    {
      title: 'Imperative Toast & Viewport',
      description: 'Headless toast system powered by useToast and global dispatch',
      code: `import { Toaster, useToast, Button, ToastAction } from 'oryn-ui'

export function ToastExample() {
  const { toast } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, November 14, 2026 at 5:57 PM",
          })
        }}
      >
        Show Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction>Try again</ToastAction>,
          })
        }}
      >
        Destructive Toast
      </Button>
      <Toaster />
    </div>
  )
}`,
      preview: <ToastInteractiveDemo />
    }
  ],

  spinner: [
    {
      title: 'Spinner Sizes & Variants',
      description: 'Accessible loading indicator across multiple scales and semantic variants',
      code: `import { Spinner } from 'oryn-ui'

export function SpinnerExample() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" variant="primary" />
      <Spinner size="lg" variant="secondary" />
      <Spinner size="xl" variant="muted" />
    </div>
  )
}`,
      preview: (
        <div className="flex items-center justify-center gap-6 p-4">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" variant="primary" />
          <Spinner size="lg" variant="secondary" />
          <Spinner size="xl" variant="muted" />
        </div>
      )
    }
  ],

  'empty-state': [
    {
      title: 'Dashed Empty State',
      description: 'Zero data placeholder with title, subtext, and action buttons',
      code: `import { EmptyState, Button } from 'oryn-ui'

export function EmptyStateExample() {
  return (
    <EmptyState
      variant="dashed"
      title="No active deployments"
      description="You haven't deployed any services yet. Get started by connecting a Git repository."
      action={<Button size="sm">Deploy Service</Button>}
    />
  )
}`,
      preview: (
        <div className="w-full max-w-md">
          <EmptyState
            variant="dashed"
            title="No active deployments"
            description="You haven't deployed any services yet. Get started by connecting a Git repository."
            action={<Button size="sm">Deploy Service</Button>}
          />
        </div>
      )
    }
  ],

  banner: [
    {
      title: 'Announcement Banner',
      description: 'Full-width banner for maintenance alerts and system notifications with action link and dismiss button',
      code: `import { Banner, Button } from 'oryn-ui'

export function BannerExample() {
  return (
    <div className="w-full space-y-4">
      <Banner
        variant="info"
        title="Scheduled Maintenance:"
        dismissible
        action={<Button size="sm" variant="outline">Learn More</Button>}
      >
        API v2 will undergo scheduled maintenance tonight at 02:00 UTC.
      </Banner>

      <Banner
        variant="success"
        title="Release v3.0.0 is live!"
        dismissible
      >
        Check out 71 enterprise components and zero external dependencies.
      </Banner>
    </div>
  )
}`,
      preview: (
        <div className="w-full space-y-3">
          <Banner
            variant="info"
            title="Scheduled Maintenance:"
            dismissible
            action={<Button size="sm" variant="outline" className="h-7 text-xs">Learn More</Button>}
          >
            API v2 will undergo scheduled maintenance tonight at 02:00 UTC.
          </Banner>
          <Banner
            variant="success"
            title="Release v3.0.0 is live!"
            dismissible
          >
            All 75 enterprise components compiled with zero external dependencies.
          </Banner>
        </div>
      )
    }
  ],

  'message-bubble': [
    {
      title: 'AI Chat Message Thread',
      description: 'Conversational message bubbles for user queries and AI assistant answers with markdown/code blocks and copy action',
      code: `import { MessageBubble } from 'oryn-ui'

export function MessageBubbleExample() {
  return (
    <div className="w-full max-w-xl space-y-4">
      <MessageBubble
        role="user"
        content="How do I configure tree-shaking for individual components in ORYN UI?"
        timestamp="Just now"
      />
      
      <MessageBubble
        role="assistant"
        content="You can import directly from individual subpaths like 'oryn-ui/button' or 'oryn-ui/dialog'. Each component bundle includes its required primitives and hooks automatically with zero overhead."
        timestamp="1s ago"
        copyable
      />
    </div>
  )
}`,
      preview: (
        <div className="w-full max-w-xl space-y-4">
          <MessageBubble
            role="user"
            content="How do I configure tree-shaking for individual components in ORYN UI?"
            timestamp="Just now"
          />
          <MessageBubble
            role="assistant"
            content="You can import directly from individual subpaths like `oryn-ui/button` or `oryn-ui/dialog`. Each component bundle includes its required primitives and hooks automatically with zero overhead."
            timestamp="1s ago"
            copyable
          />
        </div>
      )
    }
  ],

  'reasoning-disclosure': [
    {
      title: 'AI Reasoning & Chain-of-Thought',
      description: 'Collapsible thinking disclosure displaying internal model reasoning steps, duration badge, and streaming animation',
      code: `import { ReasoningDisclosure } from 'oryn-ui'
import { useState } from 'react'

export function ReasoningDisclosureExample() {
  const [open, setOpen] = useState(true)

  return (
    <div className="w-full max-w-xl">
      <ReasoningDisclosure
        duration={4.2}
        open={open}
        onOpenChange={setOpen}
      >
        <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          <p>1. Analyzing microservices request trace across us-east-1.</p>
          <p>2. Detected 82ms bottleneck in PostgreSQL connection pool sizing.</p>
          <p>3. Synthesizing recommendations for connection pool scaling.</p>
        </div>
      </ReasoningDisclosure>
    </div>
  )
}`,
      preview: (
        <div className="w-full max-w-xl">
          <ReasoningDisclosure
            duration={4.2}
            defaultOpen={true}
          >
            <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
              <p>1. Analyzing microservices request trace across us-east-1.</p>
              <p>2. Detected 82ms bottleneck in PostgreSQL connection pool sizing.</p>
              <p>3. Synthesizing recommendations for connection pool scaling.</p>
            </div>
          </ReasoningDisclosure>
        </div>
      )
    }
  ],

  'tool-call-card': [
    {
      title: 'AI Agent Tool Call Card',
      description: 'Structured execution card for AI agent tool invocations, showing arguments, runtime duration, status badges, and output data',
      code: `import { ToolCallCard } from 'oryn-ui'

export function ToolCallCardExample() {
  return (
    <div className="w-full max-w-xl space-y-3">
      <ToolCallCard
        toolName="query_telemetry_metrics"
        status="completed"
        duration="142ms"
        args={{
          service: 'auth-gateway',
          metric: 'p99_latency',
          timeRange: '1h'
        }}
        result={{
          p99_latency_ms: 18.4,
          sample_count: 48920,
          status: 'healthy'
        }}
      />

      <ToolCallCard
        toolName="restart_kubernetes_pod"
        status="executing"
        args={{
          cluster: 'prod-us-east',
          pod: 'worker-queue-84df'
        }}
      />
    </div>
  )
}`,
      preview: (
        <div className="w-full max-w-xl space-y-3">
          <ToolCallCard
            toolName="query_telemetry_metrics"
            status="completed"
            duration="142ms"
            args={{
              service: 'auth-gateway',
              metric: 'p99_latency',
              timeRange: '1h'
            }}
            result={{
              p99_latency_ms: 18.4,
              sample_count: 48920,
              status: 'healthy'
            }}
          />
          <ToolCallCard
            toolName="restart_kubernetes_pod"
            status="executing"
            args={{
              cluster: 'prod-us-east',
              pod: 'worker-queue-84df'
            }}
          />
        </div>
      )
    }
  ]
}

function SonnerInteractiveDemo() {
  return (
    <div className="p-4 flex flex-wrap gap-2.5">
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast('Event created', { description: 'Scheduled for Monday at 9:00 AM' })}
      >
        Default
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.success('Project deployed successfully', { description: 'Preview is now live' })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.error('Failed to sync repository', { description: 'Rate limit exceeded' })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast('Changes saved', {
          action: {
            label: 'Undo',
            onClick: () => toast.info('Action reverted')
          }
        })}
      >
        With Action
      </Button>
      <Sonner />
    </div>
  )
}

function ToastInteractiveDemo() {
  const { toast } = useToast()

  return (
    <div className="p-4 flex flex-wrap gap-2.5">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, November 14, 2026 at 5:57 PM",
          })
        }}
      >
        Show Toast
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction onClick={() => {}}>Try again</ToastAction>,
          })
        }}
      >
        Destructive Toast
      </Button>
      <Toaster />
    </div>
  )
}
