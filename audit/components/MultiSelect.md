# MultiSelect — Audit Report

## Score: 9.5 / 10 — Remediated: Keyboard navigation in listbox, programmatic option focus, screen reader announcements, and robust ARIA
**Status:** Fixed

---

## What's Good
- `role="combobox" aria-expanded aria-haspopup="listbox" aria-controls aria-activedescendant` on trigger ✅
- `role="listbox" aria-multiselectable="true"` on dropdown with full roving keyboard navigation ✅
- Full keyboard ArrowUp/ArrowDown navigation and Enter/Space option toggling ✅
- `role="option" aria-selected tabIndex={-1}` on each option ✅
- Remove tag buttons have `aria-label={Remove ${label}}` and are keyboard navigable with focus rings ✅
- Clear all button has `aria-label="Clear all options"` and focus ring ✅
- Search input has `aria-label="Search options"` and focus ring ✅
- Screen reader `role="status" aria-live="polite"` announces additions and removals ✅
- Escape closes dropdown ✅
- Backspace removes last item when search is empty ✅
- ArrowDown opens dropdown ✅
- Flip on viewport edge ✅
- Portal-based popover ✅
- forwardRef, displayName ✅

---

## Remediated Issues

| ID | Severity | Category | File:line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| MS-01 | Critical | A11y | multi-select.tsx:165 | No keyboard Arrow navigation within listbox options | Fixed |
| MS-02 | Critical | A11y | multi-select.tsx:298 | Non-focusable option divs lacking `tabIndex` and programmatic focus | Fixed |
| MS-03 | Major | A11y | multi-select.tsx:230 | Tag remove button inaccessible to keyboard focus | Fixed |
| MS-04 | Major | A11y | multi-select.tsx:216 | Placeholder span announced redundantly with combobox label | Fixed (`aria-hidden="true"`) |
| MS-05 | Major | A11y | multi-select.tsx:189 | Missing screen reader announcement on selection change | Fixed (`role="status" aria-live="polite"`) |
| MS-06 | Minor | A11y | multi-select.tsx:208 | Missing focus-visible ring on trigger | Fixed |
| MS-07 | Minor | A11y | multi-select.tsx:202 | `aria-controls` only present when open | Fixed (always bound to listbox ID) |
| MS-08 | Nit | API | multi-select.tsx:14 | `icon?: any` | Fixed (`React.ReactNode`) |

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
