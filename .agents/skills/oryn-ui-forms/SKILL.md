---
name: oryn-ui-forms
description: >-
  Use this skill whenever authoring, updating, or debugging forms and form fields in ORYN UI.
  Covers the composable form system (Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage),
  dual standalone / react-hook-form + zod integration, automatic ARIA ID wiring, and custom input integrations.
---

# ORYN UI Composable Form Engineering Skill

This skill guides the design, integration, and accessibility patterns for the **Composable Form System** in **ORYN UI** (`oryn-ui`).

---

## 1. Composable Form Architecture

The ORYN UI form system uses React Context and the headless `Slot` primitive to decouple form state, layout, label binding, and validation feedback.

```
<Form {...form}>
  <FormField name="email" render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="name@example.com" {...field} />
      </FormControl>
      <FormDescription>Your account recovery address.</FormDescription>
      <FormMessage />
    </FormItem>
  )} />
</Form>
```

### Component Hierarchy & Contexts

1. **`<Form>`**:
   - Accepts optional `form` (from `react-hook-form` `useForm()`) or standalone `errors` record.
   - Provides `FormContext` for field state resolution.
   - Forwards `ref` to the underlying `<form>` HTML element.

2. **`<FormField>`**:
   - Manages field-level context (`FormFieldContext`).
   - Supports dual modes:
     - **Render Prop**: `render={({ field, fieldState, formState }) => ...}`
     - **Direct Children**: `<FormField name="username"><FormItem>...</FormItem></FormField>`
   - Injects `error`, `isDirty`, `isTouched`, and `invalid` flags.

3. **`<FormItem>`**:
   - Scopes each field unit with a unique ID using `useId()`.
   - Provides `FormItemContext`.

4. **`<FormLabel>`**:
   - Semantic `<label>`.
   - Automatically receives `htmlFor={formItemId}` from context.
   - Automatically switches to error styling (`text-red-500 dark:text-red-400`) when the field has an error.

5. **`<FormControl>`**:
   - Wraps the actual form control using `Slot` (`asChild=true`).
   - Injects:
     - `id={formItemId}`
     - `aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}`
     - `aria-invalid={!!error}`

6. **`<FormDescription>`**:
   - Accessible guidance text with `id={formDescriptionId}`.
   - Clean, muted typography (`text-xs text-zinc-500 dark:text-zinc-400`).

7. **`<FormMessage>`**:
   - Validation feedback element with `id={formMessageId}` and `role="alert"`.
   - Automatically extracts error string from `fieldContext.error` or parent `form.formState.errors[name]`.
   - Renders `null` when no error is present.

---

## 2. Dual-Mode Implementation Guide

### Mode A: Standalone Native React (Zero Dependencies)
No external libraries required.

```tsx
import React, { useState } from 'react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button } from 'oryn-ui'

export function StandaloneForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    console.log('Submitted:', email)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField name="email" error={error || undefined}>
        <FormItem>
          <FormLabel>Email Address</FormLabel>
          <FormControl>
            <Input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="alex@domain.com" 
            />
          </FormControl>
          <FormDescription>We will send account updates here.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

### Mode B: `react-hook-form` + `zod` Integration
For consumers using `react-hook-form` and schema validation.

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button } from 'oryn-ui'

const schema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
})

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: '' },
  })

  return (
    <Form form={form} onSubmit={form.handleSubmit((data) => console.log(data))}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>Public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Save Changes</Button>
    </Form>
  )
}
```

---

## 3. Integrating ORYN UI Controls

Any ORYN UI form control works seamlessly inside `<FormControl>`:

- **`<Input>`**: standard text, password, email, number.
- **`<Select>`**: native select listbox with trigger value binding.
- **`<Checkbox>`**: boolean toggles with `checked` and `onCheckedChange`.
- **`<Switch>`**: accessible switches with `checked` and `onChange`.
- **`<Slider>`**: range inputs with `value` array and `onValueChange`.
- **`<RadioGroup>`**: radio groups with `value` and `onValueChange`.
- **`<InputOTP>`**: one-time password segmented fields.
- **`<DateTimePicker>`**: date and time selection.

---

## 4. Verification & Testing Checklist

When authoring or modifying form components:

1. **ARIA Linking**:
   - Verify `label[for]` strictly matches `input[id]`.
   - Verify `input[aria-describedby]` contains both the description ID and message ID when invalid.
   - Verify `input[aria-invalid="true"]` is set when error is present.
2. **Alert Role**:
   - `FormMessage` must carry `role="alert"` for screen reader announcements.
3. **SSR & StrictMode**:
   - ID generation via `useId()` must not mismatch during SSR hydration.
   - Mount and unmount cleanly under React 19 `<React.StrictMode>`.

