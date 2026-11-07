"use client";

import { useState } from "react";

import { site, whatsappLink } from "@/lib/site";

type Option = { slug: string; title: string };

const field =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15";

/**
 * No backend yet: the form writes the enquiry into a WhatsApp message (when a
 * number is set in lib/site.ts) or opens the visitor's email app.
 */
export function ContactForm({ services, defaultService }: { services: Option[]; defaultService?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const service = services.find((s) => s.slug === data.get("service"))?.title ?? "Not sure yet";
    const text = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      data.get("business") ? `Business: ${data.get("business")}` : null,
      `Service: ${service}`,
      "",
      String(data.get("message") ?? ""),
    ]
      .filter((l) => l !== null)
      .join("\n");

    const wa = whatsappLink(`New enquiry for ${site.name}\n\n${text}`);
    const href =
      wa ?? `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry: ${service}`)}&body=${encodeURIComponent(text)}`;
    window.open(href, wa ? "_blank" : "_self");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-line p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Your name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="text-sm font-medium">
          Phone / WhatsApp
          <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="text-sm font-medium">
        Business or organisation <span className="font-normal text-ink-soft">(optional)</span>
        <input name="business" autoComplete="organization" className={field} />
      </label>
      <label className="text-sm font-medium">
        What do you need?
        <select name="service" defaultValue={defaultService ?? ""} className={field}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.title}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium">
        Tell us a little more
        <textarea name="message" required rows={5} className={field} placeholder="What does your business do, and what should the website or software help with?" />
      </label>
      <button type="submit" className="rounded-full bg-brand px-6 py-3.5 font-medium text-white transition-colors hover:bg-brand-deep">
        Send enquiry
      </button>
      {sent && (
        <p role="status" className="rounded-xl bg-saffron-soft px-4 py-3 text-sm">
          Thanks! Your message is ready to send. If nothing opened, write to us at {site.email}.
        </p>
      )}
    </form>
  );
}
