import type { MetadataRoute } from "next";

import { liveServices } from "@/data/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", ...liveServices().map((s) => `/services/${s.slug}`), "/work", "/about", "/contact"];
  return paths.map((p) => ({ url: new URL(p, siteUrl).toString(), priority: p === "/" ? 1 : 0.7 }));
}
