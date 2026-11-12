# Popover — Audit Report

## Score: 7.5 / 10 — Flexible positioning with focus management gaps

---

## What's Good
- Flexible compound API pattern (`Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`, `PopoverClose`).
- Supports both declarative trigger prop (`trigger={<Button />}`) and compound `<PopoverTrigger asChild>`.
- Full controlled and uncontrolled state management with `useControllableState`.
- Renders through `Portal` at high z-index (`z-[70]`) with subtle entrance animations (`animate-in fade-in-0 zoom-in-95`).
- Outside click dismissal with `useClickOutside` and `Escape` key dismissal.
- Clean trigger coordinate measurement using `getBoundingClientRect()` for anchor positioning.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| POP-01 | Major | A11y | popover.tsx:220–239 | Focus is neither shifted into `PopoverContent` on open, nor trapped, nor restored to trigger on close | Keyboard users trigger the popover but focus stays on the trigger button; pressing Tab tabs past the popover to other page elements | Move initial focus to first focusable element inside popover on open, and restore focus to `triggerRef` when closed |
| POP-02 | Major | A11y | popover.tsx:73–75 | `PopoverTrigger` has `aria-haspopup="dialog"` and `aria-expanded`, but lacks `aria-controls` linked to popover ID | Assistive technologies cannot establish a direct programmatic link between trigger and overlay | Generate an ID on `PopoverContent` and pass it to trigger's `aria-controls` attribute |
| POP-03 | Major | API | popover.tsx:301–304 | Standalone `usePopover()` export returns a static dummy object `{ open: false, setOpen: () => {} }` | Misleads developers who attempt to consume it outside `<Popover>` without getting context state | Connect `usePopover()` to `usePopoverContext()` or deprecate the empty stub |
| POP-04 | Minor | Layout | popover.tsx:176–217 | Inline fixed coordinate calculation lacks collision boundary flipping/clamping | Popovers placed near viewport edges clip outside the screen on mobile devices or small viewports | Add viewport collision checks (flipping side if offset < 0 or > window dimensions) |
| POP-05 | Nit | API | popover.tsx:37, 53 | `[key: string]: any` and `any` casts in ref assignments | Reduces TypeScript type safety | Remove index signature and type refs as `React.MutableRefObject<HTMLElement | null>` |

---

## State / Variant Matrix

| State / Placement | Trigger aria-expanded | Outside Click Dismiss | Escape Key | Focus Moved In | Focus Restored |
|-------------------|----------------------|-----------------------|------------|----------------|----------------|
| bottom (default) | ✅ | ✅ | ✅ | ❌ Stays on trigger | ❌ |
| top | ✅ | ✅ | ✅ | ❌ | ❌ |
| left / right | ✅ | ✅ | ✅ | ❌ | ❌ |
| Controlled open | ✅ | ✅ | ✅ | ❌ | ❌ |
| `asChild` trigger | ✅ | ✅ | ✅ | ❌ | ❌ |

---

## Missing Tests / Docs
- Unit test: Trigger click toggles popover open/closed
- Unit test: Escape key dismisses popover and fires `onOpenChange(false)`
- Unit test: Outside click closes popover unless clicking inside trigger
- Unit test: PopoverContent position styles calculate correct top/left from trigger rect
- Docs: Provide clear examples for forms inside popovers and focus trapping
