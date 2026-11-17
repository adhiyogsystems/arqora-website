import { cache } from "react";

/**
 * Live Place Details lookup for preview pages. Only Pro-tier fields (name and
 * address) so it falls in the larger free allowance. Never cached or stored,
 * as Google's terms require; React's cache() only shares one lookup between
 * the page and its metadata within a single request.
 */
export type PlaceBasics = { name: string; address: string };

export const getPlaceBasics = cache(async (placeId: string): Promise<PlaceBasics | null> => {
  const key = process.env.GOOGLE_PLACES_KEY;
  if (!key || !/^[A-Za-z0-9_-]{10,300}$/.test(placeId)) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "displayName,shortFormattedAddress,formattedAddress" },
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const p = (await res.json()) as { displayName?: { text?: string }; shortFormattedAddress?: string; formattedAddress?: string };
    const name = p.displayName?.text?.trim();
    return name ? { name: name.slice(0, 70), address: (p.shortFormattedAddress ?? p.formattedAddress ?? "").slice(0, 100) } : null;
  } catch {
    return null;
  }
});
