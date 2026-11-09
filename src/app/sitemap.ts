import type { MetadataRoute } from "next";

import { liveServices } from "@/data/services";
import { langs, localePath } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...liveServices("en").map((s) => `/services/${s.slug}`),
    "/work",
    "/about",
    "/contact",
    "/impressum",
    "/privacy",
  ];
  const abs = (p: string) => new URL(p, siteUrl).toString();
  return paths.flatMap((p) =>
    langs.map((lang) => ({
      url: abs(localePath(lang, p)),
      priority: p === "/" ? 1 : p === "/impressum" || p === "/privacy" ? 0.2 : 0.7,
      alternates: { languages: { en: abs(p), de: abs(localePath("de", p)) } },
    })),
  );
}
