import React from 'react'
import { Badge } from '@oryn/ui'
import { FileCode2 } from 'lucide-react'

interface ComponentProp {
  name: string
  type: string
  required: boolean
  default?: string | number | boolean
  description: string
  deprecated?: boolean
}

interface PropsTableProps {
  props: ComponentProp[]
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border/50 rounded-lg">
        <FileCode2 className="h-10 w-10 text-muted-foreground/50 mb-3" />
        <h3 className="text-base font-semibold mb-1 text-foreground">No Props Available</h3>
        <p className="text-xs text-muted-foreground max-w-sm">
          This component doesn&apos;t have any configurable props, or they inherit standard HTML attributes.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono">
          {props.length} {props.length === 1 ? 'prop' : 'props'} documented
        </span>
      </div>

      {/* Desktop Table View (>= 768px) */}
      <div className="hidden md:block rounded-lg border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3 w-1/4">Prop</th>
                <th className="px-4 py-3 w-1/4">Type</th>
                <th className="px-4 py-3 w-1/6">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-xs">
              {props.map((prop, index) => (
                <tr 
                  key={prop.name} 
                  className={`hover:bg-muted/30 transition-colors ${
                    index % 2 === 0 ? 'bg-background/40' : 'bg-muted/10'
                  }`}
                >
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <code className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-semibold border border-primary/20">
                        {prop.name}
                      </code>
                      {prop.required && (
                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0 font-medium">
                          required
                        </Badge>
                      )}
                      {prop.deprecated && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-medium text-amber-500 border-amber-500/40">
                          deprecated
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top font-mono">
                    <code className="text-[11px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded break-all border border-border/40">
                      {prop.type}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-top font-mono">
                    {prop.default !== undefined ? (
                      <code className="text-[11px] bg-muted/60 text-foreground px-1.5 py-0.5 rounded border border-border/40">
                        {String(prop.default)}
                      </code>
                    ) : (
                      <span className="text-muted-foreground/60">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {prop.description}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View (< 768px) */}
      <div className="md:hidden space-y-3">
        {props.map((prop) => (
          <div 
            key={prop.name}
            className="p-3.5 rounded-lg border border-border/60 bg-card/60 backdrop-blur-xs space-y-2 text-xs"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-bold text-xs border border-primary/20">
                  {prop.name}
                </code>
                {prop.required && (
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                    required
                  </Badge>
                )}
                {prop.deprecated && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-amber-500 border-amber-500/40">
                    deprecated
                  </Badge>
                )}
              </div>
              {prop.default !== undefined && (
                <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <span>def:</span>
                  <code className="bg-muted px-1 py-0.5 rounded text-foreground">
                    {String(prop.default)}
                  </code>
                </div>
              )}
            </div>

            <div className="p-2 rounded bg-muted/40 border border-border/40 font-mono text-[11px] text-muted-foreground break-all">
              {prop.type}
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
