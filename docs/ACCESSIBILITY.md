# Accessibility Standards

WCAG 2.1 AA requirements for Priscilla's portfolio site.

See `ACCESSIBILITY_TEST_CHECKLIST.md` for testing procedures.

---

## Keyboard Navigation

- All interactive elements must be keyboard accessible (Tab, Enter, Space)
- Tab order follows logical flow: Sidebar → Main Content → Table of Contents
- Focus indicators: 3px thick (`0.1875rem`), visible in both themes
- Custom patterns: Arrow keys for tablists (Full Story/TL;DR toggle)

---

## ARIA Attributes

- Interactive divs must be `<button>` elements
- Toggles use `aria-pressed` or `aria-selected`
- Expandable sections use `aria-expanded` + `aria-controls`
- Tablists use `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Decorative SVGs have `aria-hidden="true"`

---

## Color Contrast

- Dark mode: #e8e8e8 on #1a1a1a (body), #a0a0a0 on #1a1a1a (muted)
- Light mode: #1a1a1a on #f5f5f5 (body), #595959 on #f5f5f5 (muted) - must pass 4.5:1
- All interactive elements maintain 4.5:1 contrast ratio

---

## Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3)
- Navigation in `<nav>` with `aria-label`
- Main content in `<main id="main-content">`
- Skip link for keyboard users
- All images have descriptive alt text (or `aria-hidden` if decorative)

---

## Testing

**Manual testing:**
- Tab through entire site (keyboard only)
- Toggle themes and verify contrast
- Check responsive behavior
- Verify focus indicators visible

**Automated testing:**
- Lighthouse accessibility score (target: 95+)
- axe DevTools (0 critical issues)

See `ACCESSIBILITY_TEST_CHECKLIST.md` for detailed testing procedures.

---

**Last Updated:** 2026-04-02
