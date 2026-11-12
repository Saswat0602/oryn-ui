# Progress — Audit Report

**File:** `src/components/core/progress.tsx` (136 lines)  
**Score: 7 / 10** — Correct ARIA on progressbar; hardcoded colors on variants and reduced-motion gap are notable.

---

## What's Good
- `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- `aria-label` fallback to "Progress bar".
- Proper `clamp` for percentage calculation.
- Compound pattern: `Progress.Track` and `Progress.Indicator` exported for custom layouts.
- Label + percentage readout in label mode.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| PR-01 | Major | Color | progress.tsx:34-36 | `success: "bg-emerald-600 dark:bg-emerald-500"` and `warning: "bg-amber-500 dark:bg-amber-500"` — hardcoded Tailwind utility colors, not design tokens | Breaks theme customization | Add CSS tokens `--progress-success` and `--progress-warning`, or document as intentional semantic colors |
| PR-02 | Major | Performance | progress.tsx:45 | Indeterminate uses `animate-pulse bg-gradient-to-r from-transparent via-primary to-transparent` — no `prefers-reduced-motion` guard | Motion-sensitive users see pulsing | Wrap in `motion-safe:animate-pulse` or disable animation in CSS `@media (prefers-reduced-motion: reduce)` |
| PR-03 | Major | A11y | progress.tsx:92 | `aria-valuenow={isIndeterminate ? undefined : (value ?? 0)}` — omitting `aria-valuenow` for indeterminate is correct per spec, but `aria-label` defaults to `"Progress bar"` without any "loading" announcement | Screen readers give no feedback during indeterminate loading | Set `aria-valuetext="Loading..."` when indeterminate |
| PR-04 | Minor | A11y | progress.tsx:85 | When `hasLabel=true`, ref goes to outer wrapper `div` instead of the `role="progressbar"` element — consumers using the ref expect the progressbar element | Ref semantics are broken for labeled variant | Either keep ref on progressbar regardless, or add a separate `barRef` prop |
| PR-05 | Minor | States | progress.tsx:43-44 | `transition-all duration-500` on indicator — smooth value animation is nice, but no `motion-safe` guard | Animated for all users | Wrap transition in `motion-safe:transition-all` |
| PR-06 | Nit | Tokens | progress.tsx:33 | `default: "bg-primary"` — in base theme `primary=#18181b` (near black). Progress filled in black is unusual but technically token-correct | Visually confusing without Normal theme | Add a comment noting this depends on Normal theme override |

---

## State / Variant Matrix

| Variant | Determinate | Indeterminate | showLabel | Disabled | Reduced-motion |
|---------|------------|---------------|-----------|----------|----------------|
| default | ✅ | ⚠️ no aria-valuetext | ✅ | ⚠️ no disabled prop | ❌ animates |
| success | ✅ | ⚠️ | ✅ | — | ❌ |
| warning | ✅ | ⚠️ | ✅ | — | ❌ |
| destructive | ✅ | ⚠️ | ✅ | — | ❌ |
| sm/md/lg sizes | ✅ | ✅ | ✅ | — | — |

---

## Missing Tests / Docs
- No test for `aria-valuenow` clamping at 0 and 100.
- No test for indeterminate `aria-valuetext`.
- No test verifying `showLabel` percentage rounds correctly.
- Hardcoded colors not documented.
- `disabled` prop not supported — no documentation of this limitation.
