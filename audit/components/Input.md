# Input — Audit Report

**File:** `src/components/core/input.tsx` (77 lines)  
**Status:** Fixed  
**Score: 9.5 / 10** — Robust, accessible text input with automatic `aria-invalid` propagation, decorative icon wrappers (`aria-hidden="true"`, `pointer-events-none`), and flex-safe `min-w-0` layout.

---

## What's Good
- `forwardRef` + `displayName`.
- `focus-visible:outline-none focus-visible:ring-1` — correct focus-visible usage.
- `disabled:cursor-not-allowed disabled:opacity-50`.
- `placeholder:text-muted-foreground` — token-correct.
- `error` ↔ `aria-invalid` dual detection and automatic propagation to assistive tech.
- Responsive `fullWidth` defaulting to `true`.
- Icon wrapper uses `pointer-events-none` position with `text-muted-foreground` and `aria-hidden="true"`.
- Flex-safe `min-w-0` on wrapper container.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| I-01 | Major | Color | input.tsx:18 | `success` state: `border-emerald-500 text-emerald-900 dark:text-emerald-100` | Theme consistency; emerald matches toast, badge, sonner, banner | Intentional emerald palette across oryn-ui feedback states | Documented |
| I-02 | Major | A11y | input.tsx:26-72 | When `error=true`, component did not set `aria-invalid="true"` on `<input>` | Screen readers cannot announce error state | Added `aria-invalid={ariaInvalid}` to both `<input>` renders | Fixed |
| I-03 | Minor | A11y | input.tsx:34-37 | `leftIcon` / `rightIcon` wrappers had no `aria-hidden` | Noisy screen reader announcements | Added `aria-hidden="true"` and `pointer-events-none` to icon containers | Fixed |
| I-04 | Minor | Layout | input.tsx:33 | Wrapper `<div>` had no `min-w-0` | Overflow in flex layouts | Added `min-w-0` to wrapper div | Fixed |
| I-05 | Nit | API | input.tsx:7-9 | `leftIcon` / `rightIcon` size guidance | Inconsistent icon sizing | Documented expected icon size (`h-4 w-4`) | Fixed |

---

## State / Variant Matrix

| State | With leftIcon | With rightIcon | Both icons | Disabled | Error | Success | aria-invalid propagated |
|-------|--------------|----------------|------------|----------|-------|---------|------------------------|
| default | ✅ | ✅ | ✅ | ✅ | ✅ visual | ✅ visual | ✅ |
| error | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| success | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| focus ring | ✅ | ✅ | ✅ | — | ✅ | ✅ | — |

---

## Missing Tests / Docs
- ✅ Added test for `aria-invalid="true"` propagation on `error` in `tests/smoke/core.test.tsx`.
- ✅ Icon container accessibility and overflow behavior verified.
