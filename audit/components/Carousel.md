# Carousel — Audit Report

## Score: 8.5 / 10 — Feature-rich slider with autoplay pause gap

---

## What's Good
- Explicit WAI-ARIA carousel pattern: `role="region" aria-roledescription="carousel"` on container, and `role="group" aria-roledescription="slide"` on slides.
- Keyboard navigation: Arrow keys navigate slides horizontally (`ArrowLeft`/`ArrowRight`) or vertically (`ArrowUp`/`ArrowDown`).
- Touch gesture support: native `onTouchStart`, `onTouchMove`, and `onTouchEnd` swipe handling with 50px delta threshold.
- Accessible buttons: Previous/Next buttons include explicit `aria-label="Previous slide"` and `aria-label="Next slide"`.
- Indicator pagination: renders numbered slide tabs with `role="tablist"` and `aria-selected`.
- Support for auto-playing slideshows with clean interval timer cleanup on unmount.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| CAR-01 | Major | A11y | carousel.tsx:356–363 | Autoplay does not pause on mouse hover or keyboard focus | Violates WCAG 2.1 SC 2.2.2 (Pause, Stop, Hide): automatically advancing content that lasts >5 seconds must pause on hover and focus so users can read content | Pause autoplay interval whenever the container is hovered or focused (`onMouseEnter`, `onFocus`, `onMouseLeave`, `onBlur`) |
| CAR-02 | Minor | A11y | carousel.tsx:209–234 | Indicators use `role="tab"` and `role="tablist"`, but slides do not have corresponding `role="tabpanel"` or `aria-labelledby` | Screen readers encounter tablist relationships without corresponding panel landmarks | Either wire slides as `tabpanel` with `id`/`aria-controls` or use standard list indicator semantics |
| CAR-03 | Minor | A11y | carousel.tsx:407 | Container requires direct focus (`tabIndex={0}`) for Arrow key listener to fire | When focus enters a child button/link inside a slide, Arrow keys no longer navigate the carousel | Listen to `onKeyDown` with event bubbling from child elements |
| CAR-04 | Nit | API | carousel.tsx:437 | `as unknown as CompoundedCarousel` double type assertion | Clunky TypeScript workaround | Use typed interface intersection on forwardRef declaration |

---

## State / Variant Matrix

| State / Feature | Arrow Keys | Touch Swipe | Previous / Next | Indicator Dots | Autoplay |
|-----------------|------------|-------------|-----------------|----------------|----------|
| Horizontal | ✅ Left / Right | ✅ Horizontal swipe | ✅ | ✅ | ⚠️ No pause on focus |
| Vertical | ✅ Up / Down | ✅ Vertical swipe | ✅ | ✅ | ⚠️ |
| Loop mode | ✅ Continuous | ✅ Continuous | ✅ | ✅ | ⚠️ |
| Accessible Labels | ✅ | N/A | ✅ | ✅ | N/A |

---

## Missing Tests / Docs
- Unit test: ArrowLeft and ArrowRight keys advance slides
- Unit test: Previous and Next buttons trigger slide transition
- Unit test: Touch swipe gestures advance slides
- Unit test: Autoplay timer advances slides after interval
- Docs: Document WCAG 2.2.2 guidelines on autoplay pausing
