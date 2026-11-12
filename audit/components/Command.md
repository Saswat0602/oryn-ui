# Command — Audit Report

## Score: 9.5 / 10 — Status: Fixed (Full Command Palette Engine, Keyboard Traversal & WAI-ARIA)

---

## What's Good
- Clean compound component architecture: `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`, `CommandDialog`.
- Convenient `CommandDialog` wrapper embedding `Command` inside a headless `Dialog` overlay.
- Full roving keyboard arrow navigation (`ArrowDown`/`ArrowUp`) from `CommandInput` into items, with automatic scrolling into view.
- Enter key in `CommandInput` executes the currently highlighted `CommandItem`.
- Full WAI-ARIA combobox/listbox compliance: `role="combobox"`, `role="listbox"`, `role="option"`, `role="group"`, `role="status"`, `aria-activedescendant`, and `aria-selected`.
- Single tab-stop behavior: items use `tabIndex={-1}` with virtual focus, eliminating the need to tab through items.
- Strongly-typed `CommandComponent` compound export without monkey-patching.
- Visual tokens align well: `bg-popover`, `text-popover-foreground`, `border-border/80`, `text-muted-foreground`, `hover:bg-accent`, `hover:text-accent-foreground`.

---

## Remediated Issues

| ID | Severity | Category | File:Line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| CMD-01 | Critical | A11y / Feature | command.tsx:44–95 | No arrow key navigation from CommandInput to items | Fixed |
| CMD-02 | Critical | A11y | command.tsx:83–166 | Complete lack of ARIA roles (combobox, listbox, option, aria-activedescendant) | Fixed |
| CMD-03 | Major | A11y | command.tsx:160 | Each CommandItem had tabIndex={0} (tab stop spam) | Fixed |
| CMD-04 | Major | Feature | command.tsx:97–109 | CommandEmpty lacked aria-live / role="status" announcements | Fixed |
| CMD-06 | Nit | TypeScript | command.tsx:213–220 | Monkey-patching compound components | Fixed |

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
