# ContextMenu — Audit Report

## Score: 5.5 / 10 — Significant A11y & Submenu deficiencies

---

## What's Good
- Uses React Context to coordinate trigger coordinates (`clientX`, `clientY`) and open state.
- Supports both controlled and uncontrolled open state via `useControllableState`.
- Renders through `Portal` at root level, escaping z-index stacking contexts.
- Click-outside dismiss via `useClickOutside` and Escape key listener on `window`.
- Semantic ARIA roles present: `role="menu"`, `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"`, `role="group"`.
- Token alignment is strong: `bg-popover`, `text-popover-foreground`, `border-border`, `hover:bg-accent`, `hover:text-accent-foreground`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| CM-01 | Critical | A11y | context-menu.tsx:117–126 | No keyboard arrow navigation (Up/Down/Home/End) and no auto-focus when menu opens | A context menu is completely unusable for screen reader and keyboard-only users | Add keyboard navigation loop (ArrowDown, ArrowUp, Home, End) and auto-focus the first active item on open, similar to `DropdownMenu` |
| CM-02 | Critical | A11y | context-menu.tsx:182–200 | `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem` do not handle Enter/Space keys and lack `tabIndex` | Keyboard users cannot activate menu items | Add `tabIndex={disabled ? undefined : -1}`, `onKeyDown` handler for Enter/Space to invoke `onSelect` and close menu |
| CM-03 | Critical | API / Layout | context-menu.tsx:342–386 | Submenus (`ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent`) are completely non-functional skeletons with no open/close state or hover/click logic | Rendering submenus renders them permanently or brokenly; cannot be interacted with | Implement `ContextMenuSubContext` with nested open state, hover delays, and positioning coordinates |
| CM-04 | Major | Layout | context-menu.tsx:140–146 | Menu coordinates use raw `clientX`/`clientY` with zero viewport boundary clamping or collision detection | If user right-clicks near screen bottom/right, the menu overflows off-screen and is clipped/unreachable | Clamp coordinates against `window.innerWidth - menuWidth` and `window.innerHeight - menuHeight` |
| CM-05 | Major | A11y | context-menu.tsx:66–73 | Trigger only listens to mouse `onContextMenu`; no keyboard trigger (Shift+F10 or Menu/Apps key) | Keyboard users cannot open context menus on targeted elements | Handle `onKeyDown` on trigger for Shift+F10 / Apps key, centering coordinates on the trigger element |
| CM-06 | Minor | API | context-menu.tsx:88–94 | `ContextMenuPortal` is a dummy `<>{children}</>` component because `ContextMenuContent` hardcodes its own `<Portal>` call internally | Misleads developers into thinking `ContextMenuPortal` controls DOM portal behavior | Either remove `ContextMenuPortal` or have it wrap `<Portal>` and remove the inner Portal in Content |
| CM-07 | Minor | States | context-menu.tsx:194 | Disabled items use `pointer-events-none opacity-50` but omit `aria-disabled="true"` on checkbox/radio in standard format | Inconsistent disabled state announcements | Ensure `aria-disabled={disabled}` is paired with disabled cursor styles |
| CM-08 | Nit | TypeScript | context-menu.tsx:77 | `ref={ref as any}` in ContextMenuTrigger bypasses type checking | Type safety debt | Properly type merged ref for `Slot` |

---

## State / Variant Matrix

| State / Variant | Mouse Right-Click | Keyboard Trigger | Arrow Navigation | Escape Close | Viewport Boundary | Submenus |
|---|---|---|---|---|---|---|
| Uncontrolled | ✅ Opens at cursor | ❌ Fails | ❌ None | ✅ | ❌ Overflow bug | ❌ Broken |
| Controlled | ✅ | ❌ Fails | ❌ None | ✅ | ❌ Overflow bug | ❌ Broken |
| CheckboxItem | ✅ Checked state | ❌ No Enter/Space | ❌ | ✅ | ❌ | — |
| RadioItem | ✅ Radio dot | ❌ No Enter/Space | ❌ | ✅ | ❌ | — |
| Disabled Items | ✅ Blocked pointer | ❌ | ❌ | ✅ | ❌ | — |

---

## Missing Tests / Docs
- Unit test: Context menu opens at exact cursor position `(e.clientX, e.clientY)`.
- Unit test: Keyboard Shift+F10 opens menu.
- Unit test: Arrow keys navigate between menu items.
- Unit test: Enter/Space selects focused item.
- Unit test: Viewport collision clamping (near right/bottom edge).
- Docs: Document submenus as incomplete or implement them properly.
