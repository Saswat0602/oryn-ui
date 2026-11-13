"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Slot } from "../../primitives/slot"
import { useId } from "../../hooks/use-id"

// Types for field state and errors
export interface FormFieldError {
  message?: string
  type?: string
}

export interface FormFieldContextValue {
  name: string
  error?: FormFieldError | string
  isDirty?: boolean
  isTouched?: boolean
  invalid?: boolean
}

export const FormFieldContext = React.createContext<FormFieldContextValue>({
  name: "",
})

export interface FormItemContextValue {
  id: string
}

export const FormItemContext = React.createContext<FormItemContextValue>({
  id: "",
})

export interface FormContextValue {
  errors?: Record<string, FormFieldError | string | undefined>
  getFieldState?: (name: string) => { error?: FormFieldError | string; isDirty?: boolean; isTouched?: boolean; invalid?: boolean }
}

export const FormContext = React.createContext<FormContextValue | null>(null)

/**
 * Hook to access the current FormField context (scoping IDs and accessibility attributes).
 */
export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const formContext = React.useContext(FormContext)

  const id = itemContext.id || fieldContext.name

  // Resolve error from field context or parent form context
  let error: FormFieldError | undefined
  if (fieldContext.error) {
    error = typeof fieldContext.error === "string" ? { message: fieldContext.error } : fieldContext.error
  } else if (formContext?.errors && fieldContext.name && formContext.errors[fieldContext.name]) {
    const err = formContext.errors[fieldContext.name]
    error = typeof err === "string" ? { message: err } : err
  } else if (formContext?.getFieldState && fieldContext.name) {
    const state = formContext.getFieldState(fieldContext.name)
    if (state?.error) {
      error = typeof state.error === "string" ? { message: state.error } : state.error
    }
  }

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error,
    isDirty: fieldContext.isDirty ?? false,
    isTouched: fieldContext.isTouched ?? false,
    invalid: !!error,
  }
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  form?: any
  errors?: Record<string, any>
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ form, errors, className, children, ...props }, ref) => {
    const contextValue: FormContextValue = React.useMemo(() => {
      if (form) {
        return {
          errors: form.formState?.errors || form.errors || errors,
          getFieldState: form.getFieldState ? (name: string) => form.getFieldState(name, form.formState) : undefined,
          ...form,
        }
      }
      return { errors }
    }, [form, errors])

    return (
      <FormContext.Provider value={contextValue}>
        <form ref={ref} className={cn("space-y-6", className)} {...props}>
          {children}
        </form>
      </FormContext.Provider>
    )
  }
)
Form.displayName = "Form"

export interface FormFieldProps {
  name: string
  error?: FormFieldError | string
  isDirty?: boolean
  isTouched?: boolean
  control?: any
  render?: (props: {
    field: {
      name: string
      value?: any
      onChange?: (...event: any[]) => void
      onBlur?: () => void
      ref?: React.Ref<any>
    }
    fieldState: {
      error?: FormFieldError
      isDirty: boolean
      isTouched: boolean
      invalid: boolean
    }
    formState: any
  }) => React.ReactNode
  children?: React.ReactNode
  className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  error: explicitError,
  isDirty = false,
  isTouched = false,
  control,
  render,
  children,
  className,
}) => {
  const formContext = React.useContext(FormContext)

  // If using react-hook-form control and render prop
  const effectiveError = explicitError || (formContext?.errors?.[name])

  const contextValue: FormFieldContextValue = React.useMemo(() => {
    const err = typeof effectiveError === "string" ? { message: effectiveError } : effectiveError
    return {
      name,
      error: err,
      isDirty,
      isTouched,
      invalid: !!err,
    }
  }, [name, effectiveError, isDirty, isTouched])

  if (render) {
    const fieldState = {
      error: contextValue.error as FormFieldError | undefined,
      isDirty: contextValue.isDirty ?? false,
      isTouched: contextValue.isTouched ?? false,
      invalid: contextValue.invalid ?? false,
    }

    const field = {
      name,
      value: control?._formValues?.[name] ?? "",
      onChange: (e: any) => {
        const val =
          e && typeof e === "object" && "target" in e
            ? (e.target.type === "checkbox" ? e.target.checked : e.target.value)
            : e
        control?.setValue?.(name, val, { shouldValidate: true, shouldDirty: true })
      },
      onBlur: () => {
        control?.trigger?.(name)
      },
    }

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div className={className} data-field={name}>
          {render({ field, fieldState, formState: formContext })}
        </div>
      </FormFieldContext.Provider>
    )
  }

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div className={cn("space-y-2", className)} data-field={name}>
        {children}
      </div>
    </FormFieldContext.Provider>
  )
}
FormField.displayName = "FormField"

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, children, ...props }, ref) => {
    const id = useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {children}
        </div>
      </FormItemContext.Provider>
    )
  }
)
FormItem.displayName = "FormItem"

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, htmlFor, required, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
      <label
        ref={ref}
        htmlFor={htmlFor || formItemId}
        className={cn(
          "text-xs font-semibold tracking-wide text-foreground select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors inline-flex items-center",
          error && "text-destructive",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span aria-hidden="true" className="text-destructive ml-0.5 font-bold">
            *
          </span>
        )}
      </label>
    )
  }
)
FormLabel.displayName = "FormLabel"

export interface FormControlProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

export const FormControl = React.forwardRef<HTMLElement, FormControlProps>(
  ({ asChild = true, children, ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    const ariaDescribedBy = !error
      ? formDescriptionId
      : `${formDescriptionId} ${formMessageId}`

    if (asChild && React.isValidElement(children)) {
      return (
        <Slot
          ref={ref}
          id={formItemId}
          aria-describedby={ariaDescribedBy}
          aria-invalid={!!error}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        id={formItemId}
        aria-describedby={ariaDescribedBy}
        className="relative"
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormControl.displayName = "FormControl"

export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-xs text-muted-foreground leading-relaxed", className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
FormDescription.displayName = "FormDescription"

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "error" | "success" | "warning"
}

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, variant = "error", children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message || error) : children

    if (!body) return null

    const variantClasses = {
      default: "text-muted-foreground",
      error: "text-destructive",
      success: "text-emerald-700 dark:text-emerald-400",
      warning: "text-amber-700 dark:text-amber-400",
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        role="alert"
        className={cn(
          "text-xs font-medium motion-safe:animate-in motion-safe:fade-in-0 duration-150 leading-none",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {body}
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"

// Backward-compatible notification alerts
export const FormError: React.FC<{ message?: string; className?: string }> = ({
  message,
  className,
}) => {
  if (!message) return null
  return <FormMessage variant="error" className={className}>{message}</FormMessage>
}

export const FormSuccess: React.FC<{ message?: string; className?: string }> = ({
  message,
  className,
}) => {
  if (!message) return null
  return <FormMessage variant="success" className={className}>{message}</FormMessage>
}

export const FormWarning: React.FC<{ message?: string; className?: string }> = ({
  message,
  className,
}) => {
  if (!message) return null
  return <FormMessage variant="warning" className={className}>{message}</FormMessage>
}

