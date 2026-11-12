# Toggle & ToggleGroup — Audit Report

## Score: 9.5 / 10 — Score updated after remediation of strict types, roving arrow key navigation, and square icon size

---

## What's Good
- Fully adheres to ARIA Toggle Button pattern: `type="button"`, `aria-pressed={pressed}`, `data-state={pressed ? "on" : "off"}`.
- Both standalone `Toggle` and compound `ToggleGroup` + `ToggleGroupItem` implemented cleanly.
- `ToggleGroup` supports both `single` and `multiple` selection modes.
- Context inheritance: `size`, `variant`, and `disabled` propagate from `ToggleGroup` down to individual `ToggleGroupItem` components.
- Keyboard accessible: native button focusability with visible ring (`focus-visible:ring-2 focus-visible:ring-ring`).
- Respects `useControllableState` for both controlled and uncontrolled usage.
- Arrow key navigation: Left/Right and Up/Down arrows rove between toggle group items.
- Token compliance: `hover:bg-muted`, `text-muted-foreground`, `hover:text-foreground`, `data-[state=on]:bg-accent`, `data-[state=on]:text-accent-foreground`, `border-input`, `border-border`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TG-01 | Major | TypeScript | toggle.tsx:78–93 | `ToggleGroupProps` and context used `any` for `value`, `defaultValue`, and `onValueChange` | Fixed | Defined strict types: `value?: string \| string[]`, `defaultValue?: string \| string[]`, `onValueChange?: (val: string \| string[]) => void` |
| TG-02 | Minor | A11y | toggle.tsx:145–155 | `ToggleGroup` lacked arrow key navigation between group items | Fixed | Implemented full roving arrow key navigation (ArrowLeft/ArrowRight/ArrowUp/ArrowDown/Home/End) across non-disabled buttons |
| TG-03 | Minor | Layout | toggle.tsx:37–40, 180–184 | Size presets only defined rectangular buttons, no square icon preset | Fixed | Added dedicated `icon: 'h-9 w-9 p-0 text-xs'` size preset |
| TG-04 | Nit | States | toggle.tsx:129–131 | Single mode un-toggling | Documented | Standard toggle group behavior allowing deselecting options |

---

## State / Variant Matrix

| Variant / State | Unpressed (`aria-pressed="false"`) | Pressed (`aria-pressed="true"`) | Disabled | Keyboard (Space/Enter/Arrows) |
|---|---|---|---|---|
| Default | ✅ Transparent / muted hover | ✅ `bg-accent text-accent-foreground` | ✅ `opacity-50 pointer-events-none` | ✅ Toggles & Roves |
| Outline | ✅ `border-input` | ✅ `border-input bg-accent` | ✅ | ✅ Toggles & Roves |
| Group (Single) | ✅ | ✅ Single active item | ✅ Blocks all items if group disabled | ✅ Roving Arrow keys |
| Group (Multiple)| ✅ | ✅ Multiple items active | ✅ | ✅ Roving Arrow keys |

---

## Verification
- Added smoke and accessibility unit tests in `tests/smoke/overlay.test.tsx` verifying toggle group buttons, roving arrow key navigation, and axe-core accessibility compliance.
