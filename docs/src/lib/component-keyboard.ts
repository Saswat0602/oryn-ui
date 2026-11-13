// WAI-ARIA Keyboard Interaction specifications for ORYN UI components

export interface KeyboardInteraction {
  key: string
  description: string
}

const COMMON_FORM_KEYS: KeyboardInteraction[] = [
  { key: 'Tab', description: 'Moves focus into the control or to the next focusable field.' },
  { key: 'Shift + Tab', description: 'Moves focus to the previous focusable field.' },
  { key: 'Enter', description: 'Submits the surrounding form if applicable.' }
]

const KEYBOARD_MAP: Record<string, KeyboardInteraction[]> = {
  // Overlays
  dialog: [
    { key: 'Escape', description: 'Closes the active dialog overlay and restores focus to the trigger.' },
    { key: 'Tab', description: 'Cycles forward through focusable elements trapped inside the dialog.' },
    { key: 'Shift + Tab', description: 'Cycles backward through focusable elements inside the dialog.' }
  ],
  'alert-dialog': [
    { key: 'Escape', description: 'Closes the alert dialog or moves focus to the cancel action.' },
    { key: 'Tab', description: 'Traps focus between the action and cancel buttons.' },
    { key: 'Shift + Tab', description: 'Cycles backward between dialog actions.' }
  ],
  sheet: [
    { key: 'Escape', description: 'Closes the slide-out sheet drawer and restores focus to trigger.' },
    { key: 'Tab', description: 'Cycles focus forward inside the sheet viewport.' },
    { key: 'Shift + Tab', description: 'Cycles focus backward inside the sheet viewport.' }
  ],
  drawer: [
    { key: 'Escape', description: 'Dismisses the bottom or side drawer sheet.' },
    { key: 'Tab', description: 'Cycles focus forward through interactive drawer contents.' },
    { key: 'Shift + Tab', description: 'Cycles focus backward through drawer contents.' }
  ],
  modal: [
    { key: 'Escape', description: 'Closes the modal dialog and returns focus to the initiating element.' },
    { key: 'Tab', description: 'Traps focus within the modal container.' },
    { key: 'Shift + Tab', description: 'Reverses focus order within the modal.' }
  ],
  popover: [
    { key: 'Enter / Space', description: 'Opens or closes the popover when trigger is focused.' },
    { key: 'Escape', description: 'Dismisses the floating popover content and returns focus to trigger.' },
    { key: 'Tab', description: 'Navigates through focusable contents inside the popover.' }
  ],
  tooltip: [
    { key: 'Escape', description: 'Immediately dismisses visible tooltip without moving focus.' },
    { key: 'Tab', description: 'Focuses trigger element and displays tooltip after delay.' }
  ],
  'dropdown-menu': [
    { key: 'Enter / Space', description: 'Opens menu or executes the focused menu item action.' },
    { key: 'ArrowDown', description: 'Moves focus to the next menu item with circular wrapping.' },
    { key: 'ArrowUp', description: 'Moves focus to the previous menu item with circular wrapping.' },
    { key: 'ArrowRight', description: 'Opens nested submenu if current item is a submenu trigger.' },
    { key: 'ArrowLeft', description: 'Closes active submenu and returns focus to parent item.' },
    { key: 'Home / End', description: 'Moves focus directly to the first / last item in the menu.' },
    { key: 'Escape', description: 'Closes the menu and restores focus to the trigger button.' }
  ],
  'context-menu': [
    { key: 'ArrowDown', description: 'Moves focus to the next context menu item.' },
    { key: 'ArrowUp', description: 'Moves focus to the previous context menu item.' },
    { key: 'Enter / Space', description: 'Selects the focused menu item and closes menu.' },
    { key: 'Escape', description: 'Dismisses context menu.' }
  ],

  // Navigation
  'navigation-menu': [
    { key: 'Enter / Space', description: 'Toggles open state of the focused navigation item dropdown.' },
    { key: 'ArrowRight', description: 'Moves focus to the next horizontal navigation trigger.' },
    { key: 'ArrowLeft', description: 'Moves focus to the previous horizontal navigation trigger.' },
    { key: 'ArrowDown', description: 'Enters the active navigation submenu viewport.' },
    { key: 'Escape', description: 'Closes open navigation dropdown and returns focus to trigger.' }
  ],
  menubar: [
    { key: 'ArrowRight / Left', description: 'Cycles horizontally through top-level menubar triggers.' },
    { key: 'ArrowDown', description: 'Opens menu and focuses first item.' },
    { key: 'Enter / Space', description: 'Activates selected menu item.' },
    { key: 'Escape', description: 'Closes menu and keeps focus on the active menubar trigger.' }
  ],
  command: [
    { key: 'ArrowDown', description: 'Moves selection highlight to next command item.' },
    { key: 'ArrowUp', description: 'Moves selection highlight to previous command item.' },
    { key: 'Enter', description: 'Executes the currently highlighted command item.' },
    { key: 'Escape', description: 'Clears search input or closes dialog container.' }
  ],
  combobox: [
    { key: 'ArrowDown', description: 'Opens options dropdown or moves to next suggestion.' },
    { key: 'ArrowUp', description: 'Moves selection to previous suggestion.' },
    { key: 'Enter', description: 'Confirms selected option and closes dropdown.' },
    { key: 'Escape', description: 'Closes options menu and reverts uncommitted input.' }
  ],
  tabs: [
    { key: 'ArrowRight', description: 'Moves focus and activates the next tab in horizontal orientation.' },
    { key: 'ArrowLeft', description: 'Moves focus and activates previous tab in horizontal orientation.' },
    { key: 'ArrowDown / Up', description: 'Navigates between tabs when tabs are vertically oriented.' },
    { key: 'Home / End', description: 'Jumps focus directly to the first or last available tab.' }
  ],
  accordion: [
    { key: 'Enter / Space', description: 'Expands or collapses the focused accordion item panel.' },
    { key: 'ArrowDown', description: 'Moves focus to the next accordion header trigger.' },
    { key: 'ArrowUp', description: 'Moves focus to the previous accordion header trigger.' },
    { key: 'Home / End', description: 'Jumps focus to the first / last accordion header.' }
  ],
  pagination: [
    { key: 'ArrowRight / Left', description: 'Moves focus to next / previous page button.' },
    { key: 'Enter / Space', description: 'Navigates to the selected page number.' }
  ],
  'tree-view': [
    { key: 'ArrowDown / Up', description: 'Moves focus to next / previous visible tree node.' },
    { key: 'ArrowRight', description: 'Expands collapsed node; moves to first child if expanded.' },
    { key: 'ArrowLeft', description: 'Collapses expanded node; moves to parent node if collapsed.' },
    { key: 'Enter / Space', description: 'Selects the active tree node.' }
  ],

  // Form Controls
  button: [
    { key: 'Enter / Space', description: 'Fires the click handler or triggers form submission.' },
    { key: 'Tab', description: 'Focuses button in document tab sequence.' }
  ],
  'button-group': [
    { key: 'ArrowRight / Left', description: 'In segmented mode, moves focus and activates adjacent button.' },
    { key: 'Tab', description: 'Moves focus into or out of the button group.' }
  ],
  toggle: [
    { key: 'Enter / Space', description: 'Toggles pressed state between true and false.' }
  ],
  switch: [
    { key: 'Enter / Space', description: 'Toggles switch checked state on/off.' }
  ],
  checkbox: [
    { key: 'Space', description: 'Toggles checkbox between checked and unchecked.' }
  ],
  'radio-group': [
    { key: 'ArrowDown / Right', description: 'Selects and moves focus to next radio option.' },
    { key: 'ArrowUp / Left', description: 'Selects and moves focus to previous radio option.' },
    { key: 'Space', description: 'Checks the currently focused radio option if unchecked.' }
  ],
  select: [
    { key: 'Enter / Space', description: 'Opens dropdown or picks the highlighted choice.' },
    { key: 'ArrowDown', description: 'Highlights the next option.' },
    { key: 'ArrowUp', description: 'Highlights the previous option.' },
    { key: 'Escape', description: 'Closes the options menu without changing value.' }
  ],
  'multi-select': [
    { key: 'Enter / Space', description: 'Toggles selection on highlighted option.' },
    { key: 'Backspace', description: 'Removes the last selected tag pill when input is empty.' },
    { key: 'Escape', description: 'Dismisses suggestions menu.' }
  ],
  slider: [
    { key: 'ArrowRight / Up', description: 'Increments slider value by one step.' },
    { key: 'ArrowLeft / Down', description: 'Decrements slider value by one step.' },
    { key: 'PageUp', description: 'Increments slider value by larger step.' },
    { key: 'PageDown', description: 'Decrements slider value by larger step.' },
    { key: 'Home / End', description: 'Sets slider value to min / max.' }
  ],
  rating: [
    { key: 'ArrowRight / Up', description: 'Increments star rating by defined precision step.' },
    { key: 'ArrowLeft / Down', description: 'Decrements star rating by defined precision step.' }
  ],
  'input-otp': [
    { key: '0 - 9', description: 'Enters digit into current slot and automatically shifts focus to next slot.' },
    { key: 'Backspace', description: 'Deletes digit in current slot and moves focus back to previous slot.' },
    { key: 'ArrowLeft / Right', description: 'Manually navigates cursor across OTP input slots.' }
  ],
  calendar: [
    { key: 'ArrowLeft / Right', description: 'Moves date selection by one day.' },
    { key: 'ArrowUp / Down', description: 'Moves date selection by one week.' },
    { key: 'PageUp / PageDown', description: 'Jumps to previous / next month.' },
    { key: 'Enter / Space', description: 'Confirms selected calendar date.' }
  ],
  'date-range-picker': [
    { key: 'Arrows', description: 'Navigates calendar days across range selection.' },
    { key: 'Enter / Space', description: 'Selects range start date on first click, end date on second click.' },
    { key: 'Escape', description: 'Closes calendar popover.' }
  ]
}

export function getComponentKeyboardInteractions(slug: string): KeyboardInteraction[] {
  if (KEYBOARD_MAP[slug]) {
    return KEYBOARD_MAP[slug]
  }

  // Check aliases or generic fallback
  const canonical = slug.toLowerCase().replace(/[^a-z0-9-]/g, '')
  if (KEYBOARD_MAP[canonical]) {
    return KEYBOARD_MAP[canonical]
  }

  return COMMON_FORM_KEYS
}
