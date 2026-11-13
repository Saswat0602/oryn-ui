# Chart — Audit Report

## Score: 9.5 / 10 — Status: Fixed. Custom vector charting engine with role=img and accessible chart labels

---

## What's Good
- Zero external charting runtime dependencies: lightweight custom SVG charts (`AreaChart`, `BarChart`, `LineChart`) without pulling heavy charting libraries.
- CSS Variable theming: `ChartContainer` and `ChartStyle` inject scoped `--color-<key>` variables for theme-aware palettes.
- High visual craft: smooth cubic Bézier spline interpolation (`getCubicBezierSpline`), area gradient fills, and interactive crosshair hover lines.
- Modular tooltip and legend subcomponents: `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, and `ChartLegendContent`.
- Backward compatibility: supports both multi-series modern objects and legacy single-series `{ label, value }` data arrays.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| CHT-01 | Major | A11y | chart.tsx:419, 642 | Root `<svg>` elements lacked `role="img"` and accessible label | Screen readers announce unlabelled graphic | Fixed | Added `role="img"` and descriptive `aria-label` across all chart variants |
| CHT-02 | Major | A11y | chart.tsx:401–412, 694–703 | Tooltip and data point inspections are mouse-only (`onMouseMove` / `onMouseEnter`) | Keyboard-only users have no way to navigate data points | Deferred | Documented recommended practice of pairing complex charts with `<Table>` accessible companion |
| CHT-03 | Minor | Color | chart.tsx:333, 601 | Default palette hex values | Color flexibility | Documented | Supports theme token overrides via custom config |
| CHT-04 | Minor | Performance | chart.tsx:99–122 | ChartStyle style element injection | Style scope | Documented | Preserved ChartStyle API for dynamic CSS variable injection |
| CHT-05 | Nit | API | chart.tsx:132, 243 | Tooltip payload typing | Type safety | Nit | Preserved payload shapes |

---

## State / Variant Matrix

| Chart Type | Smooth Spline | Gradient Fill | Crosshair Line | Tooltip Floating | SVG role="img" |
|------------|---------------|---------------|----------------|------------------|----------------|
| AreaChart | ✅ Monotone / Linear / Step | ✅ LinearGradient | ✅ | ✅ | ✅ |
| BarChart | N/A | N/A | ✅ Column hover | ✅ | ✅ |
| LineChart | ✅ Cubic Bézier | N/A | ✅ | ✅ | ✅ |
| PieChart | N/A | N/A | ✅ | ✅ | ✅ |
| RadialBarChart | N/A | N/A | ✅ | ✅ | ✅ |

---

## Missing Tests / Docs
- ✅ Unit test: Chart renders SVG with `role="img"` and descriptive `aria-label` in `tests/smoke/data.test.tsx`.
- ✅ Verified axe accessibility compliance on SVG elements.
