'use client'

import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ComponentCategory } from '@/types/component'
import { ComponentPreview } from './ComponentPreview'
import { ComponentPlayground } from './playground'
import { PropsTable } from './PropsTable'
import { CodeBlock } from './CodeBlock'
import Link from 'next/link'
import { Copy, Check, Eye, Code2, Terminal, BookOpen, ExternalLink, Github, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react'
import { getComponentExamples } from '@/lib/component-examples'
import { getComponentProps } from '@/lib/component-props'
import { getComponentBySlug, getAllComponents } from '@/lib/component-registry'
import { getPlaygroundConfig } from '@/lib/playground'
import { UsageGuide } from './UsageGuide'

interface ComponentDocumentationProps {
  slug: string
  component: {
    title: string
    description: string
    category: ComponentCategory
    version: string
    status: 'stable' | 'beta' | 'alpha' | 'deprecated'
    tags: readonly string[]
  }
}

export function ComponentDocumentation({ slug, component }: ComponentDocumentationProps) {
  const [activeTab, setActiveTab] = useState<'examples' | 'props' | 'usage' | 'guide'>('examples')
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [copiedImport, setCopiedImport] = useState(false)

  // Get component examples and props based on slug
  const examples = getComponentExamples(slug)
  const props = getComponentProps(slug)
  const playgroundConfig = getPlaygroundConfig(slug)

  // Previous & Next navigation
  const allComponents = getAllComponents()
  const currentIndex = allComponents.findIndex((c) => c.slug === slug)
  const prevComponent = currentIndex > 0 ? allComponents[currentIndex - 1] : null
  const nextComponent = currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null

  const exportName = (component as any).exportName || component.title.replace(/\s+/g, '')
  const defaultImport = `import { ${exportName} } from 'mad-ui-components'`

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install mad-ui-components')
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const handleCopyImport = () => {
    navigator.clipboard.writeText(defaultImport)
    setCopiedImport(true)
    setTimeout(() => setCopiedImport(false), 2000)
  }

  return (
    <div className="space-y-8 sm:space-y-10 w-full">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/docs/components" className="hover:text-foreground transition-colors">
          Components
        </Link>
        <span>/</span>
        <span>{component.category}</span>
        <span>/</span>
        <span className="text-foreground font-medium">{component.title}</span>
      </nav>

      {/* Component Title & Header */}
      <div className="space-y-3 sm:space-y-4 border-b border-border/40 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {component.title}
          </h1>

          {/* Quick links to npm & GitHub */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href="https://www.npmjs.com/package/mad-ui-components"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-border/50 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="npm package"
            >
              <span className="font-bold text-red-500">npm</span>
              <span className="hidden sm:inline">mad-ui-components</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <a
              href="https://github.com/Saswat0602/mad-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-border/50 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="GitHub source"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Source</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
          {component.description}
        </p>

        {/* Quick copy snippet strip */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1 max-w-full">
          <button
            onClick={handleCopyInstall}
            className="group inline-flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 text-xs font-mono rounded-md bg-muted/40 hover:bg-muted border border-border/40 text-foreground transition-colors cursor-pointer w-full sm:w-auto"
            title="Copy npm install command"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-muted-foreground">$</span>
              <span className="truncate">npm i mad-ui-components</span>
            </div>
            {copiedInstall ? (
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 ml-1" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0 ml-1" />
            )}
          </button>

          <button
            onClick={handleCopyImport}
            className="group inline-flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 text-xs font-mono rounded-md bg-muted/40 hover:bg-muted border border-border/40 text-foreground transition-colors cursor-pointer w-full sm:w-auto overflow-hidden"
            title="Copy import statement"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-muted-foreground shrink-0">import</span>
              <span className="truncate">&#123; {exportName} &#125;</span>
              <span className="text-muted-foreground shrink-0 hidden sm:inline">from &apos;mad-ui-components&apos;</span>
              <span className="text-muted-foreground shrink-0 sm:hidden">from &apos;mad-ui...&apos;</span>
            </div>
            {copiedImport ? (
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 ml-1" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0 ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Hero Interactive Component Playground */}
      <section className="space-y-3">
        <ComponentPlayground config={playgroundConfig} />
      </section>

      {/* Sleek Segmented Navigation Tabs (Edge-to-edge swipe on mobile) */}
      <div className="w-full overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pt-4">
        <div className="inline-flex items-center p-1 rounded-xl bg-muted/50 border border-border/40 text-xs sm:text-sm min-w-max">
          {[
            { id: 'examples', label: 'All Variants & Examples', icon: Layers },
            { id: 'props', label: 'API Reference', icon: Code2 },
            { id: 'usage', label: 'Installation & Import', icon: Terminal },
            { id: 'guide', label: 'Accessibility & Guidelines', icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'examples' | 'props' | 'usage' | 'guide')}
                className={`flex items-center gap-2 py-2 px-3.5 rounded-lg font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-background text-foreground shadow-2xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        <AnimatePresence mode="wait">
          {activeTab === 'examples' && (
            <div key="examples" className="space-y-12">
              {examples.length > 0 ? (
                examples.map((example, index) => (
                  <section key={index} className="space-y-4 pt-4 first:pt-0">
                    <div className="flex flex-col gap-1 pb-1">
                      <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                        {example.title}
                      </h2>
                      {example.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {example.description}
                        </p>
                      )}
                    </div>
                    <ComponentPreview code={example.code}>
                      {example.preview}
                    </ComponentPreview>
                  </section>
                ))
              ) : (
                <div className="text-center py-12 border border-dashed border-border/50 rounded-lg">
                  <h3 className="text-sm font-semibold mb-1 text-foreground">Preview in development</h3>
                  <p className="text-xs text-muted-foreground">
                    Interactive examples for {component.title} are being compiled.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'props' && (
            <div key="props" className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Component Props
                </h3>
                <p className="text-xs text-muted-foreground">
                  TypeScript interfaces and prop specifications for {component.title}.
                </p>
              </div>
              <PropsTable props={props} />
            </div>
          )}

          {activeTab === 'usage' && (
            <div key="usage" className="space-y-8">
              {/* Installation */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">Package Installation</h3>
                <p className="text-xs text-muted-foreground">Add Mad UI components to your project via your preferred package manager.</p>
                
                <div className="relative">
                  <CodeBlock language="bash" code="npm install mad-ui-components" />
                </div>
              </div>
              
              {/* Import Options */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Import Methods</h3>
                  <p className="text-xs text-muted-foreground">Mad UI supports full library imports, categorized module bundles, or direct individual component imports.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-semibold text-foreground">1. Full Library Import (Recommended)</h4>
                    <CodeBlock 
                      language="tsx" 
                      code={`import { ${exportName} } from 'mad-ui-components'`} 
                    />
                  </div>
                  
                  {getIndividualImportCommand(slug) && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-semibold text-foreground">2. Individual Tree-shaking Import</h4>
                      <CodeBlock 
                        language="tsx" 
                        code={getIndividualImportCommand(slug)!} 
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <h4 className="text-xs font-semibold text-foreground">3. CLI Direct Source Copy (shadcn-style)</h4>
                    <CodeBlock 
                      language="bash" 
                      code={`npx mad-ui-components add ${slug}`} 
                    />
                  </div>
                </div>
              </div>
              
              {/* Basic Usage */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">Basic Code Example</h3>
                <CodeBlock 
                  language="tsx" 
                  code={examples[0]?.code || `import { ${exportName} } from 'mad-ui-components'\n\nexport default function Example() {\n  return <${exportName} />\n}`} 
                />
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div key="guide" className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-foreground">Design &amp; Accessibility Guidelines</h3>
                <p className="text-xs text-muted-foreground">
                  Best practices for using {component.title} in enterprise applications.
                </p>
              </div>
              
              {getBestPractices(slug).length > 0 || getCommonMistakes(slug).length > 0 || getTips(slug).length > 0 ? (
                <UsageGuide 
                  componentName={component.title}
                  bestPractices={getBestPractices(slug)}
                  commonMistakes={getCommonMistakes(slug)}
                  tips={getTips(slug)}
                  examples={getUsageExamples(slug)}
                />
              ) : (
                <div className="space-y-4 p-6 rounded-lg border border-border/40 bg-card/50 text-xs">
                  <h4 className="font-semibold text-foreground">Accessibility Checklist for {component.title}</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Supports standard keyboard navigation and tab ordering.</li>
                    <li>Complies with WCAG 2.1 AA contrast requirements in both light and dark modes.</li>
                    <li>Includes ARIA roles, states, and properties for screen reader accessibility.</li>
                    <li>Accepts standard HTML attributes and forwards ref to root element.</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Component Pagination (< Previous | Next >) */}
      <div className="pt-8 sm:pt-10 border-t border-border/40 flex items-center justify-between gap-3 sm:gap-4">
        {prevComponent ? (
          <Link
            href={`/docs/components/${prevComponent.slug}`}
            className="group flex flex-col items-start gap-1 p-2.5 sm:p-3 rounded-lg border border-border/40 hover:border-primary/50 hover:bg-muted/30 transition-all max-w-[48%]"
          >
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
              <ChevronLeft className="h-3 w-3" />
              <span>Previous</span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate w-full">
              {prevComponent.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextComponent ? (
          <Link
            href={`/docs/components/${nextComponent.slug}`}
            className="group flex flex-col items-end gap-1 p-2.5 sm:p-3 rounded-lg border border-border/40 hover:border-primary/50 hover:bg-muted/30 transition-all max-w-[48%] ml-auto text-right"
          >
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
              <span>Next</span>
              <ChevronRight className="h-3 w-3" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate w-full">
              {nextComponent.title}
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  )
}

function getIndividualImportCommand(slug: string): string {
  const component = getComponentBySlug(slug)
  const componentName = (component as any)?.exportName || component?.title.replace(/\s+/g, '') || slug
  return `import { ${componentName} } from 'mad-ui-components/${slug}'`
}

function getBestPractices(slug: string): string[] {
  const practices: Record<string, string[]> = {
    button: [
      'Use clear, action-oriented labels that describe what the button does',
      'Provide loading states for async operations',
      'Use appropriate button variants (default for primary actions, secondary/outline for supporting actions)',
      'Ensure sufficient color contrast for accessibility',
      'Include proper ARIA labels for icon-only buttons'
    ],
    input: [
      'Always provide labels for form inputs',
      'Use appropriate input types (email, password, number, etc.)',
      'Provide clear error messages and validation feedback',
      'Use placeholder text sparingly as hints, not as labels',
      'Implement proper keyboard navigation and focus management'
    ],
    checkbox: [
      'Use checkboxes for multiple selections or binary choices',
      'Provide clear, descriptive labels',
      'Group related checkboxes logically',
      'Use indeterminate state for "select all" functionality',
      'Ensure proper spacing between checkboxes and labels'
    ],
    select: [
      'Provide a default placeholder option',
      'Group related options when there are many choices',
      'Use clear, descriptive option labels',
      'Consider using search/filter for long option lists',
      'Provide keyboard navigation support'
    ],
    slider: [
      'Use sliders for continuous value selection',
      'Provide clear min/max labels and current value display',
      'Use appropriate step sizes for the data type',
      'Consider using marks for important values',
      'Ensure the slider is accessible via keyboard'
    ]
  }
  return practices[slug] || []
}

function getCommonMistakes(slug: string): string[] {
  const mistakes: Record<string, string[]> = {
    button: [
      'Using vague labels like "Click here" or "Submit"',
      'Not providing loading states for async operations',
      'Using too many destructive buttons on the same page',
      'Making buttons too small to tap on mobile devices',
      'Not providing proper focus indicators'
    ],
    input: [
      'Using placeholder text as the only label',
      'Not providing validation feedback',
      'Using the wrong input type for the data',
      'Not handling empty states properly',
      'Making inputs too narrow for expected content'
    ],
    checkbox: [
      'Using checkboxes for single selections (use radio buttons instead)',
      'Not providing clear labels',
      'Using indeterminate state incorrectly',
      'Making checkboxes too small to interact with easily'
    ],
    select: [
      'Having too many options without grouping or search',
      'Not providing a default/placeholder option',
      'Making the dropdown too narrow for the content'
    ],
    slider: [
      'Not showing the current value clearly',
      'Using inappropriate step sizes',
      'Making the slider too small to interact with'
    ]
  }
  return mistakes[slug] || []
}

function getTips(slug: string): string[] {
  const tips: Record<string, string[]> = {
    button: [
      'Use icons to enhance button meaning and visual hierarchy',
      'Consider using different sizes for different contexts',
      'Implement proper hover and focus states',
      'Use disabled state appropriately to prevent invalid actions'
    ],
    input: [
      'Use input masks for formatted data like phone numbers',
      'Implement real-time validation for better UX',
      'Use input groups for related fields'
    ],
    checkbox: [
      'Use the indeterminate state for hierarchical selections',
      'Consider using checkbox groups for related options',
      'Ensure consistent spacing and alignment'
    ],
    select: [
      'Use search functionality for long option lists',
      'Consider using multi-select for multiple choices'
    ],
    slider: [
      'Use range sliders for selecting value ranges',
      'Implement proper touch support for mobile devices'
    ]
  }
  return tips[slug] || []
}

function getUsageExamples(slug: string) {
  const examples: Record<string, Array<{ title: string; description: string; code: string; good?: boolean }>> = {
    button: [
      {
        title: 'Good: Clear Action Label',
        description: 'Use descriptive labels that clearly indicate the action.',
        code: `<Button>Save Changes</Button>`,
        good: true
      },
      {
        title: 'Bad: Vague Label',
        description: 'Avoid vague labels that don\'t indicate the action.',
        code: `<Button>Click Here</Button>`,
        good: false
      }
    ],
    input: [
      {
        title: 'Good: Proper Labeling',
        description: 'Always provide clear labels for inputs.',
        code: `<Input \n  label="Email Address" \n  type="email" \n  placeholder="name@example.com" \n/>`,
        good: true
      }
    ]
  }
  return examples[slug] || []
}
