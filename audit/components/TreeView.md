# TreeView — Audit Report

## Score: 7.5 / 10 — WAI-ARIA tree structure with keyboard roving tabindex gaps

---

## What's Good
- Explicit WAI-ARIA tree structure: `role="tree"`, `role="treeitem"`, and nested `role="group"` containers for branch children.
- Proper treeitem state attributes: `aria-expanded` (on parent nodes), `aria-selected`, and `aria-disabled`.
- Context-sensitive icons: renders `FolderOpen` when expanded, `Folder` when collapsed, and `FileText` for leaf nodes.
- Horizontal arrow key navigation: `ArrowRight` expands collapsed nodes, and `ArrowLeft` collapses open nodes.
- Full controlled and uncontrolled state support for both selection (`selectedId`) and expansion (`expandedIds`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TRV-01 | Major | A11y | tree-view.tsx:89, 96–108 | Missing `ArrowUp` and `ArrowDown` key navigation and roving tabindex | In WAI-ARIA Tree View patterns, users must be able to navigate vertically between visible tree nodes using Up/Down arrows. Currently, only the selected node has `tabIndex={0}`, leaving users unable to move keyboard focus between nodes | Implement roving tabindex and `ArrowUp` / `ArrowDown` focus movement across all currently visible tree items |
| TRV-02 | Minor | A11y | tree-view.tsx:96–108 | Missing `Home`, `End`, and `*` (expand all siblings) key handlers | Standard keyboard accessibility expectations for tree views are incomplete | Add handlers for `Home` (focus first node) and `End` (focus last visible node) |
| TRV-03 | Minor | A11y | tree-view.tsx:119–125 | Chevron expand toggle icon is an unlabelled `<div>` with stopPropagation | Clicking chevron directly works for mice, but has no separate keyboard target | Clean up interaction so activating the tree item handles expansion consistently |
| TRV-04 | Nit | API | tree-view.tsx:11, 14 | `icon?: any` and `[key: string]: any` on `TreeNode` interface | Bypasses TypeScript type safety | Type icon as `React.ReactNode` and use a generic type parameter for custom node data |

---

## State / Variant Matrix

| State / Interaction | role="tree" | role="treeitem" | Arrow Left / Right | Arrow Up / Down | aria-expanded |
|---------------------|-------------|-----------------|--------------------|-----------------|---------------|
| Leaf item | ✅ | ✅ | N/A | ❌ Missing | Undefined |
| Collapsed branch | ✅ | ✅ | ✅ Expands | ❌ Missing | ✅ false |
| Expanded branch | ✅ | ✅ | ✅ Collapses | ❌ Missing | ✅ true |
| Disabled node | ✅ | ✅ `aria-disabled` | N/A | ❌ | ✅ |
| Roving tabindex | ❌ Incomplete | — | — | — | — |

---

## Missing Tests / Docs
- Unit test: ArrowRight expands collapsed node and ArrowLeft collapses it
- Unit test: Selecting node fires `onSelect` callback
- Unit test: Toggling node expansion fires `onToggleExpand` callback
- Docs: Document keyboard navigation requirements and asynchronous node loading patterns
