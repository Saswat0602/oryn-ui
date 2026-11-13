# Separator — Audit Report

## Score: 10 / 10 — High quality utility primitive (Status: Fixed)

---

## What's Good
- Fully complies with WAI-ARIA Separator specifications: `role={decorative ? "none" : "separator"}` and `aria-orientation={decorative ? undefined : orientation}`.
- Proper default `decorative = true` prevents screen readers from cluttering the accessibility tree with visual dividers.
- Supports both `horizontal` and `vertical` orientations cleanly with `self-stretch` ensuring vertical dividers span flex containers.
- Offers `thin`, `medium`, and `thick` variants as well as `solid`, `dashed`, and `dotted` styles with correct border-width classes (`border-b-2`, `border-b-4`, `border-r-2`, `border-r-4`).
- Token adherence is exemplary: strictly uses `bg-border` and `border-border`.
- Strict TypeScript: no `any` casts, clean interfaces, proper `forwardRef` and `displayName`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| SP-01 | Minor | Layout | separator.tsx:23–39 | `thickness` classes (`h-0.5`, `h-1`) conflict with `lineStyle` dashed/dotted (`border-b`, `border-r`) | For dashed/dotted separators, setting `thickness="thick"` creates an empty 4px transparent container with a 1px border, rather than a thick dashed line | Apply border width classes (`border-b-2`, `border-b-4`, `border-r-2`, `border-r-4`) when lineStyle is dashed/dotted | Fixed |
| SP-02 | Minor | Layout | separator.tsx:48 | Vertical separator uses `h-full` without `self-stretch` | In flex layouts where the parent has no explicit height, a vertical separator collapses to 0px height | Add `self-stretch` to vertical separator classes | Fixed |
| SP-03 | Nit | Tokens | separator.tsx:30 | Dotted/dashed border styles use `bg-transparent` | Explicit `bg-transparent` prevents inherited background bleed through borders | Maintained for consistent rendering | Deferred (Nit) |

---

## State / Variant Matrix

| Variant / Orientation | Decorative | Semantic Separator | Solid | Dashed | Dotted |
|---|---|---|---|---|---|
| Horizontal (Thin) | ✅ `role="none"` | ✅ `role="separator"` | ✅ 1px fill | ✅ 1px border | ✅ 1px border |
| Horizontal (Medium/Thick) | ✅ | ✅ | ✅ 2px/4px fill | ✅ 2px/4px border | ✅ 2px/4px border |
| Vertical (Thin) | ✅ | ✅ `aria-orientation="vertical"` | ✅ 1px fill | ✅ 1px border | ✅ 1px border |
| Vertical (Medium/Thick) | ✅ | ✅ | ✅ 2px/4px fill | ✅ 2px/4px border | ✅ 2px/4px border |

---

## Missing Tests / Docs
- Unit test: Renders `role="none"` when `decorative={true}` and `role="separator"` when `decorative={false}`.
- Unit test: Correct `aria-orientation` attribute when non-decorative.
- Docs: Add examples showcasing vertical separators inside flex rows.
