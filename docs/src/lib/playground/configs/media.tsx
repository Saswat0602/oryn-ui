import React from 'react'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  AspectRatio,
  Kbd,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
  TypographyLead,
  TypographyMuted
} from 'mad-ui-components'
import { PlaygroundConfig } from '@/components/playground/types'

export const mediaPlaygrounds: Record<string, PlaygroundConfig> = {
  badge: {
    slug: 'badge',
    title: 'Badge',
    componentName: 'Badge',
    defaultProps: {
      variant: 'default',
      size: 'md',
      children: 'Production Active'
    },
    controls: [
      {
        name: 'variant',
        label: 'Badge Variant',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Outline', value: 'outline' },
          { label: 'Destructive', value: 'destructive' },
          { label: 'Success', value: 'success' },
          { label: 'Warning', value: 'warning' }
        ],
        category: 'appearance',
        description: 'Semantic status coloring'
      },
      {
        name: 'size',
        label: 'Badge Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Padding and font scale'
      },
      {
        name: 'children',
        label: 'Badge Text',
        type: 'text',
        defaultValue: 'Production Active',
        category: 'content',
        description: 'Text inside badge pill'
      }
    ],
    render: (props) => (
      <Badge variant={props.variant} size={props.size}>
        {props.children}
      </Badge>
    )
  },

  avatar: {
    slug: 'avatar',
    title: 'Avatar',
    componentName: 'Avatar',
    defaultProps: {
      size: 'md',
      shape: 'circle'
    },
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg', 'xl'],
        category: 'size',
        description: 'Bounding dimension'
      },
      {
        name: 'shape',
        label: 'Avatar Geometry',
        type: 'segmented',
        defaultValue: 'circle',
        options: ['circle', 'square'],
        category: 'appearance',
        description: 'Border radius shape'
      }
    ],
    render: (props) => (
      <Avatar size={props.size} shape={props.shape}>
        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" alt="Staff Architect" />
        <AvatarFallback>SR</AvatarFallback>
      </Avatar>
    )
  },

  carousel: {
    slug: 'carousel',
    title: 'Carousel',
    componentName: 'Carousel',
    defaultProps: {
      autoplay: false,
      loop: true
    },
    controls: [
      {
        name: 'autoplay',
        label: 'Autoplay Rotation',
        type: 'boolean',
        defaultValue: false,
        category: 'options',
        description: 'Automatically transitions slides'
      },
      {
        name: 'loop',
        label: 'Infinite Loop',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Wraps around first and last items'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm px-8">
        <Carousel autoPlay={props.autoplay} loop={props.loop}>
          <CarouselContent>
            <CarouselItem>
              <div className="p-6 rounded-xl border border-border/60 bg-card text-center space-y-1">
                <h4 className="text-sm font-bold text-foreground">Global Edge Network</h4>
                <p className="text-xs text-muted-foreground">300+ PoPs worldwide with sub-20ms p95 latency.</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-6 rounded-xl border border-border/60 bg-card text-center space-y-1">
                <h4 className="text-sm font-bold text-foreground">Serverless Compute</h4>
                <p className="text-xs text-muted-foreground">Fluid scale from 0 to 100,000 concurrency seamlessly.</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-6 rounded-xl border border-border/60 bg-card text-center space-y-1">
                <h4 className="text-sm font-bold text-foreground">Automated Security</h4>
                <p className="text-xs text-muted-foreground">WAF and layer 7 DDoS mitigation active automatically.</p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
  },

  'aspect-ratio': {
    slug: 'aspect-ratio',
    title: 'AspectRatio',
    componentName: 'AspectRatio',
    defaultProps: {
      ratio: 16 / 9
    },
    controls: [
      {
        name: 'ratio',
        label: 'Aspect Ratio',
        type: 'segmented',
        defaultValue: 16 / 9,
        options: [
          { label: '16:9', value: 16 / 9 },
          { label: '4:3', value: 4 / 3 },
          { label: '1:1', value: 1 }
        ],
        category: 'appearance',
        description: 'Width-to-height proportional constraint'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-xs">
        <AspectRatio ratio={props.ratio} className="bg-muted/40 rounded-xl border border-border/60 flex items-center justify-center text-xs font-mono text-muted-foreground">
          Constrained Aspect Ratio Canvas
        </AspectRatio>
      </div>
    )
  },

  kbd: {
    slug: 'kbd',
    title: 'Kbd',
    componentName: 'Kbd',
    defaultProps: {
      size: 'md',
      children: '⌘ + K'
    },
    controls: [
      {
        name: 'size',
        label: 'Key Size',
        type: 'segmented',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        category: 'size',
        description: 'Keypad scale'
      },
      {
        name: 'children',
        label: 'Key Combo Text',
        type: 'text',
        defaultValue: '⌘ + K',
        category: 'content',
        description: 'Shortcut label'
      }
    ],
    render: (props) => (
      <Kbd size={props.size}>
        {props.children}
      </Kbd>
    )
  },

  typography: {
    slug: 'typography',
    title: 'Typography',
    componentName: 'Typography',
    defaultProps: {
      variant: 'h3',
      children: 'Enterprise Design Systems for Modern Cloud'
    },
    controls: [
      {
        name: 'variant',
        label: 'Text Hierarchy',
        type: 'select',
        defaultValue: 'h3',
        options: [
          { label: 'Heading 1 (h1)', value: 'h1' },
          { label: 'Heading 2 (h2)', value: 'h2' },
          { label: 'Heading 3 (h3)', value: 'h3' },
          { label: 'Paragraph (p)', value: 'p' },
          { label: 'Lead Text', value: 'lead' },
          { label: 'Muted Text', value: 'muted' }
        ],
        category: 'appearance',
        description: 'Semantic typographic style'
      },
      {
        name: 'children',
        label: 'Text Content',
        type: 'text',
        defaultValue: 'Enterprise Design Systems for Modern Cloud',
        category: 'content',
        description: 'Rendered text'
      }
    ],
    render: (props) => {
      switch (props.variant) {
        case 'h1':
          return <TypographyH1>{props.children}</TypographyH1>
        case 'h2':
          return <TypographyH2>{props.children}</TypographyH2>
        case 'h3':
          return <TypographyH3>{props.children}</TypographyH3>
        case 'lead':
          return <TypographyLead>{props.children}</TypographyLead>
        case 'muted':
          return <TypographyMuted>{props.children}</TypographyMuted>
        default:
          return <TypographyP>{props.children}</TypographyP>
      }
    }
  }
}
