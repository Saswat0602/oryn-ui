# TreeView — Audit Report

## Score: 9.5 / 10 — Score updated after remediation of roving tabindex, vertical ArrowUp/ArrowDown, and Home/End keyboard navigation

---

## What's Good
- Explicit WAI-ARIA tree structure: `role="tree"`, `role="treeitem"`, and nested `role="group"` containers for branch children.
- Proper treeitem state attributes: `aria-expanded` (on parent nodes), `aria-selected`, and `aria-disabled`.
- Context-sensitive icons: renders `FolderOpen` when expanded, `Folder` when collapsed, and `FileText` for leaf nodes.
- Full 2D Arrow key navigation: `ArrowRight` expands collapsed nodes / enters children, `ArrowLeft` collapses open nodes, and `ArrowUp`/`ArrowDown` moves focus smoothly between all visible nodes.
- `Home` and `End` jump instantly to the first and last visible tree nodes.
- Full controlled and uncontrolled state support for both selection (`selectedId`) and expansion (`expandedIds`).
- Roving tabindex: exactly one tree node holds `tabIndex={0}`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TRV-01 | Major | A11y | tree-view.tsx:89, 96–108 | Missing `ArrowUp` and `ArrowDown` key navigation and roving tabindex | Fixed | Implemented full roving tabindex with dynamic `visibleIds` computation and vertical `ArrowUp`/`ArrowDown` navigation |
| TRV-02 | Minor | A11y | tree-view.tsx:96–108 | Missing `Home` and `End` key handlers | Fixed | Added `Home` and `End` listeners jumping focus to first and last visible nodes |
| TRV-03 | Minor | A11y | tree-view.tsx:119–125 | Chevron expand toggle icon was unlabelled div with stopPropagation | Fixed | Added `aria-hidden="true"` and unified keyboard activation |
| TRV-04 | Nit | API | tree-view.tsx:11, 14 | `icon?: any` type | Documented | Conforms to cross-React 18/19 flexible icon type standards |

---

## State / Variant Matrix

| State / Interaction | role="tree" | role="treeitem" | Arrow Left / Right | Arrow Up / Down | aria-expanded |
|---------------------|-------------|-----------------|--------------------|-----------------|---------------|
| Leaf item | ✅ | ✅ | N/A | ✅ | Undefined |
| Collapsed branch | ✅ | ✅ | ✅ Expands | ✅ | ✅ false |
| Expanded branch | ✅ | ✅ | ✅ Collapses | ✅ | ✅ true |
| Disabled node | ✅ | ✅ `aria-disabled` | N/A | ✅ (skipped/disabled) | ✅ |
| Roving tabindex | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Verification
- Added smoke and accessibility unit tests in `tests/smoke/data.test.tsx` verifying treeitem count, roving tabindex (`0` on active, `-1` on inactive), ArrowDown event, and axe-core accessibility compliance.
