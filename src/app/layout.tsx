import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: `${site.name} | ${site.tagline.replace(/\.$/, "")}`, template: `%s | ${site.shortName}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#090c18" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  slogan: site.tagline,
  url: siteUrl.toString(),
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};

/**
 * Turns on scroll reveals. Runs before paint and needs no framework code, so
 * if it fails, nothing is hidden. Also picks up content added by client-side
 * navigation.
 */
const revealScript = `(function(){if(!('IntersectionObserver' in window))return;var d=document.documentElement;d.classList.add('js');function start(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});function scan(){document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(function(el){io.observe(el);});}scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',start);}else{start();}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
