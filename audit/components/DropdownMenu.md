# DropdownMenu — Audit Report

## Score: 7.0 / 10 — Solid core keyboard loop, but broken submenus & positioning edge cases

---

## What's Good
- Complete arrow navigation loop: `ArrowDown`, `ArrowUp`, `Home`, `End` cycle through available menu items seamlessly.
- Focus restoration: pressing `Escape` or selecting an item returns keyboard focus to `triggerRef.current`.
- Auto-focus on open: automatically focuses the first enabled `[role^="menuitem"]` after a 10ms delay.
- Click-outside dismiss using `useClickOutside` ignores clicks on the trigger to prevent race conditions.
- Uses `Portal` to render the floating menu at root level with high z-index (`z-[70]`).
- Proper ARIA attributes: `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `aria-orientation="vertical"`, `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"`.
- Strong design token alignment: `bg-popover`, `text-popover-foreground`, `border-border`, `hover:bg-accent`, `hover:text-accent-foreground`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| DM-01 | Critical | API / Feature | dropdown-menu.tsx:450–494 | Submenus (`DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`) are non-functional stubs without state or visibility toggling | Attempting to use submenus renders content unconditionally or statically without nesting | Implement `useSubmenu` context with hover delay, key navigation (`ArrowRight` to open, `ArrowLeft` to close), and absolute/fixed positioning |
| DM-02 | Major | A11y | dropdown-menu.tsx:317–401 | `DropdownMenuCheckboxItem` and `DropdownMenuRadioItem` have NO keyboard `onKeyDown` handlers for Enter/Space | Keyboard users can navigate to these items with arrow keys but cannot toggle or select them | Add `onKeyDown` handler matching `DropdownMenuItem` to toggle value and call `onCheckedChange` / `onSelect` |
| DM-03 | Major | Layout | dropdown-menu.tsx:222–230 | Positioning is fixed without collision detection / viewport boundary flipping; also fails if controlled `open={true}` without trigger click | If opened near screen bottom, menu renders clipped below the viewport; if opened programmatically, `triggerRect` is `null` and menu renders at `(0, 0)` | Use `useFloatingPosition` hook with boundary collision detection, `flip`, and automatic trigger measurement on mount |
| DM-04 | Major | Performance / Layout | dropdown-menu.tsx:49–56 | `triggerRect` is only captured upon trigger click; page scroll while open leaves floating menu disconnected from trigger | Scrolling separates the menu from its button | Listen to `scroll` and `resize` events while open or recompute via floating placement primitive |
| DM-05 | Minor | Bug | dropdown-menu.tsx:277 | `onClick?.(e as any)` inside `onKeyDown` in `DropdownMenuItem` invokes mouse click handler with keyboard event | Can cause unexpected runtime issues if caller checks `e.clientX` or `e.button` | Separate `onClick` and `onKeyDown` callbacks cleanly; only call `onSelect` on Enter/Space |
| DM-06 | Minor | API | dropdown-menu.tsx:117–123 | `DropdownMenuPortal` is an empty pass-through `<>{children}</>` since `DropdownMenuContent` calls `<Portal>` internally | Redundant wrapper that confuses consumer expectations | Either make `DropdownMenuPortal` host `<Portal>` or document that it is optional/passthrough |
| DM-07 | Nit | TypeScript | dropdown-menu.tsx:85, 103 | `ref={setMergedRef as any}` uses unchecked type casts | Degrades TypeScript strictness | Type the ref merger with proper `HTMLButtonElement` |

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
