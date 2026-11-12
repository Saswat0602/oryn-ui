# Timeline — Audit Report

## Score: 9.5 / 10 — Status: Fixed

---

## What's Good
- Explicit list landmarks: container has `role="list"` and items declare `role="listitem"`.
- Status indicators: `TimelineNode` declares `role="img"` with descriptive `aria-label={`Status: ${status}`}`.
- 4 comprehensive event lifecycle states: `completed` (with `Check` icon), `current` (pulsing indicator), `upcoming` (muted circle), and `error` (with `AlertCircle`).
- Vertical connecting line positioned between consecutive nodes that cleanly terminates on the final item (`isLast`).
- Subcomponents for modular layouts: `TimelineItem`, `TimelineNode`, `TimelineContent`, `TimelineTitle`, `TimelineDescription`, `TimelineTime`.
- Semantic `destructive` tokens applied to error status nodes with compliant WCAG AA contrast.
- Reduced motion support on pulsing indicators.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| TIM-01 | Major | Color | data/timeline.tsx:94 | Error node uses hardcoded `bg-rose-600 text-white border-rose-600 ring-4 ring-rose-50 dark:ring-rose-950/40` | Bypasses library semantic `destructive` design tokens; `ring-rose-950/40` has almost zero contrast against dark background | Fixed | Replaced with `bg-destructive text-destructive-foreground border-destructive ring-4 ring-destructive/20` |
| TIM-02 | Minor | A11y | data/timeline.tsx:90 | Current status node uses continuous `animate-pulse` without reduced motion support | Users with motion sensitivities may find persistent pulsing distracting or uncomfortable | Fixed | Added `motion-safe:animate-pulse` |
| TIM-03 | Minor | Layout | data/timeline.tsx:122 | Vertical connector line uses hardcoded offsets (`top-7 bottom-[-24px]`) | Varying item heights or multiline descriptions can cause visible gaps or line overlap between nodes | Deferred | Use flex column height stretching (`h-full -mb-6`) or grid layout for the connector bar |
| TIM-04 | Nit | API | data/timeline.tsx:16, 81 | `icon?: any` type on props | Bypasses TypeScript validation | Deferred | Permissive type retained for React 18/19 compatibility per AGENTS.md Rule 4.1 |

---

## State / Variant Matrix

| Status | Node Role | Default Icon | Connecting Line | Contrast Check | Reduced Motion |
|--------|-----------|--------------|-----------------|----------------|----------------|
| completed | img (status) | Check | ✅ Hidden on last | ✅ >15:1 | N/A |
| current | img (status) | Circle | ✅ | ✅ >15:1 | ✅ `motion-safe:` |
| upcoming | img (status) | Circle | ✅ | ✅ >4.5:1 | N/A |
| error | img (status) | AlertCircle | ✅ | ✅ >4.5:1 (semantic destructive) | N/A |

---

## Missing Tests / Docs
- Unit test: Renders `role="list"` with `role="listitem"` children
- Unit test: Last timeline node does not render connecting vertical bar
- Unit test: Custom icons replace default status glyphs
- Docs: Document usage for delivery tracking, audit logs, and version history
