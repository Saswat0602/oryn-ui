# MultiSelect — Audit Report

## Score: 7/10 — Good ARIA structure, keyboard gaps in listbox

## What's Good
- `role="combobox" aria-expanded aria-haspopup="listbox" aria-controls` on trigger ✅
- `role="listbox" aria-multiselectable="true"` on dropdown ✅
- `role="option" aria-selected` on each option ✅
- Remove tag buttons have `aria-label={Remove ${label}}` ✅
- Clear all button has `aria-label="Clear all options"` ✅
- Search input has `aria-label="Search options"` ✅
- Escape closes dropdown ✅
- Backspace removes last item when search is empty ✅
- ArrowDown opens dropdown ✅
- Flip on viewport edge ✅
- Portal-based popover ✅
- forwardRef, displayName ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| MS-01 | Critical | A11y | multi-select.tsx:263-300 | No keyboard Arrow navigation within the listbox options | WCAG and ARIA authoring practices require Up/Down in listbox | Add `onKeyDown` on the listbox div with ArrowUp/ArrowDown/Enter/Space handlers using a `focusedIndex` state |
| MS-02 | Critical | A11y | multi-select.tsx:276-297 | Option items are `<div role="option">` with no `tabIndex` | Non-focusable option items can't be reached by keyboard | Add `tabIndex={-1}` to option divs and manage focus programmatically |
| MS-03 | Major | A11y | multi-select.tsx:214-219 | Tag remove button is inside a `<Badge>` which is inside the combobox trigger div | When focus is in search input, keyboard users can't reach remove buttons | The remove buttons should be reachable via Tab or the entire tag should be a keyboard-navigable element |
| MS-04 | Major | A11y | multi-select.tsx:198-199 | When no selections, placeholder `<span>` is not `aria-hidden` | The combobox aria-label already conveys the placeholder text; reading both is redundant | Add `aria-hidden="true"` to placeholder span |
| MS-05 | Major | A11y | multi-select.tsx:198-199 | Screen reader does not announce when items are removed | Removing a tag gives no AT feedback | Add `aria-live="polite"` region that announces "{label} removed, {n} selected" |
| MS-06 | Minor | A11y | multi-select.tsx:131-141 | `handleKeyDown` on the container div doesn't use `focus-visible` ring styling | Keyboard users can't see focus on the trigger | Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` |
| MS-07 | Minor | A11y | multi-select.tsx:177 | `aria-controls` only set when `open` — AT loses association when closed | ARIA best practice is to keep `aria-controls` pointing to the listbox always | Keep `aria-controls={listboxId}` unconditionally |
| MS-08 | Nit | API | multi-select.tsx:14 | `icon?: any` on `MultiSelectOption` | Loses type safety for icon prop | Type as `React.ReactNode` |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Open/close | ✅ |
| Search/filter | ✅ |
| Select option | ✅ |
| Deselect option | ✅ |
| maxSelected limit | ✅ |
| Clear all | ✅ |
| Remove individual tag | ✅ |
| Keyboard Escape to close | ✅ |
| Keyboard Backspace to remove | ✅ |
| Keyboard Arrow in listbox | ❌ Not implemented |
| Screen reader removes announcement | ❌ Not implemented |
| Error state | ✅ |
| Disabled state | ✅ |
| Disabled options | ✅ |
| Flip on viewport edge | ✅ |
| Controlled value | ✅ |

## Missing Tests/Docs
- No tests for keyboard listbox navigation
- No tests for screen reader removal announcements
- No test for `maxSelected` boundary
- No test for search filtering
- Docs should note that keyboard listbox navigation is not yet implemented
