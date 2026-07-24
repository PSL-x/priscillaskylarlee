# Adding Playground Posts

## How it works

Every `.md` file in `content/playground/` automatically becomes a post. The filename becomes the URL slug — `lisfranc.md` becomes `/playground/lisfranc`. No registration, no config changes needed.

Posts are sorted by date (newest first) on the list page.

---

## Template

Copy this and fill it in:

```md
---
title: "Your Title Here"
date: "YYYY-MM-DD"
tags: ["tag-one"]
excerpt: "One or two sentences shown on the list page. Make it count."
---

# Your Title Here

Your content starts here.
```

Save it to `content/playground/your-slug-here.md` and it appears on the site immediately.

---

## Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Shown on list and post pages |
| `date` | Yes | Format: `YYYY-MM-DD`. Controls sort order. |
| `tags` | Yes | Array. Use existing tags (see below) or add new ones. |
| `excerpt` | Yes | Shown on the list page below the title. 1–2 sentences. |
| `images` | No | Add if you want a static cover image on the list page. |
| `video` | No | Add if you want an autoplaying looping video cover instead of an image. Takes priority over `images` if both are set. |

---

## Tags

Current tags and what goes in each:

| Tag | Use for |
|---|---|
| `design` | Design systems, AI, tooling, process, anything work-adjacent |
| `music` | Concerts, artists, anything music |
| `health/sports` | Triathlon, training, injury, physical stuff |
| `things` | Gear, EDC, objects, making |
| `thoughts for the void` | Reflective writing — add alongside another tag, not as the only one |

A post can have multiple tags: `tags: ["health/sports", "thoughts for the void"]`

---

## Adding a cover image

If you want a cover image to show on the list page, add an `images` field:

```md
images:
  - "/images/playground/your-image.jpg"
```

Drop the image in `public/images/playground/`. The first image in the array is used as the cover. If no `images` field is present, no cover shows — the post just lists as title + excerpt.

---

## Writing format

Use standard markdown. `##` headings become TOC items on the right panel when reading a post.

```md
## Section title

Paragraph text here.

**Bold text** for emphasis. *Italic* for titles/terms.

- Bullet list
- For genuinely list-like things
```

Avoid starting sentences with fragments for dramatic effect — see `docs/VOICE.md` for the full writing guide.

---

## Filename conventions

- Use lowercase, hyphens only: `japan-two-months.md` not `Japan Two Months.md`
- Keep it short: `coffee-timer-app.md` not `building-a-v60-pour-over-timer-web-app.md`
- The filename becomes the URL, so make it readable

---

## Example: text post

```md
---
title: "Two Months in Japan"
date: "2026-08-15"
tags: ["thoughts for the void"]
excerpt: "What I expected, what I got, and why I keep going back."
---

# Two Months in Japan

Content here...

## What I expected

...

## What I got

...
```

## Example: post with cover image

```md
---
title: "Tokyo Neighborhoods"
date: "2026-08-20"
tags: ["places"]
excerpt: "A running list of neighborhoods worth spending time in."
images:
  - "/images/playground/tokyo-cover.jpg"
---

# Tokyo Neighborhoods

Content here...
```
