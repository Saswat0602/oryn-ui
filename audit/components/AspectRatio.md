# AspectRatio — Audit Report

## Score: 9.0 / 10 — Minimalist and effective CSS aspect-ratio wrapper

---

## What's Good
- Zero runtime overhead — leverages modern native CSS `aspect-ratio` property.
- Clean ref forwarding with `React.forwardRef` and explicit `displayName`.
- Sane default ratio of `16 / 9` with customizable ratio number.
- Fully composable with responsive Tailwind classes (`relative w-full`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| ASP-01 | Nit | API | aspect-ratio.tsx:5 | `ratio?: number` only accepts numeric values (e.g. `16 / 9` = `1.777`), not string ratios like `"16/9"` or `"4/3"` | Developers frequently pass string notation from CSS/design tools, causing TypeScript type errors | Change type to `ratio?: number \| string` and pass directly to CSS style |

---

## State / Variant Matrix

| Ratio / Prop | CSS aspect-ratio Applied | Ref Forwarded | Custom ClassName |
|--------------|--------------------------|---------------|------------------|
| default (16/9) | ✅ `aspectRatio: 1.7777` | ✅ | ✅ |
| 1 / 1 (square) | ✅ `aspectRatio: 1` | ✅ | ✅ |
| 4 / 3 | ✅ `aspectRatio: 1.3333` | ✅ | ✅ |
| 21 / 9 (ultrawide) | ✅ `aspectRatio: 2.3333` | ✅ | ✅ |

---

## Missing Tests / Docs
- Unit test: Applies `aspectRatio` inline style correctly
- Unit test: Ref points to underlying DOM element
- Docs: Provide quick reference table for common video/image aspect ratios
