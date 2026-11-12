# Tooltip — Audit Report

## Score: 9.5 / 10 — Status: Fixed. Accessible tooltip with WCAG 1.4.13 hoverable content, Escape key dismissal, and live context hook

---

## What's Good
- Dual API design: simple wrapper `<Tooltip content="Helper text"><Button /></Tooltip>` or compound `<Tooltip>`, `<TooltipTrigger asChild>`, `<TooltipContent>`.
- Accessible association: Generates unique ID via `useId()`, sets `role="tooltip"` on content, and wires `aria-describedby={open ? tooltipId : undefined}` to trigger.
- Full keyboard focus support: Opens on `onFocus` and closes on `onBlur` in addition to hover events.
- Debounced hover entrance timer with configurable `delayDuration` and clean timeout clearing.
- Renders via `Portal` at high z-index (`z-[80]`) with entrance animation.
- Dynamic boundary flipping: Flips from top to bottom if trigger is too close to top edge, and vice-versa.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| TLT-01 | Major | A11y | tooltip.tsx:180 | `pointer-events-none` on `TooltipContent` prevented user from hovering over tooltip content | Violates WCAG 2.1 SC 1.4.13 (Content on Hover or Focus — Hoverable) | Fixed | Removed `pointer-events-none` and added buffer timer so users can hover over content safely |
| TLT-02 | Major | A11y | tooltip.tsx:88–108 | Missing `Escape` key dismissal | Violates WCAG 2.1 SC 1.4.13 (Dismissible) | Fixed | Added global `keydown` listener dismissing open tooltip on `Escape` |
| TLT-03 | Major | API | tooltip.tsx:262–265 | `useTooltip()` export returned static dummy object | Misleads consumers who attempt to consume it | Fixed | Connected to `useTooltipContext()` to return live `open` and `setOpen` |
| TLT-04 | Minor | Layout | tooltip.tsx:128–135 | Side collision detection for extreme edges | Tooltip boundary positioning | Minor | Handled via viewport edge classes |
| TLT-05 | Nit | API | tooltip.tsx:60, 69 | `timerRef: any` untyped ref | Loss of type safety | Fixed | Typed timer as `ReturnType<typeof setTimeout> \| null` |

---

## State / Variant Matrix

| State / Trigger | Mouse Enter | Keyboard Focus | role="tooltip" | aria-describedby | Dismiss with Escape |
|-----------------|-------------|----------------|----------------|------------------|---------------------|
| Hover | ✅ (delayed) | N/A | ✅ | ✅ | ✅ |
| Keyboard focus | N/A | ✅ | ✅ | ✅ | ✅ |
| Blur / Mouse leave | ✅ Closes | ✅ Closes | ✅ | ✅ Removed | N/A |
| Top / Bottom auto-flip | ✅ | ✅ | ✅ | ✅ | ✅ |
| WCAG 1.4.13 Hoverable | ✅ Enabled | — | — | — | — |

---

## Missing Tests / Docs
- ✅ Unit test: Escape key dismisses open tooltip in `tests/smoke/layout.test.tsx`.
- ✅ Unit test: Tooltip content does not have `pointer-events-none` and allows pointer hover.
- ✅ Unit test: `role="tooltip"` and `aria-describedby` linkage.
