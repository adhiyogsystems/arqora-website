"use client";

import { useState } from "react";

import type { Lang } from "@/i18n/config";
import { dict } from "@/i18n/dict";
import { primaryEmail, site, whatsappLink } from "@/lib/site";

type Option = { slug: string; title: string };

const field =
  "mt-2 w-full rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-night focus:ring-4 focus:ring-iris/20";

/**
 * No backend yet: the form writes the enquiry into a WhatsApp message (when a
 * number is set in lib/site.ts) or opens the visitor's email app.
 */
export function ContactForm({ lang, services, defaultService }: { lang: Lang; services: Option[]; defaultService?: string }) {
  const t = dict[lang].form;
  const email = primaryEmail(lang);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const service = services.find((s) => s.slug === data.get("service"))?.title ?? t.notSure;
    const text = [
      `${t.msgName}: ${data.get("name")}`,
      `${t.msgPhone}: ${data.get("phone")}`,
      data.get("business") ? `${t.msgBusiness}: ${data.get("business")}` : null,
      `${t.msgService}: ${service}`,
      "",
      String(data.get("message") ?? ""),
    ]
      .filter((l) => l !== null)
      .join("\n");

    const wa = whatsappLink(`${t.msgNew} ${site.name}\n\n${text}`);
    const href = wa ?? `mailto:${email}?subject=${encodeURIComponent(`${t.msgSubject}: ${service}`)}&body=${encodeURIComponent(text)}`;
    window.open(href, wa ? "_blank" : "_self");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(14,18,34,0.25)] sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          {t.name}
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="text-sm font-medium">
          {t.phone}
          <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="text-sm font-medium">
        {t.business} <span className="font-normal text-ink-soft">{t.optional}</span>
        <input name="business" autoComplete="organization" className={field} />
      </label>
      <label className="text-sm font-medium">
        {t.need}
        <select name="service" defaultValue={defaultService ?? ""} className={field}>
          <option value="">{t.notSure}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.title}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium">
        {t.more}
        <textarea name="message" required rows={5} className={field} placeholder={t.placeholder} />
      </label>
      <button type="submit" className="rounded-xl bg-night px-6 py-4 font-semibold text-white transition-colors hover:bg-brand">
        {t.send}
      </button>
      {sent && (
        <p role="status" className="rounded-xl bg-saffron-soft px-4 py-3 text-sm">
          {t.sent} {email}.
        </p>
      )}
    </form>
  );
}
