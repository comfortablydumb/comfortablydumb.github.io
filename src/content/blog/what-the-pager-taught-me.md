---
title: "What Carrying the Pager Taught Me About Engineering Maturity"
description: "On-call is the most honest feedback loop in software. Here's what owning production taught me about systems, blame, and what 'senior' actually means."
pubDate: 2026-02-10
category: "Career Growth"
tags: ["Career Growth", "Production Engineering", "Incident Management", "Leadership"]
---

For my first couple of years as an engineer, "done" meant the code was merged and the tests were green. Then I started carrying the pager for the systems I built, and my definition of done changed permanently. On-call is the most honest feedback loop in software: it tells you, at 3 a.m. and without mercy, whether the thing you built actually works under conditions you didn't anticipate.

Here's what that feedback loop taught me — less about technology than about how to think like a senior engineer.

## You design differently when you carry the pager

Before on-call, I optimized for the happy path. The code that handled the expected input was careful; the code that handled failure was an afterthought, if it existed at all.

Owning production inverts that. You start asking the questions that actually determine reliability:

- What happens when this downstream dependency is slow instead of down? (Slow is worse — it ties up resources while pretending to work.)
- What does this look like on the dashboard *before* it becomes an incident?
- When this fails at 3 a.m., what's the absolute minimum a tired engineer needs to diagnose it?

This isn't pessimism. It's designing for the world as it actually is — where networks partition, dependencies degrade, and the input you swore could never happen shows up in week three.

## The best debugging skill is resisting your first instinct

Under pressure, the instinct is to *act* — restart the service, scale up, roll back. Sometimes that's right. Often it just moves the problem or destroys the evidence you needed to find the root cause.

The most valuable thing I learned is to spend the first two minutes *observing* instead of acting: read the graphs, check what changed and when, form a hypothesis, and only then intervene. The engineers I most respect are calmest exactly when everyone else wants to start pulling levers. Their speed comes from precision, not panic.

## Blameless isn't soft — it's how you actually learn

Early on I thought a good postmortem identified who broke it. I had it backwards. If an engineer running a routine, sanctioned procedure can take down production, **the system permitted that failure** — the human was just the last actor in a chain the design left open.

A blameless postmortem asks "what about the system made this failure possible, and easy?" instead of "who messed up?" The first question produces guardrails — better defaults, validation, safer tooling. The second produces people who hide mistakes, which is how small incidents grow into large ones. This was the single biggest shift in how I think about reliability.

## Operability is a feature, and it's your job

It's tempting to treat logging, metrics, and runbooks as overhead — the boring tax you pay after the real work. On-call taught me they're part of the product. A system that's hard to operate is *unfinished*, no matter how elegant the core logic is.

Now I treat the question "how will the on-call engineer understand this at 3 a.m.?" as a design constraint with the same weight as correctness or performance. Good observability isn't extra credit; it's the difference between a five-minute fix and a two-hour outage.

## What "senior" actually means

Somewhere in here my mental model of seniority changed. I used to think it was about knowing more — more languages, more patterns, more algorithms. Carrying the pager taught me it's mostly about **judgment under uncertainty and ownership of outcomes**:

- Knowing which corner is safe to cut and which will page you next quarter.
- Building systems other people can operate without you in the room.
- Caring about the outcome — does this work reliably for users? — more than the output.

You can't read your way to that. You earn it one incident at a time, by being responsible for something real when it breaks. That's why I think on-call, for all its 3 a.m. misery, is one of the best teachers an engineer can have.
