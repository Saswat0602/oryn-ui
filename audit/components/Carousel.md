# Carousel — Audit Report

## Score: 9.5 / 10 — Score updated after remediation of WCAG 2.2.2 autoplay pausing on hover and focus

---

## What's Good
- Explicit WAI-ARIA carousel pattern: `role="region" aria-roledescription="carousel"` on container, and `role="group" aria-roledescription="slide"` on slides.
- Keyboard navigation: Arrow keys navigate slides horizontally (`ArrowLeft`/`ArrowRight`) or vertically (`ArrowUp`/`ArrowDown`).
- Touch gesture support: native `onTouchStart`, `onTouchMove`, and `onTouchEnd` swipe handling with 50px delta threshold.
- Accessible buttons: Previous/Next buttons include explicit `aria-label="Previous slide"` and `aria-label="Next slide"`.
- Indicator pagination: renders numbered slide tabs with `role="tablist"` and `aria-selected`.
- Support for auto-playing slideshows with clean interval timer cleanup on unmount.
- Autoplay pauses automatically on mouse hover and keyboard focus per WCAG 2.2.2.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| CAR-01 | Major | A11y | carousel.tsx:356–363 | Autoplay does not pause on mouse hover or keyboard focus | Fixed | Added `isPaused` state triggered by `onMouseEnter`, `onFocus`, `onMouseLeave`, and `onBlur`, pausing autoplay timer per WCAG 2.2.2 |
| CAR-02 | Minor | A11y | carousel.tsx:209–234 | Indicators use `role="tab"` and `role="tablist"` | Documented | Conforms to WAI-ARIA Carousel with Tablist Pattern guidelines |
| CAR-03 | Minor | A11y | carousel.tsx:407 | Container requires direct focus for Arrow key listener | Fixed | Supported keyboard event bubbling from focused child controls |
| CAR-04 | Nit | API | carousel.tsx:437 | Compound typing assertion | Maintained | Preserves seamless dot notation (`Carousel.Content`, `Carousel.Item`, etc.) |

---

## State / Variant Matrix

| State / Feature | Arrow Keys | Touch Swipe | Previous / Next | Indicator Dots | Autoplay |
|-----------------|------------|-------------|-----------------|----------------|----------|
| Horizontal | ✅ Left / Right | ✅ Horizontal swipe | ✅ | ✅ | ✅ Pauses on hover/focus |
| Vertical | ✅ Up / Down | ✅ Vertical swipe | ✅ | ✅ | ✅ |
| Loop mode | ✅ Continuous | ✅ Continuous | ✅ | ✅ | ✅ |
| Accessible Labels | ✅ | N/A | ✅ | ✅ | N/A |

---

## Verification
- Added smoke and accessibility unit tests in `tests/smoke/media.test.tsx` verifying arrow key navigation, hover/focus events, and axe-core accessibility compliance.
