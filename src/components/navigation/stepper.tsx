"use client"

import * as React from "react"
import { Check } from "../../icons"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../hooks/use-controllable-state"

export interface StepItem {
  title: string
  description?: string
  icon?: any
  optional?: boolean
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  steps?: StepItem[]
  activeStep?: number
  currentStep?: number
  defaultStep?: number
  onStepChange?: (step: number) => void
  onStepClick?: (step: number) => void
  orientation?: "horizontal" | "vertical"
  clickable?: boolean
  variant?: "default" | "dots" | "progress"
}

interface StepperContextValue {
  activeStep: number
  orientation: "horizontal" | "vertical"
  clickable: boolean
  goToStep: (step: number) => void
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

export function useStepper() {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error("useStepper must be used within a <Stepper />")
  }
  return context
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps = [],
      activeStep: controlledStep,
      currentStep,
      defaultStep = 0,
      onStepChange,
      onStepClick,
      orientation = "horizontal",
      clickable = true,
      children,
      ...props
    },
    ref
  ) => {
    const effectiveControlled = controlledStep ?? currentStep
    const effectiveOnChange = onStepChange ?? onStepClick

    const [activeStep, setActiveStep] = useControllableState<number>({
      prop: effectiveControlled,
      defaultProp: defaultStep,
      onChange: effectiveOnChange,
    })

    const isVertical = orientation === "vertical"

    const goToStep = (step: number) => {
      if (clickable) {
        setActiveStep(step)
      }
    }

    const contextValue = React.useMemo(
      () => ({
        activeStep: activeStep ?? 0,
        orientation,
        clickable,
        goToStep,
      }),
      [activeStep, orientation, clickable]
    )

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="navigation"
          aria-label="Progress steps"
          className={cn(
            "w-full",
            isVertical ? "flex flex-col space-y-0" : "flex flex-row items-center justify-between",
            className
          )}
          {...props}
        >
          {steps && steps.length > 0 ? (
            steps.map((s, idx) => {
              const current = activeStep ?? 0
              const status: "completed" | "current" | "upcoming" =
                idx < current ? "completed" : idx === current ? "current" : "upcoming"
              const isLast = idx === steps.length - 1

              if (isVertical) {
                return (
                  <div key={idx} className="flex gap-4 group">
                    {/* Left Column: Step Badge + Vertical Connecting Line */}
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => goToStep(idx)}
                        disabled={!clickable}
                        aria-current={status === "current" ? "step" : undefined}
                        aria-label={s.title ? `${s.title} (${status})` : `Step ${idx + 1} (${status})`}
                        className={cn(
                          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 outline-none",
                          clickable && "cursor-pointer hover:scale-105",
                          status === "completed" && "bg-primary text-primary-foreground shadow-xs",
                          status === "current" &&
                            "border-2 border-primary bg-background text-primary ring-4 ring-primary/15 font-bold shadow-xs",
                          status === "upcoming" && "border border-input bg-muted/40 text-muted-foreground"
                        )}
                      >
                        {status === "completed" ? (
                          <>
                            <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                            <span className="sr-only">{s.title || `Step ${idx + 1}`} (Completed)</span>
                          </>
                        ) : s.icon ? (
                          s.icon
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </button>

                      {/* Continuous Vertical Connecting Line */}
                      {!isLast && (
                        <div
                          className={cn(
                            "w-[2px] flex-1 my-1.5 min-h-[28px] transition-colors duration-300",
                            idx < current ? "bg-primary" : "bg-border/80"
                          )}
                        />
                      )}
                    </div>

                    {/* Right Column: Title and Description */}
                    <div
                      onClick={() => clickable && goToStep(idx)}
                      className={cn(
                        "flex flex-col pb-6 text-left",
                        clickable && "cursor-pointer select-none",
                        isLast && "pb-0"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs font-semibold tracking-tight transition-colors",
                          status === "current"
                            ? "text-primary"
                            : status === "completed"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {s.title}
                      </span>
                      {s.description && (
                        <span className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                          {s.description}
                        </span>
                      )}
                    </div>
                  </div>
                )
              }

              // Horizontal Layout
              return (
                <React.Fragment key={idx}>
                  <div
                    onClick={() => goToStep(idx)}
                    className={cn(
                      "flex items-center gap-2.5",
                      clickable && "cursor-pointer select-none",
                      !isLast && "flex-1"
                    )}
                  >
                    <button
                      type="button"
                      aria-current={status === "current" ? "step" : undefined}
                      aria-label={s.title ? `${s.title} (${status})` : `Step ${idx + 1} (${status})`}
                      className={cn(
                        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 outline-none",
                        clickable && "cursor-pointer hover:scale-105",
                        status === "completed" && "bg-primary text-primary-foreground shadow-xs",
                        status === "current" &&
                          "border-2 border-primary bg-background text-primary ring-4 ring-primary/15 font-bold shadow-xs",
                        status === "upcoming" && "border border-input bg-muted/40 text-muted-foreground"
                      )}
                    >
                      {status === "completed" ? (
                        <>
                          <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                          <span className="sr-only">{s.title || `Step ${idx + 1}`} (Completed)</span>
                        </>
                      ) : s.icon ? (
                        s.icon
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </button>

                    <div className="flex flex-col min-w-0">
                      <span
                        className={cn(
                          "text-xs font-semibold tracking-tight truncate",
                          status === "current"
                            ? "text-primary"
                            : status === "completed"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {s.title}
                      </span>
                      {s.description && (
                        <span className="text-[10px] text-muted-foreground truncate leading-tight hidden sm:inline">
                          {s.description}
                        </span>
                      )}
                    </div>

                    {!isLast && (
                      <div
                        className={cn(
                          "h-[2px] flex-1 mx-2 sm:mx-3 transition-colors duration-300 min-w-[20px]",
                          idx < current ? "bg-primary" : "bg-border/80"
                        )}
                      />
                    )}
                  </div>
                </React.Fragment>
              )
            })
          ) : (
            children
          )}
        </div>
      </StepperContext.Provider>
    )
  }
)

Stepper.displayName = "Stepper"

export default Stepper
