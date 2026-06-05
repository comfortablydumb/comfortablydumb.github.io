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
    "Samarth Jindal — software engineer building reliable distributed systems at scale. Writing on Kafka, Kubernetes, MongoDB, production engineering, and system design.",
  url: "https://www.samarthjindal.com",
  author: "Samarth Jindal",
  locale: "en_US",
  // Default social share image (relative to /public). Replace with a 1200x630 PNG
  // for best compatibility with Twitter/LinkedIn (they don't render SVG previews).
  ogImage: "/og-default.svg",
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIALS = {
  email: "samarth@example.com",
  linkedin: "https://www.linkedin.com/in/samarthjindal",
  // WhatsApp: international format, digits only (country code + number, no +, spaces, or dashes).
  // Example: India number +91 98765 43210 -> "919876543210".
  whatsapp: "919876543210",
  // Optional, leave empty string to hide.
  twitter: "",
} as const;

export const CURRENT_ROLE = {
  title: "Software Engineer",
  company: "Sprinklr",
  location: "Remote / India",
  blurb:
    "Building and operating large-scale distributed platforms — owning data pipelines, streaming infrastructure, and the reliability of services handling billions of events.",
} as const;

export const INTRO =
  "Hi, I'm Samarth. This is my corner of the internet where I write about whatever I find interesting. You'll find thoughts on software engineering, distributed systems, technology, careers, business, coffee and the occasional random rabbit hole I can't resist exploring.";

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
    period: "2023 — Present",
    title: "Software Engineer",
    org: "Sprinklr",
    kind: "work",
    points: [
      "Own streaming data pipelines processing billions of events per day across Kafka and downstream stores.",
      "Led reliability initiatives that cut pipeline incident frequency and reduced mean time to recovery.",
      "Designed sharding and indexing strategies for multi-terabyte MongoDB clusters.",
    ],
  },
  {
    period: "2021 — 2023",
    title: "Software Engineer",
    org: "Previous Company",
    kind: "work",
    points: [
      "Built backend services on Kubernetes serving high-traffic APIs.",
      "Improved p99 latency through caching, query optimization, and load shedding.",
    ],
  },
  {
    period: "2017 — 2021",
    title: "B.Tech, Computer Science",
    org: "University",
    kind: "education",
    points: [
      "Graduated with focus on systems, networks, and databases.",
      "Built side projects exploring distributed coordination and storage.",
    ],
  },
];

export const CAREER_GOALS =
  "Over the next few years I want to deepen my impact on platform reliability and grow toward technical leadership — eventually bridging engineering depth with business strategy, which is part of why I am exploring an MBA.";

export const TECHNICAL_INTERESTS = [
  "Streaming systems and event-driven architecture",
  "Storage engines and data consistency models",
  "Reliability engineering and incident response",
  "Performance debugging and capacity planning",
  "Developer platforms and operational tooling",
];

export const PERSONAL_INTERESTS =
  "Outside of engineering I read widely on systems and economics, follow long-form technical writing, and enjoy endurance running and chess.";
