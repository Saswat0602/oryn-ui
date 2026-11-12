# PasswordInput — Audit Report

## Score: 7.5/10 — Good UX, one token issue, one state sync issue

## What's Good
- Toggle visibility with `aria-label` ("Show password" / "Hide password") ✅
- CapsLock detection with `sr-only` text announcement ✅
- Strength meter auto-calculates from value ✅
- Requirements checklist with met/unmet visual indicators ✅
- Proper `autoComplete` passthrough with default "current-password" ✅
- Password toggle button has `focus-visible:ring-2 focus-visible:ring-ring` ✅
- Eye icon has `aria-hidden="true"` ✅
- forwardRef, displayName ✅
- Delegates to base `<Input>` component ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| PI-01 | Major | States | password-input.tsx:41-45 | `internalValue` initialized from `value || defaultValue` but `currentValue` is `typeof value === "string" ? value : internalValue` — if consumer passes non-string `value` (e.g. `undefined`), falls through to `internalValue` with empty string | Mixed controlled/uncontrolled causes strength meter to show 0 even when controlled value is set | Simplify: derive `currentValue` as `String(value ?? defaultValue ?? '')` |
| PI-02 | Major | Tokens | password-input.tsx:93-97 | Strength colors use hardcoded Tailwind: `bg-red-500`, `bg-amber-500`, `bg-primary`, `bg-emerald-500` | Does not use `bg-destructive`; deviates from token system for red | Replace `bg-red-500` → `bg-destructive`; `bg-emerald-500` → consider a `--success` token |
| PI-03 | Major | Tokens | password-input.tsx:184 | Requirement met state uses `text-emerald-600 dark:text-emerald-400` hardcoded | Same token consistency issue | Replace with design token or document exception |
| PI-04 | Minor | A11y | password-input.tsx:156-174 | Strength meter bars have no `aria-label` or `role` — purely visual | Screen reader users get no feedback on password strength | Add `role="meter" aria-label="Password strength" aria-valuenow={score} aria-valuemin={0} aria-valuemax={4}` on the meter container |
| PI-05 | Minor | A11y | password-input.tsx:177-196 | Requirements list items have no `role="status"` or `aria-live` | Screen reader doesn't announce when a requirement is met | Wrap requirements section in `aria-live="polite"` region |
| PI-06 | Minor | A11y | password-input.tsx:129-133 | CapsLock indicator `<span>` has only `title` for tooltip — `sr-only` text is inside but CapsLock state changes don't trigger live announcements | Caps lock activation goes unannounced | Wrap in `aria-live="assertive"` region |
| PI-07 | Nit | A11y | password-input.tsx:170-173 | Strength label text "Weak"/"Fair"/"Good"/"Strong" is visually right-aligned but not associated with the meter | AT reads label separately from bars | Use `aria-valuetext={getStrengthLabel(score)}` on the meter element |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Show/hide toggle | ✅ |
| CapsLock detection | ✅ |
| Strength meter auto | ✅ |
| Strength meter controlled | ✅ |
| Requirements checklist | ✅ |
| Disabled state | ✅ |
| Controlled value | ⚠️ State sync issue |
| Strength announced by AT | ❌ No role="meter" |
| Requirements live announcement | ❌ No aria-live |
| Token-based strength colors | ❌ Hardcoded |
| autoComplete | ✅ |

## Missing Tests/Docs
- No tests for strength score auto-calculation per rule
- No test for toggle visibility changing input type
- No test for CapsLock detection (may require mock)
- Docs should clarify that `strengthScore` overrides auto-computed score
