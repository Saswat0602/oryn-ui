# AspectRatio — Audit Report

## Score: 10 / 10 — Minimalist and effective CSS aspect-ratio wrapper (Status: Fixed)

---

## What's Good
- Zero runtime overhead — leverages modern native CSS `aspect-ratio` property.
- Clean ref forwarding with `React.forwardRef` and explicit `displayName`.
- Supports both numeric (`16 / 9`, `4 / 3`) and string (`"16/9"`, `"1/1"`, `"4/3"`) ratio values.
- Sane default ratio of `16 / 9` with customizable ratio number or string.
- Fully composable with responsive Tailwind classes (`relative w-full`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| ASP-01 | Nit | API | aspect-ratio.tsx:5 | `ratio?: number` only accepted numeric values, not string ratios like `"16/9"` | Developers frequently pass string notation from CSS/design tools | Typed as `ratio?: number \| string` and forwarded to CSS style | Fixed |

---

## State / Variant Matrix

| Ratio / Prop | CSS aspect-ratio Applied | Ref Forwarded | Custom ClassName |
|--------------|--------------------------|---------------|------------------|
| default (16/9) | ✅ `aspectRatio: 1.7777` | ✅ | ✅ |
| string ("16/9") | ✅ `aspectRatio: "16/9"` | ✅ | ✅ |
| 1 / 1 (square) | ✅ `aspectRatio: 1` | ✅ | ✅ |
| 4 / 3 | ✅ `aspectRatio: 1.3333` | ✅ | ✅ |
| 21 / 9 (ultrawide) | ✅ `aspectRatio: 2.3333` | ✅ | ✅ |

---

## Missing Tests / Docs
- Unit test: Applies `aspectRatio` inline style correctly
- Unit test: Ref points to underlying DOM element
- Docs: Provide quick reference table for common video/image aspect ratios
