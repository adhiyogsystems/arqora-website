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

export type ServiceSeo = { seoTitle: string; seoDescription: string; faqs: { q: string; a: string }[] };

/** Search titles, descriptions and service FAQs: written around what people actually search for. */
const seo: Record<Lang, Record<string, ServiceSeo>> = {
  en: {
    websites: {
      seoTitle: "Website Development & SEO Services",
      seoDescription:
        "Fast, mobile-first business websites with technical SEO, Google Business setup and multilingual content. Fixed-price website development by Arqora.",
      faqs: [
        { q: "How much does a business website cost?", a: "It depends on pages, languages and features. You get a fixed, written quote after a short call, and a simple business website can start small and grow later." },
        { q: "Will my website rank on Google?", a: "Every site we build includes technical SEO: fast loading, clean URLs, structured data, a sitemap and Google Search Console setup. Rankings also depend on content and competition, and we can help with both." },
        { q: "Can you build a multilingual website?", a: "Yes. We build websites in any language, with proper language tags so search engines show each visitor the right version, as on our own English and German site." },
      ],
    },
    apps: {
      seoTitle: "PWA & Mobile App Development (Android, iOS)",
      seoDescription:
        "Progressive web apps and native Android and iOS apps: booking, ordering and business apps that install on any phone. App development from India and Germany.",
      faqs: [
        { q: "What is a PWA, and do I need a native app?", a: "A progressive web app installs from your website like a normal app, works on weak networks and costs much less. Many businesses start with a PWA and add native Android and iOS apps later." },
        { q: "Can you publish my app on Google Play and the App Store?", a: "Yes. We prepare and submit native apps to both stores using your developer accounts, so the apps stay yours." },
        { q: "Do you build booking and ordering apps?", a: "Yes: appointment, room and table bookings, food and product ordering, with payments, notifications and an admin panel." },
      ],
    },
    "crm-software": {
      seoTitle: "Custom CRM & Business Software Development",
      seoDescription:
        "Custom CRM, billing, inventory and staff management software built around your workflow. Cloud-based, mobile-friendly, and you own the code.",
      faqs: [
        { q: "Why a custom CRM instead of off-the-shelf software?", a: "Custom software fits how your team already works, has no per-user licence fees and grows with you. You own the code and the data." },
        { q: "Can it connect to WhatsApp, email and payments?", a: "Yes. We integrate WhatsApp and email reminders, payment gateways and your existing tools through their APIs." },
        { q: "Can my team use it on their phones?", a: "Yes. Everything we build works in the browser on phones, tablets and computers, and can be installed like an app." },
      ],
    },
    "data-automation": {
      seoTitle: "Data Analytics, Dashboards & Business Automation",
      seoDescription:
        "Turn Excel and Google Sheets into live dashboards, clean your datasets, and automate reports, reminders and WhatsApp messages. AI chatbots for websites and WhatsApp.",
      faqs: [
        { q: "Can you turn our Excel sheets into a dashboard?", a: "Yes. We clean and structure your sheets, connect them to a database or Google Sheets, and build live dashboards that update automatically." },
        { q: "What can be automated?", a: "Recurring reports, reminders, follow-ups, WhatsApp and email messages, data entry between tools and simple approvals." },
        { q: "Do you build AI chatbots?", a: "Yes: chatbots for your website or WhatsApp that answer common questions from your own content and hand over to your team when needed." },
      ],
    },
    "government-projects": {
      seoTitle: "Government & Public Sector Software Development",
      seoDescription:
        "E-governance portals, record digitisation and accessible, multilingual websites for government offices, local bodies and institutions.",
      faqs: [
        { q: "Do you work on government tenders?", a: "Yes, through experienced partners for tender, GeM and public procurement processes, while we handle design and development." },
        { q: "Are your websites accessible?", a: "We build to accessibility best practice: readable contrast, keyboard navigation, screen-reader labels and multilingual content." },
        { q: "Can you digitise paper records?", a: "Yes. We plan the data structure, organise data entry and build searchable systems so records are easy to find and kept secure." },
      ],
    },
  },
  de: {
    websites: {
      seoTitle: "Webentwicklung & SEO",
      seoDescription:
        "Schnelle, mobile Unternehmenswebsites mit technischer SEO, Google-Unternehmensprofil und mehrsprachigen Inhalten. Webentwicklung zum Festpreis von Arqora.",
      faqs: [
        { q: "Was kostet eine Unternehmenswebsite?", a: "Das hängt von Seiten, Sprachen und Funktionen ab. Nach einem kurzen Gespräch erhalten Sie ein festes, schriftliches Angebot. Eine einfache Website kann klein starten und später wachsen." },
        { q: "Wird meine Website bei Google gefunden?", a: "Jede Website enthält technische SEO: schnelle Ladezeiten, saubere URLs, strukturierte Daten, eine Sitemap und die Einrichtung der Google Search Console. Rankings hängen auch von Inhalten und Wettbewerb ab, und wir helfen bei beidem." },
        { q: "Können Sie eine mehrsprachige Website erstellen?", a: "Ja. Wir bauen Websites in jeder Sprache, mit korrekten Sprachangaben, damit Suchmaschinen jedem Besucher die passende Version zeigen, wie auf unserer eigenen deutschen und englischen Website." },
      ],
    },
    apps: {
      seoTitle: "App-Entwicklung: PWA, Android & iOS",
      seoDescription:
        "Progressive Web Apps und native Android- und iOS-Apps: Buchungs-, Bestell- und Business-Apps für jedes Smartphone. App-Entwicklung aus Indien und Deutschland.",
      faqs: [
        { q: "Was ist eine PWA, und brauche ich eine native App?", a: "Eine Progressive Web App lässt sich wie eine normale App über Ihre Website installieren, funktioniert bei schwachem Netz und kostet deutlich weniger. Viele Unternehmen starten mit einer PWA und ergänzen später native Apps." },
        { q: "Veröffentlichen Sie meine App bei Google Play und im App Store?", a: "Ja. Wir bereiten native Apps vor und reichen sie über Ihre eigenen Entwicklerkonten ein, damit die Apps Ihnen gehören." },
        { q: "Entwickeln Sie Buchungs- und Bestell-Apps?", a: "Ja: Termin-, Zimmer- und Tischbuchungen sowie Bestellungen von Speisen und Produkten, mit Zahlung, Benachrichtigungen und Admin-Bereich." },
      ],
    },
    "crm-software": {
      seoTitle: "CRM- & Individualsoftware-Entwicklung",
      seoDescription:
        "Individuelle CRM-, Rechnungs-, Lager- und Personalsoftware, gebaut für Ihre Abläufe. Cloudbasiert, mobil nutzbar, und der Code gehört Ihnen.",
      faqs: [
        { q: "Warum ein individuelles CRM statt Standardsoftware?", a: "Individuelle Software passt zu den Abläufen Ihres Teams, hat keine Lizenzkosten pro Nutzer und wächst mit Ihnen. Code und Daten gehören Ihnen." },
        { q: "Lässt sich die Software mit WhatsApp, E-Mail und Zahlungen verbinden?", a: "Ja. Wir binden WhatsApp- und E-Mail-Erinnerungen, Zahlungsanbieter und Ihre bestehenden Werkzeuge über deren Schnittstellen an." },
        { q: "Kann mein Team die Software auf dem Smartphone nutzen?", a: "Ja. Alles, was wir bauen, läuft im Browser auf Smartphones, Tablets und Computern und lässt sich wie eine App installieren." },
      ],
    },
    "data-automation": {
      seoTitle: "Datenanalyse, Dashboards & Automatisierung",
      seoDescription:
        "Aus Excel und Google Sheets werden Live-Dashboards: Datenbereinigung, automatisierte Berichte, Erinnerungen und WhatsApp-Nachrichten sowie KI-Chatbots.",
      faqs: [
        { q: "Können Sie aus unseren Excel-Tabellen ein Dashboard machen?", a: "Ja. Wir bereinigen und strukturieren Ihre Tabellen, verbinden sie mit einer Datenbank oder Google Sheets und bauen Live-Dashboards, die sich automatisch aktualisieren." },
        { q: "Was lässt sich automatisieren?", a: "Wiederkehrende Berichte, Erinnerungen, Nachfassaktionen, WhatsApp- und E-Mail-Nachrichten, Datenübertragung zwischen Werkzeugen und einfache Freigaben." },
        { q: "Entwickeln Sie KI-Chatbots?", a: "Ja: Chatbots für Ihre Website oder WhatsApp, die häufige Fragen aus Ihren eigenen Inhalten beantworten und bei Bedarf an Ihr Team übergeben." },
      ],
    },
    "government-projects": {
      seoTitle: "Software für Behörden & öffentliche Einrichtungen",
      seoDescription:
        "E-Government-Portale, Digitalisierung von Akten und barrierefreie, mehrsprachige Websites für Behörden, Kommunen und Institutionen.",
      faqs: [
        { q: "Arbeiten Sie an öffentlichen Ausschreibungen?", a: "Ja, über erfahrene Partner für Ausschreibungen und öffentliche Vergabe, während wir Design und Entwicklung übernehmen." },
        { q: "Sind Ihre Websites barrierefrei?", a: "Wir arbeiten nach den Grundsätzen der Barrierefreiheit: gut lesbare Kontraste, Tastaturbedienung, Beschriftungen für Screenreader und mehrsprachige Inhalte." },
        { q: "Können Sie Papierakten digitalisieren?", a: "Ja. Wir planen die Datenstruktur, organisieren die Erfassung und bauen durchsuchbare Systeme, damit Akten schnell auffindbar und sicher sind." },
      ],
    },
  },
};

export const serviceSeo = (lang: Lang, slug: string): ServiceSeo | undefined => seo[lang][slug];

export const liveServices = (lang: Lang) => all[lang].filter((s) => live[s.slug]);
export const getService = (lang: Lang, slug: string) => liveServices(lang).find((s) => s.slug === slug);
