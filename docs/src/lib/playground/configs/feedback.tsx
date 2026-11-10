import React from 'react'
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Banner,
  EmptyState,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  MessageBubble,
  ReasoningDisclosure,
  Sonner,
  Spinner,
  Toast,
  Toaster,
  useToast,
  toast,
  ToolCallCard,
  Button
} from '@oryn/ui'
import { PlaygroundConfig } from '@/components/playground/types'

// Interactive Sonner trigger wrapper
function SonnerPlaygroundWrapper({ type, title, description }: any) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        onClick={() => {
          if (type === 'success') {
            toast.success(title || 'Changes deployed successfully!', { description })
          } else if (type === 'error') {
            toast.error(title || 'Failed to authenticate request', { description })
          } else if (type === 'warning') {
            toast.warning(title || 'High memory pressure detected', { description })
          } else {
            toast(title || 'Deployment queued', { description })
          }
        }}
      >
        Trigger Sonner Toast ({type})
      </Button>
      <Sonner />
    </div>
  )
}

// Interactive Toast trigger wrapper
function ToastPlaygroundWrapper({ variant, title, description }: any) {
  const { toast: radixToast } = useToast()
  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        variant="outline"
        onClick={() => {
          if (variant === 'destructive') {
            radixToast.error(title || 'Build failed with exit code 1', { description })
          } else if (variant === 'success') {
            radixToast.success(title || 'Deployment ready on Edge', { description })
          } else {
            radixToast(title || 'Snapshot created', { description })
          }
        }}
      >
        Show Radix Toast ({variant})
      </Button>
      <Toaster />
    </div>
  )
}

