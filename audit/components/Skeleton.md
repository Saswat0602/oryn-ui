# Skeleton — Audit Report

**File:** `src/components/core/skeleton.tsx` (80 lines)  
**Score: 9.5 / 10 — Status: Fixed**

---

## What's Good
- `forwardRef` + `displayName` across both single-line and multi-line modes.
- `role="status"`, `aria-label="Loading..."`, and `aria-busy="true"` providing screen reader feedback.
- `bg-muted` — token-correct color.
- Multiple animation modes: `pulse`, `wave`, `none` protected with `motion-safe:`.
- Automatic last-line shortening (`w-3/4`) for realistic text skeleton appearance.
- Clean variant system: text, circular, rectangular, rounded.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| SK-01 | Major | A11y | skeleton.tsx:10-63 | No `aria-busy`, `role`, or `aria-label` | AT users get no feedback about loading state | Fixed | Added `role="status"`, `aria-label="Loading..."`, and `aria-busy="true"` |
| SK-02 | Major | API | skeleton.tsx:31-48 | Multi-line (`lines > 1`) path: outer `<div>` had no `ref` forwarded | Consumers using ref for multi-line skeleton got `null` | Fixed | Forwarded `ref` and passed `{...props}` on the outer wrapper in multi-line path |
| SK-03 | Minor | Performance | skeleton.tsx:26-27 | `animate-pulse` / `wave` animation had no reduced motion guard | Motion-sensitive users see persistent pulsing | Fixed | Wrapped with `motion-safe:animate-pulse` |
| SK-04 | Minor | Tokens | skeleton.tsx:27 | `wave` variant: arbitrary background-size styling | Wave variant visual distinction | Verified | Protected by motion-safe gradient |
| SK-05 | Nit | Layout | skeleton.tsx:19 | `text` variant hardcoded `h-4` | Skeleton height alignment | Deferred | Height styling supported via style or className |

---

## State / Variant Matrix

| Variant | Single line | Multi-line | Ref forwarded | animation=pulse | animation=wave | animation=none | Reduced-motion |
|---------|------------|------------|---------------|----------------|----------------|----------------|----------------|
| text | ✅ | ✅ | ✅ single / ✅ multi | ✅ | ✅ | ✅ | ✅ `motion-safe:` |
| circular | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| rectangular | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| rounded | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| role/ARIA | ✅ `role="status"` | ✅ `role="status"` | — | — | — | — | — |

---

## Missing Tests / Docs
- No test for `ref` forwarding on multi-line variant.
- No test for `role="status"` or `aria-label`.
- Wave animation behavior not documented.
- `lines` prop interaction with `ref` not documented.
