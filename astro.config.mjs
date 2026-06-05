// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Used for canonical URLs, sitemap, RSS, and Open Graph tags.
// Currently set to the GitHub Pages URL. When you buy a custom domain,
// change this to "https://yourdomain.com" and add a public/CNAME file.
const SITE_URL = "https://comfortablydumb.github.io";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
});
