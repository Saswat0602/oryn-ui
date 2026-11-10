'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Drawer, Accordion, Card, Badge, Button } from '@oryn/ui'
import { Menu, Layers, ChevronRight, Check } from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import { drawerUsageCode, accordionUsageCode } from '@/data/components-demo-snippets'

export default function ComponentsDemo() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerPosition, setDrawerPosition] = useState<'right' | 'left' | 'top' | 'bottom'>('right')
  const [drawerSize, setDrawerSize] = useState<'sm' | 'md' | 'lg' | 'full'>('md')

  const accordionItems = [
    {
      id: 'item1',
      title: 'What is React?',
      content: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".'
    },
    {
      id: 'item2',
      title: 'How do components work?',
      content: (
        <div>
          <p>Components are like JavaScript functions. They accept arbitrary inputs (called &quot;props&quot;) and return React elements describing what should appear on the screen.</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Reusable pieces of UI</li>
            <li>Can have their own state</li>
            <li>Can receive data via props</li>
          </ul>
        </div>
      )
    },
    {
      id: 'item3',
      title: 'Why use custom components?',
      content: 'Custom components give you complete control over styling, behavior, and functionality. They can be tailored to your exact needs and maintain consistency across your application.'
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold">
            <Layers className="h-3.5 w-3.5" />
            <span>Interactive Playground</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Drawer & Accordion Primitives
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Experience smooth transitions, accessible keyboard interactions, and responsive layouts built with ORYN UI.
          </p>
          <div className="pt-1 flex justify-center">
            <Link 
              href="/docs/components" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border/60 bg-muted/40 hover:bg-muted text-foreground transition-colors"
            >
              <span>Explore all 75 components in the documentation</span>
              <ChevronRight className="h-3.5 w-3.5 text-primary" />
            </Link>
          </div>
        </div>

        {/* Live Interactive Demos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Drawer Demo */}
          <Card className="p-6 sm:p-8 space-y-6 bg-card border-border/60">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Drawer Playground</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Slide-over overlay sheet</p>
              </div>
              <Badge variant="outline" className="text-xs">Layout</Badge>
            </div>
            
            <div className="space-y-5">
              {/* Position Controls */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Position
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['right', 'left', 'top', 'bottom'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setDrawerPosition(pos)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${
                        drawerPosition === pos
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Controls */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['sm', 'md', 'lg', 'full'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setDrawerSize(size)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors uppercase ${
                        drawerSize === size
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Open Drawer Button */}
              <Button
                onClick={() => setDrawerOpen(true)}
                className="w-full flex items-center justify-center gap-2 mt-4"
              >
                <Menu size={18} />
                Open {drawerPosition} Drawer ({drawerSize})
              </Button>
            </div>

            {/* Drawer Component */}
            <Drawer
              isOpen={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              position={drawerPosition}
              size={drawerSize}
              className="bg-card text-card-foreground border-border"
            >
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Interactive Drawer</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customizable slide-over panel primitive with focus management.
                  </p>
                </div>
                
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Position: left, right, top, bottom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Size presets: sm, md, lg, full</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>ESC key & backdrop click dismissal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Body scroll lock on open</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setDrawerOpen(false)}
                    className="w-full"
                  >
                    Close Drawer
                  </Button>
                </div>
              </div>
            </Drawer>
          </Card>

          {/* Accordion Demo */}
          <Card className="p-6 sm:p-8 space-y-6 bg-card border-border/60">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Accordion Playground</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Collapsible disclosure panels</p>
              </div>
              <Badge variant="outline" className="text-xs">Forms</Badge>
            </div>
            
            <div className="space-y-6">
              {/* Single Open Accordion */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Single Active Panel
                </h3>
                <Accordion 
                  items={accordionItems}
                  allowMultiple={false}
                  defaultOpen={[0]}
                />
              </div>

              {/* Multiple Open Accordion */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Multi-Expand Panel
                </h3>
                <Accordion 
                  items={accordionItems}
                  allowMultiple={true}
                  defaultOpen={[0, 1]}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Monaco Code Examples Section */}
        <section className="space-y-6">
          <div className="border-b border-border/40 pb-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Usage Code Snippets</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Production-ready snippets styled with Monaco VS Code highlighting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Drawer Code */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Drawer Usage</h3>
              </div>
              <CodeBlock
                code={drawerUsageCode}
                language="tsx"
                filename="drawer-demo.tsx"
                showLineNumbers={true}
              />
            </div>

            {/* Accordion Code */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Accordion Usage</h3>
              </div>
              <CodeBlock
                code={accordionUsageCode}
                language="tsx"
                filename="accordion-demo.tsx"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Key Features Overview */}
        <Card className="p-6 sm:p-8 bg-card border-border/60">
          <h2 className="text-xl font-bold text-foreground mb-6">Component Architecture Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Drawer Features
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span>Directional slide-in animations (left, right, top, bottom)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span>Modular width/height presets: sm, md, lg, full</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span>Accessible backdrop with click-to-dismiss</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span>SSR-safe React portal mounting</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Accordion Features
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span>Exclusive single-select or simultaneous multi-panel expansion</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span>Keyboard navigation with ARIA expanded state attributes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span>Custom icon positioning and fluid CSS height animations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span>Configurable default active panels via index array</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}