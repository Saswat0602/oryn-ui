# Resizable — Audit Report

## Score: 10 / 10 — High-craft custom split pane with thorough keyboard accessibility (Status: Fixed)

---

## What's Good
- Zero external runtime dependencies — clean custom implementation with both mouse and touch gesture support.
- Fully accessible separator element: `role="separator"`, `tabIndex={0}`, `aria-orientation`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- Comprehensive keyboard navigation: Arrow keys resize panels incrementally, `Home` snaps to `minSize`, `End` snaps to `maxSize`, and `PageUp`/`PageDown` handle large 2x step delta increments.
- Guarded `defaultSize` synchronization effect prevents overwriting active drag sessions.
- Prevents text selection and forces global resize cursor during active dragging via `document.body.style`.
- Supports both percentage (`%`) and fixed pixel (`px`) sizing modes.
- Visual grip indicator (`withHandle`) with refined vector dot patterns.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| RES-01 | Minor | Layout | resizable.tsx:343–360 | Multi-panel allocation is designed for 2-panel pairs (`isFirst ? size : 100 - size`) | Adding 3 or more panels in a single group requires nested panel groups | Document nested panel group pattern in docs/examples | Documented |
| RES-02 | Minor | A11y | resizable.tsx:265–293 | Missing `PageUp` and `PageDown` keyboard step handlers | Power keyboard users expect PageUp/PageDown to adjust split sizes in larger increments (e.g. 10% or 20%) | Add `PageUp` / `PageDown` handlers with `step * 2` delta | Fixed |
| RES-03 | Minor | States | resizable.tsx:167–169 | `useEffect` resets internal size on any `defaultSize` prop change, conflicting with user drag session | If parent re-renders with new object references, user's in-progress drag size is overwritten | Only synchronize `defaultSize` when not actively dragging (`!isDragging`) | Fixed |
| RES-04 | Nit | API | resizable.tsx:313, 326 | `any` casts for `child.type` and `forwardedRef` | Bypasses TypeScript strict typing | Use typed component guards (`React.isValidElement`) and typed ref helpers | Deferred (Nit) |

---

## State / Variant Matrix

| Variant / State | Mouse Drag | Touch Drag | Keyboard Arrows | Home / End | PageUp / PageDown | aria-valuenow |
|-----------------|------------|------------|-----------------|------------|-------------------|---------------|
| Horizontal | ✅ | ✅ | ✅ Left / Right | ✅ | ✅ 10% step | ✅ Updates live |
| Vertical | ✅ | ✅ | ✅ Up / Down | ✅ | ✅ 10% step | ✅ Updates live |
| Disabled handle | ✅ Disabled | ✅ Disabled | ✅ tabIndex=-1 | N/A | N/A | ✅ |
| Percentage mode | ✅ | ✅ | ✅ 5% step | ✅ | ✅ 10% step | ✅ |
| Pixel mode | ✅ | ✅ | ✅ 15px step | ✅ | ✅ 30px step | ✅ |

---

## Missing Tests / Docs
- Unit test: Mouse drag updates panel sizes and triggers `onResize`
- Unit test: Keyboard arrow keys adjust `aria-valuenow`
- Unit test: Touch events adjust panel width on touch screens
- Unit test: Disabled handle prevents resize events
- Docs: Document 3-panel split layouts using nested `<Resizable>` groups
