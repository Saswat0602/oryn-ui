# DatetimePicker — Audit Report

## Score: 5/10 — Functional but many a11y gaps; local cn() is a code smell

## What's Good
- Separate Date / Time tabs with mode control ✅
- Year picker modal + Month picker modal ✅
- 12h and 24h time format support ✅
- Portal-based popover with flip logic ✅
- forwardRef with manual ref merging ✅
- Previous/next month grey-out days (shows context) ✅
- Cancel/Done buttons in footer ✅
- displayName set ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| DTP-01 | Critical | A11y | datetime-picker.tsx:264-328 | Day buttons in calendar grid have no `aria-label` with full date | AT user cannot determine which date | Add `aria-label={date.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}` |
| DTP-02 | Critical | A11y | datetime-picker.tsx:512-575 | Popup has no `role="dialog"`, no `aria-modal`, no `aria-label` | Modal is inaccessible to screen readers | Add `role="dialog" aria-label="Date and time picker" aria-modal="true"` |
| DTP-03 | Critical | A11y | datetime-picker.tsx:264-328 | No keyboard Arrow navigation in calendar grid | WCAG requires keyboard date grid navigation | Add onKeyDown handlers for all required keys |
| DTP-04 | Critical | Code | datetime-picker.tsx:20-22 | Local `cn()` defined (using plain `.join(' ')`) instead of importing from `../../lib/utils` | Does not use `clsx + tailwind-merge` — conflicting classes not resolved | Replace with `import { cn } from '../../lib/utils'` |
| DTP-05 | Major | A11y | datetime-picker.tsx:488-510 | Trigger button has no `aria-expanded` or `aria-haspopup` | Screen readers don't know clicking opens a picker | Add `aria-expanded={isOpen} aria-haspopup="dialog"` |
| DTP-06 | Major | A11y | datetime-picker.tsx:519-541 | Tab buttons in `mode="both"` have no `role="tab"` or `aria-selected` | Tabs are not announced as tabs by screen readers | Add `role="tab" aria-selected={activeTab === 'date'}`, wrap in `role="tablist"` |
| DTP-07 | Major | A11y | datetime-picker.tsx:395-427 | Year modal overlay uses `absolute inset-0` — not a true focus trap | Keyboard can Tab outside year selection modal | Add focus trap or use `inert` on background content |
| DTP-08 | Major | A11y | datetime-picker.tsx:66-70 | `useEffect` for external `value` changes doesn't reset `viewDate` | If controlled `value` jumps to a different month, calendar still shows old month | Update `viewDate` when `value` prop changes |
| DTP-09 | Minor | A11y | datetime-picker.tsx:267-271 | Month prev/next buttons have no `aria-label` | Icon buttons unreadable by screen readers | Add `aria-label="Previous month"` / `aria-label="Next month"` |
| DTP-10 | Minor | A11y | datetime-picker.tsx:552-572 | Cancel and Done buttons are not associated with the dialog | AT doesn't know these buttons affect the picker dialog | They are inside the dialog `div`; acceptable once `role="dialog"` is added |
| DTP-11 | Nit | Performance | datetime-picker.tsx:79-95 | `useEffect` for click-outside runs always (no `if (!isOpen) return`) | Adds event listener even when closed | Add `if (!isOpen) return` guard at top of effect |

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
| Keyboard date navigation | ❌ Not implemented |
| role="dialog" on popup | ❌ Missing |
| aria-expanded on trigger | ❌ Missing |
| Tab role for date/time tabs | ❌ Missing |
| Controlled value with viewDate sync | ❌ Broken |
| Focus trap | ❌ Missing |
| prefers-reduced-motion | ❌ Unchecked |

## Missing Tests/Docs
- No tests for keyboard navigation
- No tests for 12h↔24h conversion accuracy edge cases (12 AM = 0, 12 PM = 12)
- No test for controlled `value` changes syncing display
- Local `cn()` is a defect — no tests would catch this subtle class-merging failure
