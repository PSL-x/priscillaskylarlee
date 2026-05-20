---
title: "How Design Systems Evolve"
date: "2026-03-05"
tags: ["design", "thinking"]
excerpt: "Thoughts on the lifecycle of design systems and why the best ones are never really done. Some patterns emerge from observing how teams actually work."
---

# How Design Systems Evolve

Four design systems built or maintained so far, enough to see the pattern repeat.

## The same arc, every time

It starts with an audit. Someone looks at the product and notices 14 button variants, 8 grays, screens that don't feel like they belong to the same product. A spreadsheet gets made. Everyone agrees something has to change.

Then the system gets built: components, tokens, documentation. It's thorough and it launches.

Then reality. Designers can't find what they need. Engineers route around it because filing a request takes longer than writing the component themselves. Edge cases appear that weren't anticipated. The system starts to feel like overhead rather than infrastructure.

This is the fork. Either teams abandon it quietly and it calcifies, or they start pushing back — contributing to it, flagging gaps, shaping it toward what they actually need. That second path is the only way it survives.

## What I've seen break systems

**Being too opinionated too early.** If you build for hypothetical use cases instead of actual ones, teams will hit walls fast. Every wall they can't get through on their own erodes trust.

**Documentation that requires reading.** Nobody opens a 50-page Notion doc when they're in the middle of a sprint. They need: "I want to do X, here's the pattern, here's the code." Searchable, visual, fast. That's the bar.

**Treating v1 as the hard part.** Shipping v1 is a milestone, not a finish line. Maintenance is harder: evolving patterns without breaking existing usage, deprecating old decisions without creating blockers, staying relevant as the product changes. The systems that die usually die of neglect between versions, not at launch.

**Assuming adoption is a technical problem.** The component library can be technically excellent and still unused. If people don't trust it, or don't understand why it exists, they won't use it. The "why" has to be visible — not just the "what."

## The shape of the good ones

Start small. Typography, color, five components max. Build against actual design files, not wireframes. Make the first adoption frictionless: templates, examples, a Slack channel where questions get answered same day.

Every version adds based on what teams are asking for, not what seems logical from the outside. Old patterns get deprecated with transition paths, not just removed. The system stays coupled to how the product actually works.

The ones I've seen last longest don't have a maintenance phase distinct from everything else. They're just permanently in progress, which sounds precarious but is actually the right state.
