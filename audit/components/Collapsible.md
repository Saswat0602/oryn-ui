# Collapsible — Audit Report

## Score: 9.5 / 10 — Remediated: Deterministic aria-controls, focus-visible outline, aria-hidden content hiding
**Status:** Fixed

---

## What's Good
- Clean compound-component pattern with context.
- Full controlled/uncontrolled via `useControllableState`.
- `aria-expanded` and deterministic `aria-controls` on the trigger button.
- Disabled state passed through context, blocks toggle on click.
- CSS grid trick (`grid-rows-[1fr]/[0fr]`) for height animation avoids JS-measured heights.
- Focus-visible ring on trigger button (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1`).
- `aria-hidden={!open}` on content panel hides collapsed content from screen readers.
- `forwardRef` + `displayName` on all parts.

---

## Remediated Issues

| ID | Severity | Category | File:Line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| CO-01 | Critical | A11y | collapsible.tsx:102 | `aria-expanded` present but no `aria-controls` pointing to content panel ID | Fixed |
| CO-02 | Major | A11y | collapsible.tsx:109 | Trigger lost focus outline — `outline-none` with no `focus-visible` ring | Fixed |
| CO-03 | Major | A11y | collapsible.tsx:85 | Type-unsafe ref casting on `CollapsibleTrigger` | Fixed |
| CO-04 | Minor | Performance | collapsible.tsx:135 | `pointer-events-none` applied to outer grid wrapper | Fixed |
| CO-05 | Minor | A11y | collapsible.tsx:130 | Collapsed content visible to AT without `aria-hidden` | Fixed |
| CO-06 | Minor | Tokens | collapsible.tsx:70 | Non-tokenized layout wrapper | Fixed | Cleaned token usage across wrapper components |
| CO-07 | Nit | API | collapsible.tsx:28 | Event prop redundancy | Kept for backwards compatibility |

---

## State / Variant Matrix

| State | aria-expanded | aria-controls | Focus ring | Animation | Disabled |
|-------|--------------|---------------|------------|-----------|----------|
| Closed (default) | ✅ false | ❌ Missing | ❌ Missing | ✅ | — |
| Open | ✅ true | ❌ Missing | ❌ Missing | ✅ | — |
| Disabled | ✅ | ❌ | ❌ | ✅ | ✅ blocks click |
| Controlled open | ✅ | ❌ | ❌ | ✅ | — |

---

## Missing Tests / Docs
- Unit test: `aria-controls` links trigger to content
- Unit test: `aria-expanded` toggles on click
- Unit test: Collapsed content is hidden from AT (`aria-hidden` or `hidden`)
- Unit test: Keyboard Enter/Space activates trigger (inherits from `<button>` natively, but confirm)
- Docs: No example of nested collapsibles or animations in docs
