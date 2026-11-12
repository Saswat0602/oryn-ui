# Progress — Audit Report

**File:** `src/components/core/progress.tsx` (139 lines)  
**Score: 9.5 / 10** — Score updated after remediation of semantic colors, aria-valuetext, motion-safe transitions, and barRef.

---

## What's Good
- `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and accessible `aria-valuetext`.
- `aria-label` fallback to "Progress bar".
- Proper `clamp` for percentage calculation.
- Compound pattern: `Progress.Track` and `Progress.Indicator` exported for custom layouts.
- Label + percentage readout in label mode with optional `barRef`.
- `motion-safe:` prefixes on value transitions and indeterminate pulsing animations.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| PR-01 | Major | Color | progress.tsx:34-36 | `success: "bg-emerald-600 dark:bg-emerald-500"` and `warning: "bg-amber-600 dark:bg-amber-500"` — standardized token classes | Fixed | Standardized semantic color classes across light and dark modes with proper contrast |
| PR-02 | Major | Performance | progress.tsx:45 | Indeterminate uses `animate-pulse` without `motion-safe` guard | Fixed | Wrapped in `motion-safe:animate-pulse` |
| PR-03 | Major | A11y | progress.tsx:92 | Omitting `aria-valuenow` for indeterminate has no "loading" announcement | Fixed | Added `aria-valuetext={isIndeterminate ? "Loading..." : `${Math.round(percentage)}%`}` |
| PR-04 | Minor | A11y | progress.tsx:85 | When `hasLabel=true`, ref goes to outer wrapper `div` instead of the `role="progressbar"` element | Fixed | Added `barRef` prop to allow direct access to progressbar element in labeled mode |
| PR-05 | Minor | States | progress.tsx:43-44 | `transition-all duration-500` on indicator without `motion-safe` guard | Fixed | Wrapped transition in `motion-safe:transition-all` |
| PR-06 | Nit | Tokens | progress.tsx:33 | `default: "bg-primary"` — depends on active theme primary color | Documented | Expected behavior aligned with library design tokens |

---

## State / Variant Matrix

| Variant | Determinate | Indeterminate | showLabel | Disabled | Reduced-motion |
|---------|------------|---------------|-----------|----------|----------------|
| default | ✅ | ✅ | ✅ | — | ✅ |
| success | ✅ | ✅ | ✅ | — | ✅ |
| warning | ✅ | ✅ | ✅ | — | ✅ |
| destructive | ✅ | ✅ | ✅ | — | ✅ |
| sm/md/lg sizes | ✅ | ✅ | ✅ | — | ✅ |

---

## Verification
- Added smoke and accessibility unit tests in `tests/smoke/core.test.tsx` checking `aria-valuenow="65"` and `aria-valuetext="65%"`.
- Passed axe-core accessibility verification.
