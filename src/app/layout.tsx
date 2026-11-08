import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: `${site.name} | ${site.tagline.replace(/\.$/, "")}`, template: `%s | ${site.shortName}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#1b2563" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  slogan: site.tagline,
  url: siteUrl.toString(),
  description: site.description,
  email: site.email,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
