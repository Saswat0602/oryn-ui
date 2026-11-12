# Pagination — Audit Report

## Score: 7.5 / 10 — Flexible dual API, but missing `aria-current` in default mode and HTML list nesting issues

---

## What's Good
- Dual API design: supports both automated data-driven mode (`<Pagination currentPage={3} totalPages={10} />`) with smart ellipsis window calculation, and declarative compound mode (`PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`).
- Accessible icon labels: First, Previous, Next, and Last buttons have `aria-label` attributes ("First page", "Previous page", "Next page", "Last page").
- Ellipsis correctly carries `aria-hidden` and sr-only helper text ("More pages").
- Disabled states on navigation boundaries (page 1 disables Prev/First, last page disables Next/Last).
- Design tokens: active page uses `bg-primary text-primary-foreground font-semibold shadow-xs`, inactive uses `text-muted-foreground hover:bg-accent hover:text-accent-foreground border-border/60`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| PG-01 | Critical | A11y | pagination.tsx:146–173 | In default automated mode, `PaginationItem` does NOT set `aria-current="page"` when `active={true}` | Screen reader users navigating pages have no way of knowing which page is currently active | Add `aria-current={active ? "page" : undefined}` to `PaginationItem` |
| PG-02 | Major | HTML Semantics | pagination.tsx:175–185 | `PaginationContent` renders a `<ul>` but children (`PaginationItem`, `PaginationPrevious`, etc.) are raw `<button>` elements, not wrapped in `<li>` | Invalid HTML nesting violates WCAG 1.3.1 (Info and Relationships); screen readers announce broken lists | Either change `PaginationContent` to a `<div>` or make `PaginationItem` render an `<li>` container wrapping the button |
| PG-03 | Minor | A11y | pagination.tsx:114–119 | Number buttons in automated mode have no descriptive aria-labels (e.g. only say "3") | Screen readers read "three button" instead of "Page 3" | Add `aria-label={active ? \`Current page, page \${page}\` : \`Go to page \${page}\`}` |
| PG-04 | Minor | Layout / Touch | pagination.tsx:160, 201–204 | `size="sm"` is `h-8 px-2.5` | Fails the 44x44px (or 24x24px WCAG 2.2) minimum touch target standard for mobile screens | Keep target hit-box at minimum 36–40px on touch devices |
| PG-05 | Nit | TypeScript | pagination.tsx:274–279 | Subcomponents attached via monkey-patching `(Pagination as any).Link = ...` | `as any` type bypass | Type compound component with proper interface extension |

---

## State / Variant Matrix

| Variant / State | Active Page Styling | `aria-current="page"` | Prev / Next Boundary Disabled | First / Last Buttons | Ellipsis Windowing |
|---|---|---|---|---|---|
| Automated Mode | ✅ `bg-primary` | ❌ Missing on `PaginationItem` | ✅ Disabled at limits | ✅ | ✅ Correct `...` ranges |
| Declarative Mode (`PaginationLink`) | ✅ `bg-primary` | ✅ Present when `isActive` | ✅ Manual prop | ✅ Manual | ✅ Manual |
| Icon Buttons | ✅ Centered | ✅ `aria-label` present | ✅ | ✅ | — |

---

## Missing Tests / Docs
- Unit test: Default mode sets `aria-current="page"` on active page number button.
- Unit test: Clicking next page triggers `onPageChange(currentPage + 1)`.
- Unit test: Previous button is disabled on page 1.
- Unit test: Next button is disabled on totalPages.
- Unit test: Ellipsis generation displays correct middle ranges.
- Docs: Document both automated props API and declarative compound component API.
