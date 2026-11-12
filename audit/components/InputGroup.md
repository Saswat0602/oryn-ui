# InputGroup — Audit Report

**File:** `src/components/core/input-group.tsx` (72 lines)  
**Status:** Fixed  
**Score: 9.5 / 10** — Accessible composite container with semantic `role="group"`, context-aware `size` propagation to addons, and flex-safe border/z-index layering.

---

## What's Good
- `forwardRef` + `displayName` on both exports.
- `role="group"` automatically assigned for screen reader landmark and grouping.
- `size` prop ("sm" | "default" | "lg") wired via `InputGroupContext` to automatically adjust padding and typography on `InputGroupAddon`.
- Correct negative-margin attachment CSS.
- `z-10` on focus-within for proper border stacking.
- `text-muted-foreground bg-muted` on addon — token-correct.
- Rounded corners correct: first child `rounded-r-none`, last child `rounded-l-none`.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| IG-01 | Major | A11y | input-group.tsx:4-6 | `size` prop declared in `InputGroupProps` was not applied | Dead prop styling | Added `InputGroupContext` and size classes to adjust padding/font size per size | Fixed |
| IG-02 | Major | A11y | input-group.tsx:11 | `InputGroup` had no semantic `role` attribute | Screen readers cannot announce group boundary | Added default `role="group"` and `data-size` | Fixed |
| IG-03 | Minor | A11y | input-group.tsx:32-34 | `InputGroupAddon` linkage | Input addon text linkage to input | Spreads props (`id`, `aria-describedby`) cleanly for AT linkage | Fixed |
| IG-04 | Minor | Layout | input-group.tsx:14-18 | Wrapper child corner styling | Visual corner bleed | First/last child selectors cleanly enforce boundary border radius | Fixed |
| IG-05 | Nit | API | input-group.tsx:33 | `placement` prop on `InputGroupAddon` | Dead prop | Preserved on `data-placement` for custom selector styling | Fixed |

---

## State / Variant Matrix

| Scenario | Rendering | z-index stacking | Keyboard focus | ARIA grouping | Size prop effect |
|----------|-----------|-----------------|----------------|---------------|------------------|
| Input + left addon | ✅ | ✅ | ✅ | ✅ role="group" | ✅ |
| Input + right addon | ✅ | ✅ | ✅ | ✅ role="group" | ✅ |
| Input + both addons | ✅ | ✅ | ✅ | ✅ role="group" | ✅ |
| size prop (sm, default, lg) | ✅ | ✅ | ✅ | ✅ role="group" | ✅ |

---

## Missing Tests / Docs
- ✅ Added smoke test verifying `role="group"` and `size="sm"` propagation in `tests/smoke/core.test.tsx`.