export const feedbackPlaygrounds: Record<string, PlaygroundConfig> = {
  alert: {
    slug: 'alert',
    title: 'Alert',
    componentName: 'Alert',
    defaultProps: {
      variant: 'default',
      title: 'Edge Runtime Update',
      description: 'Node.js 22 LTS is now default across all serverless regions.'
    },
    controls: [
      {
        name: 'variant',
        label: 'Alert Variant',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Info', value: 'info' },
          { label: 'Success', value: 'success' },
          { label: 'Warning', value: 'warning' },
          { label: 'Destructive', value: 'destructive' }
        ],
        category: 'appearance',
        description: 'Semantic intent color'
      },
      {
        name: 'title',
        label: 'Alert Title',
        type: 'text',
        defaultValue: 'Edge Runtime Update',
        category: 'content',
        description: 'Bold callout title'
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        defaultValue: 'Node.js 22 LTS is now default across all serverless regions.',
        category: 'content',
        description: 'Explanatory body text'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-md">
        <Alert variant={props.variant}>
          <AlertTitle>{props.title}</AlertTitle>
          <AlertDescription>{props.description}</AlertDescription>
        </Alert>
      </div>
    )
  },

  banner: {
    slug: 'banner',
    title: 'Banner',
    componentName: 'Banner',
    defaultProps: {
      variant: 'info',
      title: 'Scheduled maintenance window for European clusters on Saturday at 02:00 UTC.'
    },
    controls: [
      {
        name: 'variant',
        label: 'Banner Variant',
        type: 'select',
        defaultValue: 'info',
        options: [
          { label: 'Info', value: 'info' },
          { label: 'Warning', value: 'warning' },
          { label: 'Success', value: 'success' },
          { label: 'Destructive', value: 'destructive' }
        ],
        category: 'appearance',
        description: 'Announcement style'
      },
      {
        name: 'title',
        label: 'Banner Announcement',
        type: 'text',
        defaultValue: 'Scheduled maintenance window for European clusters on Saturday at 02:00 UTC.',
        category: 'content',
        description: 'Banner text'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-lg">
        <Banner variant={props.variant}>
          {props.title}
        </Banner>
      </div>
    )
  },

  'empty-state': {
    slug: 'empty-state',
    title: 'EmptyState',
    componentName: 'EmptyState',
    defaultProps: {
      title: 'No Active Deployments Found',
      description: 'Connect a GitHub repository to trigger automated preview builds.'
    },
    controls: [
      {
        name: 'title',
        label: 'Heading',
        type: 'text',
        defaultValue: 'No Active Deployments Found',
        category: 'content',
        description: 'Hero heading'
      },
      {
        name: 'description',
        label: 'Guidance Description',
        type: 'text',
        defaultValue: 'Connect a GitHub repository to trigger automated preview builds.',
        category: 'content',
        description: 'Helpful next steps'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm rounded-xl border border-dashed border-border/80 p-6 bg-card">
        <EmptyState>
          <EmptyStateTitle>{props.title}</EmptyStateTitle>
          <EmptyStateDescription>{props.description}</EmptyStateDescription>
          <EmptyStateActions>
            <Button size="sm">Connect GitHub</Button>
          </EmptyStateActions>
        </EmptyState>
      </div>
    )
  },

  'message-bubble': {
    slug: 'message-bubble',
    title: 'MessageBubble',
    componentName: 'MessageBubble',
    defaultProps: {
      role: 'assistant',
      content: 'I analyzed your bundle and tree-shaked 42KB of unused icon primitives.'
    },
    controls: [
      {
        name: 'role',
        label: 'Author Role',
        type: 'segmented',
        defaultValue: 'assistant',
        options: ['user', 'assistant', 'system'],
        category: 'appearance',
        description: 'Speech bubble alignment and tint'
      },
      {
        name: 'content',
        label: 'Message Content',
        type: 'text',
        defaultValue: 'I analyzed your bundle and tree-shaked 42KB of unused icon primitives.',
        category: 'content',
        description: 'Bubble text'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm">
        <MessageBubble
          role={props.role}
          content={props.content}
          copyable={true}
        />
      </div>
    )
  },

  'reasoning-disclosure': {
    slug: 'reasoning-disclosure',
    title: 'ReasoningDisclosure',
    componentName: 'ReasoningDisclosure',
    defaultProps: {
      title: 'Thinking Process (8 steps evaluated)',
      defaultOpen: true
    },
    controls: [
      {
        name: 'title',
        label: 'Disclosure Title',
        type: 'text',
        defaultValue: 'Thinking Process (8 steps evaluated)',
        category: 'content',
        description: 'Summary badge'
      },
      {
        name: 'defaultOpen',
        label: 'Initially Expanded',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Starts open'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm">
        <ReasoningDisclosure title={props.title} defaultOpen={props.defaultOpen}>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>1. Parsed package exports and subpath conditions.</p>
            <p>2. Verified zero-dependency SVG inline icon primitives.</p>
            <p>3. Computed CSS variable opacity mix values.</p>
          </div>
        </ReasoningDisclosure>
      </div>
    )
  },

  sonner: {
    slug: 'sonner',
    title: 'Sonner',
    componentName: 'Sonner',
    defaultProps: {
      type: 'success',
      title: 'Deployment Ready',
      description: 'Your changes are live across 300+ Edge points of presence.'
    },
    controls: [
      {
        name: 'type',
        label: 'Toast Type',
        type: 'select',
        defaultValue: 'success',
        options: [
          { label: 'Success', value: 'success' },
          { label: 'Error', value: 'error' },
          { label: 'Warning', value: 'warning' },
          { label: 'Default', value: 'default' }
        ],
        category: 'appearance',
        description: 'Status physics and badge icon'
      },
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        defaultValue: 'Deployment Ready',
        category: 'content',
        description: 'Toast headline'
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        defaultValue: 'Your changes are live across 300+ Edge points of presence.',
        category: 'content',
        description: 'Body text'
      }
    ],
    render: (props) => (
      <SonnerPlaygroundWrapper
        type={props.type}
        title={props.title}
        description={props.description}
      />
    )
  },

  spinner: {
    slug: 'spinner',
    title: 'Spinner',
    componentName: 'Spinner',
    defaultProps: {
      size: 'md',
      variant: 'default'
    },
    controls: [
      {
        name: 'size',
        label: 'Spinner Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
        category: 'size',
        description: 'Indicator diameter'
      },
      {
        name: 'variant',
        label: 'Variant Color',
        type: 'segmented',
        defaultValue: 'default',
        options: ['default', 'primary', 'subtle'],
        category: 'appearance',
        description: 'Spinner stroke tone'
      }
    ],
    render: (props) => (
      <Spinner size={props.size} variant={props.variant} />
    )
  },

  toast: {
    slug: 'toast',
    title: 'Toast',
    componentName: 'Toast',
    defaultProps: {
      variant: 'default',
      title: 'Project Settings Updated',
      description: 'Environment variables synchronized with preview workers.'
    },
    controls: [
      {
        name: 'variant',
        label: 'Toast Variant',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Success', value: 'success' },
          { label: 'Destructive', value: 'destructive' }
        ],
        category: 'appearance',
        description: 'Radix toast styling'
      },
      {
        name: 'title',
        label: 'Headline',
        type: 'text',
        defaultValue: 'Project Settings Updated',
        category: 'content',
        description: 'Title string'
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        defaultValue: 'Environment variables synchronized with preview workers.',
        category: 'content',
        description: 'Body details'
      }
    ],
    render: (props) => (
      <ToastPlaygroundWrapper
        variant={props.variant}
        title={props.title}
        description={props.description}
      />
    )
  },

  'tool-call-card': {
    slug: 'tool-call-card',
    title: 'ToolCallCard',
    componentName: 'ToolCallCard',
    defaultProps: {
      toolName: 'execute_sql_query',
      status: 'completed',
      duration: '42ms'
    },
    controls: [
      {
        name: 'status',
        label: 'Execution Status',
        type: 'select',
        defaultValue: 'completed',
        options: [
          { label: 'Completed (Success)', value: 'completed' },
          { label: 'Running (Executing)', value: 'running' },
          { label: 'Failed (Error)', value: 'failed' }
        ],
        category: 'appearance',
        description: 'Agentic tool run status'
      },
      {
        name: 'toolName',
        label: 'Tool Function Name',
        type: 'text',
        defaultValue: 'execute_sql_query',
        category: 'content',
        description: 'MCP or agent tool name'
      },
      {
        name: 'duration',
        label: 'Execution Duration',
        type: 'text',
        defaultValue: '42ms',
        category: 'options',
        description: 'Timing readout'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm">
        <ToolCallCard
          toolName={props.toolName}
          status={props.status}
          duration={props.duration}
          args={{ query: 'SELECT * FROM users WHERE active = true LIMIT 10' }}
          result={{ rowCount: 10, time: props.duration }}
          defaultOpen={true}
        />
      </div>
    )
  }
}
