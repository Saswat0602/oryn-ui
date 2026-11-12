# Switch — Audit Report

**File:** `src/components/core/switch.tsx` (188 lines)  
**Score: 8 / 10** — Clean toggle implementation; `any` on onChange and label double-toggle are the main gaps.

---

## What's Good
- `role="switch" aria-checked aria-disabled` — correct WAI-ARIA for toggle.
- Native `disabled` + `aria-disabled` both set.
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
- `useControllableState` for controlled/uncontrolled.
- Hidden `<input type="checkbox">` for form submission.
- Space and Enter keyboard activation.
- Thumb translate classes cleanly handle all three sizes.
- `useId` for stable IDs.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| SW-01 | Major | API | switch.tsx:17 | `onChange?: (e: any) => void` — hand-crafted synthetic event | TypeScript cannot validate; missing native event fields | Use `onCheckedChange: (checked: boolean) => void` as the primary API (already exists); deprecate or remove `onChange` |
| SW-02 | Major | States | switch.tsx:163-166 | Label `onClick` calls `setChecked(!checked)` directly — this fires in addition to the button click (via `htmlFor`), causing double-toggle | Clicking the label unchecks then rechecks immediately | Remove label `onClick`; `htmlFor` on a `<button>` with matching `id` is sufficient |
| SW-03 | Minor | Performance | switch.tsx:143 | Thumb `transition-transform duration-200` — no `prefers-reduced-motion` guard | Motion-sensitive users see thumb animation | Wrap with `motion-safe:transition-transform` or disable in CSS |
| SW-04 | Minor | Tokens | switch.tsx:134 | Unchecked track: `bg-input` — `input` token = `#e4e4e7` (light) / `#27272a` (dark). In dark mode this gives a very dark track that is barely distinguishable from the dark background | Low contrast in dark mode | Use `bg-muted` or `bg-secondary` for a slightly more visible unchecked state |
| SW-05 | Minor | A11y | switch.tsx:157-182 | When label is present, the layout is `flex items-center` with switch first, label second — but WCAG recommends label before control or at minimum providing spatial proximity; more importantly, the wrapper div has no `role` to group switch + label | Semantic grouping missing | Wrap in `<fieldset>` / `<div role="group">` or ensure label `htmlFor` is sufficient (it is for switch, but description needs `aria-describedby` on the button) |
| SW-06 | Nit | Layout | switch.tsx:157 | `flex items-center space-x-3` — if description is multi-line, center alignment misaligns thumb | Visual misalignment with long descriptions | Use `items-start` with `mt-0.5` on the switch for top alignment |

---

## State / Variant Matrix

| State | sm | md | lg | Disabled | With label | With description | Form submit | Keyboard | Reduced-motion |
|-------|----|----|----|---------|-----------|-----------------|-----------|---------|-|
| Unchecked | ✅ | ✅ | ✅ | ✅ | ⚠️ double-toggle | ✅ | ✅ | ✅ | ❌ |
| Checked | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ❌ |
| Dark unchecked contrast | ⚠️ low | ⚠️ | ⚠️ | — | — | — | — | — | — |

---

## Missing Tests / Docs
- No test for label double-toggle regression.
- No test for `onChange` synthetic event shape.
- Dark mode contrast for unchecked state not documented.
- `aria-describedby` for description not wired.
