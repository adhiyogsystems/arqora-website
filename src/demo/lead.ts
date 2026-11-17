/**
 * A lead's preview website lives entirely in its link:
 *   /p/{readable-slug}/{code}
 * The slug is cosmetic (business name and city, so the link looks like theirs);
 * the code holds the details as base64url JSON. No database needed.
 */

export type Lead = {
  niche: string;
  name: string;
  city: string;
  phone: string;
  address: string;
  hours: string;
  rating: string;
  reviews: string;
  /** One-time price shown on the claim offer, e.g. "₹4,999" or "€299". */
  price: string;
  /** Monthly fee for hosting, updates and the review kit, e.g. "₹499". */
  monthly: string;
};

export const defaultPrice = "₹4,999";
export const defaultMonthly = "₹499";

const order: (keyof Lead)[] = ["niche", "name", "city", "phone", "address", "hours", "rating", "reviews", "price", "monthly"];
const limits: Record<keyof Lead, number> = { niche: 20, name: 70, city: 40, phone: 15, address: 100, hours: 70, rating: 4, reviews: 7, price: 20, monthly: 20 };

function clean(lead: Partial<Lead>): Lead {
  const out = {} as Lead;
  for (const k of order) out[k] = String(lead[k] ?? "").replace(/\s+/g, " ").trim().slice(0, limits[k]);
  out.phone = out.phone.replace(/[^\d]/g, "");
  out.rating = /^\d(\.\d)?$/.test(out.rating) ? out.rating : "";
  out.reviews = out.reviews.replace(/[^\d]/g, "");
  return out;
}

function toBase64Url(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

/** Fields are joined with the ASCII unit separator, which never appears in business details. */
const SEP = "\u001f";

export function encodeLead(lead: Partial<Lead>): string {
  const c = clean(lead);
  if (c.price === defaultPrice) c.price = "";
  if (c.monthly === defaultMonthly) c.monthly = "";
  const arr: string[] = order.map((k) => c[k].replaceAll(SEP, " "));
  while (arr.length && !arr[arr.length - 1]) arr.pop();
  return toBase64Url(["2", ...arr].join(SEP));
}

export function decodeLead(code: string): Lead | null {
  if (!/^[A-Za-z0-9_-]{4,1200}$/.test(code)) return null;
  try {
    const arr = fromBase64Url(code).split(SEP);
    if (arr[0] !== "2") return null;
    const lead: Partial<Lead> = {};
    order.forEach((k, i) => (lead[k] = arr[i + 1] ?? ""));
    const c = clean(lead);
    return c.name && c.niche ? c : null;
  } catch {
    return null;
  }
}

export function slugify(...parts: string[]) {
  const s = parts
    .join(" ")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
  return s || "website";
}

export function leadPath(lead: Partial<Lead>) {
  return `/p/${slugify(lead.name ?? "", lead.city ?? "")}/${encodeLead(lead)}`;
}

/**
 * Leads found through the Google Places API: Google's terms only allow
 * keeping the place ID, so the link holds the place ID (plus our own
 * choices: industry, the city we searched, price) and the preview page
 * looks up the business name and address live when it is opened.
 */
export type PlaceRef = { niche: string; placeId: string; city: string; price: string; monthly: string };

const placeIdPattern = /^[A-Za-z0-9_-]{10,300}$/;

export function placePath(ref: PlaceRef) {
  const price = ref.price === defaultPrice ? "" : ref.price.slice(0, 20);
  const monthly = ref.monthly === defaultMonthly ? "" : ref.monthly.slice(0, 20);
  const arr = ["3", ref.niche, ref.placeId, ref.city.slice(0, 40), price, monthly].map((s) => s.replaceAll(SEP, " "));
  while (arr.length && !arr[arr.length - 1]) arr.pop();
  return `/p/${slugify(ref.niche, ref.city)}/${toBase64Url(arr.join(SEP))}`;
}

export function decodePlace(code: string): PlaceRef | null {
  if (!/^[A-Za-z0-9_-]{4,1200}$/.test(code)) return null;
  try {
    const [v, niche = "", placeId = "", city = "", price = "", monthly = ""] = fromBase64Url(code).split(SEP);
    if (v !== "3" || !niche || !placeIdPattern.test(placeId)) return null;
    return { niche: niche.slice(0, 20), placeId, city: city.slice(0, 40), price: price || defaultPrice, monthly: monthly || defaultMonthly };
  } catch {
    return null;
  }
}

/** Indian 10-digit numbers get the 91 prefix; anything else is used as given. */
export const intlPhone = (digits: string) => (digits.length === 10 ? `91${digits}` : digits);
