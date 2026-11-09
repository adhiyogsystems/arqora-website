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

export function pageMetadata(lang: Lang, path: string, title: string | undefined, description: string): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: localePath(lang, path),
      languages: { en: path, de: localePath("de", path), "x-default": path },
    },
    openGraph: { locale: lang === "de" ? "de_DE" : "en_US", description },
  };
}
