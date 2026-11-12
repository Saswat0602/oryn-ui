# InputGroup — Audit Report

**File:** `src/components/core/input-group.tsx` (54 lines)  
**Score: 7 / 10** — Minimal and functional; missing role/label semantics and the `size` prop is declared but unused.

---

## What's Good
- `forwardRef` + `displayName` on both exports.
- Correct negative-margin attachment CSS.
- `z-10` on focus-within for proper border stacking.
- `text-muted-foreground bg-muted` on addon — token-correct.
- Rounded corners correct: first child `rounded-r-none`, last child `rounded-l-none`.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| IG-01 | Major | A11y | input-group.tsx:4-6 | `size` prop is declared in `InputGroupProps` but never used in the component body | Dead prop — consumers pass it expecting styling effects that never happen | Either implement size classes (adjust addon padding/font per size) or remove the `size` prop |
| IG-02 | Major | A11y | input-group.tsx:11 | `InputGroup` has no `role` attribute — a group of an input + addon has no semantic grouping exposed to ATs | Screen readers cannot announce the group boundary | Add `role="group"` and optionally `aria-label` |
| IG-03 | Minor | A11y | input-group.tsx:32-34 | `InputGroupAddon` is a `<div>` — when it contains text that labels the input (e.g. "https://"), it should be associated via `aria-describedby` or converted to a `<span>` with `id` | Input addon text is not associated with the input for AT users | Provide a way to link addon text to input via `aria-describedby` |
| IG-04 | Minor | Layout | input-group.tsx:14-18 | No `overflow-hidden` on the wrapper — when child border-radius are removed by adjacent sibling selectors, the outer wrapper may show corner bleed | Visual corner bleed in some browsers | Add `overflow-hidden` to wrapper |
| IG-05 | Nit | API | input-group.tsx:33 | `placement` prop on `InputGroupAddon` declared but never used to change styling | Dead prop | Remove or implement (e.g. adjust border-radius based on placement) |

---

## State / Variant Matrix

| Scenario | Rendering | z-index stacking | Keyboard focus | ARIA grouping |
|----------|-----------|-----------------|----------------|---------------|
| Input + left addon | ✅ | ✅ | ✅ | ❌ no role |
| Input + right addon | ✅ | ✅ | ✅ | ❌ no role |
| Input + both addons | ✅ | ✅ | ✅ | ❌ no role |
| size prop | ❌ no effect | — | — | — |

---

## Missing Tests / Docs
- No test verifying `size` prop has no visual effect (regression risk).
- No documentation for `role="group"` requirement.
- `placement` prop behavior undocumented.
- No test for focus-within z-index stacking.
