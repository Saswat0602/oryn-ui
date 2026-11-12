# Table — Audit Report

## Score: 8.0 / 10 — Dual primitive and data-driven table with header scope and ARIA sort gaps

---

## What's Good
- Dual architecture: functions both as low-level declarative primitives (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`) AND high-level data-driven table.
- High-level mode features sorting, pagination, multi-row selection, and row action toolbar (add row, delete row).
- Clean responsive overflow scrolling wrapper (`overflow-x-auto w-full`).
- Visual variants: `striped`, `bordered`, `compact`, and customizable sizing (`sm`, `md`, `lg`).
- Accessible semantic HTML table hierarchy (`<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TAB-01 | Major | A11y | table.tsx:236, 409 | `TableHead` and `<th>` elements lack `scope="col"` | Screen readers cannot unambiguously link data cells in large or scrolled tables to column headers (WCAG 1.3.1 Info and Relationships) | Add `scope="col"` to `TableHead` and all column `<th>` elements |
| TAB-02 | Major | A11y | table.tsx:250 | Sorting column headers do NOT set `aria-sort` | Screen readers cannot announce which column is sorted or the sorting direction | Add `aria-sort={sortColumn === column.key ? (sortDirection === "asc" ? "ascending" : "descending") : column.sortable ? "none" : undefined}` |
| TAB-03 | Minor | A11y | table.tsx:227, 299 | High-level mode checkboxes are raw `<input type="checkbox">` lacking `aria-label` attributes | Screen readers announce unlabelled checkboxes when navigating row selection | Add `aria-label="Select all rows"` and `aria-label={`Select row ${index + 1}`}` |
| TAB-04 | Minor | API | table.tsx:18–60 | Mixed component signatures: single `Table` component handles both HTML table attributes and data-driven config props | Causes confusion in autocomplete and typing when passing declarative `children` | Separate into declarative `<Table>` primitive and data-driven `<SimpleTable>` or `<DataTable>` |
| TAB-05 | Nit | API | table.tsx:51 | `value: any` in `onEditCell` prop | Bypasses TypeScript strict typing | Type value as `unknown` |

---

## State / Variant Matrix

| Mode / Feature | thead / tbody | Header scope | Sortable aria-sort | Checkbox Labels | Pagination |
|----------------|---------------|--------------|--------------------|-----------------|------------|
| Primitive mode | ✅ | ❌ Missing scope | N/A | N/A | N/A |
| Data-driven mode | ✅ | ❌ Missing scope | ❌ Missing aria-sort | ❌ Missing | ✅ |
| Striped rows | ✅ | ❌ | ❌ | ❌ | ✅ |
| Compact size | ✅ | ❌ | ❌ | ❌ | ✅ |

---

## Missing Tests / Docs
- Unit test: Primitive subcomponents render correct HTML tags (`th`, `td`, `caption`, etc.)
- Unit test: High-level table sorts data on header click
- Unit test: Pagination controls update current page index
- Docs: Clarify when to use declarative `<Table>` primitives vs turnkey `<DataTable>`
