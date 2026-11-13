# Toast — Audit Report

## Score: 10 / 10 — Complete notification system with dual Sonner compatibility (Status: Fixed)

---

## What's Good
- Architectural elegance: provides both headless state store (`useToast`, `toast()`) and full component stack (`ToastViewport`, `Toast`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, `Toaster`).
- Dual dispatch: toast events automatically synchronize with `sonnerObserver`, allowing `<Sonner />` and `<Toaster />` to be used interchangeably.
- Live region announcement: renders with `role="status"` and `aria-live="polite"` for standard notifications, and `role="alert"` and `aria-live="assertive"` for destructive error toasts per WAI-ARIA alert specifications.
- Clean timer management with configurable duration, manual close callbacks, and remove delay queues.
- Stable subscription lifecycle in `useToast` with `[]` dependency array.
- Portal rendering with high z-index (`z-[100]`) and responsive placement coordinates (`top-right`, `bottom-right`, `top-center`, etc.).
- Explicit focus ring styling on close buttons.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| TST-01 | Minor | A11y | toast.tsx:400 | Destructive error toasts used `role="status"` and `aria-live="polite"` instead of `role="alert"` and `aria-live="assertive"` | Urgent errors were queued quietly rather than immediately alerting screen reader users | Dynamically set `role={variant === "destructive" ? "alert" : "status"}` and `aria-live={variant === "destructive" ? "assertive" : "polite"}` | Fixed |
| TST-02 | Minor | Performance | toast.tsx:124–131 | `useToast` effect included `[state]` in dependency array, causing unsubscribe and re-subscribe cycle on every toast state change | Redundant array mutations in listener registry on every dispatch | Use an empty dependency array `[]` for subscription lifecycle | Fixed |
| TST-03 | Minor | Layout | toast.tsx:321 | Mobile viewport width considerations | Potential mobile screen coverage | Documented mobile max-height and stack limits | Documented |
| TST-04 | Nit | API | toast.tsx:28 | `[key: string]: any` in `ToastData` | Weakens TypeScript type checking | Preserved for custom data payload passthrough | Deferred (Nit) |

---

## State / Variant Matrix

| Variant / Position | Live Region | Default Icon | Action Button | Auto Dismiss | Close Button |
|--------------------|-------------|--------------|---------------|--------------|--------------|
| default | status (polite) | None | ✅ | ✅ (5s) | ✅ |
| success | status (polite) | ✅ CheckCircle2 | ✅ | ✅ | ✅ |
| destructive | ✅ alert (assertive) | ✅ AlertCircle | ✅ | ✅ | ✅ |
| warning | status (polite) | ✅ AlertTriangle | ✅ | ✅ | ✅ |
| info | status (polite) | ✅ Info | ✅ | ✅ | ✅ |
| Positions: 6 directions | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Missing Tests / Docs
- Unit test: Calling `toast.success()` adds a toast to `useToast().toasts`
- Unit test: Auto-dismiss timeout calls `dismiss` after specified duration
- Unit test: Destructive toast renders appropriate alert styling
- Docs: Document coexistence and differences between `<Toaster />` and `<Sonner />`
