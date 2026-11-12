# Tabs — Audit Report

## Score: 9.5/10 — Status: Fixed. Strong keyboard and ARIA with aria-controls, aria-labelledby, and DOM panel persistence

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

| ID | Severity | Category | File:line | Problem | Why it matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| TB-01 | Major | A11y | tabs.tsx:144-168 | `TabsContent` returns `null` when not active — removes panel from DOM | Screen readers cannot find the tab panel after content removal; `aria-controls` from trigger has no matching element | Fixed | Retained panel in DOM with `hidden` attribute and matching `id` |
| TB-02 | Major | A11y | tabs.tsx:118-134 | `TabsTrigger` has no `aria-controls` pointing to its `TabsContent` panel | Required by ARIA tab pattern for AT to navigate trigger → panel | Fixed | Added `aria-controls` automatically linking to matching panel ID |
| TB-03 | Major | A11y | tabs.tsx:144-168 | `TabsContent` has no `id` attribute | Cannot be referenced by trigger's `aria-controls` | Fixed | Generated and bound unique panel ID based on `baseId` and `value` |
| TB-04 | Minor | A11y | tabs.tsx:144-168 | `TabsContent` has no `aria-labelledby` pointing to its trigger | AT cannot associate panel with its trigger heading | Fixed | Bound `aria-labelledby` pointing to trigger's ID |
| TB-05 | Minor | A11y | tabs.tsx:287 | Items-mode `TabsTrigger` focus visible styling | Focus indicator visibility | Fixed | Verified focus ring passes WCAG AA |
| TB-06 | Nit | Performance | tabs.tsx:70-73 | Arrow navigation calls nextTab.focus() then nextTab.click() | Potential redundant callback | Nit | Preserved keyboard selection behavior |

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
| aria-controls trigger→panel | ✅ |
| Panel in DOM when hidden | ✅ |
| Badge on tab trigger | ✅ |
| Icon on tab trigger | ✅ |
| fullWidth | ✅ |

## Missing Tests/Docs
- ✅ Unit test: Arrow key navigation moves focus and updates tab selection.
- ✅ Unit test: `aria-controls` on `TabsTrigger` matches `id` on `TabsContent`.
- ✅ Unit test: `aria-labelledby` on `TabsContent` matches `id` on `TabsTrigger`.
