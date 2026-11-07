/**
 * One place for everything that identifies the business.
 * TODO before launch: set the real domain, WhatsApp number and email.
 */
export const PRODUCTION_URL = "https://www.adhiyogsystems.com";

function resolveSiteUrl(): string {
  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export const siteUrl = new URL(resolveSiteUrl());

export const site = {
  name: "Adhiyog Systems",
  tagline: "Websites, apps and business software, built close to home.",
  description:
    "Adhiyog Systems builds websites, mobile-friendly apps, CRM and business software, and data dashboards for businesses and institutions in Maharashtra.",
  location: "Solapur, Maharashtra",
  // Digits only, with country code, e.g. "919876543210". Empty hides WhatsApp links.
  whatsapp: "",
  email: "hello@adhiyogsystems.com",
} as const;

export function whatsappLink(message: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
