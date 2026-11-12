# ContextMenu — Audit Report

## Score: 9.5 / 10 — Accessible Keyboard Traversal & Functional Submenus
**Status: Fixed**

---

## What's Good
- Uses React Context to coordinate trigger coordinates (`clientX`, `clientY`) and open state.
- Supports both controlled and uncontrolled open state via `useControllableState`.
- Renders through `Portal` at root level, escaping z-index stacking contexts.
- Click-outside dismiss via `useClickOutside` and Escape key listener on `window`.
- Semantic ARIA roles present: `role="menu"`, `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"`, `role="group"`.
- Keyboard arrow navigation: `ArrowDown`/`ArrowUp`/`Home`/`End` roving through active items with auto-focus on open ✅
- Keyboard activation: `Enter` and `Space` keys activate items and trigger callbacks ✅
- Functional nested submenus via `ContextMenuSubContext`: hover open/close, `ArrowRight` to open, `ArrowLeft`/`Escape` to close ✅
- Keyboard trigger support: `Shift+F10` and `ContextMenu` / Apps key opens context menu on the focused trigger element ✅
- Viewport boundary collision clamping: menu coordinates clamped within window bounds ✅
- Ref cleanup: eliminated unsafe `ref as any` cast on trigger ✅
- Token alignment is strong: `bg-popover`, `text-popover-foreground`, `border-border`, `hover:bg-accent`, `hover:text-accent-foreground`.

---

## Issues & Resolutions

| ID | Severity | Category | File:Line | Problem | Status | Resolution |
|----|----------|----------|-----------|---------|--------|------------|
| CM-01 | Critical | A11y | context-menu.tsx | No keyboard arrow navigation and no auto-focus when menu opens | Fixed | Implemented auto-focus on first active menu item on open, and full ArrowDown/ArrowUp/Home/End keyboard navigation loop |
| CM-02 | Critical | A11y | context-menu.tsx | Items do not handle Enter/Space keys and lack tabIndex | Fixed | Added `tabIndex={disabled ? -1 : 0}`, `onKeyDown` handlers for Enter/Space to invoke action and close menu |
| CM-03 | Critical | API / Layout | context-menu.tsx | Submenus are non-functional skeletons | Fixed | Implemented `ContextMenuSubContext` with nested open state, hover delay, and ArrowRight/ArrowLeft keyboard traversal |
| CM-04 | Major | Layout | context-menu.tsx | Menu coordinates use raw clientX/clientY without viewport clamping | Fixed | Clamped `coords.x` and `coords.y` against viewport bounds (`window.innerWidth` / `window.innerHeight`) |
| CM-05 | Major | A11y | context-menu.tsx | Trigger only listens to mouse right-click; no keyboard trigger | Fixed | Added `onKeyDown` handler on `ContextMenuTrigger` supporting `Shift+F10` and `ContextMenu` / Apps key |
| CM-06 | Minor | API | context-menu.tsx | ContextMenuPortal dummy wrapper | Fixed | Updated `ContextMenuPortal` to wrap `<Portal>` primitive |
| CM-07 | Minor | States | context-menu.tsx | Disabled items omitted aria-disabled in standard format | Fixed | Added explicit `aria-disabled={disabled ? true : undefined}` on all menu item types |
| CM-08 | Nit | TypeScript | context-menu.tsx | Unsafe `ref as any` cast in trigger | Fixed | Properly typed merged ref for Slot/div without `as any` |

---

## State / Variant Matrix

| State / Variant | Mouse Right-Click | Keyboard Trigger | Arrow Navigation | Escape Close | Viewport Boundary | Submenus |
|---|---|---|---|---|---|---|
| Uncontrolled | ✅ Opens at cursor | ✅ Shift+F10 / Apps | ✅ ArrowDown/Up + Home/End | ✅ | ✅ Clamped | ✅ Functional |
| Controlled | ✅ | ✅ Shift+F10 / Apps | ✅ ArrowDown/Up + Home/End | ✅ | ✅ Clamped | ✅ Functional |
| CheckboxItem | ✅ Checked state | ✅ Enter / Space | ✅ | ✅ | ✅ | — |
| RadioItem | ✅ Radio dot | ✅ Enter / Space | ✅ | ✅ | ✅ | — |
| Disabled Items | ✅ Blocked pointer | ✅ Skipped in nav | ✅ | ✅ | ✅ | — |
