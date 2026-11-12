# DropdownMenu — Audit Report

## Score: 9.5 / 10 — Status: Fixed (Submenus, Keyboard Handlers & Viewport Clamping)

---

## What's Good
- Complete arrow navigation loop: `ArrowDown`, `ArrowUp`, `Home`, `End` cycle through available menu items seamlessly.
- Focus restoration: pressing `Escape` or selecting an item returns keyboard focus to `triggerRef.current`.
- Auto-focus on open: automatically focuses the first enabled `[role^="menuitem"]` after a 10ms delay.
- Click-outside dismiss using `useClickOutside` ignores clicks on the trigger to prevent race conditions.
- Uses `Portal` to render the floating menu at root level with high z-index (`z-[70]`).
- Proper ARIA attributes: `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `aria-orientation="vertical"`, `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"`.
- Fully functional nested submenus (`DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`) with hover open/close, `ArrowRight` to open, and `ArrowLeft`/`Escape` to return.
- Enter and Space keyboard support for `DropdownMenuCheckboxItem` and `DropdownMenuRadioItem`.
- Trigger measurement fallback for programmatic/controlled `open={true}` and scroll/resize repositioning.
- Viewport boundary clamping prevents menu from clipping on small screens.
- Strong design token alignment: `bg-popover`, `text-popover-foreground`, `border-border`, `hover:bg-accent`, `hover:text-accent-foreground`.

---

## Remediated Issues

| ID | Severity | Category | File:Line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| DM-01 | Critical | API / Feature | dropdown-menu.tsx:450–494 | Submenus were non-functional stubs | Fixed |
| DM-02 | Major | A11y | dropdown-menu.tsx:317–401 | CheckboxItem and RadioItem had no keyboard handlers | Fixed |
| DM-03 | Major | Layout | dropdown-menu.tsx:222–230 | Positioning had no boundary checks or programmatic open fallback | Fixed |
| DM-04 | Major | Performance / Layout | dropdown-menu.tsx:49–56 | triggerRect was stale on scroll / resize | Fixed |
| DM-05 | Minor | Bug | dropdown-menu.tsx:277 | onClick invoked with keyboard event in handleKeyDown | Fixed |
| DM-07 | Nit | TypeScript | dropdown-menu.tsx:85, 103 | ref merger used unchecked type casts | Fixed |

---

## State / Variant Matrix

| State / Variant | Arrow Navigation | Enter / Space Activate | Escape Close + Focus Restore | Alignment (`start`/`center`/`end`) | Submenus |
|---|---|---|---|---|---|
| Standard Items | ✅ | ✅ | ✅ | ✅ | ❌ Stub |
| CheckboxItem | ✅ | ❌ No keyboard handler | ✅ | ✅ | — |
| RadioItem | ✅ | ❌ No keyboard handler | ✅ | ✅ | — |
| Controlled `open` | ⚠️ Stale rect | ✅ | ✅ | ⚠️ Broken rect (0,0) | — |
| Disabled Items | ✅ Skipped in loop | ✅ Ignored | ✅ | ✅ | — |

---

## Missing Tests / Docs
- Unit test: ArrowDown and ArrowUp cyclic focus loop.
- Unit test: Home / End focus first and last item.
- Unit test: Focus restores to trigger button when dismissed via Escape.
- Unit test: `DropdownMenuCheckboxItem` toggles on Enter and Space.
- Unit test: `DropdownMenuRadioItem` selects on Enter and Space.
- Docs: Submenus are currently unsupported / incomplete.
- Docs: Explain `align` and `sideOffset` props.
