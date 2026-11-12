# Timeline — Audit Report

## Score: 8.0 / 10 — Semantic event list with token and motion considerations

---

## What's Good
- Explicit list landmarks: container has `role="list"` and items declare `role="listitem"`.
- Status indicators: `TimelineNode` declares `role="img"` with descriptive `aria-label={`Status: ${status}`}`.
- 4 comprehensive event lifecycle states: `completed` (with `Check` icon), `current` (pulsing indicator), `upcoming` (muted circle), and `error` (with `AlertCircle`).
- Vertical connecting line positioned between consecutive nodes that cleanly terminates on the final item (`isLast`).
- Subcomponents for modular layouts: `TimelineItem`, `TimelineNode`, `TimelineContent`, `TimelineTitle`, `TimelineDescription`, `TimelineTime`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TIM-01 | Major | Color | timeline.tsx:94 | Error node uses hardcoded `bg-rose-600 text-white border-rose-600 ring-4 ring-rose-50 dark:ring-rose-950/40` | Bypasses library semantic `destructive` design tokens; `ring-rose-950/40` has almost zero contrast against dark background | Replace with `bg-destructive text-destructive-foreground border-destructive ring-destructive/20` |
| TIM-02 | Minor | A11y | timeline.tsx:90 | Current status node uses continuous `animate-pulse` without reduced motion support | Users with motion sensitivities may find persistent pulsing distracting or uncomfortable | Add `motion-reduce:animate-none` class |
| TIM-03 | Minor | Layout | timeline.tsx:122 | Vertical connector line uses hardcoded offsets (`top-7 bottom-[-24px]`) | Varying item heights or multiline descriptions can cause visible gaps or line overlap between nodes | Use flex column height stretching (`h-full -mb-6`) or grid layout for the connector bar |
| TIM-04 | Nit | API | timeline.tsx:16, 81 | `icon?: any` type on props | Bypasses TypeScript validation | Type as `React.ReactNode \| React.ComponentType<{ className?: string }>` |

---

## State / Variant Matrix

| Status | Node Role | Default Icon | Connecting Line | Contrast Check | Reduced Motion |
|--------|-----------|--------------|-----------------|----------------|----------------|
| completed | img (status) | Check | ✅ Hidden on last | ✅ >15:1 | N/A |
| current | img (status) | Circle | ✅ | ✅ >15:1 | ❌ Unchecked pulse |
| upcoming | img (status) | Circle | ✅ | ✅ >4.5:1 | N/A |
| error | img (status) | AlertCircle | ✅ | ⚠️ 4.70:1 (hardcoded rose-600) | N/A |

---

## Missing Tests / Docs
- Unit test: Renders `role="list"` with `role="listitem"` children
- Unit test: Last timeline node does not render connecting vertical bar
- Unit test: Custom icons replace default status glyphs
- Docs: Document usage for delivery tracking, audit logs, and version history
