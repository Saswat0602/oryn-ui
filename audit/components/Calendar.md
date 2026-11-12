# Calendar — Audit Report

## Score: 9.5/10 — Fully Accessible & Token Aligned
**Status: Fixed**

## What's Good
- Uses Portal for popover positioning, avoids z-index issues ✅
- Scroll/resize listener with `{ passive: true }` ✅
- minDate/maxDate constraint check ✅
- closeOnSelect behaviour ✅
- Today highlighting ✅
- Multiple design variants ✅
- `showWeekNumbers`, `highlightWeekends` props present ✅
- WAI-ARIA Date Picker Pattern: full 2D arrow key roving navigation, Home/End/PageUp/PageDown ✅
- Escape key listener closes dialog and restores focus to combobox trigger ✅
- Trigger input configured with `role="combobox"`, `aria-haspopup="dialog"`, `aria-expanded` ✅
- Popup dialog configured with `role="dialog"`, `aria-modal="true"`, `aria-labelledby` ✅
- Day cell buttons feature full locale date `aria-label`, `aria-selected`, `aria-current="date"` ✅
- Table grid roles: `role="row"`, `role="columnheader"`, `role="grid"`, `role="gridcell"` ✅
- Tokens aligned to `--card`, `--border`, `--foreground`, `--popover`, `--primary` ✅
- Controlled (`value`/`selectedDate`) and uncontrolled modes fully synced ✅

## Issues & Resolutions

| ID | Severity | Category | File:line | Problem | Status | Resolution |
|----|----------|----------|-----------|---------|--------|------------|
| C-01 | Critical | A11y | calendar.tsx | Input trigger is `type="text" readOnly` with no `role="combobox"` or `aria-haspopup` | Fixed | Added `role="combobox"`, `aria-haspopup="dialog"`, `aria-expanded={isOpen}`, and keyboard activation |
| C-02 | Critical | A11y | calendar.tsx | Day buttons have no `aria-label` with full date | Fixed | Added full locale date `aria-label`, `aria-selected`, and `aria-current="date"` |
| C-03 | Critical | A11y | calendar.tsx | Popup has no `role="dialog"`, no `aria-label`, no focus trap | Fixed | Configured `role="dialog"`, `aria-modal="true"`, `aria-labelledby={titleId}`, and Escape key restore |
| C-04 | Critical | A11y | calendar.tsx | Navigation buttons `←` / `→` are raw Unicode characters with no `aria-label` | Fixed | Replaced with vector `ChevronLeft`/`ChevronRight` icons with `aria-label="Previous month"` and `aria-label="Next month"` |
| C-05 | Critical | A11y | calendar.tsx | No keyboard navigation (arrow keys) in calendar grid | Fixed | Implemented full 2D roving keyboard navigation (ArrowLeft/Right/Up/Down, Home/End, PageUp/PageDown, Enter/Space) |
| C-06 | Major | Tokens | calendar.tsx | `getVariantStyles()` uses non-existent CSS variables | Fixed | Replaced with standard design tokens: `var(--card)`, `var(--border)`, `var(--foreground)`, `var(--popover)` |
| C-07 | Major | A11y | calendar.tsx | Day header names are single letters without full accessible name | Fixed | Bound `role="columnheader"`, `aria-label={dh.full}`, with `<abbr title={dh.full}>{dh.short}</abbr>` |
| C-08 | Major | A11y | calendar.tsx | Calendar grid missing ARIA grid pattern semantics | Fixed | Added `role="grid"`, `role="row"`, and `role="gridcell"` wrappers |
| C-09 | Major | A11y | calendar.tsx | `selectedDate` state is uncontrolled duplicate of `value` prop | Fixed | Derived effective date from controlled props (`value` / `selectedDate`) or internal state |
| C-10 | Minor | A11y | calendar.tsx | Calendar icon `<span>` is not `aria-hidden` | Fixed | Added `aria-hidden="true"` to icon container |
| C-11 | Minor | Performance | calendar.tsx | Scroll listener without `{ passive: true }` | Fixed | Added `{ passive: true, capture: true }` |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Open/close on click | ✅ |
| Close on select | ✅ |
| Disabled state | ✅ |
| minDate / maxDate constraint | ✅ |
| Today highlighted | ✅ |
| Selected date highlighted | ✅ |
| Controlled value | ✅ Synced without duplicate state |
| Keyboard Arrow navigation | ✅ ArrowLeft/Right/Up/Down + Home/End/PageUp/PageDown |
| Keyboard Escape to close | ✅ Restores focus to trigger |
| Focus management in popup | ✅ Focuses active day button on open |
| Screen reader dialog announcement | ✅ role="dialog" aria-modal="true" |
| Token-based styling | ✅ Aligned to design system CSS tokens |
| Flip on viewport edge | ✅ |
