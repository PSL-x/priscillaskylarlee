# Technical Reference

Architecture, conventions, and technical details for Priscilla's portfolio site.

---

## File Structure

```
app/
  ├── page.tsx              # Homepage (Projects, Playground preview)
  ├── about/page.tsx        # About page (Current, Background, tablist toggle)
  ├── playground/           # Blog/notes section
  ├── resume/page.tsx       # Resume
  ├── work/[slug]/page.tsx  # Project case studies
  ├── layout.tsx            # Root layout
  └── globals.css           # CSS variables + global styles

components/
  ├── ClientLayout.tsx      # Client-side layout wrapper
  ├── Sidebar.tsx           # Left navigation + theme toggle
  ├── TableOfContents.tsx   # Right sidebar (desktop only, 1400px+)
  └── ThemeProvider.tsx     # Dark/Light theme management

content/
  ├── work/                 # Project markdown files
  │   ├── dna-designsystem.md
  │   └── consistency-standardization.md
  └── playground/           # Blog posts markdown files
```

---

## Next.js Specifics

- App Router (not Pages Router)
- Server components by default
- Client components marked with `'use client'`
- Image optimization not used (standard `<img>` tags)
- Markdown parsed with `gray-matter` for frontmatter

---

## Theme System

- Dark mode default
- Light mode available via toggle
- Theme stored in localStorage
- Inline script in `layout.tsx` prevents flash
- All colors use CSS variables for theme support

---

## Responsive Breakpoints

- Mobile: < 768px (48rem)
- Tablet: 768px - 1400px
- Desktop: > 1400px (87.5rem)
- Table of Contents only shows on desktop (1400px+)

---

## Browser Support

Focus on modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari
- Chrome Android

---

## Git Conventions

**Commit messages:**
```
type: brief summary (50 chars max)

- Bullet point details
- Focus on why, not what
- Reference issues if relevant
```

**Types:** feat, fix, refactor, docs, style, test, chore, a11y (accessibility)

**Branch strategy:**
- Work directly on main for small changes
- Feature branches for larger work
- Descriptive branch names: `feat/add-project`, `fix/keyboard-nav`

---

## Development Preferences

**When making changes:**
- Prefer editing existing files over creating new ones
- Keep changes focused - don't refactor surrounding code unnecessarily
- Maintain existing patterns - follow what's already there
- Ask before major architectural changes
- Update accessibility test checklist when changing interactive elements

**Code should be:**
- Production-ready, not "here's a starting point"
- Well-tested before calling it done
- Verified with difference checks

---

**Last Updated:** 2026-04-02
