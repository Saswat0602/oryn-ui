# ReasoningDisclosure — Audit Report

## Score: 8.5 / 10 — Specialized AI reasoning block with proper disclosure ARIA wiring

---

## What's Good
- Fully compliant WAI-ARIA disclosure pattern: trigger button has `aria-expanded={open}` and `aria-controls={contentId}` bound to content container ID.
- Dynamic AI streaming states: shows spinning `Sparkles` icon, animated ping badge, and "Thinking..." indicator when `isStreaming=true`.
- Monospace output styling with `whitespace-pre-wrap break-words` prevents long thoughts/JSON traces from causing overflow.
- Clean collapsible summary preview in collapsed state (`— {summary}`) on larger screens.
- Full controlled and uncontrolled state support via `useControllableState`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| REA-01 | Minor | A11y | reasoning-disclosure.tsx:83–87 | "Thinking..." streaming indicator lacks a live region (`role="status"` or `aria-live="polite"`) | Screen readers do not announce to the user that thinking/reasoning is currently in progress | Wrap the streaming text in a container with `role="status"` and `aria-live="polite"` |
| REA-02 | Minor | A11y | reasoning-disclosure.tsx:56 | Trigger button lacks explicit `focus-visible:ring-2` styling | Keyboard focus ring may be faint or inconsistent across browsers | Add `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` |
| REA-03 | Nit | Layout | reasoning-disclosure.tsx:97–103 | Content container opens/closes abruptly with no smooth height accordion transition | Sudden layout shift when expanded | Add CSS grid transition (`grid grid-rows-[0fr] data-[expanded]:grid-rows-[1fr]`) or slide animation |

---

## State / Variant Matrix

| State / Prop | aria-expanded | aria-controls | Thinking Badge | Duration Badge | Summary Preview |
|--------------|---------------|---------------|----------------|----------------|-----------------|
| Collapsed | ✅ false | ✅ | If streaming | If provided | ✅ |
| Expanded | ✅ true | ✅ | If streaming | If provided | Hidden |
| Streaming | ✅ | ✅ | ✅ Animated | ✅ | ✅ |
| Focus ring | ⚠️ Default only | — | — | — | — |

---

## Missing Tests / Docs
- Unit test: Trigger click toggles `aria-expanded` and reveals content
- Unit test: Streaming mode displays `Thinking...` and sparkles icon
- Unit test: Controlled `open` and `onOpenChange` callbacks work properly
- Docs: Document usage in LLM reasoning engines (DeepSeek R1, OpenAI o1/o3 reasoning models)
