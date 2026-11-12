# Toggle & ToggleGroup — Audit Report

## Score: 8.5 / 10 — Very good implementation, TypeScript `any` & roving tabindex gaps

---

## What's Good
- Fully adheres to ARIA Toggle Button pattern: `type="button"`, `aria-pressed={pressed}`, `data-state={pressed ? "on" : "off"}`.
- Both standalone `Toggle` and compound `ToggleGroup` + `ToggleGroupItem` implemented cleanly.
- `ToggleGroup` supports both `single` and `multiple` selection modes.
- Context inheritance: `size`, `variant`, and `disabled` propagate from `ToggleGroup` down to individual `ToggleGroupItem` components.
- Keyboard accessible: native button focusability with visible ring (`focus-visible:ring-2 focus-visible:ring-ring`).
- Respects `useControllableState` for both controlled and uncontrolled usage.
- Token compliance: `hover:bg-muted`, `text-muted-foreground`, `hover:text-foreground`, `data-[state=on]:bg-accent`, `data-[state=on]:text-accent-foreground`, `border-input`, `border-border`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TG-01 | Major | TypeScript | toggle.tsx:78–93 | `ToggleGroupProps` and context use `any` for `value`, `defaultValue`, and `onValueChange` | Violates strict zero-any TypeScript rule; consumers lose type inference when passing arrays vs strings | Use discriminated unions or generics: `ToggleGroupSingleProps<T>` (`value?: T`) and `ToggleGroupMultipleProps<T>` (`value?: T[]`) |
| TG-02 | Minor | A11y | toggle.tsx:145–155 | `ToggleGroup` lacks roving tabindex or arrow key navigation between group items | Users must Tab through every item in a large toggle group rather than using Arrow keys, which is recommended by WAI-ARIA Toolbar pattern | Integrate `useRovingTabIndex` to enable Left/Right arrow navigation across items |
| TG-03 | Minor | Layout | toggle.tsx:37–40, 180–184 | Size presets only define rectangular buttons with horizontal padding (`px-2.5`, `px-3`), no dedicated square `icon` size | Formatting toolbars (Bold, Italic, Strikethrough) look awkwardly stretched without custom `w-9 p-0` overrides | Add an `icon` or square size option (`w-8 h-8 p-0`, `w-9 h-9 p-0`) |
| TG-04 | Nit | States | toggle.tsx:129–131 | Single mode toggle cannot be made mandatory (un-toggling a selected item always clears it to `""`) | In some UI designs (e.g. view switchers Grid/List), at least one option must always remain active | Add an optional `mandatory?: boolean` or `allowDeselect?: boolean` prop (default `true`) |

---

## State / Variant Matrix

| Variant / State | Unpressed (`aria-pressed="false"`) | Pressed (`aria-pressed="true"`) | Disabled | Keyboard (Space/Enter) |
|---|---|---|---|---|
| Default | ✅ Transparent / muted hover | ✅ `bg-accent text-accent-foreground` | ✅ `opacity-50 pointer-events-none` | ✅ Toggles |
| Outline | ✅ `border-input` | ✅ `border-input bg-accent` | ✅ | ✅ Toggles |
| Group (Single) | ✅ | ✅ Single active item | ✅ Blocks all items if group disabled | ✅ |
| Group (Multiple)| ✅ | ✅ Multiple items active | ✅ | ✅ |

---

## Missing Tests / Docs
- Unit test: Standalone Toggle toggles `aria-pressed` on Space/Enter and click.
- Unit test: ToggleGroup in single mode deselects on second click.
- Unit test: ToggleGroup in multiple mode adds/removes items from array.
- Unit test: Disabled ToggleGroup prevents clicking items.
- Docs: Document `type="single" | "multiple"` and provide example with rich text toolbar icons.
