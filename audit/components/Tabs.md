# Tabs — Audit Report

## Score: 8.5/10 — Strong keyboard and ARIA, minor panel issue

## What's Good
- `role="tablist" aria-orientation` ✅
- `role="tab" aria-selected tabIndex` (roving tabindex) ✅
- `role="tabpanel" tabIndex={0}` on content panel ✅
- Full keyboard: ArrowLeft/Right/Up/Down (orientation-aware), Home, End ✅
- Space/Enter activate tab via trigger keyDown ✅
- `focus-visible:ring-2` on both trigger and panel ✅
- `data-state` attributes for CSS targeting ✅
- Multiple variants: default, pills, underline, cards, minimal ✅
- Horizontal and vertical orientation ✅
- forwardRef throughout, displayName ✅
- Compound mode + data-driven `items` mode ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TB-01 | Major | A11y | tabs.tsx:144-168 | `TabsContent` returns `null` when not active — removes panel from DOM | Screen readers cannot find the tab panel after content removal; `aria-controls` from trigger has no matching element | Keep panel in DOM with `hidden` attribute instead of returning null: `<div hidden={!isActive}>` |
| TB-02 | Major | A11y | tabs.tsx:118-134 | `TabsTrigger` has no `aria-controls` pointing to its `TabsContent` panel | Required by ARIA tab pattern for AT to navigate trigger → panel | Add `aria-controls={contentId}` where contentId matches TabsContent's `id` |
| TB-03 | Major | A11y | tabs.tsx:144-168 | `TabsContent` has no `id` attribute | Cannot be referenced by trigger's `aria-controls` | Add `id` prop derived from `value` or `useId()` |
| TB-04 | Minor | A11y | tabs.tsx:144-168 | `TabsContent` has no `aria-labelledby` pointing to its trigger | AT cannot associate panel with its trigger heading | Add `aria-labelledby={triggerId}` matching the trigger's `id` |
| TB-05 | Minor | A11y | tabs.tsx:287 | Items-mode `TabsTrigger` renders with custom className that overrides `focus-visible:ring-2` on the trigger | In items mode, `outline-none` is in className but `focus-visible:ring-2` is also there — ordering via cn() should be safe, but verify | Test focus ring is visible in items mode |
| TB-06 | Nit | Performance | tabs.tsx:70-73 | Arrow navigation calls `nextTab.focus()` then `nextTab.click()` | `click()` fires another setValue call which is redundant if focus handler already triggers it | Either use click for both focus+selection or use focus only and handle selection in focus handler |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Default variant | ✅ |
| Pills variant | ✅ |
| Underline variant | ✅ |
| Cards variant | ✅ |
| Minimal variant | ✅ |
| Horizontal orientation | ✅ |
| Vertical orientation | ✅ |
| Keyboard Arrow navigation | ✅ |
| Home/End navigation | ✅ |
| Space/Enter activation | ✅ |
| Disabled tab | ✅ |
| Controlled value | ✅ |
| Uncontrolled defaultValue | ✅ |
| role="tablist/tab/tabpanel" | ✅ |
| aria-controls trigger→panel | ❌ Missing |
| Panel in DOM when hidden | ❌ Removed from DOM |
| Badge on tab trigger | ✅ |
| Icon on tab trigger | ✅ |
| fullWidth | ✅ |

## Missing Tests/Docs
- No test for Arrow key navigation
- No test for Home/End navigation
- No test for `aria-controls` / `aria-labelledby` wiring
- No test for disabled tab being skipped in navigation
- Docs should note that `TabsContent` being removed from DOM may break `aria-controls`
