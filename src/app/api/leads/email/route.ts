import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

import { checkTeamPassword } from "@/lib/leadsAuth";

/**
 * Finds the public contact email on a business's own website (home page,
 * then its contact page). Only public, business-published addresses.
 * Hardened against being used to reach private networks.
 */

const skipHosts = /(^|\.)(facebook|instagram|wa|whatsapp|justdial|linktr|youtube|zomato|swiggy|practo|google|business\.site|indiamart|sulekha)\./i;
const junk = /\.(png|jpe?g|gif|webp|svg|css|js)$|example\.|sentry|wixpress|domain\.com|email\.com|yourname|yoursite|godaddy|@2x|u003e/i;
const maxBytes = 600_000;

function privateAddress(ip: string) {
  if (isIP(ip) === 6) {
    const v = ip.toLowerCase();
    if (v.startsWith("::ffff:")) return privateAddress(v.slice(7));
    return v === "::1" || v === "::" || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80");
  }
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
}

async function safeUrl(raw: string): Promise<URL | null> {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(u.protocol) || u.username || u.password) return null;
  if (u.port && !["80", "443"].includes(u.port)) return null;
  if (u.hostname === "localhost" || u.hostname.endsWith(".local") || u.hostname.endsWith(".internal")) return null;
  if (isIP(u.hostname)) return null;
  try {
    const addrs = await lookup(u.hostname, { all: true });
    if (!addrs.length || addrs.some((a) => privateAddress(a.address))) return null;
  } catch {
    return null;
  }
  return u;
}

async function getPage(raw: string): Promise<{ url: URL; html: string } | null> {
  let next = raw;
  for (let hop = 0; hop < 4; hop++) {
    const url = await safeUrl(next);
    if (!url) return null;
    const res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(7000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ArqoraContactFinder/1.0)", Accept: "text/html" },
      cache: "no-store",
    }).catch(() => null);
    if (!res) return null;
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      next = new URL(res.headers.get("location")!, url).toString();
      continue;
    }
    if (!res.ok || !(res.headers.get("content-type") ?? "").includes("html")) return null;
    if (Number(res.headers.get("content-length") ?? 0) > maxBytes) return null;
    const html = (await res.text()).slice(0, maxBytes);
    return { url, html };
  }
  return null;
}

function extractEmails(html: string) {
  const text = html.replace(/&#64;|&#x40;|\[at\]|\(at\)/gi, "@").replace(/%40/g, "@");
  const found = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  return [...new Set(found.map((e) => e.toLowerCase().replace(/^mailto:/, "")))].filter((e) => !junk.test(e) && e.length < 80);
}

export async function POST(req: Request) {
  const denied = checkTeamPassword(req);
  if (denied) return denied;
  const { website } = (await req.json().catch(() => ({}))) as { website?: string };
  const start = String(website ?? "").trim();
  if (!start) return Response.json({ emails: [] });
  let host: string;
  try {
    host = new URL(start).hostname.replace(/^www\./, "");
  } catch {
    return Response.json({ emails: [], note: "Not a valid link" });
  }
  if (skipHosts.test(`${host}.`) || skipHosts.test(host)) return Response.json({ emails: [], note: "Social or listing page, not their own site" });

  const home = await getPage(start);
  if (!home) return Response.json({ emails: [], note: "Website didn't open" });
  let emails = extractEmails(home.html);

  if (!emails.length) {
    const hrefs = [...home.html.matchAll(/href=["']([^"'#]+)["']/gi)].map((m) => m[1]).filter((h) => /contact|about|reach/i.test(h));
    const candidates = [...hrefs.slice(0, 2), "/contact", "/contact-us"];
    for (const c of candidates) {
      let target: URL;
      try {
        target = new URL(c, home.url);
      } catch {
        continue;
      }
      if (target.hostname.replace(/^www\./, "") !== home.url.hostname.replace(/^www\./, "")) continue;
      const page = await getPage(target.toString());
      if (page) emails = extractEmails(page.html);
      if (emails.length) break;
    }
  }

  // Prefer addresses on the business's own domain, then common inboxes.
  const own = home.url.hostname.replace(/^www\./, "");
  emails.sort((a, b) => Number(b.endsWith(own)) - Number(a.endsWith(own)) || Number(/^(info|contact|hello|enquir|booking|admin)/.test(b)) - Number(/^(info|contact|hello|enquir|booking|admin)/.test(a)));
  return Response.json({ emails: emails.slice(0, 3) });
}
