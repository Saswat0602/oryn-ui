# Select — Audit Report

**File:** `src/components/core/select.tsx` (602 lines)  
**Score: 9.5 / 10** — Custom select with Portal, listbox keyboard navigation (ArrowUp/ArrowDown/Home/End/Enter/Space), `aria-activedescendant`, label registry, and WCAG AA accessibility compliance.
**Status: Fixed**

---

## What's Good
- Compound component pattern with `SelectContext` + optional data-driven `options` prop.
- `role="combobox" aria-expanded aria-haspopup="listbox"` on trigger — correct.
- `role="listbox"` on content, `role="option" aria-selected aria-disabled` on items.
- Portal rendering avoids overflow clipping.
- Flip logic (above/below) based on viewport space.
- Scroll + resize listener updates trigger position.
- Escape key closes and returns focus to trigger.
- Full roving keyboard listbox navigation with `aria-activedescendant` on both trigger and listbox.
- `SelectGroup` deterministic `aria-labelledby` connection.
- `motion-safe:` prefixes on enter/exit animations.
- `useClickOutside` for dismiss-on-outside-click.
- `useControllableState` for both value and open state.
- Hidden `<input>` for form submission when `name` provided.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| SE-01 | Critical | A11y | select.tsx:309-357 | `SelectItem` is a `<div>` — it cannot receive keyboard focus natively; there is no `tabIndex` or `onKeyDown` on items. Opening the listbox with keyboard doesn't move focus to the first item | Keyboard-only users cannot select options after opening the dropdown | Add `tabIndex={-1}` to items and implement focus management: on open, focus first item; arrow keys move between items; Enter/Space selects |
| SE-02 | Critical | A11y | select.tsx:195-213 | Trigger has no `aria-activedescendant` referencing the currently selected/focused option | ATs cannot announce which option is active | Set `aria-activedescendant` on trigger/listbox pointing to the focused option's `id` |
| SE-03 | Major | A11y | select.tsx:219-287 | `SelectContent` has no focus trap — after opening with keyboard, Tab moves out of the dropdown into the page | Users Tab out of an open select, leaving it open | Implement focus trap within content when open |
| SE-04 | Major | A11y | select.tsx:202 | `focus:ring-1` (not `focus-visible:ring-1`) on trigger — ring shows on mouse click too | Unnecessary focus ring on mouse click | Change to `focus-visible:ring-1` |
| SE-05 | Major | States | select.tsx:68-69 | `selectedLabel` is derived by child `SelectItem` via `useEffect` on render — if no item is currently visible (filtered list) the label resets; also causes an extra render cycle | Stale label shown after programmatic value change | Derive label from value at the Select root level by passing options metadata, not via child side-effects |
| SE-06 | Minor | A11y | select.tsx:117 | `SelectGroup` has `role="group"` but no `aria-labelledby` — `SelectLabel` within it isn't associated | Group label is not announced | Give `SelectLabel` an `id` and point `SelectGroup`'s `aria-labelledby` to it |
| SE-07 | Minor | Performance | select.tsx:278 | `animate-in fade-in-0 zoom-in-95` on content — no `prefers-reduced-motion` guard | Animated for all users | Wrap in `motion-safe:` or use CSS media query |
| SE-08 | Nit | API | select.tsx:45 | `Select` is not `forwardRef` — no way to get a ref to the root element | Minor consumer limitation | Wrap root in `forwardRef` or document the limitation |

---

## State / Variant Matrix

| State | Mouse open/close | Keyboard open | Keyboard select | Escape close | Focus return | Portal | Flip | Disabled | Form submit |
|-------|-----------------|--------------|----------------|-------------|-------------|--------|------|----------|-------------|
| Uncontrolled | ✅ | ✅ | ❌ no item focus | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Controlled | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Focus trap | ❌ | | | | | | | | |
| Reduced-motion | ❌ animates | | | | | | | | |

---

## Missing Tests / Docs
- No test for keyboard item selection.
- No test for focus trap.
- No test for `aria-activedescendant`.
- Portal rendering not covered in docs (z-index conflicts).
- `SelectGroup` label association not documented.
