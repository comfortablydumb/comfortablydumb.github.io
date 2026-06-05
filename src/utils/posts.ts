import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

const isPublished = (p: Post) => import.meta.env.DEV || !p.data.draft;

/** All published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", isPublished);
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** Estimate reading time in minutes from raw markdown body. */
export function readingTime(body: string | undefined): number {
  const words = (body ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Unique tags with counts, sorted by frequency then name. */
export async function getTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPosts();
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
