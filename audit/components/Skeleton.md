# Skeleton — Audit Report

**File:** `src/components/core/skeleton.tsx` (68 lines)  
**Score: 7.5 / 10** — Simple and correct for most cases; multi-line mode loses the ref and reduced-motion is not handled.

---

## What's Good
- `forwardRef` + `displayName`.
- `bg-muted` — token-correct color.
- Multiple animation modes: `pulse`, `wave`, `none`.
- Automatic last-line shortening (`w-3/4`) for realistic text skeleton appearance.
- Clean variant system: text, circular, rectangular, rounded.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| SK-01 | Major | A11y | skeleton.tsx:10-63 | No `aria-busy`, `role`, or `aria-label` — screen readers see a blank div with no announcement that content is loading | AT users get no feedback about loading state | Add `role="status" aria-label="Loading..."` or `aria-busy="true"` on the skeleton wrapper |
| SK-02 | Major | API | skeleton.tsx:31-48 | Multi-line (`lines > 1`) path: outer `<div>` has no `ref` forwarded — `ref` is forwarded only on the single-line path (line 53) | Consumers using ref for multi-line skeleton get `null` | Forward `ref` on the outer wrapper in the multi-line path, or always render a single wrapper and use CSS for lines |
| SK-03 | Minor | Performance | skeleton.tsx:26-27 | `animate-pulse` / `wave` animation — no `prefers-reduced-motion` guard | Motion-sensitive users see pulsing animations | Wrap with `motion-safe:animate-pulse`; for `wave` variant, disable animation in `@media (prefers-reduced-motion: reduce)` |
| SK-04 | Minor | Tokens | skeleton.tsx:27 | `wave` variant: `bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]` — `bg-[length:200%_100%]` is an arbitrary value; the wave animation doesn't actually animate the background position | Wave variant appears identical to pulse | Either animate `background-position` via a keyframe, or document that `wave` and `pulse` currently look the same |
| SK-05 | Nit | Layout | skeleton.tsx:19 | `text` variant has hardcoded `h-4` — does not match text sizes at different font sizes | Skeleton height doesn't match actual text rows | Accept a `height` prop or use `h-[1em]` |

---

## State / Variant Matrix

| Variant | Single line | Multi-line | Ref forwarded | animation=pulse | animation=wave | animation=none | Reduced-motion |
|---------|------------|------------|---------------|----------------|----------------|----------------|----------------|
| text | ✅ | ✅ | ✅ single / ❌ multi | ✅ | ⚠️ no motion | ✅ | ❌ |
| circular | ✅ | ✅ | ✅ / ❌ | ✅ | ⚠️ | ✅ | ❌ |
| rectangular | ✅ | ✅ | ✅ / ❌ | ✅ | ⚠️ | ✅ | ❌ |
| rounded | ✅ | ✅ | ✅ / ❌ | ✅ | ⚠️ | ✅ | ❌ |
| role/ARIA | ❌ | ❌ | — | — | — | — | — |

---

## Missing Tests / Docs
- No test for `ref` forwarding on multi-line variant.
- No test for `role="status"` or `aria-label`.
- Wave animation behavior not documented.
- `lines` prop interaction with `ref` not documented.
