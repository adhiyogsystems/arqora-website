"use client";

import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import type { Feature, Item } from "@/demo/niches";

const wa = (phone: string, text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

const field =
  "mt-1.5 w-full rounded-xl border border-[color-mix(in_srgb,var(--ink)_15%,transparent)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--accent)_20%,transparent)]";

/** Pick items and quantities, then send the order to the shop on WhatsApp. */
export function OrderCart({ items, business, phone, button }: { items: Item[]; business: string; phone: string; button: string }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const chosen = items.filter((i) => (qty[i.name] ?? 0) > 0);
  const total = useMemo(() => chosen.reduce((s, i) => s + (i.amount ?? 0) * (qty[i.name] ?? 0), 0), [chosen, qty]);
  const change = (name: string, d: number) => setQty((q) => ({ ...q, [name]: Math.max(0, (q[name] ?? 0) + d) }));

  const message = [
    `New order for ${business}`,
    "",
    ...chosen.map((i) => `• ${i.name}${i.desc ? ` (${i.desc})` : ""} × ${qty[i.name]}`),
    "",
    `Estimated total: ₹${total.toLocaleString("en-IN")}`,
    ...(customer ? [`Name: ${customer}`] : []),
    ...(address ? [`Address / pickup: ${address}`] : []),
  ].join("\n");

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((i) => {
          const n = qty[i.name] ?? 0;
          return (
            <li key={i.name} className={`flex items-center justify-between gap-3 rounded-2xl border p-4 transition-colors ${n ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))]" : "border-[color-mix(in_srgb,var(--ink)_10%,transparent)] bg-[var(--surface)]"}`}>
              <div className="min-w-0">
                <p className="font-semibold">{i.name}</p>
                <p className="text-sm text-[var(--muted)]">
                  {i.desc ? `${i.desc} · ` : ""}
                  {i.price}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {n > 0 && (
                  <>
                    <button type="button" aria-label={`Remove one ${i.name}`} onClick={() => change(i.name, -1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--ink)_20%,transparent)]">
                      <Minus size={16} />
                    </button>
                    <span className="w-5 text-center font-semibold tabular-nums">{n}</span>
                  </>
                )}
                <button type="button" aria-label={`Add ${i.name}`} onClick={() => change(i.name, 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)]">
                  <Plus size={16} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="h-fit rounded-3xl bg-[var(--surface)] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)] lg:sticky lg:top-24">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Basket</p>
        {chosen.length === 0 ? (
          <p className="mt-3 text-[var(--muted)]">Tap + to add items.</p>
        ) : (
          <ul className="mt-3 space-y-1.5 text-[15px]">
            {chosen.map((i) => (
              <li key={i.name} className="flex justify-between gap-3">
                <span>
                  {i.name} × {qty[i.name]}
                </span>
                <span className="tabular-nums text-[var(--muted)]">₹{((i.amount ?? 0) * (qty[i.name] ?? 0)).toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 flex justify-between border-t border-[color-mix(in_srgb,var(--ink)_10%,transparent)] pt-4 text-lg font-semibold">
          <span>Total</span>
          <span className="tabular-nums">₹{total.toLocaleString("en-IN")}</span>
        </p>
        <label className="mt-4 block text-sm font-medium">
          Your name
          <input value={customer} onChange={(e) => setCustomer(e.target.value)} className={field} autoComplete="name" />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Delivery address or &ldquo;pickup&rdquo;
          <input value={address} onChange={(e) => setAddress(e.target.value)} className={field} autoComplete="street-address" />
        </label>
        <a
          href={chosen.length ? wa(phone, message) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!chosen.length}
          className={`mt-5 flex items-center justify-center rounded-xl px-6 py-4 font-semibold transition-opacity ${chosen.length ? "bg-[var(--accent)] text-[var(--on-accent)]" : "pointer-events-none bg-[color-mix(in_srgb,var(--ink)_10%,transparent)] text-[var(--muted)]"}`}
        >
          {button}
        </a>
      </div>
    </div>
  );
}

/** Booking or enquiry form that arrives as a WhatsApp message to the business. */
export function RequestForm({ feature, options, business, phone }: { feature: Exclude<Feature, { type: "order" }>; options: string[]; business: string; phone: string }) {
  const [sent, setSent] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      `${feature.title} — ${business}`,
      "",
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `${feature.optionLabel}: ${d.get("option")}`,
      feature.type === "enquiry" ? `${feature.extraLabel}: ${d.get("extra")}` : null,
      d.get("date") ? `Date: ${d.get("date")}` : null,
      d.get("time") ? `Time: ${d.get("time")}` : null,
      d.get("nights") ? `Nights: ${d.get("nights")}` : null,
      d.get("guests") ? `Guests: ${d.get("guests")}` : null,
    ].filter((l) => l !== null);
    window.open(wa(phone, lines.join("\n")), "_blank");
    setSent(true);
  }
  const has = (f: "date" | "time" | "nights" | "guests") => feature.type === "booking" && feature.fields.includes(f);

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl bg-[var(--surface)] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)] sm:grid-cols-2 sm:p-8">
      <label className="text-sm font-medium">
        Your name
        <input name="name" required className={field} autoComplete="name" />
      </label>
      <label className="text-sm font-medium">
        Phone
        <input name="phone" required type="tel" inputMode="tel" className={field} autoComplete="tel" />
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        {feature.optionLabel}
        <select name="option" required className={field} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      {feature.type === "enquiry" && (
        <label className="text-sm font-medium sm:col-span-2">
          {feature.extraLabel}
          <input name="extra" required className={field} />
        </label>
      )}
      {has("date") && (
        <label className="text-sm font-medium">
          Date
          <input name="date" type="date" required className={field} />
        </label>
      )}
      {has("time") && (
        <label className="text-sm font-medium">
          Preferred time
          <input name="time" type="time" className={field} />
        </label>
      )}
      {has("nights") && (
        <label className="text-sm font-medium">
          Nights
          <input name="nights" type="number" min={1} defaultValue={1} className={field} />
        </label>
      )}
      {has("guests") && (
        <label className="text-sm font-medium">
          Guests
          <input name="guests" type="number" min={1} defaultValue={2} className={field} />
        </label>
      )}
      <button type="submit" className="rounded-xl bg-[var(--accent)] px-6 py-4 font-semibold text-[var(--on-accent)] sm:col-span-2">
        {feature.button}
      </button>
      {sent && <p className="text-sm text-[var(--muted)] sm:col-span-2">WhatsApp opened with your details. Just press send.</p>}
    </form>
  );
}
