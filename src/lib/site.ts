import type { Lang } from "@/i18n/config";

/**
 * One place for everything that identifies the business.
 *
 * The public address follows Vercel's production domain automatically: today
 * arqoratech.vercel.app, and the custom domain (e.g. arqoratech.com) as soon as
 * it is connected and set as the production domain in Vercel. Canonical links,
 * hreflang and the sitemap all use this, so they never point at a domain we
 * do not serve. NEXT_PUBLIC_SITE_URL overrides it if ever needed.
 */
const FALLBACK_URL = "https://arqoratech.vercel.app";

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return process.env.NODE_ENV === "production" ? FALLBACK_URL : "http://localhost:3000";
}

export const siteUrl = new URL(resolveSiteUrl());

export const site = {
  name: "Arqora Technology Solutions",
  shortName: "Arqora",
  // Digits only, with country code, e.g. "919876543210". Empty hides WhatsApp links.
  whatsapp: "918421488114",
  phone: "+91 84214 88114",
  email: "adhiyogsystems@gmail.com",
} as const;

export const siteText: Record<Lang, { tagline: string; description: string; location: string; seoTitle: string; seoDescription: string }> = {
  en: {
    tagline: "Tech solutions for every business.",
    description:
      "Arqora Technology Solutions builds websites, apps, CRM and business software, and data and automation solutions for businesses worldwide.",
    location: "India · Germany",
    seoTitle: "Arqora | Web, App & Custom Software Development Company",
    seoDescription:
      "Global software development partner with teams in India and Germany: websites and SEO, PWA and mobile apps, custom CRM, dashboards and automation. Fixed quotes.",
  },
  de: {
    tagline: "Tech-Lösungen für jedes Unternehmen.",
    description:
      "Arqora Technology Solutions entwickelt Websites, Apps, CRM- und Unternehmenssoftware sowie Daten- und Automatisierungslösungen für Unternehmen weltweit.",
    location: "Indien · Deutschland",
    seoTitle: "Arqora | Web-, App- & Softwareentwicklung aus Kiel und Indien",
    seoDescription:
      "Ihr Partner für Softwareentwicklung: Websites & SEO, PWA- und App-Entwicklung, individuelle CRM-Software, Dashboards und Automatisierung. Festpreisangebote.",
  },
};

/**
 * Details for the Impressum (legal notice). Fill these in: German law expects
 * the name of the owner or legal representative. Empty fields are hidden.
 */
export const legal = {
  /** The legal entity behind the Arqora brand. All legal matters are handled under Indian jurisdiction. */
  operator: "Adhiyog Systems",
  operatorCountry: { en: "India", de: "Indien" } as Record<Lang, string>,
  /** Owner or authorised representative, e.g. "Dr. Firstname Lastname". */
  owner: "",
  /** e.g. "Sole proprietorship (India)" or "Private Limited Company (India)". */
  legalForm: { en: "", de: "" } as Record<Lang, string>,
  /** Company registration, e.g. "CIN U12345MH2026PTC123456" or Udyam number. */
  registration: "",
  /** GST or EU VAT number, if any. */
  taxId: "",
  /** Shown before the Kiel address, e.g. "c/o Friend's Company GmbH". */
  careOf: "",
  updated: { en: "November 2026", de: "November 2026" } as Record<Lang, string>,
};

export type Office = {
  key: string;
  country: Record<Lang, string>;
  label: Record<Lang, string>;
  /** Postal address lines, shown as written. Empty for an office without a public address. */
  lines: Record<Lang, string[]>;
  /** Display format, e.g. "+49 151 2345 6789". Empty hides it. */
  phone: string;
  /** Office-specific email. Empty hides it. */
  email?: string;
  /** For search engines. */
  postal?: { street: string; postalCode: string; city: string; countryCode: string };
};

const kielStreet = ["KITZ – Kieler Innovations- und Technologiezentrum", "Schauenburgerstraße 116"];

export const offices: Office[] = [
  {
    key: "in",
    country: { en: "India", de: "Indien" },
    label: { en: "Headquarters", de: "Hauptsitz" },
    lines: { en: [], de: [] },
    phone: site.phone,
  },
  {
    key: "de",
    country: { en: "Germany", de: "Deutschland" },
    label: { en: "Kiel office", de: "Büro Kiel" },
    lines: {
      en: [site.name, ...(legal.careOf ? [legal.careOf] : []), ...kielStreet, "24118 Kiel, Germany"],
      de: [site.name, ...(legal.careOf ? [legal.careOf] : []), ...kielStreet, "24118 Kiel, Deutschland"],
    },
    phone: "", // TODO: add the German mobile number
    email: "arqoratech@gmx.de",
    postal: { street: "Schauenburgerstraße 116", postalCode: "24118", city: "Kiel", countryCode: "DE" },
  },
];

export const germanOffice = offices.find((o) => o.key === "de")!;

/** The main email for a language: German visitors see the German address first. */
export const primaryEmail = (lang: Lang) => (lang === "de" && germanOffice.email ? germanOffice.email : site.email);

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export function whatsappLink(message: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
