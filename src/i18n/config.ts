import type { Metadata } from "next";

export type Lang = "en" | "de";
export const langs: Lang[] = ["en", "de"];

/** "/services" -> "/de/services" for German, unchanged for English. */
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? "/de" : `/de${path}`;
}

/** The same page in the other language. */
export function switchPath(pathname: string): { lang: Lang; href: string } {
  if (pathname.includes("_not-found")) {
    return pathname.startsWith("/de") ? { lang: "en", href: "/" } : { lang: "de", href: "/de" };
  }
  if (pathname === "/de" || pathname.startsWith("/de/")) {
    const rest = pathname.slice(3);
    return { lang: "en", href: rest === "" ? "/" : rest };
  }
  return { lang: "de", href: localePath("de", pathname) };
}

/** Branded 1200x630 share card (public/og), one per language. */
export const ogImage = (lang: Lang) => ({
  url: `/og/arqora-${lang}.jpg`,
  width: 1200,
  height: 630,
  alt: lang === "de" ? "Arqora Technology Solutions: Tech-Lösungen für jedes Unternehmen" : "Arqora Technology Solutions: tech solutions for every business",
});

/**
 * Per-page metadata: title, description, canonical, hreflang alternates and
 * social cards. A string title gets the " | Arqora" suffix; pass
 * { absolute } for a full title (the home pages).
 */
export function pageMetadata(lang: Lang, path: string, title: string | { absolute: string } | undefined, description: string): Metadata {
  const fullTitle = title === undefined ? undefined : typeof title === "string" ? `${title} | Arqora` : title.absolute;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: localePath(lang, path),
      languages: { en: path, de: localePath("de", path), "x-default": path },
    },
    openGraph: {
      type: "website",
      siteName: "Arqora Technology Solutions",
      locale: lang === "de" ? "de_DE" : "en_US",
      alternateLocale: lang === "de" ? ["en_US"] : ["de_DE"],
      url: localePath(lang, path),
      ...(fullTitle ? { title: fullTitle } : {}),
      description,
      images: [ogImage(lang)],
    },
    twitter: { card: "summary_large_image", ...(fullTitle ? { title: fullTitle } : {}), description, images: [ogImage(lang).url] },
  };
}
