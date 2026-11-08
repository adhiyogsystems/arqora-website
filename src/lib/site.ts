/**
 * One place for everything that identifies the business.
 * TODO: switch PRODUCTION_URL if the final domain is different from catholicontech.com.
 */
export const PRODUCTION_URL = "https://www.catholicontech.com";

function resolveSiteUrl(): string {
  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export const siteUrl = new URL(resolveSiteUrl());

export const site = {
  name: "Catholicon Technology Solutions",
  shortName: "Catholicon",
  tagline: "Tech solutions for every business.",
  description:
    "Catholicon Technology Solutions builds websites, apps, CRM and business software, and data and automation solutions for businesses worldwide.",
  location: "Headquartered in India",
  // Digits only, with country code, e.g. "919876543210". Empty hides WhatsApp links.
  whatsapp: "918421488114",
  phone: "+91 84214 88114",
  email: "adhiyogsystems@gmail.com",
} as const;

export function whatsappLink(message: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
