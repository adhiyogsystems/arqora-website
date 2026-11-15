import {
  BedDouble,
  BookOpen,
  CakeSlice,
  Clock,
  Dumbbell,
  GraduationCap,
  MapPin,
  MessageCircle,
  Phone,
  School,
  Scissors,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { OrderCart, RequestForm } from "@/demo/interactive";
import type { IconName, Niche } from "@/demo/niches";
import { site } from "@/lib/site";

const icons: Record<IconName, LucideIcon> = {
  Scissors,
  GraduationCap,
  School,
  ShoppingCart,
  BookOpen,
  Stethoscope,
  Dumbbell,
  UtensilsCrossed,
  BedDouble,
  CakeSlice,
};

export type Prospect = { name: string; city: string; phone: string; area: string };

/** Turns "?n=&c=&p=&a=" into a clean prospect, falling back to the niche's sample business. */
export function readProspect(niche: Niche, q: Record<string, string | string[] | undefined>): Prospect {
  const get = (k: string) => (Array.isArray(q[k]) ? q[k]![0] : (q[k] as string | undefined))?.trim().slice(0, 80) ?? "";
  const digits = get("p").replace(/\D/g, "");
  return {
    name: get("n") || niche.defaultName,
    city: get("c") || "your city",
    phone: digits.length === 10 ? `91${digits}` : digits,
    area: get("a"),
  };
}

const fill = (s: string, p: Prospect) => s.replaceAll("{name}", p.name).replaceAll("{city}", p.city);

export function DemoSite({ niche, prospect }: { niche: Niche; prospect: Prospect }) {
  const Icon = icons[niche.icon];
  const c = niche.colors;
  const sendTo = prospect.phone.length >= 11 ? prospect.phone : site.whatsapp;
  const display = (s: string) => (niche.serif ? `font-[family-name:var(--font-fraunces)]` : "font-display") + " " + s;
  const featureId = "order";
  const makeItYours = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Hi Arqora, I saw the sample ${niche.label.toLowerCase()} website for ${prospect.name}. I'd like to make it ours.`,
  )}`;
  const mapQuery = encodeURIComponent([prospect.name, prospect.area, prospect.city === "your city" ? "" : prospect.city].filter(Boolean).join(", "));
  const options = niche.offerings.map((o) => o.name);

  return (
    <div
      style={
        {
          "--bg": c.bg,
          "--surface": c.surface,
          "--ink": c.ink,
          "--muted": c.muted,
          "--accent": c.accent,
          "--on-accent": c.onAccent,
        } as React.CSSProperties
      }
      className="min-h-screen bg-[var(--bg)] font-sans text-[var(--ink)]"
    >
      {/* Arqora demo banner */}
      <div className="sticky top-0 z-50 bg-[#090c18] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-[13px] sm:px-6">
          <p className="flex min-w-0 items-center gap-2">
            <Sparkles size={15} className="shrink-0 text-[#f0a04b]" />
            <span className="truncate">
              Sample website made for <strong>{prospect.name}</strong> by Arqora. Not their official site.
            </span>
          </p>
          <a href={makeItYours} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg bg-white px-3 py-1.5 font-semibold text-[#090c18]">
            Make it yours
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--on-accent)]">
            <Icon size={22} />
          </span>
          <span className={display("truncate text-lg font-semibold leading-tight sm:text-xl")}>{prospect.name}</span>
        </a>
        <nav className="hidden items-center gap-7 text-[15px] text-[var(--muted)] md:flex">
          <a href="#offer" className="hover:text-[var(--ink)]">{niche.offeringsTitle}</a>
          <a href="#gallery" className="hover:text-[var(--ink)]">Gallery</a>
          <a href="#visit" className="hover:text-[var(--ink)]">Visit us</a>
        </nav>
        <a href={`#${featureId}`} className="shrink-0 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)]">
          {niche.feature.type === "order" ? "Order now" : niche.feature.type === "enquiry" ? "Enquire" : "Book now"}
        </a>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{fill(niche.kicker, prospect)}</p>
          <h1 className={display("mt-5 text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-6xl")}>{fill(niche.headline, prospect)}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{fill(niche.sub, prospect)}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={`#${featureId}`} className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-4 font-semibold text-[var(--on-accent)]">
              <MessageCircle size={18} /> {niche.feature.button}
            </a>
            {prospect.phone.length >= 11 && (
              <a href={`tel:+${prospect.phone}`} className="flex items-center justify-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--ink)_18%,transparent)] px-7 py-4 font-semibold">
                <Phone size={18} /> Call us
              </a>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2"><Clock size={16} /> {niche.hours}</span>
            {(prospect.area || prospect.city !== "your city") && (
              <span className="flex items-center gap-2"><MapPin size={16} /> {[prospect.area, prospect.city !== "your city" ? prospect.city : ""].filter(Boolean).join(", ")}</span>
            )}
          </div>
        </div>

        <div aria-hidden="true" className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] bg-[var(--accent)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(0,0,0,0.25),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(currentColor_1.5px,transparent_1.5px)] [background-size:22px_22px] text-[var(--on-accent)]" />
          <Icon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--on-accent)] opacity-90" size={150} strokeWidth={1.2} />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl bg-[var(--surface)] p-4 text-[var(--ink)] shadow-xl">
            <div className="min-w-0">
              <p className="truncate font-semibold">{niche.feature.title}</p>
              <p className="truncate text-sm text-[var(--muted)]">Straight to WhatsApp, in one tap</p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white">
              <MessageCircle size={20} />
            </span>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-[var(--surface)] py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6">
          {niche.highlights.map(([t, d]) => (
            <div key={t}>
              <span className="block h-1 w-10 rounded-full bg-[var(--accent)]" />
              <h2 className={display("mt-5 text-xl font-semibold")}>{t}</h2>
              <p className="mt-2 leading-relaxed text-[var(--muted)]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offerings + main feature */}
      <section id="offer" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className={display("text-3xl font-semibold tracking-[-0.01em] sm:text-5xl")}>{niche.offeringsTitle}</h2>
        {niche.feature.type === "order" ? (
          <div id={featureId} className="mt-10 scroll-mt-24">
            <p className="mb-6 max-w-xl text-[var(--muted)]">{niche.feature.text}</p>
            <OrderCart items={niche.offerings} business={prospect.name} phone={sendTo} button={niche.feature.button} />
          </div>
        ) : (
          <>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {niche.offerings.map((o) => (
                <li key={o.name} className="flex items-baseline justify-between gap-4 rounded-2xl bg-[var(--surface)] p-5">
                  <span>
                    <span className="block font-semibold">{o.name}</span>
                    {o.desc && <span className="mt-0.5 block text-sm text-[var(--muted)]">{o.desc}</span>}
                  </span>
                  {o.price && <span className="shrink-0 font-semibold text-[var(--accent)]">{o.price}</span>}
                </li>
              ))}
            </ul>
            <div id={featureId} className="mt-16 grid scroll-mt-24 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h3 className={display("text-3xl font-semibold")}>{niche.feature.title}</h3>
                <p className="mt-3 text-[var(--muted)]">{niche.feature.text}</p>
              </div>
              <RequestForm feature={niche.feature} options={options} business={prospect.name} phone={sendTo} />
            </div>
          </>
        )}
      </section>

      {/* Notices (schools) */}
      {niche.notices && (
        <section className="bg-[var(--surface)] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className={display("text-3xl font-semibold")}>Latest notices</h2>
            <ul className="mt-8 divide-y divide-[color-mix(in_srgb,var(--ink)_10%,transparent)]">
              {niche.notices.map((n) => (
                <li key={n} className="flex items-center gap-4 py-4">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Gallery placeholders */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className={display("text-3xl font-semibold sm:text-5xl")}>Gallery</h2>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {niche.gallery.map((g, i) => (
            <div
              key={g}
              className="relative flex aspect-square items-end overflow-hidden rounded-2xl p-4"
              style={{ background: `linear-gradient(${135 + i * 40}deg, color-mix(in srgb, ${c.accent} ${70 - i * 12}%, ${c.ink}), color-mix(in srgb, ${c.accent} 25%, ${c.bg}))` }}
            >
              <Icon aria-hidden="true" className="absolute right-3 top-3 text-white/40" size={34} />
              <div className="text-white">
                <p className="font-semibold">{g}</p>
                <p className="text-xs text-white/75">Your photos here</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="bg-[var(--surface)] py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className={display("text-3xl font-semibold sm:text-5xl")}>Visit us</h2>
            <ul className="mt-8 space-y-4 text-[var(--muted)]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-[var(--accent)]" size={20} />
                {[prospect.name, prospect.area, prospect.city !== "your city" ? prospect.city : ""].filter(Boolean).join(", ")}
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 shrink-0 text-[var(--accent)]" size={20} />
                {niche.hours}
              </li>
              {prospect.phone.length >= 11 && (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 shrink-0 text-[var(--accent)]" size={20} />
                  <a href={`tel:+${prospect.phone}`}>+{prospect.phone}</a>
                </li>
              )}
            </ul>
          </div>
          <iframe
            title={`Map: ${prospect.name}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-80 w-full rounded-3xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-[var(--muted)] sm:flex-row sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} {prospect.name}. Sample prices and content.</span>
        <Link href="/" className="hover:text-[var(--ink)]">Website by {site.name}</Link>
      </footer>

      {/* Arqora offer */}
      <section className="bg-[#090c18] px-4 py-16 text-center text-white sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a6adc4]">for {prospect.name}</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">Make this website yours.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[#a6adc4]">
          Your photos, your prices, your domain. Live within a week, from <strong className="text-white">{niche.price}</strong> plus a small monthly plan for hosting, updates and support.
        </p>
        <a href={makeItYours} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[#090c18]">
          <MessageCircle size={18} /> Talk to Arqora on WhatsApp
        </a>
      </section>
    </div>
  );
}
