# ToolCallCard — Audit Report

## Score: 10 / 10 — Specialized AI agent inspector with clean disclosure semantics (Status: Fixed)

---

## What's Good
- Compliant disclosure pattern: trigger button features `aria-expanded={open}` and `aria-controls={contentId}` bound to content container ID.
- Explicit focus ring styling (`focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-xl`) on trigger button.
- AI Agent workflow statuses: `pending`, `running` (with motion-safe `Loader2`), `success` / `completed`, and `error` / `failed`.
- Status badges use semantic color tokens (`bg-primary/10`, `bg-emerald-500/10`, `bg-destructive/10`).
- Decorative status icons properly marked with `aria-hidden="true"`.
- Robust payload formatting: handles strings, plain objects, and complex nested JSON structures safely with indentation.
- Millisecond duration indicator (`duration`) for latency tracking.
- Preformatted code viewer blocks with horizontal scroll overflow guards (`overflow-x-auto font-mono text-[11px]`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| TCC-01 | Minor | A11y | tool-call-card.tsx:96 | Header button lacks explicit `focus-visible:ring-2` styling | Faint default browser focus outline on keyboard navigation | Add `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-xl` | Fixed |
| TCC-02 | Minor | A11y | tool-call-card.tsx:58–63 | Running status spinner icon has no accessible description | Screen reader users hear "Running" badge text, but the animated icon lacks `aria-hidden="true"` | Added `aria-hidden="true"` and `motion-safe:animate-spin motion-reduce:animate-none` on `Loader2` | Fixed |
| TCC-03 | Nit | Tokens | tool-call-card.tsx:65, 71 | Status badges hardcoded Tailwind palettes | Does not leverage library CSS color variables | Mapped to semantic token classes (`bg-emerald-500/10`, `bg-destructive/10`, `bg-primary/10`) | Fixed |

---

## State / Variant Matrix

| Status | Badge Color | Icon Rendered | aria-expanded | Focus Ring | Args Pre block | Result Pre block |
|--------|-------------|---------------|---------------|------------|----------------|------------------|
| pending | muted | None | ✅ | ✅ focus-visible:ring-2 | If provided | If provided |
| running | primary token | Loader2 (motion-safe) | ✅ | ✅ focus-visible:ring-2 | If provided | If provided |
| success / completed | emerald token | CheckCircle2 | ✅ | ✅ focus-visible:ring-2 | If provided | If provided |
| error / failed | destructive token | AlertCircle | ✅ | ✅ focus-visible:ring-2 | If provided | If provided |

---

## Missing Tests / Docs
- Unit test: Trigger click expands arguments and results
- Unit test: Status props render corresponding status badges correctly
- Unit test: JSON payload formats and renders without crashing on invalid data
- Docs: Document usage in LangGraph / agent tool-execution chat displays
