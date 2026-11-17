"use client";

import { AlertTriangle, Check, Copy, Download, ExternalLink, Globe, Loader2, Mail, MapPin, MessageCircle, Search, Star, Stethoscope } from "lucide-react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { defaultMonthly, defaultPrice, intlPhone, leadPath } from "@/demo/lead";
import {
  doctorGroupPost,
  emailFooter,
  emailSubject,
  guessNiche,
  msgLangNames,
  msgLangs,
  outreachMessage,
  parseLeads,
  pitchNames,
  resolvePitch,
  toCsv,
  type MsgLang,
  type Pitch,
  type RawLead,
} from "@/demo/outreach";

type NicheOption = { slug: string; label: string; type: "booking" | "order" | "enquiry" };
type Found = RawLead & { maps?: string };

const input = "mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-night focus:ring-4 focus:ring-iris/20";
const pwKey = "arqora-team-password";

const sample = `name\tcategory\tcity\tphone\taddress\trating\treviews\temail
Glow Unisex Salon\tBeauty salon\tPune\t9876543210\tFC Road, Shivajinagar\t4.3\t86\t
Shree Sai Dental Clinic\tDentist\tSolapur\t9822012345\tNear Navi Peth\t4.7\t212\t
Royal Biryani House\tRestaurant\tAurangabad\t9890011122\tCIDCO N-5\t4.1\t540\t`;

/** Social pages and listing sites don't count as "has a website". */
const notOwnSite = /facebook\.|instagram\.|wa\.me|whatsapp\.|justdial\.|linktr\.ee|business\.site|youtube\.|zomato\.|swiggy\.|practo\.|indiamart\.|sulekha\.|google\./i;
const ownSite = (url: string) => Boolean(url) && !notOwnSite.test(url);
/** Indian mobiles (WhatsApp-able) are 91 + 10 digits starting 6–9. Other countries: assume yes. */
const whatsappable = (phone: string) => (phone.startsWith("91") ? /^91[6-9]\d{9}$/.test(phone) : phone.length >= 10);
const keyOf = (l: RawLead) => `${l.name}|${l.address}`.toLowerCase();

function readPw() {
  try {
    return localStorage.getItem(pwKey) ?? "";
  } catch {
    return "";
  }
}

