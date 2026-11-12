# Breadcrumbs — Audit Report

## Score: 8/10 — Solid, minor semantic issue

## What's Good
- `<nav aria-label="Breadcrumb">` on root element ✅
- `BreadcrumbPage` uses `aria-current="page"` ✅
- `BreadcrumbSeparator` has `role="presentation" aria-hidden="true"` ✅
- `BreadcrumbEllipsis` has `aria-hidden` + `sr-only` "More" text ✅
- Proper `<ol>` list for breadcrumb items ✅
- `showHomeIcon` with `aria-label="Home"` on the link ✅
- Good support for 7 separator variants ✅
- forwardRef and displayName throughout ✅
- `disabled` on button items applies `opacity-50 pointer-events-none` ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| B-01 | Major | A11y | breadcrumbs.tsx:62-64 | `BreadcrumbPage` uses `role="link"` on a `<span>` | A `<span>` with `role="link"` without `href` or interaction confuses AT; the page item is not interactive | Use `role="link" aria-disabled="true"` or drop `role="link"` and rely solely on `aria-current="page"` (the WAI-ARIA spec already implies the current page is not navigable) |
| B-02 | Minor | A11y | breadcrumbs.tsx:252-260 | Button items (no href, onClick only) have no `aria-label` and no focus-visible ring class | Keyboard users can't visually identify focus on the action button | Add `focus-visible:ring-2 focus-visible:ring-ring` to the button className |
| B-03 | Minor | Tokens | breadcrumbs.tsx:208-209 | `bg-card/60` and `bg-muted/30` use opacity modifiers that may fail contrast in dark mode | At 30%/60% opacity background may be nearly invisible | Test in dark mode; prefer opaque token values |
| B-04 | Nit | API | breadcrumbs.tsx:286-308 | Compound attachment via `(Breadcrumbs as any).List = ...` bypasses TS typing twice (for both Breadcrumbs and Breadcrumb alias) | Consumers won't get autocomplete for `Breadcrumbs.List` etc. | Use the typed `BreadcrumbsComponent` intersection type and cast once |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Default array mode | ✅ |
| Compound children mode | ✅ |
| showHomeIcon | ✅ |
| maxItems (truncation) | ❌ Prop declared but not implemented in the component body |
| Separator variants (chevron/slash/arrow/dot) | ✅ |
| Outlined variant | ✅ |
| Modern/pill variants | ✅ |
| Disabled item | ⚠️ Only visual (pointer-events-none), no aria-disabled |
| aria-current="page" on last item | ✅ |
| Keyboard focus ring on links | ✅ (browser native `<a>`) |
| Keyboard focus ring on buttons | ❌ Missing focus-visible ring class |

## Missing Tests/Docs
- `maxItems` prop is documented but not implemented — truncation logic absent
- No test for `aria-current="page"` on last item
- No test for separator `aria-hidden`
- No docs example of compound usage with `Breadcrumbs.List`
