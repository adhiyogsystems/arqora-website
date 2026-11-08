export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  icon: "globe" | "phone" | "crm" | "chart" | "gov" | "support";
  includes: string[];
  goodFor: string[];
  /** Shown on the site now. Set false to hide until ready. */
  live: boolean;
};

export const services: Service[] = [
  {
    slug: "websites",
    title: "Websites & SEO",
    short: "Fast, modern business websites that show up on Google.",
    intro:
      "A website that loads fast on any phone, explains what you do in plain words, and helps customers find you on Google Search and Maps.",
    icon: "globe",
    includes: [
      "Business websites for shops, clinics, schools and hotels",
      "Multilingual websites in any language",
      "Google Search and Google Maps setup",
      "Landing pages for ads, events and launches",
      "Online catalogs with UPI or Razorpay payments",
      "Hosting, domain and monthly maintenance plans",
    ],
    goodFor: ["Local businesses", "Clinics and hospitals", "Temples and tourism", "Schools and coaching classes"],
    live: true,
  },
  {
    slug: "apps",
    title: "Apps (PWA, Android, iOS)",
    short: "App-style websites that install on phones, plus native apps.",
    intro:
      "Start with a progressive web app: it installs from your website like a normal app, works on weak networks, and costs far less than a Play Store app. Move to native apps when you need them.",
    icon: "phone",
    includes: [
      "Installable web apps (PWA) that work offline",
      "Booking apps for appointments, rooms and tables",
      "Ordering and delivery apps for local businesses",
      "Android and iOS apps",
      "Admin panels for running the app day to day",
    ],
    goodFor: ["Service businesses", "Restaurants and stores", "Travel and stays", "Startups"],
    live: true,
  },
  {
    slug: "crm-software",
    title: "CRM & Business Software",
    short: "Leads, billing, stock and staff, in one simple system.",
    intro:
      "Software shaped around how your business already works, not the other way round. Replace registers and scattered Excel files with one system your team can use from a phone.",
    icon: "crm",
    includes: [
      "CRM for leads, follow-ups and customers",
      "Billing, invoices and GST reports",
      "Inventory and stock management",
      "Staff attendance, payroll and tasks",
      "School, clinic, society and trust management",
      "WhatsApp and email reminders",
    ],
    goodFor: ["Traders and distributors", "Clinics", "Schools", "Societies and trusts"],
    live: true,
  },
  {
    slug: "data-automation",
    title: "Data, Dashboards & Automation",
    short: "Turn messy sheets into clear reports that update themselves.",
    intro:
      "We clean and organise your data, build dashboards that show what matters, and automate the repetitive work: reports, reminders and messages that go out on their own.",
    icon: "chart",
    includes: [
      "Excel and Google Sheets to live dashboards",
      "Data cleaning and dataset preparation",
      "Sales, expense and trend reports",
      "Automated WhatsApp and email messages",
      "AI chatbots for websites and WhatsApp",
    ],
    goodFor: ["Owners who want numbers at a glance", "Teams drowning in spreadsheets", "Research and data projects"],
    live: true,
  },
  {
    slug: "government-projects",
    title: "Government & Institutional Projects",
    short: "Portals, digitisation and GeM projects, with trusted partners.",
    intro:
      "Websites and software for government offices, gram panchayats, cooperatives and institutions, delivered with experienced partners for tender and GeM work.",
    icon: "gov",
    includes: [
      "Websites for panchayats, cooperatives and offices",
      "Record digitisation and data entry",
      "Citizen forms and e-governance portals",
      "Accessible, bilingual websites",
      "GeM and tender support through partners",
    ],
    goodFor: ["Government offices", "Gram panchayats", "Cooperative societies", "Institutions"],
    live: true,
  },
];

export const liveServices = () => services.filter((s) => s.live);
export const getService = (slug: string) => liveServices().find((s) => s.slug === slug);
