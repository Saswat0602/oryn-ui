# HoverCard — Audit Report

## Score: 6.0 / 10 — Critical Keyboard & WCAG 1.4.13 failures

---

## What's Good
- Smooth hover delay mechanics with configurable `openDelay` (default 300ms) and `closeDelay` (default 200ms).
- Hoverable content: moving the cursor from trigger into `HoverCardContent` cancels dismiss timer, satisfying WCAG 1.4.13 Hoverable criterion.
- Renders via `Portal` at root level, avoiding layout overflow or z-index clipping.
- Alignment options: supports `align="start" | "center" | "end"` and `side="top" | "bottom"`.
- Clean styling adhering to design tokens: `bg-popover`, `text-popover-foreground`, `border-border`, `shadow-md`, `rounded-xl`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| HC-01 | Critical | A11y | hover-card.tsx:124–137 | `HoverCardTrigger` only listens to mouse events (`onMouseEnter`, `onMouseLeave`); completely ignores keyboard `onFocus` and `onBlur` | Keyboard users cannot trigger or view the hover card when tabbing through interactive links | Add `onFocus` (opens with delay) and `onBlur` (closes with delay) to `HoverCardTrigger` |
| HC-02 | Critical | A11y | hover-card.tsx:163–225 | No `Escape` key handler to dismiss the card while focused | Violates WCAG 2.1 Success Criterion 1.4.13 (Dismissible content on hover/focus) | Add global `keydown` listener when open to dismiss on `Escape` key |
| HC-03 | Major | A11y | hover-card.tsx:90–140 | Missing ARIA attributes on trigger and content (`aria-expanded`, `aria-haspopup`, or relationship) | Assistive tech users are not alerted that interactive hover content exists | Add `aria-expanded={open}` and `aria-haspopup="dialog"` or link via `aria-describedby` |
| HC-04 | Major | Layout | hover-card.tsx:170–196 | No viewport collision detection (flip from bottom to top if near bottom boundary) | If trigger is at the bottom of the screen, the hover card renders below visible viewport | Implement boundary check to flip `side="bottom"` to `top` when insufficient screen space |
| HC-05 | Major | State | hover-card.tsx:45–58 | Manual state sync instead of `useControllableState` primitive | Inconsistent with the rest of the library's state management primitives; potential desync | Refactor to use `useControllableState` |
| HC-06 | Minor | Layout | hover-card.tsx:61–67 | `triggerRect` is only captured upon `handleEnter` via hover; programmatic `open={true}` leaves `triggerRect` null | In controlled mode, hover card renders at coordinate `(0, 0)` | Measure trigger bounding rect in `useEffect` when `open` changes |
| HC-07 | Nit | TypeScript | hover-card.tsx:93, 125 | Multiple `as any` type casts on `timerRef`, `forwardedRef`, and mouse event handlers | Violates strict TypeScript policy | Use `NodeJS.Timeout` or `number` for timer and type synthetic events properly |

---

## State / Variant Matrix

| State / Trigger | Mouse Hover | Keyboard Tab Focus | Escape Dismiss | Boundary Flip | Portal |
|---|---|---|---|---|---|
| Default Uncontrolled | ✅ Opens (300ms) | ❌ Inactive (Ignored) | ❌ Fails WCAG | ❌ Off-screen | ✅ |
| Controlled `open={true}` | ✅ | ❌ | ❌ | ❌ Position (0,0) | ✅ |
| Side="top" | ✅ | ❌ | ❌ | ❌ | ✅ |
| Side="bottom" | ✅ | ❌ | ❌ | ❌ | ✅ |
| Align="center" | ✅ | ❌ | ❌ | ❌ | ✅ |

---

## Missing Tests / Docs
- Unit test: Card opens when trigger receives focus via keyboard Tab.
- Unit test: Card closes when trigger loses focus via blur.
- Unit test: Pressing Escape dismisses the open hover card.
- Unit test: Hovering content prevents card dismissal.
- Docs: Explain `openDelay`, `closeDelay`, `align`, and `side` props.
- Docs: Document accessibility requirements for interactive vs non-interactive hover content.
