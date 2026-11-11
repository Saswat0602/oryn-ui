"use client"

import React, { createContext, useContext, useId, useMemo, useState } from 'react'
import { cn } from '../../lib/utils'

// ==========================================
// Chart Theming & Configuration Types
// ==========================================

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: any
    color?: string
    theme?: Record<string, string>
  }
>

interface ChartContextValue {
  config: ChartConfig
  chartId: string
}

const ChartContext = createContext<ChartContextValue | null>(null)

export function useChart() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }
  return context
}

// ==========================================
// ChartContainer
// ==========================================

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
  aspectRatio?: 'auto' | 'square' | 'video' | 'wide'
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, aspectRatio = 'auto', style, ...props }, ref) => {
    const uniqueId = useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

    // Inject CSS variables for colors: --color-<key>: <color>
    const colorStyles = useMemo(() => {
      const vars: Record<string, string> = {}
      Object.entries(config || {}).forEach(([key, item]) => {
        if (item.color) {
          vars[`--color-${key}`] = item.color
        }
      })
      return vars
    }, [config])

    const aspectClasses = {
      auto: 'aspect-auto',
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'aspect-[2/1]',
    }

    return (
      <ChartContext.Provider value={{ config, chartId }}>
        <div
          ref={ref}
          data-chart={chartId}
          className={cn(
            'flex aspect-video justify-center text-xs w-full relative overflow-visible',
            aspectClasses[aspectRatio],
            className
          )}
          style={{ ...colorStyles, ...style }}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          {children}
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = 'ChartContainer'

// Injects scoped CSS variables into a style block
export const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, item]) => item.theme || item.color
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart=${id}] {
${colorConfig
  .map(([key, item]) => {
    const color = item.color || item.theme?.light
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join('\n')}
}
.dark [data-chart=${id}] {
${colorConfig
  .map(([key, item]) => {
    const color = item.theme?.dark || item.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join('\n')}
}
`,
      }}
    />
  )
}

// ==========================================
// ChartTooltip & ChartTooltipContent
// ==========================================

export interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: any[]
  label?: string | number
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: 'dot' | 'line' | 'dashed'
  formatter?: (value: any, name: string, item: any, index: number) => React.ReactNode
  labelFormatter?: (label: any) => React.ReactNode
  labelClassName?: string
}

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  (
    {
      active = true,
      payload = [],
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
    },
    ref
  ) => {
    const context = useContext(ChartContext)
    const config = context?.config || {}

    if (!active || !payload?.length) {
      return null
    }

    const tooltipLabel = useMemo(() => {
      if (hideLabel || !label) return null
      if (labelFormatter) return labelFormatter(label)
      return label
    }, [hideLabel, label, labelFormatter])

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[9rem] items-start gap-1.5 rounded-xl border border-border/60 bg-popover/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-95',
          className
        )}
      >
        {tooltipLabel && (
          <div className={cn('font-semibold text-foreground tracking-tight border-b border-border/40 pb-1 mb-0.5', labelClassName)}>
            {tooltipLabel}
          </div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = item.dataKey || item.name || `item-${index}`
            const itemConfig = config[key] || {}
            const itemColor = item.color || itemConfig.color || `var(--color-${key}, #3b82f6)`
            const itemName = itemConfig.label || item.name || key

            return (
              <div
                key={`${key}-${index}`}
                className="flex items-center justify-between gap-3 text-muted-foreground"
              >
                <div className="flex items-center gap-1.5">
                  {!hideIndicator && (
                    <span
                      className={cn(
                        'shrink-0',
                        indicator === 'dot' && 'h-2 w-2 rounded-full',
                        indicator === 'line' && 'h-0.5 w-3 rounded-full',
                        indicator === 'dashed' && 'h-0.5 w-3 border-b-2 border-dashed'
                      )}
                      style={{
                        backgroundColor: indicator !== 'dashed' ? itemColor : undefined,
                        borderColor: itemColor,
                      }}
                    />
                  )}
                  <span className="font-medium text-foreground">{itemName}</span>
                </div>
                <span className="font-mono font-semibold text-foreground">
                  {formatter ? formatter(item.value, itemName, item, index) : item.value?.toLocaleString?.() ?? item.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = 'ChartTooltipContent'

export const ChartTooltip = ChartTooltipContent

// ==========================================
// ChartLegend & ChartLegendContent
// ==========================================

export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: any[]
  hideIcon?: boolean
}

export const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ className, hideIcon = false, payload = [] }, ref) => {
    const context = useContext(ChartContext)
    const config = context?.config || {}

    const items = payload.length
      ? payload
      : Object.entries(config).map(([key, item]) => ({
          value: item.label || key,
          color: item.color || `var(--color-${key})`,
          key,
        }))

    if (!items.length) return null

    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap items-center justify-center gap-4 text-xs', className)}
      >
        {items.map((item: any) => {
          const color = item.color || config[item.key]?.color || '#3b82f6'
          const label = item.value || config[item.key]?.label || item.key

          return (
            <div key={item.key || item.value} className="flex items-center gap-1.5 text-muted-foreground">
              {!hideIcon && (
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
              )}
              <span className="font-medium text-foreground">{label}</span>
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = 'ChartLegendContent'

export const ChartLegend = ChartLegendContent

// ==========================================
// Helper: Cubic Bézier Curve Generator
// ==========================================

function getCubicBezierSpline(points: Array<{ x: number; y: number }>): string {
  if (points.length <= 1) return ''
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`
  }

  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const prev = points[i - 1] || current
    const after = points[i + 2] || next

    const tension = 0.2
    const cp1x = current.x + (next.x - prev.x) * tension
    const cp1y = current.y + (next.y - prev.y) * tension
    const cp2x = next.x - (after.x - current.x) * tension
    const cp2y = next.y - (after.y - current.y) * tension

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`
  }
  return path
}

// ==========================================
// Chart Component 1: AreaChart (Gradient & Monotone Spline)
// ==========================================

export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<Record<string, any>>
  categories: string[]
  index: string
  colors?: string[]
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  curveType?: 'monotone' | 'linear' | 'step'
  valueFormatter?: (value: number) => string
}

export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      data = [],
      categories = [],
      index,
      colors = ['#3b82f6', '#8b5cf6', '#10b981'],
      showGrid = true,
      showXAxis = true,
      showYAxis = true,
      showTooltip = true,
      showLegend = false,
      curveType = 'monotone',
      valueFormatter = (val) => val.toLocaleString(),
      className,
      ...props
    },
    ref
  ) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)

    const width = 600
    const height = 300
    const padding = { top: 20, right: 20, bottom: 40, left: showYAxis ? 50 : 20 }
    const chartW = width - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom

    const allValues = data.flatMap((d) => categories.map((cat) => Number(d[cat]) || 0))
    const maxY = allValues.length ? Math.max(...allValues, 10) : 100
    const yGridSteps = [0, 0.25, 0.5, 0.75, 1]

    const getX = (i: number) =>
      padding.left + (data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2)
    const getY = (val: number) => padding.top + chartH - (val / maxY) * chartH

    // Path calculations for each category
    const seriesPaths = useMemo(() => {
      return categories.map((category, catIdx) => {
        const points = data.map((d, i) => ({
          x: getX(i),
          y: getY(Number(d[category]) || 0),
        }))

        if (!points.length) return { linePath: '', areaPath: '', color: colors[catIdx % colors.length] }

        let linePath = ''
        if (curveType === 'linear') {
          linePath = `M ${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`
        } else if (curveType === 'step') {
          linePath = `M ${points[0].x} ${points[0].y}`
          for (let i = 0; i < points.length - 1; i++) {
            const next = points[i + 1]
            linePath += ` H ${next.x} V ${next.y}`
          }
        } else {
          linePath = getCubicBezierSpline(points)
        }

        const firstX = points[0].x
        const lastX = points[points.length - 1].x
        const groundY = padding.top + chartH
        const areaPath = `${linePath} L ${lastX} ${groundY} L ${firstX} ${groundY} Z`

        return {
          category,
          linePath,
          areaPath,
          color: colors[catIdx % colors.length] || `var(--color-${category}, #3b82f6)`,
          points,
        }
      })
    }, [data, categories, colors, curveType, maxY])

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top
      const relX = (clientX / rect.width) * width

      const clampedX = Math.max(padding.left, Math.min(width - padding.right, relX))
      const progress = (clampedX - padding.left) / chartW
      const closestIdx = Math.round(progress * (data.length - 1))
      setHoverIndex(closestIdx)
      setMousePos({ x: clientX, y: clientY })
    }

    const activeItem = hoverIndex !== null ? data[hoverIndex] : null

    return (
      <div ref={ref} className={cn('relative w-full overflow-hidden select-none', className)} {...props}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setHoverIndex(null)
            setMousePos(null)
          }}
        >
          <defs>
            {categories.map((cat, idx) => {
              const color = colors[idx % colors.length] || `var(--color-${cat}, #3b82f6)`
              return (
                <linearGradient key={cat} id={`area-grad-${cat}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                </linearGradient>
              )
            })}
          </defs>

          {/* Grid lines */}
          {showGrid &&
            yGridSteps.map((step) => {
              const y = padding.top + chartH - step * chartH
              return (
                <line
                  key={step}
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  className="text-border/40"
                />
              )
            })}

          {/* Y Axis Labels */}
          {showYAxis &&
            yGridSteps.map((step) => {
              const y = padding.top + chartH - step * chartH
              const val = Math.round(step * maxY)
              return (
                <text
                  key={step}
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-muted-foreground/80 font-mono text-[9px]"
                >
                  {valueFormatter(val)}
                </text>
              )
            })}

          {/* Area Fills & Lines */}
          {seriesPaths.map(({ category, linePath, areaPath, color }) => (
            <g key={category}>
              <path d={areaPath} fill={`url(#area-grad-${category})`} />
              <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ))}

          {/* Active Hover Crosshair Line */}
          {hoverIndex !== null && (
            <line
              x1={getX(hoverIndex)}
              y1={padding.top}
              x2={getX(hoverIndex)}
              y2={padding.top + chartH}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="text-muted-foreground/60"
            />
          )}

          {/* Active Series Indicator Dots */}
          {hoverIndex !== null &&
            seriesPaths.map(({ category, color, points }) => {
              const pt = points?.[hoverIndex]
              if (!pt) return null
              return (
                <circle
                  key={category}
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  fill="hsl(var(--background))"
                  stroke={color}
                  strokeWidth="2.5"
                  className="transition-transform duration-100"
                />
              )
            })}

          {/* X Axis Labels */}
          {showXAxis &&
            data.map((d, i) => {
              if (data.length > 8 && i % Math.ceil(data.length / 6) !== 0 && i !== data.length - 1) {
                return null
              }
              const x = getX(i)
              return (
                <text
                  key={i}
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  className="fill-muted-foreground/80 font-mono text-[10px]"
                >
                  {d[index]}
                </text>
              )
            })}
        </svg>

        {/* Floating Tooltip */}
        {showTooltip && activeItem && mousePos && (
          <div
            className="pointer-events-none absolute z-20"
            style={{
              left: `${mousePos.x}px`,
              top: `${Math.max(10, mousePos.y - 70)}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <ChartTooltipContent
              active={true}
              label={activeItem[index]}
              payload={categories.map((cat, i) => ({
                name: cat,
                value: activeItem[cat],
                color: colors[i % colors.length],
              }))}
            />
          </div>
        )}

        {/* Legend */}
        {showLegend && (
          <div className="mt-3">
            <ChartLegendContent
              payload={categories.map((cat, i) => ({
                value: cat,
                color: colors[i % colors.length],
              }))}
            />
          </div>
        )}
      </div>
    )
  }
)
AreaChart.displayName = 'AreaChart'

// ==========================================
// Chart Component 2: BarChart (Multi-Series & Rounded)
// ==========================================

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  categories?: string[]
  index?: string
  colors?: string[]
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  layout?: 'vertical' | 'horizontal'
  height?: number
  width?: number
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data = [],
      categories,
      index = 'label',
      colors = ['#3b82f6', '#8b5cf6', '#10b981'],
      showGrid = true,
      showXAxis = true,
      showYAxis = true,
      showTooltip = true,
      className,
      ...props
    },
    ref
  ) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)

    // Backward-compatible fallback for legacy { label, value } array
    const isLegacyData = data.length > 0 && 'value' in data[0]
    const effectiveCategories = useMemo(() => {
      if (categories && categories.length) return categories
      if (isLegacyData) return ['value']
      if (data.length > 0) {
        return Object.keys(data[0]).filter((k) => k !== index)
      }
      return ['value']
    }, [categories, isLegacyData, data, index])

    const width = 600
    const height = 300
    const padding = { top: 20, right: 20, bottom: 40, left: showYAxis ? 50 : 20 }
    const chartW = width - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom

    const allValues = data.flatMap((d) => effectiveCategories.map((c) => Number(d[c]) || 0))
    const maxY = allValues.length ? Math.max(...allValues, 10) : 100
    const yGridSteps = [0, 0.25, 0.5, 0.75, 1]

    const groupWidth = chartW / Math.max(data.length, 1)
    const barPadding = 0.2
    const availableBarWidth = groupWidth * (1 - barPadding)
    const barWidth = Math.max(4, availableBarWidth / effectiveCategories.length)

    return (
      <div ref={ref} className={cn('relative w-full overflow-hidden select-none', className)} {...props}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => {
            setHoverIndex(null)
            setMousePos(null)
          }}
        >
          {/* Grid lines */}
          {showGrid &&
            yGridSteps.map((step) => {
              const y = padding.top + chartH - step * chartH
              return (
                <line
                  key={step}
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  className="text-border/40"
                />
              )
            })}

          {/* Y Axis Labels */}
          {showYAxis &&
            yGridSteps.map((step) => {
              const y = padding.top + chartH - step * chartH
              return (
                <text
                  key={step}
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-muted-foreground/80 font-mono text-[9px]"
                >
                  {Math.round(step * maxY)}
                </text>
              )
            })}

          {/* Bars */}
          {data.map((d, i) => {
            const groupX = padding.left + i * groupWidth + (groupWidth * barPadding) / 2
            const isHovered = hoverIndex === i

            return (
              <g
                key={i}
                onMouseEnter={(e) => {
                  setHoverIndex(i)
                  const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect()
                  if (rect) {
                    setMousePos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    })
                  }
                }}
              >
                {/* Subtle group hover column highlight */}
                {isHovered && (
                  <rect
                    x={padding.left + i * groupWidth}
                    y={padding.top}
                    width={groupWidth}
                    height={chartH}
                    fill="currentColor"
                    className="text-muted/20"
                    rx="6"
                  />
                )}

                {effectiveCategories.map((cat, catIdx) => {
                  const val = Number(d[cat]) || 0
                  const bH = (val / maxY) * chartH
                  const bX = groupX + catIdx * barWidth
                  const bY = padding.top + chartH - bH
                  const color = colors[catIdx % colors.length] || `var(--color-${cat}, #3b82f6)`

                  return (
                    <rect
                      key={cat}
                      x={bX}
                      y={bY}
                      width={Math.max(2, barWidth - 2)}
                      height={Math.max(1, bH)}
                      fill={color}
                      rx="3"
                      className="transition-all duration-200 hover:opacity-85"
                    />
                  )
                })}
              </g>
            )
          })}

          {/* X Axis Labels */}
          {showXAxis &&
            data.map((d, i) => {
              const x = padding.left + i * groupWidth + groupWidth / 2
              return (
                <text
                  key={i}
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  className="fill-muted-foreground/80 font-mono text-[10px]"
                >
                  {d[index] || d.label}
                </text>
              )
            })}
        </svg>

        {/* Hover Tooltip */}
        {showTooltip && hoverIndex !== null && data[hoverIndex] && mousePos && (
          <div
            className="pointer-events-none absolute z-20"
            style={{
              left: `${mousePos.x}px`,
              top: `${Math.max(10, mousePos.y - 70)}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <ChartTooltipContent
              active={true}
              label={data[hoverIndex][index] || data[hoverIndex].label}
              payload={effectiveCategories.map((cat, i) => ({
                name: cat,
                value: data[hoverIndex][cat] || (cat === 'value' ? data[hoverIndex].value : 0),
                color: colors[i % colors.length],
              }))}
            />
          </div>
        )}
      </div>
    )
  }
)
BarChart.displayName = 'BarChart'

// ==========================================
// Chart Component 3: LineChart (Cubic Spline & Dots)
// ==========================================

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  categories?: string[]
  index?: string
  colors?: string[]
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showDots?: boolean
  height?: number
  width?: number
}

export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data = [],
      categories,
      index = 'label',
      colors = ['#3b82f6', '#8b5cf6', '#10b981'],
      showGrid = true,
      showXAxis = true,
      showYAxis = true,
      showTooltip = true,
      showDots = true,
      className,
      ...props
    },
    ref
  ) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)

    const isLegacyData = data.length > 0 && 'value' in data[0]
    const effectiveCategories = useMemo(() => {
      if (categories && categories.length) return categories
      if (isLegacyData) return ['value']
      if (data.length > 0) return Object.keys(data[0]).filter((k) => k !== index)
      return ['value']
    }, [categories, isLegacyData, data, index])

    const width = 600
    const height = 300
    const padding = { top: 20, right: 20, bottom: 40, left: showYAxis ? 50 : 20 }
    const chartW = width - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom

    const allValues = data.flatMap((d) => effectiveCategories.map((c) => Number(d[c]) || 0))
    const maxY = allValues.length ? Math.max(...allValues, 10) : 100
    const yGridSteps = [0, 0.25, 0.5, 0.75, 1]

    const getX = (i: number) =>
      padding.left + (data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2)
    const getY = (val: number) => padding.top + chartH - (val / maxY) * chartH

    const lines = useMemo(() => {
      return effectiveCategories.map((cat, catIdx) => {
        const points = data.map((d, i) => ({
          x: getX(i),
          y: getY(Number(d[cat]) || (cat === 'value' ? Number(d.value) : 0)),
        }))
        const path = getCubicBezierSpline(points)
        return {
          cat,
          color: colors[catIdx % colors.length] || '#3b82f6',
          points,
          path,
        }
      })
    }, [data, effectiveCategories, colors, maxY])

    return (
      <div ref={ref} className={cn('relative w-full overflow-hidden select-none', className)} {...props}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const clientX = e.clientX - rect.left
            const relX = (clientX / rect.width) * width
            const clampedX = Math.max(padding.left, Math.min(width - padding.right, relX))
            const closestIdx = Math.round(((clampedX - padding.left) / chartW) * (data.length - 1))
            setHoverIndex(closestIdx)
            setMousePos({ x: clientX, y: e.clientY - rect.top })
          }}
          onMouseLeave={() => {
            setHoverIndex(null)
            setMousePos(null)
          }}
        >
          {/* Grid lines */}
          {showGrid &&
            yGridSteps.map((step) => {
              const y = padding.top + chartH - step * chartH
              return (
                <line
                  key={step}
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  className="text-border/40"
                />
              )
            })}

          {/* Lines */}
          {lines.map(({ cat, color, path, points }) => (
            <g key={cat}>
              <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
              {showDots &&
                points.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={hoverIndex === i ? '6' : '3.5'}
                    fill="hsl(var(--background))"
                    stroke={color}
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                ))}
            </g>
          ))}

          {/* X Axis */}
          {showXAxis &&
            data.map((d, i) => {
              if (data.length > 8 && i % Math.ceil(data.length / 6) !== 0 && i !== data.length - 1) return null
              return (
                <text
                  key={i}
                  x={getX(i)}
                  y={height - 12}
                  textAnchor="middle"
                  className="fill-muted-foreground/80 font-mono text-[10px]"
                >
                  {d[index] || d.label}
                </text>
              )
            })}
        </svg>

        {showTooltip && hoverIndex !== null && data[hoverIndex] && mousePos && (
          <div
            className="pointer-events-none absolute z-20"
            style={{
              left: `${mousePos.x}px`,
              top: `${Math.max(10, mousePos.y - 70)}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <ChartTooltipContent
              active={true}
              label={data[hoverIndex][index] || data[hoverIndex].label}
              payload={effectiveCategories.map((cat, i) => ({
                name: cat,
                value: data[hoverIndex][cat] || data[hoverIndex].value,
                color: colors[i % colors.length],
              }))}
            />
          </div>
        )}
      </div>
    )
  }
)
LineChart.displayName = 'LineChart'

// ==========================================
// Chart Component 4: PieChart & DoughnutChart
// ==========================================

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{ label: string; value: number; color?: string; [key: string]: any }>
  innerRadius?: number
  outerRadius?: number
  padAngle?: number
  centerLabel?: string
  centerValue?: string | number
  showLegend?: boolean
  height?: number
  width?: number
}

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data = [],
      innerRadius = 0,
      outerRadius = 110,
      centerLabel,
      centerValue,
      showLegend = true,
      className,
      ...props
    },
    ref
  ) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)

    const defaultColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4']
    const total = data.reduce((acc, d) => acc + (Number(d.value) || 0), 0)

    const width = 360
    const height = 280
    const cx = width / 2
    const cy = height / 2

    // Slices calculation
    let currentAngle = -Math.PI / 2
    const slices = data.map((d, i) => {
      const value = Number(d.value) || 0
      const sliceAngle = total > 0 ? (value / total) * Math.PI * 2 : 0
      const startAngle = currentAngle
      const endAngle = currentAngle + sliceAngle
      currentAngle = endAngle

      const color = d.color || defaultColors[i % defaultColors.length]
      const isHovered = hoverIndex === i
      const activeOuterR = isHovered ? outerRadius + 6 : outerRadius

      const x1 = cx + activeOuterR * Math.cos(startAngle)
      const y1 = cy + activeOuterR * Math.sin(startAngle)
      const x2 = cx + activeOuterR * Math.cos(endAngle)
      const y2 = cy + activeOuterR * Math.sin(endAngle)

      const x3 = cx + innerRadius * Math.cos(endAngle)
      const y3 = cy + innerRadius * Math.sin(endAngle)
      const x4 = cx + innerRadius * Math.cos(startAngle)
      const y4 = cy + innerRadius * Math.sin(startAngle)

      const largeArc = sliceAngle > Math.PI ? 1 : 0

      let path = ''
      if (innerRadius === 0) {
        path = `M ${cx} ${cy} L ${x1} ${y1} A ${activeOuterR} ${activeOuterR} 0 ${largeArc} 1 ${x2} ${y2} Z`
      } else {
        path = `M ${x1} ${y1} A ${activeOuterR} ${activeOuterR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`
      }

      return {
        ...d,
        index: i,
        color,
        path,
        percentage: total > 0 ? Math.round((value / total) * 100) : 0,
      }
    })

    return (
      <div ref={ref} className={cn('relative w-full flex flex-col items-center justify-center', className)} {...props}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-sm h-auto overflow-visible"
          onMouseLeave={() => {
            setHoverIndex(null)
            setMousePos(null)
          }}
        >
          {slices.map((slice, i) => (
            <path
              key={i}
              d={slice.path}
              fill={slice.color}
              className="cursor-pointer transition-transform duration-200 hover:opacity-90"
              onMouseEnter={(e) => {
                setHoverIndex(i)
                const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect()
                if (rect) {
                  setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
                }
              }}
            />
          ))}

          {/* Donut Center KPI text */}
          {innerRadius > 0 && (centerValue || centerLabel) && (
            <g className="pointer-events-none select-none">
              {centerValue && (
                <text
                  x={cx}
                  y={centerLabel ? cy - 4 : cy + 6}
                  textAnchor="middle"
                  className="fill-foreground font-bold text-2xl tracking-tight"
                >
                  {centerValue}
                </text>
              )}
              {centerLabel && (
                <text
                  x={cx}
                  y={cy + 16}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[11px] font-medium"
                >
                  {centerLabel}
                </text>
              )}
            </g>
          )}
        </svg>

        {/* Hover Tooltip */}
        {hoverIndex !== null && slices[hoverIndex] && mousePos && (
          <div
            className="pointer-events-none absolute z-20"
            style={{
              left: `${mousePos.x}px`,
              top: `${Math.max(10, mousePos.y - 60)}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <ChartTooltipContent
              active={true}
              label={slices[hoverIndex].label}
              payload={[
                {
                  name: `${slices[hoverIndex].percentage}%`,
                  value: slices[hoverIndex].value,
                  color: slices[hoverIndex].color,
                },
              ]}
            />
          </div>
        )}

        {showLegend && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            {slices.map((slice, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                <span className="font-medium text-foreground">{slice.label}</span>
                <span className="font-mono text-muted-foreground text-[10px]">({slice.percentage}%)</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
PieChart.displayName = 'PieChart'

export const DoughnutChart: React.FC<PieChartProps> = (props) => (
  <PieChart innerRadius={70} outerRadius={110} {...props} />
)
DoughnutChart.displayName = 'DoughnutChart'

// ==========================================
// Chart Component 5: RadialBarChart (Activity & Progress Gauge)
// ==========================================

export interface RadialBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{ label: string; value: number; max?: number; color?: string }>
  centerLabel?: string
  centerValue?: string | number
  strokeWidth?: number
  showLegend?: boolean
}

export const RadialBarChart = React.forwardRef<HTMLDivElement, RadialBarChartProps>(
  (
    {
      data = [],
      centerLabel,
      centerValue,
      strokeWidth = 12,
      showLegend = true,
      className,
      ...props
    },
    ref
  ) => {
    const defaultColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
    const size = 280
    const center = size / 2
    const baseRadius = 100
    const ringSpacing = strokeWidth + 6

    return (
      <div ref={ref} className={cn('relative flex flex-col items-center justify-center w-full', className)} {...props}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-xs h-auto overflow-visible">
          {data.map((item, index) => {
            const radius = baseRadius - index * ringSpacing
            const circumference = 2 * Math.PI * radius
            const maxVal = item.max || 100
            const percentage = Math.min(100, Math.max(0, (item.value / maxVal) * 100))
            const strokeDashoffset = circumference - (percentage / 100) * circumference
            const color = item.color || defaultColors[index % defaultColors.length]

            return (
              <g key={item.label}>
                {/* Background Ring Track */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  className="text-muted/30"
                />
                {/* Progress Ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${center} ${center})`}
                  className="transition-all duration-700 ease-out"
                />
              </g>
            )
          })}

          {/* Center Metric Text */}
          {(centerValue || centerLabel) && (
            <g className="pointer-events-none select-none">
              {centerValue && (
                <text
                  x={center}
                  y={centerLabel ? center - 4 : center + 8}
                  textAnchor="middle"
                  className="fill-foreground font-bold text-3xl tracking-tight"
                >
                  {centerValue}
                </text>
              )}
              {centerLabel && (
                <text
                  x={center}
                  y={center + 18}
                  textAnchor="middle"
                  className="fill-muted-foreground text-xs font-medium"
                >
                  {centerLabel}
                </text>
              )}
            </g>
          )}
        </svg>

        {showLegend && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {data.map((item, index) => (
              <div key={item.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color || defaultColors[index % defaultColors.length] }}
                />
                <span className="font-medium text-foreground">{item.label}</span>
                <span className="font-mono text-muted-foreground text-[11px] font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
RadialBarChart.displayName = 'RadialBarChart'

// ==========================================
// Primary Composite Chart (Backward-Compatible Wrapper)
// ==========================================

export interface ChartData {
  label: string
  value: number
  color?: string
}

export interface ChartProps {
  data: ChartData[] | any[]
  type?: 'area' | 'bar' | 'line' | 'pie' | 'doughnut' | 'radial'
  className?: string
  height?: number
  width?: number
  categories?: string[]
  index?: string
  colors?: string[]
}

export type ChartComponent = React.FC<ChartProps> & {
  Container: typeof ChartContainer
  Tooltip: typeof ChartTooltip
  TooltipContent: typeof ChartTooltipContent
  Legend: typeof ChartLegend
  LegendContent: typeof ChartLegendContent
  Style: typeof ChartStyle
  Area: typeof AreaChart
  Bar: typeof BarChart
  Line: typeof LineChart
  Pie: typeof PieChart
  Doughnut: typeof DoughnutChart
  Radial: typeof RadialBarChart
}

const ChartRoot: React.FC<ChartProps> = ({
  data,
  type = 'area',
  className,
  categories,
  index = 'label',
  colors,
}) => {
  switch (type) {
    case 'area':
      return <AreaChart data={data} categories={categories || ['value']} index={index} colors={colors} className={className} />
    case 'bar':
      return <BarChart data={data} categories={categories} index={index} colors={colors} className={className} />
    case 'line':
      return <LineChart data={data} categories={categories} index={index} colors={colors} className={className} />
    case 'pie':
      return <PieChart data={data} className={className} />
    case 'doughnut':
      return <DoughnutChart data={data} className={className} />
    case 'radial':
      return <RadialBarChart data={data} className={className} />
    default:
      return <AreaChart data={data} categories={categories || ['value']} index={index} colors={colors} className={className} />
  }
}
ChartRoot.displayName = 'Chart'

export const Chart = ChartRoot as ChartComponent
Chart.Container = ChartContainer
Chart.Tooltip = ChartTooltip
Chart.TooltipContent = ChartTooltipContent
Chart.Legend = ChartLegend
Chart.LegendContent = ChartLegendContent
Chart.Style = ChartStyle
Chart.Area = AreaChart
Chart.Bar = BarChart
Chart.Line = LineChart
Chart.Pie = PieChart
Chart.Doughnut = DoughnutChart
Chart.Radial = RadialBarChart

export default Chart
