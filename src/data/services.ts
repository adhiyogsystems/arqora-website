import type { Lang } from "@/i18n/config";

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  includes: string[];
  goodFor: string[];
};

/** Set false to hide a service on the site (both languages). */
const live: Record<string, boolean> = {
  websites: true,
  apps: true,
  "crm-software": true,
  "data-automation": true,
  "government-projects": true,
};

const en: Service[] = [
  {
    slug: "websites",
    title: "Websites & SEO",
    short: "Fast, modern business websites that show up on Google.",
    intro:
      "A website that loads fast on any phone, explains what you do in plain words, and helps customers find you on Google Search and Maps.",
    includes: [
      "Business websites for shops, clinics, schools and hotels",
      "Multilingual websites in any language",
      "Google Search and Google Maps setup",
      "Landing pages for ads, events and launches",
      "Online catalogs with online payments",
      "Hosting, domain and monthly maintenance plans",
    ],
    goodFor: ["Local businesses", "Clinics and hospitals", "Temples and tourism", "Schools and coaching classes"],
  },
  {
    slug: "apps",
    title: "Apps (PWA, Android, iOS)",
    short: "App-style websites that install on phones, plus native apps.",
    intro:
      "Start with a progressive web app: it installs from your website like a normal app, works on weak networks, and costs far less than a Play Store app. Move to native apps when you need them.",
    includes: [
      "Installable web apps (PWA) that work offline",
      "Booking apps for appointments, rooms and tables",
      "Ordering and delivery apps for local businesses",
      "Android and iOS apps",
      "Admin panels for running the app day to day",
    ],
    goodFor: ["Service businesses", "Restaurants and stores", "Travel and stays", "Startups"],
  },
  {
    slug: "crm-software",
    title: "CRM & Business Software",
    short: "Leads, billing, stock and staff, in one simple system.",
    intro:
      "Software shaped around how your business already works, not the other way round. Replace registers and scattered Excel files with one system your team can use from a phone.",
    includes: [
      "CRM for leads, follow-ups and customers",
      "Billing, invoices and GST reports",
      "Inventory and stock management",
      "Staff attendance, payroll and tasks",
      "School, clinic, society and trust management",
      "WhatsApp and email reminders",
    ],
    goodFor: ["Traders and distributors", "Clinics", "Schools", "Societies and trusts"],
  },
  {
    slug: "data-automation",
    title: "Data, Dashboards & Automation",
    short: "Turn messy sheets into clear reports that update themselves.",
    intro:
      "We clean and organise your data, build dashboards that show what matters, and automate the repetitive work: reports, reminders and messages that go out on their own.",
    includes: [
      "Excel and Google Sheets to live dashboards",
      "Data cleaning and dataset preparation",
      "Sales, expense and trend reports",
      "Automated WhatsApp and email messages",
      "AI chatbots for websites and WhatsApp",
    ],
    goodFor: ["Owners who want numbers at a glance", "Teams drowning in spreadsheets", "Research and data projects"],
  },
  {
    slug: "government-projects",
    title: "Government & Institutional Projects",
    short: "Portals, digitisation and public-sector projects, with trusted partners.",
    intro:
      "Websites and software for government offices, local bodies, cooperatives and institutions, delivered with experienced partners for tender and GeM work.",
    includes: [
      "Websites for local bodies, cooperatives and offices",
      "Record digitisation and data entry",
      "Citizen forms and e-governance portals",
      "Accessible, multilingual websites",
      "Tender and GeM support through partners",
    ],
    goodFor: ["Government offices", "Gram panchayats", "Cooperative societies", "Institutions"],
  },
];

