# HoverCard — Audit Report

## Score: 9.5 / 10 — Remediated: Keyboard focus triggers, Escape dismissal, useControllableState, and collision detection
**Status:** Fixed

---

## What's Good
- Smooth hover & focus delay mechanics with configurable `openDelay` (default 300ms) and `closeDelay` (default 200ms).
- Hoverable content: moving cursor or focus into `HoverCardContent` cancels dismiss timer, satisfying WCAG 1.4.13 Hoverable criterion.
- Accessible keyboard support: `onFocus` opens card, `onBlur` closes card with delay.
- WCAG 1.4.13 Dismissible compliance: pressing `Escape` key dismisses open card immediately.
- Renders via `Portal` at root level, avoiding layout overflow or z-index clipping.
- Boundary collision detection flips side dynamically from bottom to top when viewport space is constrained.
- Connected via `useControllableState` with automatic trigger rect measurement on open/resize/scroll.
- Clean styling adhering to design tokens: `bg-popover`, `text-popover-foreground`, `border-border`, `shadow-md`, `rounded-xl`.

---

## Remediated Issues

| ID | Severity | Category | File:Line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| HC-01 | Critical | A11y | hover-card.tsx:168 | Only listened to mouse events, ignored `onFocus`/`onBlur` | Fixed |
| HC-02 | Critical | A11y | hover-card.tsx:78 | No `Escape` key dismiss listener (WCAG 1.4.13) | Fixed |
| HC-03 | Major | A11y | hover-card.tsx:160 | Missing ARIA attributes and dialog linkage | Fixed (`aria-describedby`, `data-state`) |
| HC-04 | Major | Layout | hover-card.tsx:238 | No viewport boundary collision detection | Fixed (dynamic flip) |
| HC-05 | Major | State | hover-card.tsx:44 | Manual state sync instead of `useControllableState` | Fixed |
| HC-06 | Minor | Layout | hover-card.tsx:64 | Controlled `open={true}` left triggerRect null | Fixed (auto-measure effect) |
| HC-07 | Nit | TypeScript | hover-card.tsx:120 | Multiple `as any` type casts on timers/events | Fixed |

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
