# Command — Audit Report

## Score: 5.5 / 10 — UI scaffolding only; missing palette engine & arrow navigation

---

## What's Good
- Clean compound component architecture: `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`, `CommandDialog`.
- Convenient `CommandDialog` wrapper embedding `Command` inside a headless `Dialog` overlay.
- Individual `CommandItem` components handle Enter/Space activation and `onSelect` callback.
- Visual tokens align well: `bg-popover`, `text-popover-foreground`, `border-border/80`, `text-muted-foreground`, `hover:bg-accent`, `hover:text-accent-foreground`.
- Shortcut display badge (`CommandShortcut`) with monospace tracking styling.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| CMD-01 | Critical | A11y / Feature | command.tsx:44–95 | No arrow key navigation (`ArrowDown`/`ArrowUp`) from `CommandInput` to items | Command palettes must allow typing and immediate arrow navigation without having to Tab out of the input field | Implement keyboard context in `Command` tracking active item index; handle ArrowUp/ArrowDown in `CommandInput` |
| CMD-02 | Critical | A11y | command.tsx:83–166 | Complete lack of ARIA roles (`role="combobox"`, `role="listbox"`, `role="option"`, `aria-activedescendant`) | Screen readers cannot understand the command palette structure or identify which item is highlighted | Add `role="listbox"` to `CommandList`, `role="option"` and `aria-selected` to `CommandItem`, and `role="combobox"` / `aria-expanded` to the input container |
| CMD-03 | Major | A11y | command.tsx:160 | Each `CommandItem` has `tabIndex={0}` | Forces keyboard users to Tab through dozens of commands one by one instead of using a single tab stop with arrow navigation | Set `tabIndex={-1}` and use virtual focus (`aria-activedescendant`) or roving tabindex |
| CMD-04 | Major | Feature | command.tsx:97–109 | `CommandEmpty` is completely passive without automatic filtering or conditional rendering | If no items match, `CommandEmpty` must be manually wired by the consumer; otherwise it is either always visible or never visible | Add internal filtering state or export a hook `useCommandState` to toggle empty state automatically |
| CMD-05 | Minor | Layout | command.tsx:87 | Hardcoded max height `max-h-[300px]` in `CommandList` | Limits custom layouts and can cause double scrollbars in small modals | Allow `maxHeight` prop or pass `max-h-none` via `className` |
| CMD-06 | Nit | TypeScript | command.tsx:213–220 | Subcomponents attached via `;(Command as any).Input = CommandInput` | `as any` monkey-patching circumvents typed compound component definitions | Use TypeScript namespace or interface intersection `React.ForwardRefExoticComponent & { Input: ... }` |

---

## State / Variant Matrix

| Subcomponent | Renders | Keyboard Arrows | Enter / Space Activate | ARIA Semantics | Compound Export |
|---|---|---|---|---|---|
| Command | ✅ | ❌ None | — | ❌ None | ✅ |
| CommandInput | ✅ | ❌ Arrow keys ignored | — | ❌ Standard input | ✅ `Command.Input` |
| CommandList | ✅ | — | — | ❌ Missing `listbox` | ✅ `Command.List` |
| CommandItem | ✅ | ❌ Only via Tab | ✅ `onSelect` | ❌ Missing `option` | ✅ `Command.Item` |
| CommandEmpty | ✅ | — | — | ❌ Missing `status` | ✅ `Command.Empty` |
| CommandDialog | ✅ | — | — | ✅ Uses Dialog | ✅ `Command.Dialog` |

---

## Missing Tests / Docs
- Unit test: ArrowDown and ArrowUp navigate between `CommandItem` elements.
- Unit test: Enter key in `CommandInput` executes the currently highlighted `CommandItem`.
- Unit test: `CommandEmpty` displays when search filter finds no matching items.
- Unit test: `CommandDialog` opens and closes with focus placed in search input.
- Docs: Clarify whether filtering is built-in or consumer-driven.