const de: Service[] = [
  {
    slug: "websites",
    title: "Websites & SEO",
    short: "Schnelle, moderne Unternehmenswebsites, die bei Google gefunden werden.",
    intro:
      "Eine Website, die auf jedem Smartphone schnell lädt, in klaren Worten erklärt, was Sie tun, und Kunden hilft, Sie über die Google-Suche und Google Maps zu finden.",
    includes: [
      "Websites für Geschäfte, Praxen, Schulen und Hotels",
      "Mehrsprachige Websites in jeder Sprache",
      "Einrichtung von Google-Suche und Google Maps",
      "Landingpages für Werbung, Events und Produktstarts",
      "Online-Kataloge mit Online-Zahlung",
      "Hosting, Domain und monatliche Wartungspakete",
    ],
    goodFor: ["Lokale Unternehmen", "Praxen und Kliniken", "Tourismus und Reisen", "Schulen und Bildungsanbieter"],
  },
  {
    slug: "apps",
    title: "Apps (PWA, Android, iOS)",
    short: "App-ähnliche Websites, die sich auf Smartphones installieren lassen, sowie native Apps.",
    intro:
      "Starten Sie mit einer Progressive Web App: Sie lässt sich wie eine normale App über Ihre Website installieren, funktioniert auch bei schwachem Netz und kostet deutlich weniger als eine App im Play Store. Wechseln Sie zu nativen Apps, wenn Sie sie brauchen.",
    includes: [
      "Installierbare Web-Apps (PWA) mit Offline-Funktion",
      "Buchungs-Apps für Termine, Zimmer und Tische",
      "Bestell- und Liefer-Apps für lokale Unternehmen",
      "Android- und iOS-Apps",
      "Admin-Bereiche für den täglichen Betrieb",
    ],
    goodFor: ["Dienstleister", "Restaurants und Geschäfte", "Reisen und Unterkünfte", "Start-ups"],
  },
  {
    slug: "crm-software",
    title: "CRM & Unternehmenssoftware",
    short: "Leads, Rechnungen, Lager und Personal in einem einfachen System.",
    intro:
      "Software, die sich nach Ihren bestehenden Abläufen richtet, nicht umgekehrt. Ersetzen Sie Ordner und verstreute Excel-Dateien durch ein System, das Ihr Team vom Smartphone aus nutzen kann.",
    includes: [
      "CRM für Leads, Nachverfolgung und Kunden",
      "Rechnungen, Angebote und Steuerberichte",
      "Lager- und Bestandsverwaltung",
      "Anwesenheit, Gehaltsabrechnung und Aufgaben",
      "Verwaltung für Schulen, Praxen, Vereine und Stiftungen",
      "Erinnerungen per WhatsApp und E-Mail",
    ],
    goodFor: ["Handel und Großhandel", "Praxen", "Schulen", "Vereine und Stiftungen"],
  },
  {
    slug: "data-automation",
    title: "Daten, Dashboards & Automatisierung",
    short: "Aus unübersichtlichen Tabellen werden klare Berichte, die sich selbst aktualisieren.",
    intro:
      "Wir bereinigen und strukturieren Ihre Daten, bauen Dashboards, die das Wesentliche zeigen, und automatisieren wiederkehrende Aufgaben: Berichte, Erinnerungen und Nachrichten, die von selbst verschickt werden.",
    includes: [
      "Excel und Google Sheets als Live-Dashboards",
      "Datenbereinigung und Aufbereitung von Datensätzen",
      "Umsatz-, Kosten- und Trendberichte",
      "Automatisierte WhatsApp- und E-Mail-Nachrichten",
      "KI-Chatbots für Websites und WhatsApp",
    ],
    goodFor: ["Inhaber, die Zahlen auf einen Blick wollen", "Teams mit zu vielen Tabellen", "Forschungs- und Datenprojekte"],
  },
  {
    slug: "government-projects",
    title: "Projekte für Behörden & Institutionen",
    short: "Portale, Digitalisierung und öffentliche Aufträge, mit erfahrenen Partnern.",
    intro:
      "Websites und Software für Behörden, Kommunen, Genossenschaften und Institutionen, umgesetzt mit erfahrenen Partnern für Ausschreibungen und öffentliche Aufträge.",
    includes: [
      "Websites für Kommunen, Genossenschaften und Ämter",
      "Digitalisierung von Akten und Datenerfassung",
      "Bürgerformulare und E-Government-Portale",
      "Barrierefreie, mehrsprachige Websites",
      "Unterstützung bei Ausschreibungen über Partner",
    ],
    goodFor: ["Behörden", "Kommunen", "Genossenschaften", "Institutionen"],
  },
];

const all: Record<Lang, Service[]> = { en, de };

export const liveServices = (lang: Lang) => all[lang].filter((s) => live[s.slug]);
export const getService = (lang: Lang, slug: string) => liveServices(lang).find((s) => s.slug === slug);
