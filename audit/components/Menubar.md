# Menubar — Audit Report

## Score: 9.5 / 10 — Status: Fixed (Full WAI-ARIA Menubar Keyboard Management & Submenus)

---

## What's Good
- Top-level desktop menubar interaction: hovering over sibling triggers while a menu is open smoothly switches the active menu (`onMouseEnter` handling).
- Click-outside dismiss via `useClickOutside` cleanly resets `activeMenu` to null.
- Correct ARIA markup structure: `role="menubar"`, `role="menuitem"`, `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `aria-orientation="vertical"`, `role="menuitemcheckbox"`, `role="menuitemradio"`, `role="group"`.
- Renders dropdown panels via `<Portal>` to avoid clipping.
- Design tokens: `bg-background`, `border-border`, `bg-popover`, `text-popover-foreground`, `hover:bg-accent`, `hover:text-accent-foreground`.
- Full WAI-ARIA roving keyboard manager: Left/Right switches top-level menus, Down/Enter/Space opens and auto-focuses first item, Up/Down cycles items, Home/End jumps to ends.
- Escape closes the active menu and returns focus to the active trigger button.
- Fully functional submenus (`MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`) with hover open/close, `ArrowRight` to open, and `ArrowLeft`/`Escape` to close.
- Viewport boundary clamping prevents dropdown clipping on narrow viewports.

---

## Remediated Issues

| ID | Severity | Category | File:Line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| MB-01 | Critical | A11y | menubar.tsx:169–205 | Complete lack of keyboard arrow navigation across menubar triggers and dropdown items | Fixed |
| MB-02 | Critical | A11y | menubar.tsx:169–205 | No `Escape` key handler to close active menubar menus and return focus | Fixed |
| MB-03 | Critical | A11y | menubar.tsx:216–340 | `MenubarItem`, `MenubarCheckboxItem`, and `MenubarRadioItem` lack `onKeyDown` handlers and `tabIndex` | Fixed |
| MB-04 | Critical | Feature | menubar.tsx:395–439 | Submenus (`MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`) non-functional | Fixed |
| MB-05 | Major | Layout | menubar.tsx:178–187 | Fixed positioning without viewport collision detection | Fixed |
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
