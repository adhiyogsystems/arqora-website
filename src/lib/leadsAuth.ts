import { timingSafeEqual } from "node:crypto";

/**
 * The lead tools call paid Google APIs and fetch other websites, so they are
 * locked behind a team password set in Vercel (LEADS_PASSWORD).
 */
export function checkTeamPassword(req: Request): Response | null {
  const expected = process.env.LEADS_PASSWORD ?? "";
  if (expected.length < 8) return Response.json({ error: "LEADS_PASSWORD is not set in Vercel (8+ characters)." }, { status: 503 });
  const given = req.headers.get("x-team-password") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return Response.json({ error: "Wrong team password." }, { status: 401 });
  return null;
}
