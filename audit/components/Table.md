# Table — Audit Report

## Score: 9.5 / 10 — Status: Fixed. Dual primitive and data-driven table with accessible scope, aria-sort, and labelled selection controls

---

## What's Good
- Dual architecture: functions both as low-level declarative primitives (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`) AND high-level data-driven table.
- High-level mode features sorting, pagination, multi-row selection, and row action toolbar (add row, delete row).
- Clean responsive overflow scrolling wrapper (`overflow-x-auto w-full`).
- Visual variants: `striped`, `bordered`, `compact`, and customizable sizing (`sm`, `md`, `lg`).
- Accessible semantic HTML table hierarchy (`<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| TAB-01 | Major | A11y | table.tsx:236, 409 | `TableHead` and `<th>` elements lack `scope="col"` | Screen readers cannot unambiguously link data cells in large or scrolled tables to column headers (WCAG 1.3.1 Info and Relationships) | Fixed | Added `scope="col"` default to `TableHead` and high-level column `<th>` elements |
| TAB-02 | Major | A11y | table.tsx:250 | Sorting column headers do NOT set `aria-sort` | Screen readers cannot announce which column is sorted or the sorting direction | Fixed | Added `aria-sort={isSorted ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}` |
| TAB-03 | Minor | A11y | table.tsx:227, 299 | High-level mode checkboxes are raw `<input type="checkbox">` lacking `aria-label` attributes | Screen readers announce unlabelled checkboxes when navigating row selection | Fixed | Added `aria-label="Select all rows"` and `aria-label={`Select row ${index + 1}`}` |
| TAB-04 | Minor | API | table.tsx:18–60 | Mixed component signatures: single `Table` component handles both HTML table attributes and data-driven config props | Causes confusion in autocomplete and typing when passing declarative `children` | Deferred | Preserved backwards compatibility |
| TAB-05 | Nit | API | table.tsx:51 | `value: any` in `onEditCell` prop | Bypasses TypeScript strict typing | Fixed | Typed `value: unknown` |

---

## State / Variant Matrix

| Mode / Feature | thead / tbody | Header scope | Sortable aria-sort | Checkbox Labels | Pagination |
|----------------|---------------|--------------|--------------------|-----------------|------------|
| Primitive mode | ✅ | ✅ | N/A | N/A | N/A |
| Data-driven mode | ✅ | ✅ | ✅ | ✅ | ✅ |
| Striped rows | ✅ | ✅ | ✅ | ✅ | ✅ |
| Compact size | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Missing Tests / Docs
- ✅ Unit test: Primitive subcomponents render correct HTML tags with `scope="col"` in `tests/smoke/data.test.tsx`.
- ✅ Unit test: High-level table sorts data on header click and toggles `aria-sort`.
- ✅ Unit test: Selection checkboxes have accessible names.
