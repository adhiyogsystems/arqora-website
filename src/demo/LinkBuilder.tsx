"use client";

import { Check, Copy, ExternalLink, MessageCircle } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

import { defaultPrice, leadPath } from "@/demo/lead";

type NicheOption = { slug: string; label: string };

const input =
  "mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-night focus:ring-4 focus:ring-iris/20";

/** Internal tool for the sales team: create a personalised demo link and share it after a call. */
export function LinkBuilder({ niches }: { niches: NicheOption[] }) {
  const [niche, setNiche] = useState(niches[0].slug);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState(defaultPrice);
  const [copied, setCopied] = useState(false);

  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => "",
  );

  const link = useMemo(
    () => (name.trim() ? `${origin}${leadPath({ niche, name, city, phone, address: area, price })}` : `${origin}/demo/${niche}`),
    [origin, niche, name, city, phone, area, price],
  );

  const digits = phone.replace(/\D/g, "");
  const to = digits.length === 10 ? `91${digits}` : digits;
  const message = `Namaste${name ? ` ${name}` : ""} ji! As we discussed on the call, here is the free sample website we made for ${name || "your business"}:\n\n${link}\n\nTry the buttons — orders and bookings come straight to your WhatsApp. If you like it, we can make it live this week.\n\n— Arqora Technology Solutions`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="grid gap-4 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
        <label className="text-sm font-medium">
          Industry
          <select value={niche} onChange={(e) => setNiche(e.target.value)} className={input}>
            {niches.map((n) => (
              <option key={n.slug} value={n.slug}>{n.label}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Business name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Glamour Beauty Parlour" className={input} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            City
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Solapur" className={input} />
          </label>
          <label className="text-sm font-medium">
            Business WhatsApp number
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" inputMode="tel" className={input} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <label className="text-sm font-medium">
            Area / address (optional)
            <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. Station Road" className={input} />
          </label>
          <label className="text-sm font-medium">
            Price
            <input value={price} onChange={(e) => setPrice(e.target.value)} className={`${input} sm:w-32`} />
          </label>
        </div>
      </div>

      <div className="grid h-fit gap-4 rounded-3xl bg-night p-6 text-white sm:p-8" data-theme="dark">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">Demo link</p>
        <p className="break-all rounded-xl bg-white/10 p-4 font-mono text-sm">{link}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(link);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-semibold text-night"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy link"}
          </button>
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 font-semibold">
            <ExternalLink size={16} /> Preview
          </a>
          {to.length >= 11 && (
            <a href={`https://wa.me/${to}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-[#25d366] px-4 py-2.5 font-semibold text-night">
              <MessageCircle size={16} /> Send after the call
            </a>
          )}
        </div>
        <p className="text-sm text-mute">
          Only send the link to businesses you have spoken to and who agreed to receive it. One message per business, from your own WhatsApp.
        </p>
      </div>
    </div>
  );
}
