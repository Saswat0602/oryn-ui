# Resizable — Audit Report

## Score: 8.5 / 10 — High-craft custom split pane with thorough keyboard accessibility

---

## What's Good
- Zero external runtime dependencies — clean custom implementation with both mouse and touch gesture support.
- Fully accessible separator element: `role="separator"`, `tabIndex={0}`, `aria-orientation`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- Comprehensive keyboard navigation: Arrow keys resize panels incrementally, `Home` snaps to `minSize`, and `End` snaps to `maxSize`.
- Prevents text selection and forces global resize cursor during active dragging via `document.body.style`.
- Supports both percentage (`%`) and fixed pixel (`px`) sizing modes.
- Visual grip indicator (`withHandle`) with refined vector dot patterns.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| RES-01 | Minor | Layout | resizable.tsx:343–360 | Multi-panel allocation is limited to 2-panel pairs (`isFirst ? size : 100 - size`) | Adding 3 or more panels in a single group causes layout collapsing without nested panel groups | Document nested panel group pattern or implement n-panel fractional flex sizing |
| RES-02 | Minor | A11y | resizable.tsx:265–293 | Missing `PageUp` and `PageDown` keyboard step handlers | Power keyboard users expect PageUp/PageDown to adjust split sizes in larger increments (e.g. 10% or 20%) | Add `PageUp` / `PageDown` handlers with `step * 2` delta |
| RES-03 | Minor | States | resizable.tsx:167–169 | `useEffect` resets internal size on any `defaultSize` prop change, conflicting with user drag session | If parent re-renders with new object references, user's in-progress drag size is overwritten | Only synchronize `defaultSize` if explicitly controlled or guard against active dragging (`!isDragging`) |
| RES-04 | Nit | API | resizable.tsx:313, 326 | `any` casts for `child.type` and `forwardedRef` | Bypasses TypeScript strict typing | Use typed component guards (`React.isValidElement`) and typed ref helpers |

---

## State / Variant Matrix

| Variant / State | Mouse Drag | Touch Drag | Keyboard Arrows | Home / End | aria-valuenow |
|-----------------|------------|------------|-----------------|------------|---------------|
| Horizontal | ✅ | ✅ | ✅ Left / Right | ✅ | ✅ Updates live |
| Vertical | ✅ | ✅ | ✅ Up / Down | ✅ | ✅ Updates live |
| Disabled handle | ✅ Disabled | ✅ Disabled | ✅ tabIndex=-1 | N/A | ✅ |
| Percentage mode | ✅ | ✅ | ✅ 5% step | ✅ | ✅ |
| Pixel mode | ✅ | ✅ | ✅ 15px step | ✅ | ✅ |

---

## Missing Tests / Docs
- Unit test: Mouse drag updates panel sizes and triggers `onResize`
- Unit test: Keyboard arrow keys adjust `aria-valuenow`
- Unit test: Touch events adjust panel width on touch screens
- Unit test: Disabled handle prevents resize events
- Docs: Document 3-panel split layouts using nested `<Resizable>` groups