function CopyButton({ text, label = "Copy", dark }: { text: string; label?: string; dark?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${dark ? "bg-night text-white" : "border border-ink/15 bg-white"}`}
    >
      {done ? <Check size={14} /> : <Copy size={14} />} {done ? "Copied" : label}
    </button>
  );
}

/** Team tool: find businesses on Google (or paste a list), and get a personalised website and message for each. */
export function LeadGenerator({ niches }: { niches: NicheOption[] }) {
  // Finder
  const storedPw = useSyncExternalStore(
    () => () => {},
    readPw,
    () => "",
  );
  const [pwEdit, setPwEdit] = useState<string | null>(null);
  const password = pwEdit ?? storedPw;
  const [status, setStatus] = useState<{ places: boolean; password: boolean } | null>(null);
  const [what, setWhat] = useState("");
  const [where, setWhere] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [found, setFound] = useState<Found[]>([]);
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [emailBusy, setEmailBusy] = useState(false);

  // Paste + offer
  const [text, setText] = useState("");
  const [fallback, setFallback] = useState(niches[0].slug);
  const [defaultCity, setDefaultCity] = useState("");
  const [price, setPrice] = useState(defaultPrice);
  const [monthly, setMonthly] = useState(defaultMonthly);
  const [lang, setLang] = useState<MsgLang>("en");
  const [pitch, setPitch] = useState<Pitch>("auto");
  const [sender, setSender] = useState("Arqora Technology Solutions");
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [onlyNoSite, setOnlyNoSite] = useState(false);
  const [onlyWhatsapp, setOnlyWhatsapp] = useState(false);

  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => "",
  );

  useEffect(() => {
    fetch("/api/leads/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ places: false, password: false }));
  }, []);

  function savePw(v: string) {
    setPwEdit(v);
    try {
      localStorage.setItem(pwKey, v);
    } catch {
      /* private mode: keep it for this visit only */
    }
  }

  async function search(more = false) {
    setError("");
    setSearching(true);
    try {
      const res = await fetch("/api/leads/search", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-team-password": password },
        body: JSON.stringify({ what, where, pageToken: more ? nextToken : undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed");
      const places = (data.places as Found[]).map((p) => ({ ...p, email: "" }));
      setFound((old) => {
        const seen = new Set(old.map(keyOf));
        return [...old, ...places.filter((p) => !seen.has(keyOf(p)))];
      });
      setNextToken(data.nextPageToken);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setSearching(false);
    }
  }

  const leads = useMemo<Found[]>(() => [...found, ...parseLeads(text)].slice(0, 600), [found, text]);

  async function findEmails() {
    const sites = [...new Set(leads.filter((l) => !l.email && ownSite(l.website) && emails[l.website] === undefined).map((l) => l.website))];
    if (!sites.length) return;
    setEmailBusy(true);
    setError("");
    const queue = [...sites];
    const worker = async () => {
      while (queue.length) {
        const site = queue.shift()!;
        try {
          const res = await fetch("/api/leads/email", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-team-password": password },
            body: JSON.stringify({ website: site }),
          });
          const data = await res.json();
          if (res.status === 401 || res.status === 503) {
            setError(data.error);
            queue.length = 0;
            return;
          }
          setEmails((m) => ({ ...m, [site]: data.emails?.[0] ?? "" }));
        } catch {
          setEmails((m) => ({ ...m, [site]: "" }));
        }
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    setEmailBusy(false);
  }

  const rows = useMemo(
    () =>
      leads.map((l) => {
        const key = keyOf(l);
        const guessed = guessNiche(l.category, l.name);
        const niche = overrides[key] ?? guessed ?? fallback;
        const meta = niches.find((n) => n.slug === niche) ?? niches[0];
        const city = l.city || defaultCity;
        const link = `${origin}${leadPath({ niche, name: l.name, city, phone: l.phone, address: l.address, hours: l.hours, rating: l.rating, reviews: l.reviews, price, monthly })}`;
        const usedPitch = resolvePitch(pitch, niche);
        const message = outreachMessage(lang, { name: l.name, link, price, feature: meta.type, sender, niche, pitch });
        const phone = intlPhone(l.phone.replace(/\D/g, ""));
        const email = l.email || emails[l.website] || "";
        return { key, l, city, niche, guessed: Boolean(guessed), link, message, phone, email, usedPitch, site: ownSite(l.website), wa: whatsappable(phone) };
      }),
    [leads, overrides, fallback, niches, defaultCity, origin, price, monthly, lang, sender, pitch, emails],
  );

  const shown = rows.filter((r) => (!onlyNoSite || !r.site) && (!onlyWhatsapp || r.wa));
  const pendingEmails = new Set(leads.filter((l) => !l.email && ownSite(l.website) && emails[l.website] === undefined).map((l) => l.website)).size;

  function download() {
    const out = [
      ["name", "niche", "pitch", "city", "phone", "whatsapp_ok", "email", "website", "rating", "reviews", "preview_link", "email_subject", "email_body", "whatsapp_message"],
      ...shown.map((r) => [
        r.l.name,
        r.niche,
        r.usedPitch,
        r.city,
        r.phone,
        r.wa ? "yes" : "no",
        r.email,
        r.l.website,
        r.l.rating,
        r.l.reviews,
        r.link,
        emailSubject(lang, r.l.name),
        r.message + emailFooter(lang),
        r.message,
      ]),
    ];
    const blob = new Blob(["﻿" + toCsv(out)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `arqora-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const ready = status?.places && status?.password;

  return (
    <div className="grid gap-8">
      {/* 1. Find on Google */}
      <div className="rounded-3xl bg-night p-6 text-white sm:p-8" data-theme="dark">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-semibold">
            <MapPin size={18} className="text-[#f0a04b]" /> 1 · Find businesses on Google
          </p>
          {status && (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ready ? "bg-[#1da851]/20 text-[#7be0a5]" : "bg-[#f0a04b]/20 text-[#f0c48b]"}`}>
              {ready ? "Google search connected" : `Setup needed: ${[!status.places && "GOOGLE_PLACES_KEY", !status.password && "LEADS_PASSWORD"].filter(Boolean).join(" and ")} in Vercel`}
            </span>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFound([]);
            setNextToken(null);
            search();
          }}
          className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end"
        >
          <label className="text-sm font-medium text-mute">
            What
            <input value={what} onChange={(e) => setWhat(e.target.value)} placeholder="dentist, beauty parlour, restaurant…" className={`${input} text-ink`} />
          </label>
          <label className="text-sm font-medium text-mute">
            Where
            <input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Solapur, Kothrud Pune, London…" className={`${input} text-ink`} />
          </label>
          <label className="text-sm font-medium text-mute">
            Team password
            <input type="password" value={password} onChange={(e) => savePw(e.target.value)} autoComplete="off" className={`${input} text-ink sm:w-40`} />
          </label>
          <button type="submit" disabled={searching || !what.trim() || !where.trim()} className="flex h-[50px] items-center justify-center gap-2 rounded-xl bg-[#f0a04b] px-6 font-semibold text-night disabled:opacity-50">
            {searching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />} Search
          </button>
        </form>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-mute">
          {found.length > 0 && <span>{found.length} businesses from Google</span>}
          {nextToken && (
            <button type="button" onClick={() => search(true)} disabled={searching} className="rounded-lg border border-white/20 px-3 py-1.5 font-semibold text-white">
              Load 20 more
            </button>
          )}
          {pendingEmails > 0 && (
            <button type="button" onClick={findEmails} disabled={emailBusy} className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-1.5 font-semibold text-white">
              {emailBusy ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />} Find emails on {pendingEmails} websites
            </button>
          )}
          {found.length > 0 && (
            <button type="button" onClick={() => { setFound([]); setNextToken(null); }} className="font-semibold text-white/70 underline">
              Clear
            </button>
          )}
        </div>
        {error && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-[#b42318]/25 p-3 text-sm text-[#ffc9c2]">
            <AlertTriangle size={16} /> {error}
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Paste */}
        <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold">…or paste a list</p>
            <button type="button" onClick={() => setText(sample)} className="text-sm font-semibold text-iris">
              Load an example
            </button>
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            Rows from Google Sheets, or a CSV from Apify or Outscraper. Header row detected automatically (name, category, city, phone,
            address, rating, reviews, email, website). Without a header, use that column order.
          </p>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} spellCheck={false} placeholder={"name\tcategory\tcity\tphone\n…"} className={`${input} font-mono text-xs`} />
        </div>

        {/* Offer */}
        <div className="grid h-fit gap-4 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
          <p className="font-semibold">2 · Offer and message</p>
          <label className="text-sm font-medium">
            Pitch
            <select value={pitch} onChange={(e) => setPitch(e.target.value as Pitch)} className={input}>
              {(Object.keys(pitchNames) as Pitch[]).map((p) => (
                <option key={p} value={p}>{pitchNames[p]}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium">
              Price (one-time)
              <input value={price} onChange={(e) => setPrice(e.target.value)} className={input} />
            </label>
            <label className="text-sm font-medium">
              Monthly
              <input value={monthly} onChange={(e) => setMonthly(e.target.value)} className={input} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium">
              Language
              <select value={lang} onChange={(e) => setLang(e.target.value as MsgLang)} className={input}>
                {msgLangs.map((l) => (
                  <option key={l} value={l}>{msgLangNames[l]}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium">
              City if missing
              <input value={defaultCity} onChange={(e) => setDefaultCity(e.target.value)} placeholder="e.g. Pune" className={input} />
            </label>
          </div>
          <label className="text-sm font-medium">
            Industry if not detected
            <select value={fallback} onChange={(e) => setFallback(e.target.value)} className={input}>
              {niches.map((n) => (
                <option key={n.slug} value={n.slug}>{n.label}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Signed by
            <input value={sender} onChange={(e) => setSender(e.target.value)} className={input} />
          </label>
        </div>
      </div>

      {/* 3. Results */}
      {rows.length > 0 && (
        <div className="rounded-3xl border border-ink/10 bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 px-2">
            <p className="font-semibold">3 · {shown.length} personalised websites ready</p>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={onlyNoSite} onChange={(e) => setOnlyNoSite(e.target.checked)} className="h-4 w-4" />
                No website only
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={onlyWhatsapp} onChange={(e) => setOnlyWhatsapp(e.target.checked)} className="h-4 w-4" />
                Mobile numbers only
              </label>
              <CopyButton text={shown.map((r) => `${r.l.name}\t${r.link}`).join("\n")} label="Copy all links" />
              <button type="button" onClick={download} className="inline-flex items-center gap-2 rounded-xl bg-night px-4 py-2.5 text-sm font-semibold text-white">
                <Download size={16} /> Download CSV
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {shown.map((r) => (
              <div key={r.key} className="grid gap-3 rounded-2xl border border-ink/10 p-4 lg:grid-cols-[1.2fr_auto_auto] lg:items-center">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 font-semibold">
                    {r.l.name}
                    {r.l.rating && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
                        <Star size={12} className="fill-[#f5b301] text-[#f5b301]" /> {r.l.rating}
                        {r.l.reviews && ` (${r.l.reviews})`}
                      </span>
                    )}
                    {r.site ? (
                      <a href={r.l.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-[#fff4e0] px-2 py-0.5 text-xs font-medium text-[#8a5300]">
                        <Globe size={12} /> has a website
                      </a>
                    ) : (
                      <span className="rounded-full bg-[#e7f8ee] px-2 py-0.5 text-xs font-medium text-[#13703c]">no website: hot lead</span>
                    )}
                    {r.usedPitch !== "standard" && <span className="rounded-full bg-cream px-2 py-0.5 text-xs font-medium text-ink-soft">{r.usedPitch === "commission" ? "commission pitch" : "doctor pitch"}</span>}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-ink-soft">
                    {[r.city, r.phone ? `+${r.phone}${r.wa ? "" : " (landline?)"}` : "", r.email].filter(Boolean).join(" · ") || "No contact details"}
                  </p>
                </div>
                <select
                  value={r.niche}
                  onChange={(e) => setOverrides((o) => ({ ...o, [r.key]: e.target.value }))}
                  className={`rounded-xl border px-3 py-2 text-sm ${r.guessed || overrides[r.key] ? "border-ink/15" : "border-[#e0a100] bg-[#fffaf0]"}`}
                  title={r.guessed ? "Detected from the category" : "Not detected: please check"}
                >
                  {niches.map((n) => (
                    <option key={n.slug} value={n.slug}>{n.label}</option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2">
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-night px-2.5 py-1.5 text-xs font-semibold text-white">
                    <ExternalLink size={14} /> Open site
                  </a>
                  <CopyButton text={r.link} label="Link" />
                  <CopyButton text={r.message} label="Message" />
                  {r.wa && (
                    <a
                      href={`https://wa.me/${r.phone}?text=${encodeURIComponent(r.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#25d366] px-2.5 py-1.5 text-xs font-semibold text-night"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  )}
                  {r.email && (
                    <a
                      href={`mailto:${r.email}?subject=${encodeURIComponent(emailSubject(lang, r.l.name))}&body=${encodeURIComponent(r.message + emailFooter(lang))}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 px-2.5 py-1.5 text-xs font-semibold"
                    >
                      <Mail size={14} /> Email
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctor network */}
      <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
        <p className="flex items-center gap-2 font-semibold">
          <Stethoscope size={18} className="text-[#0e7c86]" /> Doctor network: post for your WhatsApp groups
        </p>
        <p className="mt-1 text-sm text-ink-soft">For groups of doctors you know. Post once a week at most, and reply personally to anyone interested.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {msgLangs.map((l) => {
            const post = doctorGroupPost(l, `${origin}/demo/clinic`);
            return (
              <div key={l} className="flex flex-col rounded-2xl bg-cream p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{msgLangNames[l]}</span>
                  <CopyButton text={post} dark />
                </div>
                <p lang={l} className="mt-2 whitespace-pre-wrap text-sm text-ink-soft">{post}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rules */}
      <div className="rounded-3xl border border-ink/10 bg-white p-6 text-sm text-ink-soft">
        <p className="font-semibold text-ink">Sending rules that keep your numbers and domains safe</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>WhatsApp: send one by one, 20–30 a day per number. Never use broadcast or bulk tools. If someone says no, never message again.</li>
          <li>Email: send from a separate domain (not arqoratech.com), 30–50 a day per inbox. The CSV adds your company name and an opt-out line.</li>
          <li>Don&apos;t email businesses in Germany, Canada or Australia without consent. The US, UK and India are fine for business email with an opt-out.</li>
          <li>Every preview says it&apos;s made by Arqora and isn&apos;t their official site, and it&apos;s hidden from Google.</li>
        </ul>
      </div>
    </div>
  );
}
