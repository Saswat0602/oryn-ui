# DataTable — Audit Report

## Score: 8.0 / 10 — Feature-complete enterprise table with sorting ARIA gaps

---

## What's Good
- Comprehensive feature set: searching/filtering, multi-type column sorting, row multi-selection, pagination, and virtualization support.
- Built-in `useVirtualizer` integration for handling massive datasets (10,000+ rows) smoothly without DOM bloat.
- Refined loading state: renders realistic skeleton rows (`<Skeleton />`) across all columns.
- Selection management: handles controlled/uncontrolled selected rows, select-all, partially selected indeterminate checkboxes, and bulk action slots.
- Dedicated pagination toolbar with dynamic page calculation, row ranges ("Showing X to Y of Z"), and customizable page sizes.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| DTT-01 | Major | A11y | data-table.tsx:438 | `TableHead` (`<th>`) does NOT declare `aria-sort` | Screen reader users are not informed which column is sorted or what the current sort direction is (WCAG 4.1.2 Name, Role, Value) | Add `aria-sort={isSorted ? (sortDirection === "asc" ? "ascending" : "descending") : canSort ? "none" : undefined}` on `TableHead` |
| DTT-02 | Major | A11y | data-table.tsx:444–460 | Column sort button lacks an explanatory `aria-label` | Screen readers only hear the column name without knowing clicking will sort or in what order | Add `aria-label={`Sort by ${column.header} in ${isSorted && sortDirection === "asc" ? "descending" : "ascending"} order`}` |
| DTT-03 | Minor | A11y | data-table.tsx:438 | Header cells lack `scope="col"` attribute | Assistive technologies cannot unambiguously map data cells to column headers in complex or scrolled tables | Add `scope="col"` to all `TableHead` elements |
| DTT-04 | Minor | Layout | data-table.tsx:339–366 | Virtualized scrolling relies on spacer `<tr>` elements with inline heights | Can cause border collapsing glitches or scroll flickering in certain table layouts | Use a wrapper `div` with absolute positioning for virtualized rows or CSS transform translation |
| DTT-05 | Nit | API | data-table.tsx:95 | Generic constraint `T extends Record<string, any>` uses `any` | Reduces TypeScript strict type checking | Change to `T extends Record<string, unknown>` |

---

## State / Variant Matrix

| Feature / State | Sort Button | Row Selection | Search Filter | Virtualization | Skeleton Loading |
|-----------------|-------------|---------------|---------------|----------------|------------------|
| Default | ✅ | Optional | ✅ Filtered | Optional | ✅ Skeletons |
| Sorted Asc / Desc | ⚠️ Missing aria-sort | ✅ | ✅ | ✅ | N/A |
| Select All (Indeterminate) | ✅ | ✅ Checkbox | ✅ | ✅ | N/A |
| Empty data state | N/A | N/A | ✅ Empty message | N/A | N/A |
| Pagination controls | ✅ | ✅ | ✅ | N/A (disabled) | N/A |

---

## Missing Tests / Docs
- Unit test: Clicking sort button cycles through ascending, descending, and unsorted states
- Unit test: Search input filters rows accurately across multiple fields
- Unit test: Select all checkbox toggles all paginated row IDs
- Unit test: Virtualized table renders only visible window of rows
- Docs: Provide clear guides on connecting custom server-side data fetching and sorting
