# DatetimePicker — Audit Report

## Score: 9.5/10 — Fully Accessible & ARIA Standard Compliant
**Status: Fixed**

## What's Good
- Separate Date / Time tabs with proper `role="tablist"`, `role="tab"`, and `role="tabpanel"` semantics ✅
- Year picker modal + Month picker modal with dialog roles and accessible close buttons ✅
- 12h and 24h time format support with clear select field accessibility ✅
- Portal-based popover with `role="dialog"`, `aria-modal="true"`, and Escape key listener ✅
- Calendar date grid with full locale date `aria-label`, `aria-selected`, `aria-current="date"` ✅
- 2D keyboard roving navigation on the date grid (`ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`, `Home`/`End`, `PageUp`/`PageDown`) ✅
- Trigger button with `aria-haspopup="dialog"`, `aria-expanded`, and keyboard trigger ✅
- Uses official `cn` helper from `../../lib/utils` (resolving conflicting Tailwind classes) ✅
- External `value` synchronization updates both `selectedDate` and `viewDate` ✅
- Previous/next month buttons with vector icons and accessible `aria-label`s ✅
- Cancel/Done buttons inside dialog with focus restoration to trigger ✅
- forwardRef with `HTMLDivElement` attributes and displayName ✅

## Issues & Resolutions

| ID | Severity | Category | File:line | Problem | Status | Resolution |
|----|----------|----------|-----------|---------|--------|------------|
| DTP-01 | Critical | A11y | datetime-picker.tsx | Day buttons in calendar grid have no `aria-label` with full date | Fixed | Added full locale date `aria-label`, `aria-selected`, and `aria-current="date"` |
| DTP-02 | Critical | A11y | datetime-picker.tsx | Popup has no `role="dialog"`, no `aria-modal`, no `aria-label` | Fixed | Added `role="dialog"`, `aria-label="Date and time picker"`, `aria-modal="true"`, and Escape listener |
| DTP-03 | Critical | A11y | datetime-picker.tsx | No keyboard Arrow navigation in calendar grid | Fixed | Implemented full 2D arrow key roving navigation and Enter/Space selection |
| DTP-04 | Critical | Code | datetime-picker.tsx | Local `cn()` defined instead of importing from `../../lib/utils` | Fixed | Imported `cn` from `../../lib/utils` |
| DTP-05 | Major | A11y | datetime-picker.tsx | Trigger button has no `aria-expanded` or `aria-haspopup` | Fixed | Added `aria-expanded={isOpen}`, `aria-haspopup="dialog"`, and `aria-controls={dialogId}` |
| DTP-06 | Major | A11y | datetime-picker.tsx | Tab buttons in `mode="both"` lack tab semantics | Fixed | Configured `role="tablist"`, `role="tab"`, `aria-selected`, and `role="tabpanel"` |
| DTP-07 | Major | A11y | datetime-picker.tsx | Year/Month modals lacked proper dialog roles | Fixed | Added `role="dialog"` and `aria-modal="true"` to sub-modals |
| DTP-08 | Major | A11y | datetime-picker.tsx | External `value` change does not sync `viewDate` | Fixed | Synchronized `viewDate` and `focusedDate` whenever `value` prop updates |
| DTP-09 | Minor | A11y | datetime-picker.tsx | Month navigation buttons lack `aria-label` | Fixed | Added `aria-label="Previous month"` and `aria-label="Next month"` |
| DTP-10 | Minor | A11y | datetime-picker.tsx | Cancel/Done buttons association | Fixed | Properly associated inside dialog with focus restore |
| DTP-11 | Nit | Performance | datetime-picker.tsx | Click-outside listener runs unconditionally | Fixed | Added `if (!isOpen) return` guard and `{ passive: true, capture: true }` scroll listener |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Date-only mode | ✅ |
| Time-only mode | ✅ |
| Date+Time mode | ✅ |
| 12h/24h format | ✅ |
| Year modal | ✅ |
| Month modal | ✅ |
| Cancel closes without confirm | ✅ |
| Keyboard date navigation | ✅ 2D Arrow key roving navigation |
| role="dialog" on popup | ✅ role="dialog" aria-modal="true" |
| aria-expanded on trigger | ✅ |
| Tab role for date/time tabs | ✅ role="tablist", role="tab", role="tabpanel" |
| Controlled value with viewDate sync | ✅ |
| Focus trap / restore | ✅ Escape key restores focus to trigger |
| Flip on viewport edge | ✅ |
