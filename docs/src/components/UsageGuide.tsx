'use client'

import React from 'react'
import { CodeBlock } from './CodeBlock'
import { Badge } from '@oryn/ui'
import { CheckCircle, AlertTriangle, Info, Lightbulb } from 'lucide-react'

interface UsageGuideProps {
  componentName: string
  bestPractices?: string[]
  commonMistakes?: string[]
  tips?: string[]
  examples?: Array<{
    title: string
    description: string
    code: string
    good?: boolean
  }>
}

export function UsageGuide({ 
  bestPractices = [], 
  commonMistakes = [], 
  tips = [],
  examples = []
}: UsageGuideProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Best Practices */}
      {bestPractices.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Best Practices</span>
          </h3>
          <div className="space-y-2.5">
            {bestPractices.map((practice, index) => (
              <div key={index} className="flex items-start gap-2.5 p-3 sm:p-3.5 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{practice}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Common Mistakes */}
      {commonMistakes.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
            <span>Common Mistakes</span>
          </h3>
          <div className="space-y-2.5">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="flex items-start gap-2.5 p-3 sm:p-3.5 bg-rose-500/5 dark:bg-rose-500/10 rounded-lg border border-rose-500/20">
                <AlertTriangle className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{mistake}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tips */}
      {tips.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Pro Tips</span>
          </h3>
          <div className="space-y-2.5">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2.5 p-3 sm:p-3.5 bg-amber-500/5 dark:bg-amber-500/10 rounded-lg border border-amber-500/20">
                <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Examples */}
      {examples.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <span>Usage Examples</span>
          </h3>
          <div className="space-y-4">
            {examples.map((example, index) => (
              <div key={index} className="space-y-2 p-3.5 sm:p-4 rounded-xl border border-border/40 bg-card/40">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">{example.title}</h4>
                  {example.good !== undefined && (
                    <Badge variant={example.good ? "default" : "destructive"} className="text-[10px] py-0 px-2">
                      {example.good ? "Recommended" : "Avoid"}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{example.description}</p>
                <CodeBlock language="tsx" code={example.code} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Accessibility Guidelines */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>Accessibility Guidelines</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 sm:p-3.5 bg-muted/30 rounded-lg border border-border/40 space-y-1">
            <h4 className="font-semibold text-foreground text-xs sm:text-sm">Keyboard Navigation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standard tab navigation, Enter/Space activation, and Escape dismiss where applicable.
            </p>
          </div>
          <div className="p-3 sm:p-3.5 bg-muted/30 rounded-lg border border-border/40 space-y-1">
            <h4 className="font-semibold text-foreground text-xs sm:text-sm">Screen Reader Support</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Native ARIA roles, live regions, aria-expanded/aria-controls, and clear announcements.
            </p>
          </div>
          <div className="p-3 sm:p-3.5 bg-muted/30 rounded-lg border border-border/40 space-y-1">
            <h4 className="font-semibold text-foreground text-xs sm:text-sm">Color Contrast</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              WCAG 2.1 AA compliant contrast ratios (minimum 4.5:1 text, 3:1 graphical controls).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
