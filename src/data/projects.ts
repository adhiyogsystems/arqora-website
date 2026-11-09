import type { Lang } from "@/i18n/config";

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

type Base = Pick<Project, "slug" | "name" | "url" | "image" | "stack">;
type Text = Pick<Project, "category" | "summary" | "built">;

const base: Base[] = [
  { slug: "akkalkot-yatra", name: "Akkalkot Yatra", url: "https://www.akkalkotyatra.com", image: "/work/akkalkot-yatra.jpg", stack: ["Next.js", "TypeScript", "Vercel"] },
  {
    slug: "sukh-arogyam",
    name: "Sukh-Arogyam",
    url: "https://www.sukharogyam.com",
    image: "/work/sukharogyam.jpg",
    stack: ["Next.js", "TypeScript", "Supabase", "Framer Motion", "Vercel"],
  },
  {
    slug: "sukh-arogyam-app",
    name: "Sukh-Arogyam App",
    url: "https://app.sukharogyam.com",
    image: "/work/sukharogyam-app.jpg",
    stack: ["Next.js", "TypeScript", "Supabase", "PWA", "Zustand", "Recharts", "Monorepo"],
  },
];

const text: Record<Lang, Record<string, Text>> = {
  en: {
    "akkalkot-yatra": {
      category: "Tourism & pilgrimage",
      summary:
        "A complete pilgrim guide for Akkalkot: rooms near the Swami Samarth temple, darshan and aarti timings, travel, places to visit and events. Available in English and Marathi.",
      built: [
        "Bilingual website (English and Marathi)",
        "Installable app (PWA) that works offline",
        "Stay listings with WhatsApp enquiries",
        "Full SEO: sitemap, structured data, fast loading",
      ],
    },
    "sukh-arogyam": {
      category: "Health & wellness · Website",
      summary:
        "The public home of a holistic well-being movement blending Ayurveda, Vedic wisdom and modern tools. Built around the Seven Petals framework, with a book series, a wisdom blog and corporate wellness programmes.",
      built: [
        "Content-rich brand website with a hero carousel",
        "Seven Petals and Marga framework explained visually",
        "Books, blog, testimonials and newsletter sign-up",
        "Corporate wellness section for businesses",
      ],
    },
    "sukh-arogyam-app": {
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
    },
  },
  de: {
    "akkalkot-yatra": {
      category: "Tourismus & Pilgerreisen",
      summary:
        "Ein umfassender Pilgerführer für Akkalkot: Unterkünfte nahe dem Swami-Samarth-Tempel, Darshan- und Aarti-Zeiten, Anreise, Sehenswürdigkeiten und Veranstaltungen. Verfügbar auf Englisch und Marathi.",
      built: [
        "Zweisprachige Website (Englisch und Marathi)",
        "Installierbare App (PWA) mit Offline-Funktion",
        "Unterkunftsangebote mit WhatsApp-Anfragen",
        "Vollständige SEO: Sitemap, strukturierte Daten, schnelle Ladezeiten",
      ],
    },
    "sukh-arogyam": {
      category: "Gesundheit & Wohlbefinden · Website",
      summary:
        "Die Website einer ganzheitlichen Wellbeing-Bewegung, die Ayurveda, vedisches Wissen und moderne Methoden verbindet. Aufgebaut rund um das Modell der Sieben Blütenblätter, mit Buchreihe, Wissensblog und Programmen für betriebliche Gesundheit.",
      built: [
        "Inhaltsstarke Markenwebsite mit Bild-Karussell",
        "Sieben Blütenblätter und Marga-Modell visuell erklärt",
        "Bücher, Blog, Erfahrungsberichte und Newsletter",
        "Bereich für betriebliche Gesundheitsprogramme",
      ],
    },
    "sukh-arogyam-app": {
      category: "Gesundheit & Wohlbefinden · Installierbare App",
      summary:
        "Eine dynamische, installierbare Web-App (PWA): Nutzer machen einen 3-minütigen Petal Scan, sehen, welcher Lebensbereich am stärksten belastet ist, und folgen einer persönlichen täglichen Praxis. Als Monorepo gebaut, das Design und Code mit der Website teilt.",
      built: [
        "Petal-Scan-Analyse mit persönlichen Ergebnissen",
        "Tägliche Sadhana und Fortschrittsverfolgung",
        "Anmeldung, Nutzerdaten und Inhalte auf Supabase",
        "Installierbar wie eine native App (PWA)",
        "Monorepo mit gemeinsamer UI, Design-Tokens und Typen",
      ],
    },
  },
};

export const getProjects = (lang: Lang): Project[] => base.map((b) => ({ ...b, ...text[lang][b.slug] }));
