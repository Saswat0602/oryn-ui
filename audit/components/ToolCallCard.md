# ToolCallCard — Audit Report

## Score: 8.5 / 10 — Specialized AI agent inspector with clean disclosure semantics

---

## What's Good
- Compliant disclosure pattern: trigger button features `aria-expanded={open}` and `aria-controls={contentId}` bound to content container ID.
- AI Agent workflow statuses: `pending`, `running` (with spinning `Loader2`), `success` / `completed`, and `error` / `failed`.
- Robust payload formatting: handles strings, plain objects, and complex nested JSON structures safely with indentation.
- Millisecond duration indicator (`duration`) for latency tracking.
- Preformatted code viewer blocks with horizontal scroll overflow guards (`overflow-x-auto font-mono text-[11px]`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TCC-01 | Minor | A11y | tool-call-card.tsx:96 | Header button lacks explicit `focus-visible:ring-2` styling | Faint default browser focus outline on keyboard navigation | Add `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` |
| TCC-02 | Minor | A11y | tool-call-card.tsx:58–63 | Running status spinner icon has no accessible description | Screen reader users hear "Running" badge text, but the animated icon lacks `aria-hidden="true"` | Add `aria-hidden="true"` on `Loader2` |
| TCC-03 | Nit | Tokens | tool-call-card.tsx:65, 71 | Status badges hardcode Tailwind palettes (`bg-emerald-50`, `bg-rose-50`) | Does not leverage library CSS color variables | Map to semantic token classes or CSS variables |

---

## State / Variant Matrix

| Status | Badge Color | Icon Rendered | aria-expanded | Args Pre block | Result Pre block |
|--------|-------------|---------------|---------------|----------------|------------------|
| pending | muted | None | ✅ | If provided | If provided |
| running | accent | Loader2 (spin) | ✅ | If provided | If provided |
| success / completed | emerald | CheckCircle2 | ✅ | If provided | If provided |
| error / failed | rose | AlertCircle | ✅ | If provided | If provided |

---

## Missing Tests / Docs
- Unit test: Trigger click expands arguments and results
- Unit test: Status props render corresponding status badges correctly
- Unit test: JSON payload formats and renders without crashing on invalid data
- Docs: Document usage in LangGraph / agent tool-execution chat displays
