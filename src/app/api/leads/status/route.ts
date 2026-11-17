/** Tells the lead tool which keys are configured (never the keys themselves). */
export function GET() {
  return Response.json({
    places: Boolean(process.env.GOOGLE_PLACES_KEY),
    password: (process.env.LEADS_PASSWORD ?? "").length >= 8,
  });
}
