/**
 * Central site configuration.
 * Edit this file to update profile data, navigation, social links, and SEO defaults.
 * Most content across the site is driven from here so there is a single source of truth.
 */

export const SITE = {
  title: "Samarth Jindal",
  tagline:
    "Software Engineer focused on distributed systems, large-scale platforms, cloud infrastructure, and operational excellence.",
  description:
    "Samarth Jindal, software engineer building reliable distributed systems at scale. Writing on Kafka, Kubernetes, MongoDB, production engineering, and system design.",
  url: "https://www.samarthjindal.com",
  author: "Samarth Jindal",
  locale: "en_US",
  // Default social share image. Generated as a 1200x630 PNG at build time by
  // src/pages/og/[...route].ts (astro-og-canvas). Per-post cards use /og/<id>.png.
  ogImage: "/og/default.png",
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIALS = {
  email: "samarthjindal.dce@gmail.com",
  linkedin: "https://www.linkedin.com/in/jindalsamarth",
  // Optional, leave empty string to hide.
  twitter: "",
} as const;

/**
 * Giscus comments (https://giscus.app). Comments are stored as GitHub
 * Discussions on the repo below. To enable:
 *   1. Make the repo public and enable the Discussions feature.
 *   2. Install the giscus app: https://github.com/apps/giscus
 *   3. Visit https://giscus.app, enter the repo, and copy the generated
 *      `data-repo-id` and `data-category-id` into repoId / categoryId.
 * Comments stay hidden until both IDs are filled in.
 */
export const GISCUS = {
  repo: "comfortablydumb/comfortablydumb.github.io",
  repoId: "",
  category: "Comments",
  categoryId: "",
  mapping: "pathname",
  reactionsEnabled: "1",
} as const;

export const CURRENT_ROLE = {
  title: "Senior Software Development Engineer",
  company: "Sprinklr",
  location: "Gurugram, India",
  blurb:
    "Building and operating large-scale distributed platforms, owning data pipelines, streaming infrastructure, and the reliability of services handling billions of events.",
} as const;

export const INTRO_GREETING = "Hi, I'm Samarth.";

export const INTRO =
  "This is my corner of the internet where I write about whatever I find interesting. You'll find thoughts on software engineering, distributed systems, technology, careers, business, coffee and the occasional random rabbit hole I can't resist exploring.";

/** Technical expertise shown on the home page. */
export const EXPERTISE: { name: string; detail: string }[] = [
  {
    name: "Distributed Systems",
    detail: "Consensus, partitioning, replication, and consistency trade-offs at scale.",
  },
  {
    name: "Apache Kafka",
    detail: "High-throughput streaming pipelines, consumer-group tuning, and exactly-once semantics.",
  },
  {
    name: "Kubernetes",
    detail: "Operators, autoscaling, resource governance, and zero-downtime rollouts.",
  },
  {
    name: "MongoDB",
    detail: "Sharding, index design, and query performance for multi-terabyte datasets.",
  },
  {
    name: "Cloud Infrastructure",
    detail: "AWS, infrastructure-as-code, cost-aware capacity planning.",
  },
  {
    name: "Production Operations",
    detail: "Observability, SLOs, on-call, and incident management.",
  },
  {
    name: "System Design",
    detail: "Designing for failure, backpressure, and graceful degradation.",
  },
];

/** Technologies listed on the About page. */
export const TECHNOLOGIES = [
  "Java",
  "Go",
  "Python",
  "TypeScript",
  "Apache Kafka",
  "Kubernetes",
  "Docker",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Elasticsearch",
  "AWS",
  "Terraform",
  "Prometheus",
  "Grafana",
  "gRPC",
];

/** Career + education timeline, newest first. */
export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "education";
  points: string[];
};

export const TIMELINE: TimelineItem[] = [
  {
    period: "2024 – Present",
    title: "Senior Software Development Engineer",
    org: "Sprinklr",
    kind: "work",
    points: [
      "Building backend systems for Sprinklr Insights, a customer intelligence tool, where we ingest and process consumer signals from 30+ channels and hundreds of media sources into something query-able and reliable.",
      "Own architecture and reliability decisions for services that large global enterprises depend on, where an outage is someone else's bad morning.",
      "Joined as an intern and grew through several engineering roles to Senior Software Development Engineer, taking on progressively larger systems along the way.",
    ],
  },
  {
    period: "2020 – 2024",
    title: "B.Tech, Computer Engineering",
    org: "DTU (formerly DCE)",
    kind: "education",
    points: [
      "Earned a B.Tech in Computer Engineering with a 9.5/10 GPA, speed-ran the degree in 3.5 years rather than four.",
      "Concentrated on systems, backend, and distributed computing, with internships and industry research running alongside coursework.",
    ],
  },
];

export const CAREER_GOALS =
  "Over the next few years I want to deepen my impact on platform reliability and grow toward technical leadership, working where engineering meets real business outcomes.";

export const TECHNICAL_INTERESTS = [
  "Streaming systems and event-driven architecture",
  "Storage engines and data consistency models",
  "Reliability engineering and incident response",
  "Performance debugging and capacity planning",
  "Developer platforms and operational tooling",
];

/** Short interest tags shown on the About page. */
export const INTERESTS = [
  "Distributed Systems",
  "Product Engineering",
  "AI Applications",
  "Startups & Business",
  "Coffee",
  "Watches",
];

export const PERSONAL_INTERESTS =
  "Outside of engineering I read widely on systems and economics, follow long-form technical writing, and enjoy endurance running and chess.";
