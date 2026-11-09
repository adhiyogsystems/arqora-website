import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Lang } from "@/i18n/config";
import { legal, offices, site, siteText, siteUrl } from "@/lib/site";
import "@/app/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: siteUrl,
    title: { default: `${site.name} | ${siteText[lang].tagline.replace(/\.$/, "")}`, template: `%s | ${site.shortName}` },
    description: siteText[lang].description,
    openGraph: { type: "website", siteName: site.name, locale: lang === "de" ? "de_DE" : "en_US" },
  };
}

export const rootViewport: Viewport = { themeColor: "#090c18" };

/**
 * Turns on scroll reveals. Runs before paint and needs no framework code, so
 * if it fails, nothing is hidden. Also picks up content added by client-side
 * navigation.
 */
const revealScript = `(function(){if(!('IntersectionObserver' in window))return;var d=document.documentElement;d.classList.add('js');function start(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});function scan(){document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(function(el){io.observe(el);});}scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',start);}else{start();}})();`;

function orgJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    legalName: legal.operator,
    parentOrganization: { "@type": "Organization", name: legal.operator, address: { "@type": "PostalAddress", addressCountry: "IN" } },
    slogan: siteText[lang].tagline,
    url: siteUrl.toString(),
    description: siteText[lang].description,
    email: site.email,
    telephone: site.phone,
    address: [
      { "@type": "PostalAddress", addressCountry: "IN" },
      ...offices
        .filter((o) => o.postal)
        .map((o) => ({
          "@type": "PostalAddress",
          streetAddress: o.postal!.street,
          postalCode: o.postal!.postalCode,
          addressLocality: o.postal!.city,
          addressCountry: o.postal!.countryCode,
        })),
    ],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer service", email: site.email, telephone: site.phone, areaServed: "IN" },
      ...offices
        .filter((o) => o.email)
        .map((o) => ({ "@type": "ContactPoint", contactType: "customer service", email: o.email, areaServed: o.postal?.countryCode })),
    ],
  };
}

export function RootDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${inter.variable} ${sora.variable} h-full antialiased`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root document, not pages/ */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(lang)) }} />
        <Header lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
