import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/**
 * Everyone may crawl everything. AI search and answer engines are named
 * explicitly so the site can be cited in AI Overviews, ChatGPT, Perplexity,
 * Claude and Gemini answers.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

/** Sales demos and client tools: never indexed. */
const privatePaths = ["/demo", "/p/", "/leads", "/r", "/reviews"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: privatePaths }, ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/", disallow: privatePaths }))],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.host,
  };
}
