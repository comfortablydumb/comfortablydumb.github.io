---
title: "What I Learned from Reading Production Logs"
description: "The alert told me something was wrong. The logs told me why."
pubDate: 2026-06-08
category: "Engineering"
tags: ["Engineering"]
draft: false
---

Production logs are one of the few places where reality gets recorded without interpretation.

Everything else in our observability stack is trying to simplify reality.

Metrics aggregate thousands of events into a number.

Dashboards turn those numbers into charts.

Alerts compress those charts into a page at 2 AM.

By the time information reaches you, most of the context has already been thrown away.

Logs are different.

They're messy, verbose, and often painful to search through.

But when you're trying to understand what actually happened, they're usually where the truth lives.

## The Incident

I learned this during an on-call incident.

PagerDuty woke me up because success rates for one of our services had fallen off a cliff.

For roughly fifteen minutes, requests routed to a group of pods were failing almost entirely.

The alert told me *something* was wrong.

The dashboard told me *how bad* it was.

Neither told me what was happening.

I checked Linkerd.

No deployment.

No traffic shift.

No dependency issue.

No obvious anomaly.

Everything looked normal.

And that's the frustrating thing about many production incidents.

You can spend twenty minutes staring at dashboards that are perfectly accurate and still learn almost nothing.

## Reading the Logs

Eventually I opened the pod logs.

A few minutes later the mystery was over.

The logs showed repeated errors indicating that our gRPC services were receiving HTTP/1.1 requests.

That immediately narrowed the search space.

The service wasn't unhealthy.

The infrastructure wasn't broken.

The requests themselves were wrong.

A little more digging revealed the cause.

A security team was running tests against our services and their tooling was generating the traffic pattern we were seeing.

The dashboards showed a service failure.

The logs showed a protocol mismatch.

Those are very different stories.

Only one of them leads to the answer.

## Why Logs Feel Different

Metrics answer questions you already thought to ask.

Logs answer questions you didn't know existed.

A success-rate graph can tell you that requests are failing.

A log line can tell you:

*"Received HTTP/1.1 request on gRPC endpoint."*

One is a symptom.

The other is a clue.

This is why so many incident investigations eventually end with someone opening Kibana, Datadog, Splunk, or whatever log search tool the company uses.

At some point, you stop looking at abstractions and start looking at reality.

## The Problem With Over-Logging

The irony is that many teams destroy the usefulness of logs by producing too many of them.

Every request gets logged.

Every object gets serialized.

Every debug statement survives long after the feature launches.

The result is not observability.

It's landfill.

Good logs are expensive.

They consume storage, increase noise, and make investigations harder when written carelessly.

The goal isn't to log everything.

The goal is to log the things an engineer would wish they knew during an incident.

Those are not the same thing.

## Logs Are Written Twice

The first time when the code is written.

The second time when someone reads them during an outage.

Most engineers optimize for the first experience.

"I'll just add a log here."

The second experience is what matters.

Six months later, another engineer is staring at those log lines while customers are impacted.

Can they understand what happened?

Can they identify the request?

Can they distinguish expected behavior from failure?

Can they move from symptom to root cause?

If not, the log didn't do its job.

## What I Learned

I still start investigations with dashboards.

They're faster.

They help narrow the blast radius.

But I've stopped expecting them to explain incidents.

Their job is detection.

Logs are where explanation begins.

Every memorable production incident I've worked eventually came down to the same thing:

Reality was already recorded somewhere.

We just hadn't read it yet.
