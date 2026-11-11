---
name: oryn-ui-test
description: >-
  Use this skill whenever authoring, updating, or debugging unit, SSR, or accessibility
  tests for components in ORYN UI. Enforces the 9-point behavior checklist including ARIA roles,
  ref forwarding, controlled/uncontrolled states, keyboard navigation, axe-core audit, and React StrictMode/SSR compatibility.
---

# ORYN UI Testing & Accessibility Engineering Skill

This skill documents how to author and maintain robust unit, SSR, and accessibility tests for **ORYN UI** components using Vitest, React Testing Library, and `vitest-axe`.

---

## 1. Test Architecture

- **Runner**: Vitest (`vitest run` or `npm run test`)
- **Environment**: jsdom with `@testing-library/react` and `@testing-library/user-event`
- **Setup File**: `tests/setup.ts` (configures `vitest-axe` matchers: `expect.extend(toHaveNoViolations)`)
- **Primary Suite**: `tests/smoke.test.tsx` (for smoke & universal component sanity) or dedicated component test files (`tests/<component>.test.tsx`)

---

## 2. The 9-Point Verification Checklist

Every component must satisfy these 9 criteria:

1. **ARIA Roles & Pattern Conformance**:
   - Renders with semantic HTML elements or correct ARIA `role`.
   - Essential attributes present (`aria-expanded`, `aria-controls`, `aria-label`, `aria-haspopup`, `aria-modal`).
2. **Ref Forwarding**:
   - Forwards `ref` to the primary underlying DOM element via `React.forwardRef`.
3. **Attribute & Class Composition**:
   - Merges custom `className` using `cn()` without discarding base styles.
   - Spreads standard HTML attributes onto the root element.
4. **Controlled State**:
   - Explicit props (`value`, `open`, `checked`) control the component.
   - Change handlers (`onChange`, `onValueChange`, `onOpenChange`) trigger on interaction.
5. **Uncontrolled State**:
   - Default props (`defaultValue`, `defaultOpen`, `defaultChecked`) initialize internal state.
6. **Keyboard Navigation**:
   - `Tab` / `Shift+Tab` moves focus correctly.
   - `Enter` / `Space` activates triggers and buttons.
   - `Escape` dismisses overlays and returns focus to the trigger.
   - Arrow keys navigate lists, menus, and tabs where applicable.
7. **Disabled & Loading States**:
   - Pointer and keyboard events blocked when disabled (`aria-disabled="true"` or `disabled`).
8. **Automated Accessibility (`axe-core`)**:
   - `await axe(container)` must report 0 accessibility violations.
9. **Server-Side Rendering (SSR) & React 19 StrictMode**:
   - `renderToString(<Component />)` renders cleanly on the server without throwing.
   - No direct access to `window` or `document` during the initial render pass.
   - Mounts and unmounts cleanly under `<React.StrictMode>` without listener leaks.

---

## 3. Canonical Test Template

```tsx
import React, { StrictMode, createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { renderToString } from 'react-dom/server'
import { ExampleComponent } from '../src/components/core/example'

describe('ExampleComponent Test Suite', () => {
  it('renders correctly in StrictMode', () => {
    render(
      <StrictMode>
        <ExampleComponent>Content</ExampleComponent>
      </StrictMode>
    )
    expect(screen.getByText('Content')).toBeDefined()
  })

  it('forwards ref to the underlying DOM node', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ExampleComponent ref={ref}>Ref Target</ExampleComponent>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('handles user click interaction', async () => {
    const user = userEvent.setup()
    let clicked = false
    render(<ExampleComponent onClick={() => { clicked = true }}>Click Me</ExampleComponent>)
    await user.click(screen.getByText('Click Me'))
    expect(clicked).toBe(true)
  })

  it('renders via SSR without throwing', () => {
    const html = renderToString(<ExampleComponent>SSR Test</ExampleComponent>)
    expect(html).toContain('SSR Test')
  })

  it('has zero accessibility violations', async () => {
    const { container } = render(<ExampleComponent>Accessible Content</ExampleComponent>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

---

## 4. Running & Validating Tests

```bash
# Run the full test suite
npm run test

# Run tests in watch mode
npx vitest

# Run only smoke test suite
npx vitest run tests/smoke.test.tsx
```
