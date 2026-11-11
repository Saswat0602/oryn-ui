# Component Behavior & Accessibility Test Checklist

Every component in `oryn-ui` must satisfy this 9-point checklist before release. Use this checklist as a template when writing new unit tests (`<component>.test.tsx`).

---

## 9-Point Verification Checklist

### 1. ARIA Roles & Pattern Conformance
- [x] Renders with default props and correct semantic HTML element or ARIA `role`.
- [x] Essential ARIA attributes present (`aria-expanded`, `aria-controls`, `aria-label`, `aria-haspopup`, `aria-modal`).
- [x] Complies with the official [W3C WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/).

### 2. Ref Forwarding
- [x] Forwards `ref` to the primary underlying DOM element (`HTMLButtonElement`, `HTMLInputElement`, `HTMLDivElement`, etc.).
- [x] Works cleanly with both `React.createRef()` and callback refs.

### 3. Attribute & Class Composition
- [x] Merges custom `className` using `cn()` from `@/lib/utils` without dropping default styles.
- [x] Spreads additional HTML attributes (e.g. `data-*`, `id`, `style`) onto the root DOM element.

### 4. Controlled State
- [x] Controlled mode: passing state (`value`, `open`, `checked`) directly controls component representation.
- [x] Callback (`onChange`, `onValueChange`, `onOpenChange`) fires when interactions occur.

### 5. Uncontrolled State
- [x] Uncontrolled mode: accepts initial default values (`defaultValue`, `defaultOpen`, `defaultChecked`).
- [x] Maintains internal state without requiring external handler wiring.

### 6. Keyboard Navigation Map
- [x] Tab / Shift+Tab moves focus correctly across focusable elements.
- [x] Arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) navigate items where applicable (Tabs, Menus, Select, Radios).
- [x] `Escape` dismisses modals, sheets, dialogs, and popovers, returning focus to the trigger.
- [x] `Enter` / `Space` activates triggers and buttons.

### 7. Disabled & Loading States
- [x] When `disabled` is true, pointer and keyboard interactions are blocked.
- [x] Sets native `disabled` attribute or `aria-disabled="true"`.
- [x] Focus cannot be received when disabled.

### 8. Automated Accessibility (`axe-core`)
- [x] `await axe(container)` reports 0 violations in default state.
- [x] `await axe(container)` reports 0 violations in open/expanded state.
- [x] `await axe(container)` reports 0 violations in disabled/error state.

### 9. Server-Side Rendering (SSR) & React 19 Compatibility
- [x] `renderToString(<Component />)` renders cleanly on the server without throwing.
- [x] No direct access to `window`, `document`, or `navigator` in the render path.
- [x] Mounts and unmounts cleanly under `<React.StrictMode>` with no listener memory leaks.

---

## Test Template Example

```tsx
import React, { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { renderToString } from 'react-dom/server'
import { MyComponent } from './my-component'

describe('MyComponent Behavior & A11y', () => {
  it('1. renders with correct ARIA role', () => {
    render(<MyComponent />)
    expect(screen.getByRole('button')).toBeDefined()
  })

  it('2. forwards ref to the DOM element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<MyComponent ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('3. merges className correctly', () => {
    const { container } = render(<MyComponent className="custom-test-class" />)
    expect(container.firstChild).toHaveClass('custom-test-class')
  })

  it('4. controlled state works with onChange', async () => {
    const user = userEvent.setup()
    let value = false
    const { rerender } = render(<MyComponent checked={value} onCheckedChange={(v) => (value = v)} />)
    await user.click(screen.getByRole('button'))
    expect(value).toBe(true)
  })

  it('5. uncontrolled mode operates independently', async () => {
    const user = userEvent.setup()
    render(<MyComponent defaultChecked={true} />)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'checked')
  })

  it('6. responds to keyboard interactions', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    await user.tab()
    expect(screen.getByRole('button')).toHaveFocus()
    await user.keyboard('{Enter}')
  })

  it('7. blocks interaction when disabled', async () => {
    const user = userEvent.setup()
    let clicked = false
    render(<MyComponent disabled onClick={() => (clicked = true)} />)
    await user.click(screen.getByRole('button'))
    expect(clicked).toBe(false)
  })

  it('8. passes automated axe accessibility audits', async () => {
    const { container } = render(<MyComponent />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('9. SSR renders without throwing', () => {
    const html = renderToString(<MyComponent />)
    expect(html).toBeTruthy()
  })
})
```
