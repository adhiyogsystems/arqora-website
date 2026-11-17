"use client";

import { Check, Copy, Download, ExternalLink, Globe, Mail, MessageCircle, Star } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

import { defaultMonthly, defaultPrice, intlPhone, leadPath } from "@/demo/lead";
import { emailFooter, emailSubject, guessNiche, msgLangNames, msgLangs, outreachMessage, parseLeads, toCsv, type MsgLang } from "@/demo/outreach";

type NicheOption = { slug: string; label: string; type: "booking" | "order" | "enquiry" };

const input = "mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-night focus:ring-4 focus:ring-iris/20";

const sample = `name\tcategory\tcity\tphone\taddress\trating\treviews\temail
Glow Unisex Salon\tBeauty salon\tPune\t9876543210\tFC Road, Shivajinagar\t4.3\t86\t
Shree Sai Dental Clinic\tDentist\tSolapur\t9822012345\tNear Navi Peth\t4.7\t212\t
Royal Biryani House\tRestaurant\tAurangabad\t9890011122\tCIDCO N-5\t4.1\t540\t`;

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 bg-white px-2.5 py-1.5 text-xs font-semibold"
    >
      {done ? <Check size={14} /> : <Copy size={14} />} {done ? "Copied" : label}
    </button>
  );
}

/** Team tool: paste up to a few hundred leads and get a personalised website link and message for each. */
export function LeadGenerator({ niches }: { niches: NicheOption[] }) {
  const [text, setText] = useState("");
  const [fallback, setFallback] = useState(niches[0].slug);
  const [defaultCity, setDefaultCity] = useState("");
  const [price, setPrice] = useState(defaultPrice);
  const [monthly, setMonthly] = useState(defaultMonthly);
  const [lang, setLang] = useState<MsgLang>("en");
  const [sender, setSender] = useState("Arqora Technology Solutions");
  const [overrides, setOverrides] = useState<Record<number, string>>({});
  const [onlyNoSite, setOnlyNoSite] = useState(false);
  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => "",
  );

  const leads = useMemo(() => parseLeads(text).slice(0, 500), [text]);

  const rows = useMemo(
    () =>
      leads.map((l, i) => {
        const guessed = guessNiche(l.category, l.name);
        const niche = overrides[i] ?? guessed ?? fallback;
        const meta = niches.find((n) => n.slug === niche) ?? niches[0];
        const city = l.city || defaultCity;
        const link = `${origin}${leadPath({ niche, name: l.name, city, phone: l.phone, address: l.address, hours: l.hours, rating: l.rating, reviews: l.reviews, price, monthly })}`;
        const message = outreachMessage(lang, { name: l.name, link, price, feature: meta.type, sender });
        const phone = intlPhone(l.phone.replace(/\D/g, ""));
        return { i, l, city, niche, guessed: Boolean(guessed), link, message, phone };
      }),
    [leads, overrides, fallback, niches, defaultCity, origin, price, monthly, lang, sender],
  );

  const shown = onlyNoSite ? rows.filter((r) => !r.l.website) : rows;

  function download() {
    const out = [
      ["name", "niche", "city", "phone", "email", "website", "rating", "reviews", "preview_link", "email_subject", "email_body", "whatsapp_message"],
      ...shown.map((r) => [r.l.name, r.niche, r.city, r.l.phone, r.l.email, r.l.website, r.l.rating, r.l.reviews, r.link, emailSubject(lang, r.l.name), r.message + emailFooter(lang), r.message]),
    ];
    const blob = new Blob(["﻿" + toCsv(out)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `arqora-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold">1 · Paste your leads</p>
            <button type="button" onClick={() => setText(sample)} className="text-sm font-semibold text-iris">
              Load an example
            </button>
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            Copy rows straight from Google Sheets, or paste a CSV from Apify or Outscraper. A header row is detected automatically
            (name, category, city, phone, address, rating, reviews, email, website). Without a header, use that column order.
          </p>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setOverrides({});
            }}
            rows={9}
            spellCheck={false}
            placeholder={"name\tcategory\tcity\tphone\n…"}
            className={`${input} font-mono text-xs`}
          />
          <p className="mt-2 text-sm text-ink-soft">{leads.length ? `${leads.length} businesses found` : "Up to 500 rows at a time."}</p>
        </div>

        <div className="grid h-fit gap-4 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
          <p className="font-semibold">2 · Offer and message</p>
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
              Message language
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
            Industry if it can&apos;t be detected
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

      {rows.length > 0 && (
        <div className="rounded-3xl border border-ink/10 bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 px-2">
            <p className="font-semibold">3 · {shown.length} personalised websites ready</p>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={onlyNoSite} onChange={(e) => setOnlyNoSite(e.target.checked)} className="h-4 w-4" />
                Only businesses without a website
              </label>
              <CopyButton text={shown.map((r) => `${r.l.name}\t${r.link}`).join("\n")} label="Copy all links" />
              <button type="button" onClick={download} className="inline-flex items-center gap-2 rounded-xl bg-night px-4 py-2.5 text-sm font-semibold text-white">
                <Download size={16} /> Download CSV for mail merge
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {shown.map((r) => (
              <div key={r.i} className="grid gap-3 rounded-2xl border border-ink/10 p-4 lg:grid-cols-[1.2fr_auto_auto] lg:items-center">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 font-semibold">
                    {r.l.name}
                    {r.l.rating && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
                        <Star size={12} className="fill-[#f5b301] text-[#f5b301]" /> {r.l.rating}
                        {r.l.reviews && ` (${r.l.reviews})`}
                      </span>
                    )}
                    {r.l.website && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#fff4e0] px-2 py-0.5 text-xs font-medium text-[#8a5300]">
                        <Globe size={12} /> has a website
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-ink-soft">{[r.city, r.l.phone, r.l.email].filter(Boolean).join(" · ") || "No contact details"}</p>
                </div>
                <select
                  value={r.niche}
                  onChange={(e) => setOverrides((o) => ({ ...o, [r.i]: e.target.value }))}
                  className={`rounded-xl border px-3 py-2 text-sm ${r.guessed || overrides[r.i] ? "border-ink/15" : "border-[#e0a100] bg-[#fffaf0]"}`}
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
                  {r.phone.length >= 11 && (
                    <a
                      href={`https://wa.me/${r.phone}?text=${encodeURIComponent(r.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#25d366] px-2.5 py-1.5 text-xs font-semibold text-night"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  )}
                  {r.l.email && (
                    <a
                      href={`mailto:${r.l.email}?subject=${encodeURIComponent(emailSubject(lang, r.l.name))}&body=${encodeURIComponent(r.message + emailFooter(lang))}`}
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

      <div className="rounded-3xl border border-ink/10 bg-white p-6 text-sm text-ink-soft">
        <p className="font-semibold text-ink">Sending rules that keep your numbers and domains safe</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>WhatsApp: send one by one from the business&apos;s public number on Google Maps. Never use broadcast tools. Around 20–30 a day per number. If someone says no, never message again.</li>
          <li>Email: send from a separate domain (not arqoratech.com), 30–50 a day per inbox. The CSV already adds your company name and an opt-out line.</li>
          <li>Don&apos;t email businesses in Germany, Canada or Australia without consent. The US, UK and India are fine for business email with an opt-out.</li>
          <li>Every preview says it&apos;s made by Arqora and isn&apos;t their official site, and it&apos;s hidden from Google.</li>
        </ul>
      </div>
    </div>
  );
}
