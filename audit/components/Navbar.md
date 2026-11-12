# Navbar — Audit Report

## Score: 7.5 / 10 — Rich feature set with keyboard/ARIA navigation gaps

---

## What's Good
- Flexible dual architecture: turnkey props-based configuration OR composable compound components (`Navbar.Brand`, `Navbar.Nav`, `Navbar.Item`, `Navbar.Link`, `Navbar.Actions`).
- Semantic `<nav role="navigation">` with custom or default `aria-label="Main navigation"`.
- Clean visual design: 56px sticky header, refined border, subtle backdrop blur, and responsive breakpoint switching.
- Integrated search bar with clear button (`X`), notification dropdown menu, and user profile drawer.
- Built-in scroll listener with passive event listeners for `hideOnScroll` and `shrinkOnScroll`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| NAV-01 | Major | A11y | navbar.tsx:513–527 | Mobile hamburger toggle button lacks `aria-expanded` and `aria-controls` | Screen readers cannot announce whether the mobile navigation is expanded or collapsed | Add `aria-expanded={isMobileMenuOpen}` and `aria-controls="navbar-mobile-menu"` to the toggle button |
| NAV-02 | Major | A11y | navbar.tsx:288–344 | Nav dropdowns lack ARIA menu semantics and keyboard arrow navigation | Users navigating with keyboard cannot inspect dropdown items using standard ArrowUp/ArrowDown keys; screen readers don't announce popup status | Add `aria-haspopup="true"`, `aria-expanded={isDropdownOpen}`, `role="menu"` on popup, and roving tabindex on menu items |
| NAV-03 | Major | A11y | navbar.tsx:395–441, 447–498 | Notification and Profile dropdowns do not close on Escape key and lack outside click listeners | Keyboard users get trapped in an open dropdown with no way to dismiss without clicking outside | Add `Escape` key event listener and `useClickOutside` to automatically dismiss open menus |
| NAV-04 | Minor | A11y | navbar.tsx:404–408 | Notification badge text ("9+") is read literally without screen reader description | Visually impaired users hear "nine plus" out of context | Add an accessible label e.g. `<span className="sr-only">unread notifications</span>` |
| NAV-05 | Minor | Color | navbar.tsx:334, 487 | Danger items hardcode `text-red-500 hover:bg-red-500/10` | Inconsistent with semantic `destructive` design token variables | Change to `text-destructive hover:bg-destructive/10` |
| NAV-06 | Nit | API | navbar.tsx:23, 39 | `icon?: any` type on `NavbarNavItem` and `NavbarProfileItem` | Disables TypeScript safety check | Change to `React.ReactNode` or `React.ComponentType<{ className?: string }>` |

---

## State / Variant Matrix

| State / Feature | Desktop Nav | Mobile Menu | Dropdown Keyboard | Search | Profile Menu |
|-----------------|-------------|-------------|-------------------|--------|--------------|
| Default static | ✅ | ⚠️ Missing aria-expanded | ⚠️ Hover only, no arrows | ✅ | ⚠️ No Esc dismiss |
| Sticky / Fixed | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ |
| Shrink on scroll | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ |
| Compound mode (`Navbar.Nav`) | ✅ | N/A | Manual | N/A | N/A |

---

## Missing Tests / Docs
- Unit test: Mobile menu toggle toggles state and calls `onMobileToggle`
- Unit test: Search input updates query and triggers `onSearch`
- Unit test: Dropdown opens on trigger click and closes on escape/outside click
- Unit test: Brand click callback fires `onBrandClick`
- Docs: Document keyboard navigation conventions for multi-level navigation dropdowns
