import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Sans_Devanagari, Sora } from "next/font/google";

import { siteUrl } from "@/lib/site";
import "@/app/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
const deva = Noto_Sans_Devanagari({ variable: "--font-deva", subsets: ["devanagari"], weight: ["400", "600", "700"] });

/** Sales demos and client tools (review pages, posters). Never indexed by search engines. */
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "Sample website by Arqora", template: "%s · sample by Arqora" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#090c18" };

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${fraunces.variable} ${deva.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
