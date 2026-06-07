---
title: "Humans Make Terrible Monitoring Systems"
description: "Every recurring operational issue is a monitoring problem waiting to be automated."
pubDate: 2026-03-19
category: "Engineering"
tags: ["Engineering"]
draft: false
---

For months, the pattern was always the same.

A message would arrive from the implementation team.

"Customer X isn't seeing new responses."

Or from product.

"This feature isn't working for Customer Y."

We'd investigate.

The root cause would be embarrassingly simple.

A missing configuration.

A disabled flag.

An incomplete setup step.

A forgotten mapping.

The exact details varied, but the outcome was always identical.

**A customer found the problem before we did.**

## The Wrong Question

Initially, we treated every incident as a one-off mistake.

Someone forgot a setup step.

Someone missed a checklist item.

Someone made a configuration error.

The natural response was to improve documentation.

Update onboarding instructions.

Create a checklist.

Remind people to be careful.

None of it worked.

A few weeks later, another customer would find another setup miss.

At some point, we stopped asking:

**"Why was this configuration missed?"**

And started asking:

**"Why are customers discovering this before our systems are?"**

That question changed everything.

## Humans Are Bad Monitoring Systems

The uncomfortable truth was that our process depended on humans noticing mistakes.

Implementation teams were expected to configure everything correctly.

Engineers were expected to review everything.

Product teams were expected to catch edge cases.

Customers were expected not to hit the gaps.

That's a lot of expectations.

And eventually one of them fails.

Not because people are careless.

Because people are busy.

The more we looked at the incidents, the more obvious it became:

The problem wasn't the mistakes.

The problem was that we had no automated way to detect them.

## Turning Tribal Knowledge Into Code

Over time, engineers had accumulated a mental list of checks.

"If this config is missing, things will break."

"If this mapping isn't present, data won't flow."

"If this flag isn't enabled, the feature won't work."

The knowledge existed.

It just lived in people's heads.

So we wrote a simple validation job.

Nothing fancy.

A cron job that periodically scanned customer configurations and checked for known setup issues.

If something looked wrong, it generated a pagerduty alert.

The alert went to the engineers responsible for fixing it.

That's it.

No machine learning.

No distributed systems magic.

Just automation.

## The Result

Today, the job alerts more than fifteen engineers about potential configuration issues before customers notice them.

Most of the alerts aren't exciting.

Nobody writes a launch post about a missing config being fixed.

Nobody celebrates a customer issue that never happened.

But that's the point.

The best operational improvements are often invisible.

Customers don't notice them because the problem never reaches them.

## Reliability Isn't Just About Production

When engineers talk about reliability, we usually think about outages.

Database failures.

High latency.

Service crashes.

But many customer-facing issues aren't infrastructure problems.

They're setup problems.

Configuration problems.

Process problems.

And those deserve the same engineering rigor as production systems.

If a database can have health checks, why can't a customer setup?

If a service can have monitoring, why can't a configuration?

## The Lesson

One repeated incident is a mistake.

Ten repeated incidents are a systems problem.

Whenever the same issue keeps resurfacing, there's usually an opportunity hiding underneath.

Not an opportunity to remind people to be more careful.

An opportunity to automate.

The moment customers repeatedly find the same class of issue before your team does, you've already been handed the requirements for a monitoring system.

All that's left is building it.
