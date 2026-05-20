---
title: "DNA Design System: Claude Code Setup"
date: "2026-04-20"
tags: ["design systems", "process", "ai"]
excerpt: "How I built a lightweight onboarding system to bring Claude Code to our design team. No git knowledge required."
---

# DNA Design System: Claude Code Setup

Designers on my team were just starting to use Claude. The outputs were generic and they were struggling getting it to "look like Fiori". It was taking people more time to go back and forth with Claude than it was for them to be making the artifacts on their own, and they were getting frustrated.

## The Problem With Generic

Our Design System setup is quite complex... it's a combination of the larger SAP Fiori design system, but has our own extensions on top to fill the gaps. Claude has access to MCP Servers to help map it from a technology standpoint, but there are still bridges we need to make to help it go from component -> guidelines/rules -> output. And Claude isn't always the best listener, and has a pretty horrible memory unless you force it to remember.

Beyond output quality, there was a setup problem. Most designers on the team had never touched a terminal. Git, CLIs, config files — these aren't part of a designer's workflow, and they shouldn't have to be. The tool existed. People just couldn't get to it, or didn't know what to ask once they did.

## The Setup

I wrote a shell script that handles everything in one command. Designers step through it without needing prior knowledge of git or the terminal.

What the script does:

1. Checks prerequisites: git, Claude Code, Python 3, Node.js 18+, and network access
2. Asks where to clone the DNA-AI-Agent-Resources repo (default: ~/Documents/GitHub), or accepts a path as a command-line argument
3. Clones the repo and sets up a background hook that pulls the latest design system files at the start of every Claude Code session
4. Installs the SAP Design System Skill for Claude Code (~/.claude/skills/sap-design-system)
5. Installs and globally registers four MCP servers: UI5, UI5 Web Components, UI5 Web Components for React, and Figma
6. Promotes any MCP servers already installed at project level to global scope
7. Walks through enabling the Figma desktop MCP server inside the Figma app

The global MCP registration is the part I care about most. A design system is only as consistent as its source of truth, and registering these servers globally means Claude's frame of reference is the same across every designer's machine: the same component libraries, the same Figma connection, the same version of what we've built.

## How the Repo is Structured

The repo is organized around where you start a Claude session, because where you start determines what context it loads.

Starting from the **repo root** is for thinking work: writing briefs, exploring a problem space, design critique, learning about personas and domain context. The root CLAUDE.md loads the persona index and design system guidance automatically, so Claude comes into those conversations already oriented.

Starting from a **prototype subfolder** is for building. The `prototypes/CLAUDE.md` runs a setup questionnaire, loads MCP server configuration, and pulls in the right stack reference depending on the framework you're working in.

The three main resource areas:

**design-system/** holds the layered architecture doc: how DNA Kit sits on top of SAP Web Kit, which sits on top of UI5, which sits on top of Fiori tokens. Implementation-agnostic — it covers design principles, the kit hierarchy, and how to navigate from a design decision down to a component.

**personas/** holds ten BDC and SAC user personas across the admin-to-consumer spectrum. A master index tells Claude which individual files to load based on what's relevant to the task; not all of them at once.

**prototypes/** is the build environment. The parent CLAUDE.md has shared conventions and the project setup questionnaire. Stack-specific reference files (SAP UI5, UI5 Web Components, UI5 Web Components for React) live in `_resources/_stacks/` and are read on-demand when a framework is selected. Each new prototype gets its own subfolder with a CLAUDE.md pre-populated from the questionnaire: persona, job-to-be-done, Figma refs, constraints.

The CLAUDE.md files are what make the structure work. Each one encodes what Claude should know and how it should behave for that type of work. The repo doesn't rely on Claude remembering anything across sessions; the files do that job.

## Beyond the Team

Not everyone had someone to run a script for them. Our team worked to create a guide for setting up Claude Code from scratch: CLI installation, authentication, the basics of CLAUDE.md, how to get useful output without needing to understand the internals. We worked on set up videos that walked through each step of the process, and recorded our rollout parts so they could be shared globally with the team.

The guide was shared internally and picked up by SAP designers well beyond our team. Still rolling out, but the materials are in wide use.

## The Consistency Argument

A design system isn't just components. It's the decision that certain things shouldn't be reinvented every time. This setup applies the same logic to AI tooling. The shell script and CLAUDE.md template encode intent. Every designer using this is working with the same context, the same guidelines, the same version of what we've built.

Inconsistent AI outputs in a design system context don't just produce bad work; they erode trust in the system itself. Getting Claude grounded in DNA makes it a collaborator that reinforces the system, not one that quietly works around it.
