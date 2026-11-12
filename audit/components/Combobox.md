# Combobox — Audit Report

## Score: 6.5 / 10 — Functional UI, but major WAI-ARIA Combobox pattern deviations

---

## What's Good
- Clean visual integration wrapping Popover with search filtering and custom trigger.
- Form compatibility: includes `VisuallyHiddenInput` when `name` prop is provided for native form submissions.
- Auto-focuses search input 50ms after popover opens.
- Truncation on selected label and options prevents overflow with long text strings.
- Visual indicator: active selection shows `Check` icon with `text-primary`.
- Proper disabled styling and cursor handling (`cursor-not-allowed opacity-50`).
- Token alignment: `border-input`, `bg-background`, `text-foreground`, `bg-accent`, `text-accent-foreground`, `focus:ring-ring`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| CB-01 | Critical | A11y | combobox.tsx:108–116 | Search input has NO keyboard navigation (`onKeyDown` for ArrowDown/ArrowUp/Enter/Escape) | Keyboard users cannot navigate into the options list from the search input; pressing Enter does not select the first/highlighted option | Add `onKeyDown` to input: `ArrowDown` focuses or navigates options, `Enter` selects highlighted option, `Escape` closes popover |
| CB-02 | Critical | A11y | combobox.tsx:82, 119–143 | Violates WAI-ARIA 1.2 Combobox pattern: options container lacks `role="listbox"`, items lack `role="option"` and `aria-selected` | Screen readers announce individual standalone buttons instead of a listbox; cannot announce total options count or selected status | Set `role="listbox"` on options wrapper, `role="option"` and `aria-selected={isSelected}` on option elements |
| CB-03 | Major | A11y | combobox.tsx:80–84 | Missing `aria-controls`, `aria-autocomplete`, and `aria-activedescendant` on the combobox trigger/input | Screen readers cannot announce which listbox popup is controlled or which item is currently highlighted | Wire generated IDs for the listbox and options, attach `aria-controls` and `aria-activedescendant` |
| CB-04 | Major | State | combobox.tsx:43–50 | Ad-hoc controlled/uncontrolled state implementation instead of `useControllableState` | Inconsistent with repository conventions; lacks edge-case handling for prop updates | Standardize with `useControllableState` hook |
| CB-05 | Minor | Performance | combobox.tsx:68–72 | `setTimeout(() => inputRef.current?.focus(), 50)` is arbitrary and can cause race conditions or memory leaks if unmounted before 50ms | Focus may fail on slower devices or cause act() warnings in tests | Use `requestAnimationFrame` or focus immediately within `useEffect` when popover DOM is ready |
| CB-06 | Minor | UX / A11y | combobox.tsx:144–146 | "No matching options." message lacks `role="status"` or `aria-live="polite"` | Screen readers are not notified when a filter query produces zero results | Add `role="status"` and `aria-live="polite"` to the empty state container |

---

## State / Variant Matrix

| State / Feature | Click & Select | Keyboard Arrow Nav | Search Filter | Clear / Form Submit | Screen Reader Listbox |
|---|---|---|---|---|---|
| Uncontrolled | ✅ | ❌ No arrow keys | ✅ Case-insensitive | ✅ Hidden input | ❌ Announced as buttons |
| Controlled | ✅ | ❌ | ✅ | ✅ | ❌ |
| Searchable (`true`) | ✅ | ❌ | ✅ Auto-focus | ✅ | ❌ |
| Searchable (`false`) | ✅ | ❌ | — | ✅ | ❌ |
| Disabled | ✅ Inactive | — | — | — | — |

---

## Missing Tests / Docs
- Unit test: Search filter filters options by label case-insensitively.
- Unit test: ArrowDown and ArrowUp navigate between options in dropdown.
- Unit test: Enter key selects active option and closes dropdown.
- Unit test: VisuallyHiddenInput renders correct name and value.
- Docs: Document `ComboboxOption` interface and `searchable` prop.
