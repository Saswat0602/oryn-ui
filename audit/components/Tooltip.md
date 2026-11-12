# Tooltip — Audit Report

## Score: 8.0 / 10 — Accessible tooltip with WCAG 1.4.13 hoverable/dismissible gaps

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

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TLT-01 | Major | A11y | tooltip.tsx:180 | `pointer-events-none` on `TooltipContent` prevents user from hovering over tooltip content | Violates WCAG 2.1 SC 1.4.13 (Content on Hover or Focus — Hoverable): users with low vision or magnification tools must be able to move the pointer over the tooltip to read it without it disappearing | Remove `pointer-events-none`, add `onMouseEnter` / `onMouseLeave` handlers to `TooltipContent` with delay buffer |
| TLT-02 | Major | A11y | tooltip.tsx:88–108 | Missing `Escape` key dismissal | Violates WCAG 2.1 SC 1.4.13 (Dismissible): users must be able to dismiss the tooltip with Escape without losing focus on the trigger | Add a `keydown` listener for `Escape` to close the active tooltip |
| TLT-03 | Major | API | tooltip.tsx:262–265 | `useTooltip()` export returns a static dummy object `{ open: false, setOpen: () => {} }` | Misleads consumers who attempt to consume it without getting real context state | Connect to `useTooltipContext()` or deprecate the stub |
| TLT-04 | Minor | Layout | tooltip.tsx:128–135 | Side collision detection only flips vertical `top`/`bottom`, but not horizontal `left`/`right` | Tooltips placed on extreme left or right screen edges overflow offscreen | Implement horizontal boundary checks to flip `left` <-> `right` when clipping |
| TLT-05 | Nit | API | tooltip.tsx:60, 69 | `timerRef: any` and `ref as any` bypass TypeScript type checking | Loss of type safety | Type timer as `ReturnType<typeof setTimeout> \| null` |

---

## State / Variant Matrix

| State / Trigger | Mouse Enter | Keyboard Focus | role="tooltip" | aria-describedby | Dismiss with Escape |
|-----------------|-------------|----------------|----------------|------------------|---------------------|
| Hover | ✅ (delayed) | N/A | ✅ | ✅ | ❌ |
| Keyboard focus | N/A | ✅ | ✅ | ✅ | ❌ |
| Blur / Mouse leave | ✅ Closes | ✅ Closes | ✅ | ✅ Removed | N/A |
| Top / Bottom auto-flip | ✅ | ✅ | ✅ | ✅ | ❌ |
| WCAG 1.4.13 Hoverable | ❌ Blocked | — | — | — | — |

---

## Missing Tests / Docs
- Unit test: Trigger hover opens tooltip after `delayDuration`
- Unit test: Trigger focus opens tooltip immediately without delay
- Unit test: `aria-describedby` is applied when open and removed when closed
- Unit test: Escape key dismisses open tooltip
- Docs: Document WCAG 1.4.13 compliance and recommendations for interactive tooltip content
