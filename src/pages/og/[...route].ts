import { OGImageRoute } from "astro-og-canvas";
import { getPosts } from "../../utils/posts";
import { SITE } from "../../config";

const posts = await getPosts();

// One entry per blog post, keyed by post id, plus a site-wide default card.
const pages: Record<string, { title: string; description: string }> = {
  default: { title: SITE.title, description: SITE.tagline },
};
for (const post of posts) {
  pages[post.id] = {
    title: post.data.title,
    description: post.data.description,
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: { path: "./public/og-logo.png", size: [120] },
    bgGradient: [
      [27, 28, 30],
      [17, 20, 24],
    ],
    border: { color: [125, 211, 252], width: 12, side: "inline-start" },
    padding: 70,
    font: {
      title: {
        color: [255, 255, 255],
        size: 64,
        weight: "Bold",
        families: ["Inter"],
        lineHeight: 1.2,
      },
      description: {
        color: [180, 185, 195],
        size: 32,
        families: ["Inter"],
        lineHeight: 1.4,
      },
    },
    fonts: [
      "./src/assets/fonts/inter-400.ttf",
      "./src/assets/fonts/inter-700.ttf",
    ],
  }),
});
