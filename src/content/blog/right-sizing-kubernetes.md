---
title: "Right-Sizing Kubernetes Workloads Without Guesswork"
description: "How to set requests and limits from real usage data instead of vibes — and why getting this wrong quietly burns money and causes 2 a.m. OOMKills."
pubDate: 2026-04-08
category: "Kubernetes"
tags: ["Kubernetes", "Cloud Infrastructure", "Performance", "Production Engineering"]
---

Most Kubernetes resource specs I've inherited were set once, by someone who is no longer on the team, based on a number that felt safe. The result is a familiar pair of failure modes: clusters that are simultaneously **over-provisioned** (burning money on idle headroom) and **fragile** (OOMKilling pods under modest load). Both come from the same root cause — requests and limits set by intuition instead of measurement.

Here's the framework I use to set them from data.

## Requests and limits do different jobs

It's worth being precise, because conflating these causes most of the pain:

- **Requests** are what the scheduler uses to *place* pods. They reserve capacity. Set them too high and you pack fewer pods per node than you could, wasting money. Too low and you oversubscribe nodes, inviting CPU starvation and memory pressure.
- **Limits** are the hard ceiling. Exceed a **memory** limit and the kernel OOMKills your container. Exceed a **CPU** limit and you get *throttled* — not killed, but slowed, often invisibly.

The single most common mistake is treating these as one number. CPU and memory want completely different strategies.

## Memory: request near the real working set, limit with headroom

Memory is incompressible — there's no "throttling," only killing. So the goal is to never hit the limit during normal operation.

1. Measure the **working set** over a representative window (include peak traffic and any batch jobs). Use the `container_memory_working_set_bytes` metric, not RSS.
2. Set the **request** at roughly the p95 of the working set. This gives the scheduler an honest number.
3. Set the **limit** with genuine headroom above the observed peak — enough to absorb a bad day without OOMKilling, but not so much that a leak goes undetected for a week.

```
memory request  ≈ p95 working set
memory limit    ≈ observed peak × 1.5  (room for spikes, not for leaks)
```

A leak detector matters here: if a pod's working set trends upward indefinitely, you want an alert long before it walks into the limit.

## CPU: request the steady state, think hard before setting a limit

CPU is compressible — a throttled container is slow, not dead. This changes the calculus.

- Set the **request** at the steady-state usage you actually observe (often p90 of CPU over the window). This is what guarantees the workload its fair share.
- Be **skeptical of CPU limits.** A limit set too close to the request causes throttling that's nearly invisible — your latency degrades and nothing crashes, so nobody notices for weeks. For latency-sensitive services, I often set a generous limit (or rely on requests plus good node headroom) rather than a tight one.

The telltale sign of CPU-limit pain is `container_cpu_cfs_throttled_periods_total` climbing while CPU usage sits *below* the limit. If you see that, your limit is hurting you.

## Let the autoscalers do the steady-state work

Once requests and limits reflect reality, autoscaling becomes trustworthy:

- **HPA** (Horizontal Pod Autoscaler) scales replica count on a signal. CPU is the default, but scaling on a **custom metric** — queue depth, in-flight requests, lag — almost always tracks real load better than CPU does.
- **VPA** (Vertical Pod Autoscaler) recommends or adjusts the requests themselves. I run it in *recommendation* mode for a while before trusting it to act, because surprise restarts to apply new requests can themselves cause incidents.

A subtlety people miss: **HPA and VPA fight over CPU** if you let both act on it. The clean division is HPA on a custom load metric, VPA on memory.

## The payoff

After applying this to a fleet of services, the pattern was consistent: memory requests dropped (we'd been reserving for peaks that requests don't need to cover), bin-packing improved, and node count fell — while OOMKills went to near zero because limits finally had honest headroom. The money saved was real, but the bigger win was that capacity stopped being a source of pages.

The meta-lesson: **resource specs are not config you set and forget — they're a hypothesis about workload behavior that you should validate against data and revisit as the workload changes.**
