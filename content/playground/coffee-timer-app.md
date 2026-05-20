---
title: "V60 Pour-Over Timer"
date: "2026-02-20"
tags: ["code", "making"]
excerpt: "Built a simple web app to time my V60 coffee brewing. Sometimes the best tools are the ones you make for yourself."
type: "visual"
images:
  - "/images/playground/coffee-timer-placeholder.jpg"
---

# V60 Pour-Over Timer

I have a specific pour schedule for my V60 and I've been following it long enough that the timing is muscle memory. What isn't muscle memory: remembering whether I already started the timer, which phase I'm in, and whether 45 seconds have passed. My phone's native timer has no concept of phases. Generic coffee apps have too many.

So I built one.

## The constraints

Pour-over has a real sequence: 30-45 second bloom, then three controlled pours, total brew around 2:30-3:00. The timer needs to track which phase you're in, not just count down from an arbitrary number.

The whole thing is about 200 lines of Next.js. Single page, deployed on Vercel.

## A few deliberate decisions

**Type big enough to read while pouring.** You're holding a kettle over a dripper. Squinting at a phone is not an option. The time display is large enough to read from arm's length without stopping what you're doing.

**Hide everything else.** Phase name, countdown, progress. That's it on screen. Settings exist but you reach for them before you start, not during.

**Haptic feedback at phase transitions.** The moment a phase ends, the phone vibrates. No need to watch the screen at all once you've started — you feel the transitions.

I considered adding brew logging, recipe storage, a weight tracker, and decided against all of it; those are different problems. This one does exactly what I needed, and I use it every morning.
