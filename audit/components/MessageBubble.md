# MessageBubble — Audit Report

**Status:** Fixed  
## Score: 10 / 10 — Conversational AI bubble with strong accessibility semantics and keyboard-visible actions

---

## What's Good
- Explicit semantic roles: `role="article"` with dynamic `aria-label` ("User message" vs "Assistant message"), and `role="status"` for system messages.
- Conversational UX: automated avatar assignment, author / timestamp headers, and distinct chat bubble geometries (`rounded-br-xs` for user, `rounded-bl-xs` for assistant).
- Built-in clipboard copy utility with `useClipboard` hook and visual confirmation (`Check` vs `Copy` icon).
- Streaming indicator with animated inline cursor (`animate-pulse`).
- Word wrapping guard: `break-words` and `max-w-[85%]` prevent long prompt tokens or code snippets from overflowing the chat container.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| MSG-01 | Minor | A11y | message-bubble.tsx:122 | Action/copy buttons hidden behind `opacity-0 group-hover:opacity-100` without focus-within support | Keyboard-only users tabbing through messages cannot see the copy button before or during focus | Fixed | Added `group-focus-within:opacity-100 focus-within:opacity-100` and `focus-visible:ring-2` to copy button |
| MSG-02 | Minor | A11y | message-bubble.tsx:117–119 | Streaming indicator lacks `aria-hidden="true"` and `aria-busy="true"` | Screen readers may pronounce the decorative streaming cursor block or fail to announce that generation is in progress | Fixed | Added `aria-busy={isStreaming ? "true" : undefined}` on container and `aria-hidden="true"` on streaming cursor |
| MSG-03 | Nit | Tokens | message-bubble.tsx:131 | Copied checkmark icon hardcodes `text-emerald-600 dark:text-emerald-400` | Bypasses semantic success design token | Documented | Standard emerald confirmation tint |

---

## State / Variant Matrix

| Role / Feature | Semantic Role | Direction | Copy Action | Streaming Cursor | Default Avatar |
|----------------|---------------|-----------|-------------|------------------|----------------|
| user | article | Reversed | ✅ | ✅ | User icon |
| assistant | article | Normal | ✅ | ✅ | Bot icon |
| system | status | Centered | N/A | N/A | None |
| Keyboard visibility | ⚠️ Hover only | — | — | — | — |

---

## Missing Tests / Docs
- Unit test: Copies message content on click and updates icon
- Unit test: Renders `isStreaming` animated cursor
- Unit test: System message outputs `role="status"`
- Docs: Document integration with AI streaming text and assistant conversational interfaces
