import * as React from "react"
import { createVariants } from "../../lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const labelVariants = createVariants({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  variants: {},
  defaultVariants: {},
})

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={labelVariants({ className })}
      {...props}
    >
      {children}
      {required && (
        <>
          <span aria-hidden="true" className="ml-1 text-destructive dark:text-red-400 select-none">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  )
)

Label.displayName = "Label"

export { Label }
