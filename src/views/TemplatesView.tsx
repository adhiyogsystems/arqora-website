/* eslint-disable @next/next/no-img-element -- photos come from Unsplash's image CDN, sized via URL parameters */
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { ButtonLink, Container, CtaBand, Eyebrow, PageHero } from "@/components/ui";
import { img, looks } from "@/demo/looks";
import { niches } from "@/demo/niches";
import type { Lang } from "@/i18n/config";
import { localePath, pageMetadata } from "@/i18n/config";

const text = {
  en: {
    title: "Website Templates for Salons, Gyms, Schools, Shops & Clinics",
    description:
      "Ready-made, mobile-first website templates for 10 local business types, with WhatsApp ordering, online booking and monthly WhatsApp offers. Live within a week.",
    eyebrow: "templates",
    heroTitle: "websites made for",
    heroAccent: "your kind of business.",
    intro:
      "Ten ready designs for local businesses, each with the feature that brings customers: WhatsApp ordering, online booking or admission enquiries. Open any demo and try it yourself.",
    view: "view live demo",
    get: "get this website",
    from: "from",
    included: "Every template includes",
    includes: [
      "Mobile-first design with your photos, prices and timings",
      "Orders and bookings straight to your WhatsApp",
      "Google Maps, call button and Google Business setup",
      "Monthly WhatsApp offers to your customers (add-on)",
      "Your own domain, hosting and support in one monthly plan",
    ],
    feature: { order: "WhatsApp ordering", booking: "Online booking", enquiry: "Enquiry form" },
  },
  de: {
    title: "Website-Vorlagen für Salons, Fitnessstudios, Schulen, Läden & Praxen",
    description:
      "Fertige, mobile Website-Vorlagen für 10 lokale Branchen, mit WhatsApp-Bestellung, Online-Buchung und monatlichen WhatsApp-Angeboten. In einer Woche live.",
    eyebrow: "vorlagen",
    heroTitle: "websites gemacht für",
    heroAccent: "ihre branche.",
    intro:
      "Zehn fertige Designs für lokale Unternehmen, jeweils mit der Funktion, die Kunden bringt: WhatsApp-Bestellung, Online-Buchung oder Anfragen. Öffnen Sie eine Demo und probieren Sie es selbst.",
    view: "live-demo ansehen",
    get: "diese website anfragen",
    from: "ab",
    included: "Jede Vorlage enthält",
    includes: [
      "Mobiles Design mit Ihren Fotos, Preisen und Öffnungszeiten",
      "Bestellungen und Buchungen direkt auf Ihr WhatsApp",
      "Google Maps, Anruf-Button und Google-Unternehmensprofil",
      "Monatliche WhatsApp-Angebote an Ihre Kunden (Zusatzoption)",
      "Eigene Domain, Hosting und Support in einem Monatspaket",
    ],
    feature: { order: "WhatsApp-Bestellung", booking: "Online-Buchung", enquiry: "Anfrageformular" },
  },
};

const deLabels: Record<string, string> = {
  salon: "Kosmetik- & Friseursalon",
  coaching: "Nachhilfe & Kurse",
  school: "Schule",
  supermarket: "Supermarkt & Lebensmittel",
  bookshop: "Buchhandlung & Schreibwaren",
  clinic: "Arztpraxis & Klinik",
  gym: "Fitnessstudio",
  restaurant: "Restaurant & Café",
  hotel: "Hotel & Pension",
  bakery: "Bäckerei & Konditorei",
};

export const templatesMeta = (lang: Lang) => pageMetadata(lang, "/templates", text[lang].title, text[lang].description);

export function TemplatesView({ lang }: { lang: Lang }) {
  const t = text[lang];
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.heroTitle} accent={t.heroAccent} intro={t.intro} />

      <section data-theme="light" className="bg-cream py-20 sm:py-28">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {niches.map((n, i) => (
              <li
                key={n.slug}
                data-reveal
                style={{ "--d": `${(i % 3) * 80}ms` } as React.CSSProperties}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_30px_60px_-40px_rgba(14,18,34,0.4)]"
              >
                <a href={`/demo/${n.slug}`} target="_blank" rel="noopener noreferrer" className="relative block aspect-[4/3] overflow-hidden">
                  <img
                    src={img(looks[n.slug].hero, 800)}
                    alt={lang === "de" ? deLabels[n.slug] : n.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: n.colors.accent }}>
                    {t.feature[n.feature.type]}
                  </span>
                  <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                    <span className="font-display text-xl font-semibold leading-tight">{lang === "de" ? deLabels[n.slug] : n.label}</span>
                    <ArrowUpRight className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm text-ink-soft">{n.defaultName}</p>
                  {lang === "en" && <p className="mt-2 text-sm text-ink-soft">{n.highlights.map((h) => h[0]).join(" · ")}</p>}
                  <p className="mt-4 font-display text-lg font-semibold">
                    {t.from} {n.price}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={`/demo/${n.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-night px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
                    >
                      {t.view} <ArrowUpRight size={15} />
                    </a>
                    <a
                      href={`${localePath(lang, "/contact")}?service=websites`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-ink/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-ink"
                    >
                      {t.get}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section data-theme="light" className="bg-white py-20 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">{t.included.toLowerCase()}</h2>
          </div>
          <ul className="border-b border-ink/10">
            {t.includes.map((x, i) => (
              <li key={x} data-reveal style={{ "--d": `${i * 50}ms` } as React.CSSProperties} className="flex items-baseline gap-5 border-t border-ink/10 py-5 text-lg">
                <span className="font-display text-sm text-saffron">0{i + 1}</span>
                {x}
              </li>
            ))}
          </ul>
        </Container>
        <Container className="mt-12">
          <ButtonLink href={`${localePath(lang, "/contact")}?service=websites`}>
            <MessageCircle size={18} /> {t.get}
          </ButtonLink>
        </Container>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
