# Card — Audit Report

**File:** `src/components/core/card.tsx` (108 lines)  
**Score: 9.5 / 10** — Score updated after remediation of clickable keyboard accessibility, motion-safe transitions, CardTitle polymorphism, and footer text color.

---

## What's Good
- All sub-components use `forwardRef` + `displayName`.
- Pure design-token usage — no hardcoded colors.
- `text-card-foreground` / `text-muted-foreground` correctly applied to sub-parts.
- `createVariants` for clean variant API.
- `dark:shadow-black/40` on elevated variant for dark-mode shadow correction.
- Clickable cards have `role="button"`, `tabIndex={0}`, keyboard Enter/Space activation, and focus-visible rings.
- `CardTitle` accepts polymorphic `as` prop (e.g. `h1` through `h6`).

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| C-01 | Major | A11y | card.tsx:32 | `clickable` prop added `cursor-pointer` but no `role`, `tabIndex`, or keyboard support | Fixed | Added default `role="button"`, `tabIndex={0}`, keyboard `onKeyDown` (Enter/Space), and `focus-visible:ring-2` |
| C-02 | Minor | States | card.tsx:31 | `hoverable` adds translate without `prefers-reduced-motion` guard | Fixed | Wrapped with `motion-safe:hover:-translate-y-0.5` |
| C-03 | Minor | A11y | card.tsx:52-63 | `CardTitle` rendered as `<h3>` unconditionally | Fixed | Added polymorphic `as?: "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "div"` prop defaulting to `h3` |
| C-04 | Minor | Layout | card.tsx:88 | `CardFooter` had `text-muted-foreground` by default | Fixed | Changed to `text-card-foreground` so buttons and actions inherit clean foreground styles |
| C-05 | Nit | API | card.tsx:26 | `hoverable` and `clickable` transitions could conflict | Fixed | Consolidated clean transition and active scale classes |

---

## State / Variant Matrix

| Variant | Light | Dark | Hoverable | Clickable | Keyboard-clickable | Reduced-motion |
|---------|-------|------|-----------|-----------|-------------------|----------------|
| default | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| elevated | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| outlined | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ghost | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Verification
- Added smoke and accessibility unit tests in `tests/smoke/core.test.tsx` verifying clickable card `role="button"`, `tabindex="0"`, Enter key click triggering, and axe-core accessibility compliance.
