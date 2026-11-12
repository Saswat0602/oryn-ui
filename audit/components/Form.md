# Form — Audit Report

## Score: 8/10 — Well-designed scaffolding with minor gaps

## What's Good
- Full compound component system: Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage ✅
- `useFormField()` hook centralizes ID and ARIA wiring ✅
- `aria-describedby` wiring for description + error message ✅
- `aria-invalid` on FormControl ✅
- `role="alert"` on FormMessage for error announcements ✅
- `htmlFor` correctly resolved from context in FormLabel ✅
- react-hook-form compatible via `control` prop ✅
- `Slot` primitive for asChild composition ✅
- `useId()` for stable server-safe IDs ✅
- forwardRef throughout ✅
- Convenience wrappers: FormError, FormSuccess, FormWarning ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| FM-01 | Major | A11y | form.tsx:224-227 | `FormLabel` uses hardcoded `text-red-500 dark:text-red-400` on error instead of `text-destructive` | Breaks token consistency | Replace with `text-destructive` and optionally `dark:text-destructive` |
| FM-02 | Major | A11y | form.tsx:311-315 | `FormMessage` uses hardcoded `text-red-500 dark:text-red-400` / `text-emerald-600 dark:text-emerald-400` / `text-amber-600 dark:text-amber-400` | Multiple hardcoded colors deviate from token system | Map to `text-destructive`, `text-green-600` → consider adding a `--success` token |
| FM-03 | Major | API | form.tsx:38-39 | `FormContext` uses `[key: string]: any` index signature | Loses all type safety on the form context; promotes `any` usage | Remove index signature; type only the fields needed for interop |
| FM-04 | Major | API | form.tsx:171-176 | `FormField` with `control` prop: `onChange` calls `control?.setValue?.(name, ...)` — not full RHF controller pattern | Only works for simple string inputs; file inputs, checkboxes will fail | For full RHF support, use `useController()` or document that RHF `render` prop should handle complex cases |
| FM-05 | Minor | A11y | form.tsx:214-235 | `FormLabel` has no visual asterisk for required fields | Required fields have no visual indicator | Accept a `required` prop and render `<span aria-hidden="true">*</span>` after label text |
| FM-06 | Minor | A11y | form.tsx:242-277 | `FormControl` fallback renders a `<div>` with `aria-invalid` | `<div>` elements cannot have `aria-invalid` per ARIA spec | Only apply `aria-invalid` when `asChild` is true (passes to actual input) |
| FM-07 | Nit | API | form.tsx:12 | `FormFieldError` has `[key: string]: any` | Prevents type safety on error objects | Remove index signature |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Standalone error prop | ✅ |
| RHF errors object | ✅ |
| RHF getFieldState integration | ✅ |
| aria-describedby linking | ✅ |
| aria-invalid on error | ✅ |
| role="alert" on error message | ✅ |
| htmlFor resolution from context | ✅ |
| Required field asterisk | ❌ Not implemented |
| Token-based error color | ❌ Hardcoded red |
| asChild composition | ✅ |
| Standalone (no RHF) usage | ✅ |

## Missing Tests/Docs
- No test verifying `aria-describedby` chain (input → description → error)
- No test for `aria-invalid` state
- No test for `role="alert"` triggering announcement
- Docs should clarify that required asterisk is not built in
- RHF `control` prop integration not tested end-to-end
