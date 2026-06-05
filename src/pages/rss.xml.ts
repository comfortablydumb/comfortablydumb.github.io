import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts } from "../utils/posts";
import { SITE } from "../config";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.title} — Blog`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>en-us</language>`,
  });
}
