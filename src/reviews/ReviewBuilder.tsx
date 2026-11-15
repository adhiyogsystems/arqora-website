"use client";

import { Check, Copy, ExternalLink, MessageCircle, Printer, ShieldCheck } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

import { fillMessage, googleReviewUrl, langNames, reviewLangs, shortGoogleParams, type ReviewLang } from "@/reviews/review";

const input = "mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-night focus:ring-4 focus:ring-iris/20";

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
      className="inline-flex items-center gap-1.5 rounded-lg bg-night px-3 py-2 text-sm font-semibold text-white"
    >
      {done ? <Check size={15} /> : <Copy size={15} />} {done ? "Copied" : label}
    </button>
  );
}

/** Team tool: set up a business's Google review kit in one minute. */
export function ReviewBuilder() {
  const [name, setName] = useState("");
  const [google, setGoogle] = useState("");
  const [owner, setOwner] = useState("");
  const [color, setColor] = useState("#2f3fb8");
  const [lang, setLang] = useState<ReviewLang>("mr");
  const [customer, setCustomer] = useState("");
  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => "",
  );

  const gParams = useMemo(() => shortGoogleParams(google), [google]);
  const directGoogle = useMemo(() => googleReviewUrl(gParams), [gParams]);
  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (name.trim()) p.set("n", name.trim());
    for (const [k, v] of Object.entries(gParams)) p.set(k, v);
    const d = owner.replace(/\D/g, "");
    if (d) p.set("w", d);
    p.set("c", color.replace("#", ""));
    p.set("l", lang);
    return p.toString();
  }, [name, gParams, owner, color, lang]);

  const page = `${origin}/r?${query}`;
  const poster = `${origin}/r/poster?${query}`;
  const ready = Boolean(name.trim() && directGoogle);
  const custDigits = customer.replace(/\D/g, "");
  const custTo = custDigits.length === 10 ? `91${custDigits}` : custDigits;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
      {/* Inputs */}
      <div className="grid h-fit gap-4 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
        <label className="text-sm font-medium">
          Business name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Annapurna Family Restaurant" className={input} />
        </label>
        <label className="text-sm font-medium">
          Google review link or Place ID
          <input value={google} onChange={(e) => setGoogle(e.target.value)} placeholder="https://g.page/r/…/review" className={input} />
          <span className="mt-1.5 block text-xs font-normal text-ink-soft">
            In Google Business Profile: <strong>Ask for reviews → copy link</strong>. A Place ID (starts with ChIJ…) also works.
            {google && !directGoogle && <span className="mt-1 block text-[#b42318]">This doesn&apos;t look like a Google review or Maps link.</span>}
          </span>
        </label>
        <label className="text-sm font-medium">
          Owner&apos;s WhatsApp (for private feedback)
          <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="10-digit mobile" inputMode="tel" className={input} />
        </label>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <label className="text-sm font-medium">
            Brand colour
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="mt-1.5 block h-12 w-16 cursor-pointer rounded-xl border border-ink/15 bg-white p-1" />
          </label>
          <label className="text-sm font-medium">
            Language on page and poster
            <select value={lang} onChange={(e) => setLang(e.target.value as ReviewLang)} className={input}>
              {reviewLangs.map((l) => (
                <option key={l} value={l}>{langNames[l]}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Outputs */}
      <div className={`grid h-fit gap-5 transition-opacity ${ready ? "" : "pointer-events-none opacity-40"}`}>
        <div className="rounded-3xl bg-night p-6 text-white sm:p-8" data-theme="dark">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">1 · Counter QR poster</p>
          <p className="mt-2 text-mute">Print it (A5) for the counter, reception or tables.</p>
          <a href={poster} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-semibold text-night">
            <Printer size={16} /> Open poster
          </a>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-mute">2 · Review page link</p>
          <p className="mt-3 break-all rounded-xl bg-white/10 p-3 font-mono text-xs">{page}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <CopyButton text={page} label="Copy link" />
            <a href={page} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold">
              <ExternalLink size={15} /> Preview
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">3 · WhatsApp message after each visit</p>
          <div className="mt-4 grid gap-4">
            {reviewLangs.map((l) => {
              const msg = fillMessage(l, name || "our business", directGoogle ?? "");
              return (
                <div key={l} className="rounded-2xl bg-cream p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{langNames[l]}</span>
                    <CopyButton text={msg} />
                  </div>
                  <p lang={l} className="mt-2 whitespace-pre-wrap text-sm text-ink-soft" style={l !== "en" ? { fontFamily: "var(--font-deva), sans-serif" } : undefined}>
                    {msg}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap items-end gap-3 border-t border-ink/10 pt-5">
            <label className="flex-1 text-sm font-medium">
              Send to a customer who just visited
              <input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer's 10-digit mobile" inputMode="tel" className={input} />
            </label>
            {custTo.length >= 11 && directGoogle && (
              <a
                href={`https://wa.me/${custTo}?text=${encodeURIComponent(fillMessage(lang, name, directGoogle))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-4 py-3 font-semibold text-night"
              >
                <MessageCircle size={16} /> Send in {langNames[lang]}
              </a>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-white p-6">
          <p className="flex items-center gap-2 font-semibold">
            <ShieldCheck size={18} className="text-[#1da851]" /> Google review rules: tell the owner and staff
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-soft">
            <li>Ask <strong>every</strong> customer, not only happy ones.</li>
            <li>No discounts, gifts or freebies in exchange for a review.</li>
            <li>Owners, staff and family must not write reviews.</li>
            <li>Reply politely to every review, especially negative ones.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
