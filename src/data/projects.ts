export type Project = {
  slug: string;
  name: string;
  url?: string;
  /** Screenshot in /public, about 1350x615. */
  image?: string;
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
    image: "/work/akkalkot-yatra.jpg",
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
  {
    slug: "sukh-arogyam",
    name: "Sukh-Arogyam",
    url: "https://www.sukharogyam.com",
    image: "/work/sukharogyam.jpg",
    category: "Health & wellness · Website",
    summary:
      "The public home of a holistic well-being movement blending Ayurveda, Vedic wisdom and modern tools. Built around the Seven Petals framework, with a book series, a wisdom blog and corporate wellness programmes.",
    built: [
      "Content-rich brand website with a hero carousel",
      "Seven Petals and Marga framework explained visually",
      "Books, blog, testimonials and newsletter sign-up",
      "Corporate wellness section for businesses",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Framer Motion", "Vercel"],
  },
  {
    slug: "sukh-arogyam-app",
    name: "Sukh-Arogyam App",
    url: "https://app.sukharogyam.com",
    image: "/work/sukharogyam-app.jpg",
    category: "Health & wellness · Installable app",
    summary:
      "A dynamic, installable web app (PWA) where users take a 3-minute Petal Scan, see which area of life carries the most strain, and follow a personalised daily practice. Built as a monorepo that shares design and code with the website.",
    built: [
      "Petal Scan assessment with personalised results",
      "Daily sadhana and progress tracking",
      "Sign-in, user data and content on Supabase",
      "Installs on phones like a native app (PWA)",
      "Monorepo with shared UI, design tokens and types",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PWA", "Zustand", "Recharts", "Monorepo"],
  },
];
