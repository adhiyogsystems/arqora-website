export type Project = {
  slug: string;
  name: string;
  url?: string;
  category: string;
  summary: string;
  built: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "akkalkot-yatra",
    name: "Akkalkot Yatra",
    url: "https://www.akkalkotyatra.com",
    category: "Tourism & pilgrimage",
    summary:
      "A complete pilgrim guide for Akkalkot: rooms near the Swami Samarth temple, darshan and aarti timings, travel, places to visit and events. Available in English and Marathi.",
    built: [
      "Bilingual website (English and Marathi)",
      "Installable app (PWA) that works offline",
      "Stay listings with WhatsApp enquiries",
      "Full SEO: sitemap, structured data, fast loading",
    ],
    stack: ["Next.js", "TypeScript", "Vercel"],
  },
];
