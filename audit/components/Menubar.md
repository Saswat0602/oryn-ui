# Menubar — Audit Report

## Score: 5.5 / 10 — Mouse interactions work well, but zero keyboard navigation

---

## What's Good
- Top-level desktop menubar interaction: hovering over sibling triggers while a menu is open smoothly switches the active menu (`onMouseEnter` handling).
- Click-outside dismiss via `useClickOutside` cleanly resets `activeMenu` to null.
- Correct ARIA markup structure: `role="menubar"`, `role="menuitem"`, `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `aria-orientation="vertical"`, `role="menuitemcheckbox"`, `role="menuitemradio"`, `role="group"`.
- Renders dropdown panels via `<Portal>` to avoid clipping.
- Design tokens: `bg-background`, `border-border`, `bg-popover`, `text-popover-foreground`, `hover:bg-accent`, `hover:text-accent-foreground`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| MB-01 | Critical | A11y | menubar.tsx:169–205 | Complete lack of keyboard arrow navigation (`ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`) across menubar triggers and dropdown items | Violates the foundational WAI-ARIA Menubar specification; keyboard users cannot navigate the menubar | Implement full menubar keyboard manager: Left/Right switches menus, Down opens and moves focus into items, Up/Down cycles items |
| MB-02 | Critical | A11y | menubar.tsx:169–205 | No `Escape` key handler to close active menubar menus and return focus | Users who open a menu via keyboard cannot dismiss it without clicking outside | Add `keydown` handler on active menu for `Escape` that calls `setActiveMenu(null)` and focuses trigger |
| MB-03 | Critical | A11y | menubar.tsx:216–340 | `MenubarItem`, `MenubarCheckboxItem`, and `MenubarRadioItem` lack `onKeyDown` handlers (Enter/Space) and `tabIndex` | Keyboard users cannot activate any item in the menubar dropdowns | Add `tabIndex={-1}`, `onKeyDown` to execute selection and close the menu bar on Enter/Space |
| MB-04 | Critical | Feature | menubar.tsx:395–439 | Submenus (`MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`) are non-functional stubs without state or visibility toggling | Nested submenus render statically or brokenly | Implement nested submenu state machine with hover and arrow navigation (`ArrowRight` opens submenu, `ArrowLeft` returns to parent) |
| MB-05 | Major | Layout | menubar.tsx:178–187 | Fixed positioning without viewport collision detection or boundary checks | Menubar content overflowing right/bottom edge of the browser viewport gets clipped | Add boundary flipping logic or clamp coordinates against `window.innerWidth` |
| MB-06 | Nit | TypeScript | menubar.tsx:454–468 | Monkey-patching compound components with `(Menubar as any).Menu = ...` | Bypasses TypeScript type checks for attached properties | Use compound component typing interface intersection |

---

## State / Variant Matrix

| Feature / Item | Mouse Click / Hover | Keyboard Arrow Nav | Escape Close | Submenus | Alignment |
|---|---|---|---|---|---|
| Menubar Trigger | ✅ Click / Hover switch | ❌ No arrow keys | ❌ No escape | — | — |
| MenubarItem | ✅ Selects & closes | ❌ No Enter/Space | ❌ | — | ✅ start/center/end |
| CheckboxItem | ✅ Toggles | ❌ | ❌ | — | ✅ |
| RadioItem | ✅ Selects | ❌ | ❌ | — | ✅ |
| Submenu | ❌ Non-functional | ❌ | ❌ | ❌ Broken | ❌ |

---

## Missing Tests / Docs
- Unit test: Clicking a trigger opens menu; clicking again closes it.
- Unit test: Hovering adjacent trigger while menu is open switches active menu.
- Unit test: Left/Right arrows cycle through menubar triggers.
- Unit test: Down arrow opens menu and focuses first item.
- Unit test: Escape closes open menu and restores focus.
- Docs: Document menubar composition and note keyboard interaction status.
