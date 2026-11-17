import { checkTeamPassword } from "@/lib/leadsAuth";

/**
 * Google Places API (New) Text Search: "dentists in Solapur" → up to 20
 * businesses per page, 3 pages max. Official API, so no scraping or blocking.
 */

const fieldMask = [
  "places.displayName",
  "places.formattedAddress",
  "places.shortFormattedAddress",
  "places.internationalPhoneNumber",
  "places.websiteUri",
  "places.rating",
  "places.userRatingCount",
  "places.primaryTypeDisplayName",
  "places.regularOpeningHours.weekdayDescriptions",
  "places.businessStatus",
  "places.googleMapsUri",
  "nextPageToken",
].join(",");

type Place = {
  displayName?: { text?: string };
  formattedAddress?: string;
  shortFormattedAddress?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  primaryTypeDisplayName?: { text?: string };
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  businessStatus?: string;
  googleMapsUri?: string;
};

/** "Monday: 10:00 AM – 9:00 PM" ×7 → "Mon–Sat · 10:00 AM – 9:00 PM" where possible. */
function shortHours(days?: string[]) {
  if (!days || days.length !== 7) return "";
  const times = days.map((d) => d.replace(/^[^:]+:\s*/, "").replace(/\u202f|\u2009/g, " ").trim());
  if (times.every((t) => t === times[0])) return /closed/i.test(times[0]) ? "" : `Every day · ${times[0]}`;
  if (times.slice(0, 6).every((t) => t === times[0]) && !/closed/i.test(times[0])) return `Mon–Sat · ${times[0]}`;
  return `Mon · ${times[0]}`;
}

export async function POST(req: Request) {
  const denied = checkTeamPassword(req);
  if (denied) return denied;
  const key = process.env.GOOGLE_PLACES_KEY;
  if (!key) return Response.json({ error: "GOOGLE_PLACES_KEY is not set in Vercel." }, { status: 503 });

  const body = (await req.json().catch(() => ({}))) as { what?: string; where?: string; pageToken?: string };
  const what = String(body.what ?? "").trim().slice(0, 80);
  const where = String(body.where ?? "").trim().slice(0, 80);
  if (!what || !where) return Response.json({ error: "Type what to search and where." }, { status: 400 });

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": key, "X-Goog-FieldMask": fieldMask },
    body: JSON.stringify({ textQuery: `${what} in ${where}`, pageSize: 20, languageCode: "en", ...(body.pageToken ? { pageToken: String(body.pageToken) } : {}) }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { places?: Place[]; nextPageToken?: string; error?: { message?: string } };
  if (!res.ok) return Response.json({ error: `Google: ${data.error?.message ?? res.statusText}` }, { status: 502 });

  const places = (data.places ?? [])
    .filter((p) => !p.businessStatus || p.businessStatus === "OPERATIONAL")
    .map((p) => ({
      name: p.displayName?.text ?? "",
      category: p.primaryTypeDisplayName?.text ?? what,
      city: where,
      phone: (p.internationalPhoneNumber ?? "").replace(/[^\d]/g, ""),
      address: p.shortFormattedAddress ?? p.formattedAddress ?? "",
      hours: shortHours(p.regularOpeningHours?.weekdayDescriptions),
      rating: p.rating ? p.rating.toFixed(1) : "",
      reviews: p.userRatingCount ? String(p.userRatingCount) : "",
      website: p.websiteUri ?? "",
      maps: p.googleMapsUri ?? "",
    }))
    .filter((p) => p.name);

  return Response.json({ places, nextPageToken: data.nextPageToken ?? null });
}
