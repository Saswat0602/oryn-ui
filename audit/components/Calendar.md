# Calendar — Audit Report

## Score: 4/10 — Critical keyboard and token issues

## What's Good
- Uses Portal for popover positioning, avoids z-index issues ✅
- Scroll/resize listener to reposition popup ✅
- minDate/maxDate constraint check ✅
- closeOnSelect behaviour ✅
- Today highlighting ✅
- Multiple design variants ✅
- `showWeekNumbers`, `highlightWeekends` props present ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| C-01 | Critical | A11y | calendar.tsx:442-465 | Input trigger is `type="text" readOnly` with no `role="combobox"` or `aria-haspopup` | Screen readers don't understand it opens a calendar dialog | Change to `role="combobox" aria-haspopup="dialog" aria-expanded={isOpen}` |
| C-02 | Critical | A11y | calendar.tsx:386-394 | Day buttons have no `aria-label` with full date | "15" means nothing to AT — user cannot determine which date | Add `aria-label={new Date(year,month,day).toLocaleDateString('en-US',{...})}` |
| C-03 | Critical | A11y | calendar.tsx:475-601 | Popup has no `role="dialog"`, no `aria-label`, no focus trap | Calendar popup is not modal-safe; focus can escape | Add `role="dialog" aria-label="Date picker" aria-modal="true"` and trap focus |
| C-04 | Critical | A11y | calendar.tsx:496-505 | Navigation buttons `←` / `→` are raw Unicode characters with no `aria-label` | Icon-only controls are unreadable by screen readers | Use `ChevronLeft`/`ChevronRight` icons with `aria-label="Previous month"` |
| C-05 | Critical | A11y | calendar.tsx:349-367 | No keyboard navigation (arrow keys) in calendar grid | WCAG requires keyboard navigation in date grids | Implement `onKeyDown` with ArrowLeft/Right/Up/Down/Home/End/PageUp/PageDown per ARIA Grid pattern |
| C-06 | Major | Tokens | calendar.tsx:188-212 | `getVariantStyles()` uses non-existent CSS variables: `--bg-tertiary`, `--bg-card`, `--border-primary`, `--text-primary` | These vars don't exist in the design token system; falls back to empty | Replace with actual tokens: `var(--background)`, `var(--border)`, `var(--foreground)` |
| C-07 | Major | A11y | calendar.tsx:407-409 | Day header names are single letters: "S", "M", "T", "T"... | Duplicates confuse AT; abbreviated headers must have full `abbr` attribute | Use `<abbr title="Sunday">Su</abbr>` etc. in `<th scope="col">` inside a `<thead>` |
| C-08 | Major | A11y | calendar.tsx:560-575 | Calendar grid is a `<div>` not a `<table>` or proper grid | ARIA grid pattern requires `role="grid"` with `role="row"` and `role="gridcell"` | Refactor to `<table>` or add correct ARIA grid roles |
| C-09 | Major | A11y | calendar.tsx:131-133 | `selectedDate` state is uncontrolled duplicate of `value` prop | Causes stale display if controlled `value` changes without re-render loop | Remove local `selectedDate` state; derive entirely from `value` prop |
| C-10 | Minor | A11y | calendar.tsx:466-472 | Calendar icon `<span>` is not `aria-hidden` | Decorative icon announced by screen readers | Add `aria-hidden="true"` to the icon wrapper span |
| C-11 | Minor | Performance | calendar.tsx:146-156 | Scroll/resize listener attached on window without `passive: true` | Scroll events block main thread | Add `{ passive: true }` to scroll listener |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Open/close on click | ✅ |
| Close on select | ✅ |
| Disabled state | ✅ |
| minDate / maxDate constraint | ✅ |
| Today highlighted | ✅ |
| Selected date highlighted | ✅ |
| Controlled value | ⚠️ State duplication causes staleness |
| Keyboard Arrow navigation | ❌ Not implemented |
| Keyboard Escape to close | ❌ Not implemented |
| Focus trap in popup | ❌ Not implemented |
| Screen reader dialog announcement | ❌ No role="dialog" |
| Token-based styling | ❌ Uses non-existent CSS vars |
| Flip on viewport edge | ✅ |
| prefers-reduced-motion | ❌ Animations not conditional |

## Missing Tests/Docs
- Zero tests for keyboard navigation
- No test for minDate/maxDate boundary dates
- Docs do not mention broken CSS variable dependency
- No test for controlled value sync
- Month navigation with PageUp/PageDown not documented or implemented
