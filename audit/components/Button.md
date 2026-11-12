# Button — Audit Report

**File:** `src/components/core/button.tsx` (114 lines)  
**Score: 8 / 10** — Solid foundation; minor gaps around loading animation, icon-only a11y, and reduced-motion.

---

## What's Good
- Full `forwardRef` + `displayName`.
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` — correct focus-visible usage.
- `disabled:pointer-events-none disabled:opacity-50` — proper disabled state.
- `aria-busy` + `data-loading` on loading state.
- `Slot` pattern for `asChild` polymorphism.
- Spinner has `aria-hidden="true"` and uses `shrink-0` to avoid layout shift.
- `type` defaults to `"button"` (prevents accidental form submission).
- All variants use design tokens — no hardcoded colors.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| B-01 | Major | A11y | button.tsx:39 | `icon` size has no `aria-label` enforcement — consumers can render icon-only buttons without accessible labels | Screen readers announce nothing meaningful | Document / enforce that icon-only buttons must receive `aria-label` or `title`; consider accepting `aria-label` as a required prop when `size="icon"` |
| B-02 | Minor | States | button.tsx:71 | Loading opacity is `opacity-80` while disabled uses `opacity-50` — inconsistent opacities between states | Visual language is incoherent | Align to `opacity-50` or document intentional distinction |
| B-03 | Minor | A11y | button.tsx:11 | Two loading props: `loading` and `isLoading` — both accepted but `isLoading` is undocumented legacy | API confusion; consumers may pass both and get unexpected merging | Deprecate `isLoading`, keep only `loading`; add `@deprecated` JSDoc |
| B-04 | Minor | Performance | button.tsx:83 | `animate-spin` on spinner — no `prefers-reduced-motion` guard | Motion-sensitive users see spinning even with reduced-motion preference | Add `motion-safe:animate-spin` or wrap in a CSS `@media (prefers-reduced-motion)` check |
| B-05 | Nit | API | button.tsx:14 | `fullWidth` prop applies `w-full` but `link` variant uses `p-0 h-auto` — `fullWidth` on link looks broken | Unexpected layout | Guard `fullWidth` against `link` variant or document the limitation |
| B-06 | Nit | Tokens | button.tsx:33 | `link` variant: `text-primary` — in default (non-Normal) theme `primary` is `#18181b` (near-black), not blue. | Color intent is misleading without Normal theme | Add a comment clarifying the dependency on Normal theme override |

---

## State / Variant Matrix

| Variant | Default size | sm | lg | icon | Disabled | Loading | Focus ring |
|---------|-------------|----|----|------|----------|---------|------------|
| default | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| destructive | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| outline | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| secondary | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ghost | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| link | ✅ | ✅ | ✅ | ⚠️ icon+link unusual | ✅ | ✅ | ✅ |
| prefers-reduced-motion | ❌ spinner still animates | | | | | | |

---

## Missing Tests / Docs
- No test for `loading` state preventing click events.
- No test verifying `type="button"` default.
- No test for `asChild` / `Slot` passthrough.
- No doc enforcing `aria-label` on `size="icon"`.
- `isLoading` not documented as deprecated.
