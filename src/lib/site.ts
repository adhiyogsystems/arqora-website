/**
 * One place for everything that identifies the business.
 * TODO: switch PRODUCTION_URL if the final domain is different from arqoratech.com.
 */
export const PRODUCTION_URL = "https://www.arqoratech.com";

function resolveSiteUrl(): string {
  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export const siteUrl = new URL(resolveSiteUrl());

export const site = {
  name: "Arqora Technology Solutions",
  shortName: "Arqora",
  tagline: "Tech solutions for every business.",
  description:
    "Arqora Technology Solutions builds websites, apps, CRM and business software, and data and automation solutions for businesses worldwide.",
  location: "India · Germany",
  // Digits only, with country code, e.g. "919876543210". Empty hides WhatsApp links.
  whatsapp: "918421488114",
  phone: "+91 84214 88114",
  email: "adhiyogsystems@gmail.com",
} as const;

export type Office = {
  country: string;
  label: string;
  /** Postal address lines, shown as written. Empty for an office without a public address. */
  lines: string[];
  /** Display format, e.g. "+49 151 2345 6789". Empty hides it. */
  phone: string;
  /** Office-specific email. Empty hides it. */
  email?: string;
  /** For search engines. */
  postal?: { street: string; postalCode: string; city: string; countryCode: string };
};

export const offices: Office[] = [
  {
    country: "India",
    label: "Headquarters",
    lines: [],
    phone: site.phone,
  },
  {
    country: "Germany",
    label: "Kiel office",
    lines: [
      site.name,
      "KITZ – Kieler Innovations- und Technologiezentrum",
      "Schauenburgerstraße 116",
      "24118 Kiel, Germany",
    ],
    phone: "", // TODO: add the German mobile number
    email: "arqoratech@gmx.de",
    postal: { street: "Schauenburgerstraße 116", postalCode: "24118", city: "Kiel", countryCode: "DE" },
  },
];

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export function whatsappLink(message: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
