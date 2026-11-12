# RadioGroup — Audit Report

## Score: 7/10 — Good pattern, roving tabindex needs fix

## What's Good
- `role="radiogroup"` on group container ✅
- `role="radio" aria-checked` on each button ✅
- Roving tabindex: focused item gets `tabIndex=0`, others get `tabIndex=-1` ✅
- `useControllableState` for controlled/uncontrolled ✅
- Space/Enter key activates the radio ✅
- `aria-disabled` on both group and item ✅
- `htmlFor` tied to generated `id` for label association ✅
- `disabled` properly propagated from group context ✅
- forwardRef, displayName ✅
- Label click sets value ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| RG-01 | Critical | A11y | radio-group.tsx:93-101 | No Arrow key navigation between radio items | WCAG authoring practices require ArrowUp/ArrowDown/ArrowLeft/ArrowRight to move between radio items in a group | Implement `onKeyDown` on the group `div` or on each item that finds sibling radios and moves focus+selection |
| RG-02 | Major | A11y | radio-group.tsx:55-67 | `role="radiogroup"` on `div` has no `aria-label` or `aria-labelledby` | ARIA requires a radiogroup to have an accessible name | Accept an `aria-label` or `aria-labelledby` prop and wire it to the group div |
| RG-03 | Major | A11y | radio-group.tsx:62 | Hidden `<input type="hidden">` for form submission is exposed to AT | Hidden input could interfere with AT traversal | Add `aria-hidden="true"` to the hidden input |
| RG-04 | Minor | A11y | radio-group.tsx:113-125 | `tabIndex={isChecked ? 0 : -1}` — when nothing is checked, all items have `tabIndex=-1` | Keyboard user cannot Tab into the group at all if nothing is selected | When no item is checked, give the first non-disabled item `tabIndex=0` |
| RG-05 | Minor | A11y | radio-group.tsx:133-150 | `label onClick` calls `setValue` directly — duplicates the button's click handler | Could cause double setValue on some interactions | Remove label onClick; `htmlFor` natively activates the button on label click |
| RG-06 | Nit | A11y | radio-group.tsx:124 | `Circle` icon for the filled indicator is `h-2 w-2` with no `aria-hidden` | Decorative icon should be hidden from AT | Add `aria-hidden="true"` to the Circle icon |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Controlled value | ✅ |
| Uncontrolled defaultValue | ✅ |
| role="radiogroup" | ✅ |
| role="radio" | ✅ |
| aria-checked | ✅ |
| Space/Enter activation | ✅ |
| Arrow key navigation | ❌ Not implemented |
| Group disabled | ✅ |
| Item disabled | ✅ |
| Label association (htmlFor/id) | ✅ |
| Roving tabindex | ⚠️ Breaks when nothing selected |
| Form submit via hidden input | ✅ |
| aria-label on group | ❌ Not wired |

## Missing Tests/Docs
- No test for Arrow key navigation (blocker for WCAG compliance)
- No test for `tabIndex` being 0 on initial unchecked group
- No test for group disabled propagating to all items
- No test for label click activating radio
- Docs should note that an `aria-label` or `aria-labelledby` must be provided on the group
