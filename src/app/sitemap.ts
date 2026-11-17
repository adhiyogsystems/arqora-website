import type { MetadataRoute } from "next";

import { liveServices } from "@/data/services";
import { langs, localePath } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...liveServices("en").map((s) => `/services/${s.slug}`),
    "/templates",
    "/work",
    "/about",
    "/contact",
    "/impressum",
    "/privacy",
  ];
  const abs = (p: string) => new URL(p, siteUrl).toString();
  // Pricing is in rupees for Indian businesses, so it has no German version.
  const englishOnly = [{ url: abs("/pricing"), priority: 0.8 }];
  return [
    ...englishOnly,
    ...paths.flatMap((p) =>
      langs.map((lang) => ({
        url: abs(localePath(lang, p)),
        priority: p === "/" ? 1 : p === "/impressum" || p === "/privacy" ? 0.2 : 0.7,
        alternates: { languages: { en: abs(p), de: abs(localePath("de", p)) } },
      })),
    ),
  ];
}
