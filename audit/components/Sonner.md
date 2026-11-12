# Sonner — Audit Report

## Score: 9.5 / 10 — Status: Fixed

---

## What's Good
- Zero external runtime dependencies — clean custom implementation of the popular Sonner toast API.
- Comprehensive toast functions: `toast()`, `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()`, `toast.loading()`, and `toast.promise()`.
- Full promise lifecycle management: seamlessly transitions from loading spinner to resolved success or rejected error.
- Live region announcement: each toast card has `role="status"` and `aria-live="polite"`.
- Support for `richColors` mode with subtle semantic backgrounds and borders.
- Interactive actions with action and cancel callback buttons.
- Accessible loading state with `<span className="sr-only">Loading</span>` and motion-safe animations.
- Visible focus rings on dismiss and action buttons.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| SON-01 | Major | A11y | sonner.tsx:313 | Loading spinner icon (`Loader2`) has no text description or accessible label | Screen reader users hear the toast text but get no announcement that an operation is currently pending | Fixed | Added `<span className="sr-only">Loading</span>` to spinner wrapper and `motion-safe:animate-spin` |
| SON-02 | Minor | A11y | sonner.tsx:362–371 | Close dismiss button lacks a visible keyboard focus ring | Keyboard-only users tabbing to dismiss a toast cannot see where their focus is | Fixed | Added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` |
| SON-03 | Minor | States | sonner.tsx:266 | Hard slices toasts at `.slice(0, 5)` without an overflow queue | If 6+ toasts are created rapidly, later toasts are silently hidden until earlier ones dismiss | Deferred | Implement a FIFO display queue that reveals pending toasts as slots open up |
| SON-04 | Nit | API | sonner.tsx:102 | `const sonnerToastFn: any` type assertion | Bypasses TypeScript strict typing | Deferred | Explicitly type `sonnerToastFn` using `SonnerToastFunction` interface |

---

## State / Variant Matrix

| Variant / Feature | Live Region | Icon Rendered | Action Button | Rich Colors Mode | Dismiss Button |
|-------------------|-------------|---------------|---------------|------------------|----------------|
| default | ✅ `role="status"` | None | ✅ | ✅ | ✅ |
| success | ✅ | ✅ CheckCircle2 | ✅ | ✅ | ✅ |
| error | ✅ | ✅ AlertCircle | ✅ | ✅ | ✅ |
| warning | ✅ | ✅ AlertTriangle | ✅ | ✅ | ✅ |
| info | ✅ | ✅ Info | ✅ | ✅ | ✅ |
| loading | ✅ | ✅ Accessible Loader (`sr-only` Loading) | ✅ | ✅ | ✅ |
| promise() | ✅ | ✅ Dynamic | ✅ | ✅ | ✅ |

---

## Missing Tests / Docs
- Unit test: `sonnerToast.success()` adds toast to active list
- Unit test: `sonnerToast.promise()` resolves and updates toast state from loading to success
- Unit test: Close button removes toast and triggers `onDismiss`
- Docs: Explain difference between `<Sonner />` and traditional `<Toast />` / `<Toaster />`
