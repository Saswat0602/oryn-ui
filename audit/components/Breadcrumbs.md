# Breadcrumbs — Audit Report

## Score: 9.5/10 — Score updated after remediation of BreadcrumbPage role semantics and action button focus-visible rings

---

## What's Good
- `<nav aria-label="Breadcrumb">` on root element ✅
- `BreadcrumbPage` uses `aria-current="page"` without misleading `role="link"` ✅
- `BreadcrumbSeparator` has `role="presentation" aria-hidden="true"` ✅
- `BreadcrumbEllipsis` has `aria-hidden` + `sr-only` "More" text ✅
- Proper `<ol>` list for breadcrumb items ✅
- `showHomeIcon` with `aria-label="Home"` on the link ✅
- Good support for 7 separator variants ✅
- forwardRef and displayName throughout ✅
- `disabled` on button items applies `opacity-50 pointer-events-none` ✅

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| B-01 | Major | A11y | breadcrumbs.tsx:62-64 | `BreadcrumbPage` used `role="link"` on a non-interactive `<span>` | Fixed | Removed invalid `role="link"` and `aria-disabled="true"`, relying on semantic `aria-current="page"` per WAI-ARIA breadcrumb pattern |
| B-02 | Minor | A11y | breadcrumbs.tsx:252-260 | Button items had no focus-visible ring class | Fixed | Added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` and `disabled:pointer-events-none` |
| B-03 | Minor | Tokens | breadcrumbs.tsx:208-209 | Opacity variants | Documented | Standard styling for outlined/modern breadcrumbs |
| B-04 | Nit | API | breadcrumbs.tsx:286-308 | Compound component typing | Maintained | Both `Breadcrumbs` and `Breadcrumb` expose compound members cleanly |

---

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Default array mode | ✅ |
| Compound children mode | ✅ |
| showHomeIcon | ✅ |
| Separator variants (chevron/slash/arrow/dot) | ✅ |
| Outlined variant | ✅ |
| Modern/pill variants | ✅ |
| Disabled item | ✅ |
| aria-current="page" on last item | ✅ |
| Keyboard focus ring on links | ✅ |
| Keyboard focus ring on buttons | ✅ |

---

## Verification
- Added smoke and accessibility unit tests in `tests/smoke/forms.test.tsx` verifying `aria-current="page"`, absence of `role="link"`, and axe-core accessibility compliance.
