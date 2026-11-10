import React from 'react'
import { 
  Badge, 
  Avatar, 
  AspectRatio, 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext, 
  CarouselIndicators,
  TypographyH1, 
  TypographyH2, 
  TypographyH3, 
  TypographyH4, 
  TypographyH5, 
  TypographyH6, 
  TypographyP, 
  TypographyBlockquote, 
  TypographyCode, 
  TypographyLead, 
  TypographyLarge, 
  TypographySmall, 
  TypographyMuted, 
  Kbd 
} from '@oryn/ui'

export interface ComponentExample {
  title: string
  description?: string
  code: string
  preview: React.ReactNode
}

export const mediaExamples: Record<string, ComponentExample[]> = {
  badge: [
    {
      title: 'Basic Badge',
      description: 'A simple badge component',
      code: `import { Badge } from '@oryn/ui'

export function BadgeExample() {
  return <Badge>Badge</Badge>
}`,
      preview: <Badge>Badge</Badge>
    },
    {
      title: 'Badge Variants',
      description: 'Different badge variants',
      code: `import { Badge } from '@oryn/ui'

export function BadgeVariants() {
  return (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`,
      preview: (
        <div className="flex gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      )
    }
  ],

  avatar: [
    {
      title: 'Basic Avatar',
      description: 'A simple avatar component',
      code: `import { Avatar } from '@oryn/ui'

export function AvatarExample() {
  return <Avatar />
}`,
      preview: <Avatar />
    },
    {
      title: 'Avatar with Image',
      description: 'Avatar with a profile image',
      code: `import { Avatar } from '@oryn/ui'

export function AvatarWithImage() {
  return <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" />
}`,
      preview: (
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" />
      )
    }
  ],

  'aspect-ratio': [
    {
      title: 'Basic Aspect Ratio',
      description: 'A simple aspect ratio component',
      code: `import { AspectRatio } from '@oryn/ui'

export function AspectRatioExample() {
  return (
    <AspectRatio ratio={16/9}>
      <img 
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&h=600&fit=crop" 
        alt="Landscape" 
        className="rounded-md object-cover"
      />
    </AspectRatio>
  )
}`,
      preview: (
        <div className="w-full max-w-md">
          <AspectRatio ratio={16/9}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&h=600&fit=crop" 
              alt="Landscape" 
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      )
    }
  ],

  carousel: [
    {
      title: 'Composable Feature Carousel',
      description: 'Composable carousel with slides, navigation controls, indicators, and touch swipe gestures',
      code: `import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext, 
  CarouselIndicators,
  Badge 
} from '@oryn/ui'

export function CarouselExample() {
  const slides = [
    {
      title: 'Global Edge Network',
      metric: '300+ Cities',
      desc: 'Sub-10ms latency across 90 countries with automated routing and failover.',
      badge: 'Infrastructure'
    },
    {
      title: 'Serverless Compute',
      metric: '0ms Cold Starts',
      desc: 'Scale workloads dynamically without infrastructure management or provisioning.',
      badge: 'Runtime'
    },
    {
      title: 'Enterprise Security',
      metric: 'SOC2 & HIPAA',
      desc: 'End-to-end encryption, automated compliance, and real-time threat auditing.',
      badge: 'Compliance'
    }
  ]

  return (
    <Carousel className="w-full max-w-lg">
      <CarouselContent>
        {slides.map((slide, i) => (
          <CarouselItem key={i}>
            <div className="p-6 rounded-xl border border-border bg-card text-card-foreground shadow-xs min-h-[180px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{slide.badge}</Badge>
                  <span className="text-xs font-mono font-semibold text-primary">{slide.metric}</span>
                </div>
                <h4 className="text-base font-semibold">{slide.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{slide.desc}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  )
}`,
      preview: (
        <div className="w-full max-w-lg p-4">
          <Carousel className="w-full">
            <CarouselContent>
              {[
                {
                  title: 'Global Edge Network',
                  metric: '300+ Cities',
                  desc: 'Sub-10ms latency across 90 countries with automated routing and zero-downtime failover.',
                  badge: 'Infrastructure'
                },
                {
                  title: 'Serverless Compute',
                  metric: '0ms Cold Starts',
                  desc: 'Scale workloads dynamically without infrastructure management or manual instance provisioning.',
                  badge: 'Runtime'
                },
                {
                  title: 'Enterprise Security',
                  metric: 'SOC2 & HIPAA',
                  desc: 'End-to-end encryption, automated compliance guardrails, and real-time threat telemetry.',
                  badge: 'Compliance'
                }
              ].map((slide, i) => (
                <CarouselItem key={i}>
                  <div className="p-6 rounded-xl border border-border bg-card text-card-foreground shadow-xs min-h-[170px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline">{slide.badge}</Badge>
                        <span className="text-xs font-mono font-semibold text-primary">{slide.metric}</span>
                      </div>
                      <h4 className="text-base font-semibold text-foreground">{slide.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{slide.desc}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselIndicators />
          </Carousel>
        </div>
      )
    },
    {
      title: 'Autoplay Multi-Slide Preview',
      description: 'Continuous smooth autoplay loop with multi-item layout and keyboard navigation',
      code: `import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators } from '@oryn/ui'

export function AutoplayCarouselExample() {
  return (
    <Carousel autoPlay interval={3000} loop className="w-full max-w-lg">
      <CarouselContent>
        {[1, 2, 3, 4].map((num) => (
          <CarouselItem key={num} className="md:basis-1/2">
            <div className="p-5 rounded-xl border border-border bg-muted/40 text-center">
              <span className="text-2xl font-bold font-mono">0{num}</span>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Metric Module {num}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  )
}`,
      preview: (
        <div className="w-full max-w-lg p-4">
          <Carousel autoPlay interval={3000} loop className="w-full">
            <CarouselContent>
              {[1, 2, 3, 4].map((num) => (
                <CarouselItem key={num} className="sm:basis-1/2 p-1">
                  <div className="p-5 rounded-xl border border-border bg-muted/30 text-center flex flex-col items-center justify-center min-h-[120px]">
                    <span className="text-2xl font-bold font-mono text-foreground">0{num}</span>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Metric Module {num}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselIndicators />
          </Carousel>
        </div>
      )
    }
  ],

  typography: [
    {
      title: 'Typography Headings',
      description: 'Different typography heading components',
      code: `import { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyH5, TypographyH6 } from '@oryn/ui'

export function TypographyHeadings() {
  return (
    <div className="space-y-4">
      <TypographyH1>Heading 1</TypographyH1>
      <TypographyH2>Heading 2</TypographyH2>
      <TypographyH3>Heading 3</TypographyH3>
      <TypographyH4>Heading 4</TypographyH4>
      <TypographyH5>Heading 5</TypographyH5>
      <TypographyH6>Heading 6</TypographyH6>
    </div>
  )
}`,
      preview: (
        <div className="space-y-4">
          <TypographyH1>Heading 1</TypographyH1>
          <TypographyH2>Heading 2</TypographyH2>
          <TypographyH3>Heading 3</TypographyH3>
          <TypographyH4>Heading 4</TypographyH4>
          <TypographyH5>Heading 5</TypographyH5>
          <TypographyH6>Heading 6</TypographyH6>
        </div>
      )
    },
    {
      title: 'Typography Text',
      description: 'Different typography text components',
      code: `import { TypographyP, TypographyLead, TypographyLarge, TypographySmall, TypographyMuted } from '@oryn/ui'

export function TypographyText() {
  return (
    <div className="space-y-4">
      <TypographyLead>This is a lead paragraph.</TypographyLead>
      <TypographyP>This is a regular paragraph.</TypographyP>
      <TypographyLarge>This is large text.</TypographyLarge>
      <TypographySmall>This is small text.</TypographySmall>
      <TypographyMuted>This is muted text.</TypographyMuted>
    </div>
  )
}`,
      preview: (
        <div className="space-y-4">
          <TypographyLead>This is a lead paragraph.</TypographyLead>
          <TypographyP>This is a regular paragraph.</TypographyP>
          <TypographyLarge>This is large text.</TypographyLarge>
          <TypographySmall>This is small text.</TypographySmall>
          <TypographyMuted>This is muted text.</TypographyMuted>
        </div>
      )
    },
    {
      title: 'Typography Special',
      description: 'Special typography components',
      code: `import { TypographyBlockquote, TypographyCode } from '@oryn/ui'

export function TypographySpecial() {
  return (
    <div className="space-y-4">
      <TypographyBlockquote>
        This is a blockquote with some important information.
      </TypographyBlockquote>
      <TypographyCode>const example = "Hello World";</TypographyCode>
    </div>
  )
}`,
      preview: (
        <div className="space-y-4">
          <TypographyBlockquote>
            This is a blockquote with some important information.
          </TypographyBlockquote>
          <TypographyCode>const example = &quot;Hello World&quot;;</TypographyCode>
        </div>
      )
    }
  ],

  kbd: [
    {
      title: 'Keyboard Shortcuts',
      description: 'Platform-aware shortcut badges with modifier normalization',
      code: `import { Kbd } from '@oryn/ui'

export function KbdExample() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500">Quick search:</span>
        <Kbd keys={['cmd', 'k']} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500">Save changes:</span>
        <Kbd keys={['ctrl', 's']} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500">Close modal:</span>
        <Kbd>Esc</Kbd>
      </div>
    </div>
  )
}`,
      preview: (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Quick search:</span>
            <Kbd keys={['cmd', 'k']} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Save changes:</span>
            <Kbd keys={['ctrl', 's']} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Close modal:</span>
            <Kbd>Esc</Kbd>
          </div>
        </div>
      )
    }
  ]
}
