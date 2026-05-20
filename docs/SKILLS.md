# Custom Skills

Skills for Priscilla's Portfolio Site - personalizing Claude Code workflows.

---

## /accessibility-check

**Goal:** Run a comprehensive accessibility audit on recent changes.

**What to do:**
1. Check keyboard navigation on modified pages (Tab order, focus indicators)
2. Verify ARIA attributes are correct (aria-expanded, aria-pressed, aria-label)
3. Test color contrast ratios in both light and dark mode
4. Ensure all interactive elements are keyboard accessible
5. Verify screen reader compatibility (proper roles, labels, alt text)
6. Check for any decorative SVGs missing aria-hidden="true"
7. Report findings with specific file:line references

**Context:**
- Site supports both dark and light modes
- Focus indicators should be 0.1875rem (3px) thick
- Light mode muted text must meet 4.5:1 contrast (#595959)
- All interactive divs should be proper buttons
- Follow WCAG 2.1 AA standards

**Output:** Checklist of issues found with severity (Critical/High/Medium/Low)

---

## /design-consistency

**Goal:** Check if new components follow existing design system patterns.

**What to check:**
1. Uses CSS variables from globals.css (--space-*, --text-*, colors)
2. Spacing follows the 8px scale (--space-1 through --space-16)
3. Typography uses defined scale (--text-xs through --text-3xl)
4. Font families use variables (--font-mono, --font-serif)
5. Colors use theme variables (--foreground, --muted, --background, etc.)
6. Interactive states have proper transitions
7. Follows existing component patterns

**Context:**
- Site uses inline styles (not Tailwind classes)
- Spacing scale: 8px base (0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem, 8rem)
- Typography: DM Mono (body), Bebas Neue (headings)
- Theme switching supported (dark/light modes)

**Output:** List of inconsistencies or patterns not followed and suggestions on how to resolve each issue

---

## /pre-deploy

**Goal:** Comprehensive pre-deployment checklist before pushing changes.

**Steps:**
1. Run accessibility check (keyboard nav, ARIA, contrast)
2. Check design consistency (variables, spacing, patterns)
3. Verify all images have alt text
4. Check for console.log or debugging code
5. Verify theme switching works in both modes
6. Check responsive breakpoints (mobile, tablet, desktop)
7. Ensure no hardcoded values that should use CSS variables
8. Verify all links work and external links have proper attributes

**Context:**
- Breakpoints: mobile (< 768px), tablet (768-1400px), desktop (> 1400px)
- Table of Contents only visible at 1400px+ (87.5rem)
- Site should work keyboard-only

**Output:** Go/No-go decision with any blockers listed

---

## /content-update

**Goal:** Help update portfolio content (projects, about, work experience) while maintaining consistency.

**Guidelines:**
1. Match existing tone: direct, authentic, no marketing fluff
2. Keep paragraphs concise (2-4 sentences max)
3. Use active voice and first person
4. Highlight human impact and decision-making in AI context
5. Connect work to values: integrity, humility, grit, valor, sincerity "fail better" 
6. Include specific outcomes/metrics when available

**Tone examples:**
- ✅ "Built and lead our small team, aligning stakeholders..."
- ❌ "Spearheaded innovative cross-functional initiatives..."
- ✅ "It's critical for us to govern where human judgement is needed"
- ❌ "We leverage cutting-edge solutions to optimize..."

**Output:** Revised content that matches site voice

---

## /add-note

**Goal:** Create a new note/blog post following existing structure.

**What to do:**
1. Create file in `content/notes/[slug].md`
2. Include frontmatter: title, date (YYYY-MM-DD), tags, excerpt
3. Follow existing markdown structure (h2 for sections, code blocks, etc.)
4. Keep tone conversational and thoughtful
5. Use examples and concrete details
6. Connect to portfolio themes when relevant

**Structure:**
```markdown
---
title: "Your Title Here"
date: "YYYY-MM-DD"
tags: ["design", "thinking", "making"]
excerpt: "Brief summary (1-2 sentences)"
---

# Title

Opening paragraph...

## Section Heading

Content...
```

**Context:**
- Existing tags: design, thinking, making, edc, systems
- Voice: reflective, practical, honest about trade-offs
- Length: 300-800 words typically

---

## /optimize-images

**Goal:** Check and optimize images for web performance.

**What to check:**
1. Image file sizes (flag anything > 500KB)
2. Proper formats (use WebP when possible)
3. Responsive images (srcset if needed)
4. Alt text present and descriptive
5. Loading strategy (lazy load below fold)
6. Proper aspect ratios maintained

**Context:**
- Cover images typically 16:9 aspect ratio
- Album art is 3rem x 3rem
- All images should have alt text
- No decorative images should use role="img"

**Output:** List of images to optimize with recommendations

---

## /test-keyboard-nav

**Goal:** Generate a keyboard navigation test plan for modified pages.

**What to include:**
1. List all interactive elements in tab order
2. Expected keyboard behavior for each (Tab, Enter, Space, Arrow keys)
3. Focus indicator visibility check
4. Any custom keyboard shortcuts
5. Roving tabindex patterns if applicable

**Context:**
- Tab should move through all interactive elements
- Arrow keys used for: tablist (Full Story/TL;DR toggle)
- Enter/Space should activate buttons and links
- Focus indicators: 3px outline, visible in both themes

**Output:** Step-by-step testing script

---

## /review-commit

**Goal:** Review changes before committing to ensure quality and consistency.

**What to check:**
1. No commented-out code left behind
2. No TODO comments without issues/tickets
3. Console.logs removed
4. Imports cleaned up (no unused)
5. Consistent code style with existing files
6. No hardcoded values that should be configurable
7. Changes align with existing patterns

**Output:** Approval or list of items to address

---

## /clarify-language

**Goal:** Review content and suggest more natural, authentic phrasing.

**Guidelines:**
- Flag corporate jargon ("leverage", "synergy", "spearhead")
- Suggest simpler alternatives for complex phrases
- Point out passive voice → active voice opportunities
- Identify vague statements that need specifics
- Check for consistency with existing voice

**My voice:**
- Direct and unpretentious
- Honest about trade-offs
- First-person perspective
- Technical precision when needed, but accessible
- Avoids: buzzwords, marketing speak, false modesty

**Output:** Specific line-by-line suggestions

---

## Custom Skill Template

Use this template to add new skills:

```markdown
## /skill-name

**Goal:** What this skill accomplishes

**What to do:**
1. Step by step instructions
2. Include context about preferences
3. Any specific checks or validations

**Context:**
- Relevant project details
- Preferences or constraints
- Examples if helpful

**Output:** What format the results should be in
```

---

## Tips for Using Skills

1. **Invoke with `/skill-name`** in chat
2. Skills can call other skills (e.g., `/pre-deploy` calls `/accessibility-check`)
3. Update this file as your workflow evolves
4. Skills remember context from CLAUDE.md and memory files
5. Be specific about your preferences - Claude will follow them

---

## Workflows

Common workflows extracted from CLAUDE.md for quick reference.

### Adding New Content

**Project case study:**
1. Create `.md` file in `content/work/`
2. Frontmatter: title, company, year, tags, coverImage, summary
3. Structure: Situation, Impact, Role, (optional: A Note on AI), Notes
4. Keep tone direct, include metrics, connect to themes

**Blog post/note:**
1. Create `.md` file in `content/playground/`
2. Frontmatter: title, date (YYYY-MM-DD), tags, excerpt
3. Tags: design, thinking, making, edc, systems, process, reflection
4. Voice: reflective, practical, honest about trade-offs
5. Length: 300-800 words typically

### Before Committing Changes

Run through these checks:
1. **Accessibility**: Keyboard nav works, ARIA correct, contrast passes
2. **Design consistency**: Uses CSS variables, follows patterns
3. **Code quality**: No console.logs, no commented code, imports cleaned
4. **Content**: No typos, voice matches, no corporate jargon

### Common Tasks

**Update About Page Content:**
Maintain balance of:
- Current work (design systems + quality at SAP)
- Background (third culture kid, design + CS)
- Personal interests (triathlon, dodgeball, hardcore, coffee, tinkering)
- Core themes (human agency, AI, systems thinking)

**Add Project to Homepage:**
Projects in `content/work/` auto-populate.
- DNA Design System always appears first (hardcoded sort)
- Cover images: 16:9 aspect ratio
- Summary: 1-2 sentences, specific outcomes

**Update Skills/Explorations:**
Current explorations on About page reflect:
- Human agency in AI age
- Navigating systems beyond control
- Genuine human connection

Keep these thematically connected to design systems work.

---

**Last Updated:** 2026-04-02
