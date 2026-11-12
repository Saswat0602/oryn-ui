# Combobox — Audit Report

## Score: 9.5 / 10 — Status: Fixed (Full WAI-ARIA 1.2 Combobox & Listbox Pattern)

---

## What's Good
- Clean visual integration wrapping Popover with search filtering and custom trigger.
- Form compatibility: includes `VisuallyHiddenInput` when `name` prop is provided for native form submissions.
- Search input keyboard navigation with `ArrowDown`/`ArrowUp`/`Home`/`End`/`Enter`/`Escape`.
- Full WAI-ARIA 1.2 compliance: `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `role="listbox"`, and `role="option"` with `aria-selected`.
- Controlled and uncontrolled state standardized via `useControllableState`.
- Zero-race focus management with `requestAnimationFrame`.
- Empty search state announced with `role="status"` and `aria-live="polite"`.
- Truncation on selected label and options prevents overflow with long text strings.
- Visual indicator: active selection shows `Check` icon with `text-primary`.
- Proper disabled styling and cursor handling (`cursor-not-allowed opacity-50`).
- Token alignment: `border-input`, `bg-background`, `text-foreground`, `bg-accent`, `text-accent-foreground`, `focus:ring-ring`.

---

## Remediated Issues

| ID | Severity | Category | File:Line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| CB-01 | Critical | A11y | combobox.tsx:108–116 | Search input had no keyboard navigation | Fixed |
| CB-02 | Critical | A11y | combobox.tsx:82, 119–143 | Options lacked role="listbox", items lacked role="option" and aria-selected | Fixed |
| CB-03 | Major | A11y | combobox.tsx:80–84 | Missing aria-controls, aria-autocomplete, and aria-activedescendant | Fixed |
| CB-04 | Major | State | combobox.tsx:43–50 | Ad-hoc state implementation instead of useControllableState | Fixed |
| CB-05 | Minor | Performance | combobox.tsx:68–72 | Arbitrary setTimeout for input focus | Fixed |
| CB-06 | Minor | UX / A11y | combobox.tsx:144–146 | "No matching options." message lacked role="status" / aria-live="polite" | Fixed |

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
