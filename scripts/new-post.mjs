#!/usr/bin/env node
/**
 * Scaffold a new blog post.
 *
 *   npm run new-post "Your Post Title"
 *   npm run new-post "Your Post Title" --tag Kafka --tag "System Design" --category "Distributed Systems"
 *
 * Creates src/content/blog/<slug>.md with frontmatter and today's date,
 * then you just write Markdown below it. That's the whole workflow.
 */
import { writeFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");

const args = process.argv.slice(2);
const titleParts = [];
const tags = [];
let category = "Engineering";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--tag") {
    tags.push(args[++i]);
  } else if (args[i] === "--category") {
    category = args[++i];
  } else {
    titleParts.push(args[i]);
  }
}

const title = titleParts.join(" ").trim();
if (!title) {
  console.error('Usage: npm run new-post "Your Post Title" [--category "X"] [--tag Y --tag Z]');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const file = join(BLOG_DIR, `${slug}.md`);

const tagsLine = tags.length
  ? `[${tags.map((t) => JSON.stringify(t)).join(", ")}]`
  : "[]";

const body = `---
title: ${JSON.stringify(title)}
description: "One sentence used for previews, search, and SEO."
pubDate: ${today}
category: ${JSON.stringify(category)}
tags: ${tagsLine}
draft: true
---

Write your article here in Markdown. \`##\` and \`###\` headings show up as
section headers. Remove \`draft: true\` above when you're ready to publish.
`;

await mkdir(BLOG_DIR, { recursive: true });

try {
  await access(file);
  console.error(`✗ A post already exists at: ${file}`);
  process.exit(1);
} catch {
  // does not exist — good
}

await writeFile(file, body, "utf8");
console.log(`✓ Created src/content/blog/${slug}.md`);
console.log(`  → It's a draft. Run "npm run dev" to preview, then remove "draft: true" to publish.`);
