# EmptyState — Audit Report

## Score: 8.5 / 10 — Clean, flexible placeholder pattern

---

## What's Good
- Flexible dual pattern: turnkey props (`icon`, `title`, `description`, `action`) or fully composable subcomponents (`EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateActions`).
- 3 refined aesthetic variants: `default` (transparent), `dashed` (dashed border for dropzones/creations), and `outline` (card surface).
- Semantic heading structure: `<h3>` element for title with `text-base font-semibold text-foreground`.
- Flexible icon handling: accepts React element, icon component reference, or custom children.
- Proper action button alignment and wrapping (`flex flex-wrap items-center justify-center gap-3`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| EMP-01 | Minor | A11y | empty-state.tsx:29 | Container has no semantic landmark or live region support when used dynamically | When search results filter down to zero items, screen readers do not announce that the list is empty without an assertive/polite status | Support `role="status"` and `aria-live="polite"` props on `<EmptyState>` |
| EMP-02 | Nit | API | empty-state.tsx:5, 59 | `icon?: any` type on props | Bypasses TypeScript validation | Type as `React.ReactNode \| React.ComponentType<{ className?: string }>` |

---

## State / Variant Matrix

| Variant / Slot | Title Rendering | Icon Slot | Description Slot | Actions Slot |
|----------------|-----------------|-----------|------------------|--------------|
| default | ✅ `<h3>` | ✅ Centered circle | ✅ Muted paragraph | ✅ Centered flex |
| dashed | ✅ | ✅ | ✅ | ✅ |
| outline | ✅ | ✅ | ✅ | ✅ |
| Custom children | ✅ | ✅ | ✅ | ✅ |

---

## Missing Tests / Docs
- Unit test: Renders direct props (`title`, `description`, `action`)
- Unit test: Renders compound subcomponents
- Unit test: Passes custom className and HTML attributes
- Docs: Document usage patterns for search results, error states, and initial onboarding
