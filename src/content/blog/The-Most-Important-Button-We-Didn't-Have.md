---
title: "The Most Important Button We Didn't Have"
description: "I spent 48 hours firefighting an incident and came away believing every large system needs kill switches."
pubDate: 2026-05-25
category: "On-call Stories"
tags: ["On-call Stories"]
draft: false
---

At 4:00 AM on a Saturday, a Kafka lag alert fired.

Nothing unusual.

A consumer had restarted after running out of memory. It happened occasionally. The lag was already decreasing, so the alert was acknowledged and monitored.

Then another alert arrived.

And another.

And another.

By evening, ingestion pipelines were lagging across multiple production environments. Consumers were repeatedly crashing with OutOfMemory errors. MongoDB nodes were going down. Kafka disk usage was climbing dangerously close to full. Customer dashboards were failing to load.

What started as a routine lag alert had become a multi-day production incident.

The root cause?

A Social Media message.

Well, technically many messages.

Each contained over 2,000 expanded URLs.

## The Hidden Assumption

Distributed systems are full of assumptions.

Most of them are never written down.

We assumed a social media post would contain a reasonable number of URLs.

We assumed downstream processors would never see payloads of that size.

We assumed memory usage would remain within expected bounds.

Those assumptions held true for years,Until they didn't.

The oversized messages exploded the size of internal fields and started consuming far more memory than our processors were designed for. Consumers began crashing with OOM errors. Consumption dropped. Kafka lag increased.

As lag increased, pressure shifted to other parts of the system.

Then those started failing too.

The issue wasn't a single service failing.

It was a chain reaction.

## Death by Propagation

The interesting thing about large systems is that failures rarely stay where they start.

One malformed class of messages moved through multiple services:

* Enrichment services
* Cross-env streaming services
* Kafka clusters
* MongoDB instances

Each layer amplified the problem in a slightly different way.

Some services crashed.

Some slowed down.

Some accumulated backlogs.

Some ran out of disk.

By the time we understood what was happening, the original issue was only a small part of the operational challenge, The real problem was containment.

## The Question We Couldn't Answer

While debugging, we kept asking a simple question:

"Can we just stop processing this data?"

The answer was surprisingly complicated.

We could scale services.

We could deploy fixes.

We could tune thread pools.

We could move databases.

We could disable individual components.

But we couldn't simply say:

"Drop all messages matching this pattern immediately."

That capability didn't exist.

Every mitigation involved engineering work, operational coordination, deployments, or infrastructure changes.

The incident continued not because we didn't understand the problem, but because we lacked a fast way to isolate it.

## Why Kill Switches Matter

People often think kill switches are emergency buttons, They're not.

They're blast-radius controls.

A good kill switch allows operators to sacrifice a small piece of functionality to preserve the rest of the system.

In this incident, the ideal response would have been:

1. Detect abnormal messages.
2. Enable a source-level kill switch.
3. Route those messages to a quarantine storage.
4. Keep the rest of the pipeline healthy.
5. Investigate and replay later.

Instead, the problematic traffic continued flowing through the system while we worked on mitigation.

The difference between those two approaches is measured in hours of incident time.

And sometimes customer impact.

## Reliability Is About Optionality

One lesson I've learned from on-call shifts is that reliability isn't just about preventing failures.

Failures are inevitable.

Reliability is about giving yourself options when they happen.

Can you disable a feature?

Can you isolate a customer?

Can you shed load?

Can you quarantine bad traffic?

Can you replay data later?

Every one of those options reduces panic during an incident.

Every one of them reduces the number of decisions engineers need to make at 3 AM.

## What We Changed

The technical fixes were straightforward.

We identified the problematic messages.

We deployed protections.

We scaled critical services.

We stabilized the infrastructure.

But the most important takeaway wasn't a code change.

It was a realization:

Every large-scale data platform eventually needs a centralized kill switch.

Not because engineers make mistakes.

Not because vendors send bad data.

But because unexpected inputs are guaranteed.

And when they arrive, your ability to contain them matters far more than your ability to debug them.

The next incident will be different.

The payload will be different.

The root cause will be different.

But the lesson will remain the same.

If a single message can threaten an entire system processing 500 million messages a day, you need a way to stop it before the rest of the system gets dragged down with it.
