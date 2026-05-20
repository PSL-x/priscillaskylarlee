# Design System Reference

See `app/globals.css` for all CSS variable values.

---

## CSS Variables

**Source of truth:** `app/globals.css` defines all CSS variables in the `:root` selector.

**Design system structure:**
- **Spacing scale** (8px base): `--space-0` through `--space-16`
- **Typography scale**: `--text-xs` through `--text-3xl`
- **Colors**: `--foreground`, `--background`, `--muted`, `--accent`, `--border`, `--sidebar-bg`, `--tag-bg`, `--status-active`
- **Fonts**: `--font-mono` (DM Mono), `--font-serif` (Bebas Neue)

**Theme support:** Light mode overrides defined in `:root[data-theme='light']` and `html[data-theme='light']`.

Refer to `app/globals.css` for complete variable definitions and values.

---

## Design Patterns

**Always use CSS variables - never hardcode:**
- ✅ `marginBottom: 'var(--space-4)'`
- ❌ `marginBottom: '2rem'`

**Styling approach:**
- Inline styles (not Tailwind utility classes)
- CSS variables for all spacing, typography, colors
- Transitions: 0.2s typical for interactive states
- Border radius: 0.25rem (4px) or 0.375rem (6px)

**Component patterns:**
- Buttons: transparent background, proper ARIA, cursor pointer, focus states
- Links: color `var(--muted)`, smooth transitions
- Headings: h1/h2 use `--font-serif`, h3 uses `--font-mono` uppercase

---

## Code Style

**When writing code:**
- Comment only where logic isn't self-evident
- No TODOs without context or issue references
- Clean up unused imports/variables
- Consistent quote style: single quotes for JS, double for JSX attributes

**Design consistency rules:**
- Never hardcode spacing values - always use `--space-*` variables
- Never hardcode colors - always use theme variables
- Never hardcode font sizes - always use `--text-*` variables
- All interactive elements need proper focus states
- All transitions should be 0.2s unless specific reason

---

**Last Updated:** 2026-04-02
