/* eslint-disable @next/next/no-img-element -- photos come from Unsplash's own image CDN, sized via URL parameters */
import {
  BedDouble,
  BookOpen,
  CakeSlice,
  Check,
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
import QRCode from "qrcode";

import { OrderCart, RequestForm } from "@/demo/interactive";
import { img, looks } from "@/demo/looks";
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

export type Prospect = { name: string; city: string; phone: string; area: string; personalised: boolean };

/** Turns "?n=&c=&p=&a=" into a clean prospect, falling back to the niche's sample business. */
export function readProspect(niche: Niche, q: Record<string, string | string[] | undefined>): Prospect {
  const get = (k: string) => (Array.isArray(q[k]) ? q[k]![0] : (q[k] as string | undefined))?.trim().slice(0, 80) ?? "";
  const digits = get("p").replace(/\D/g, "");
  return {
    name: get("n") || niche.defaultName,
    city: get("c") || "your city",
    phone: digits.length === 10 ? `91${digits}` : digits,
    area: get("a"),
    personalised: Boolean(get("n")),
  };
}

const fill = (s: string, p: Prospect) => s.replaceAll("{name}", p.name).replaceAll("{city}", p.city);
const place = (p: Prospect) => [p.area, p.city !== "your city" ? p.city : ""].filter(Boolean).join(", ");

export async function DemoSite({ niche, prospect }: { niche: Niche; prospect: Prospect }) {
  const look = looks[niche.slug];
  const Icon = icons[niche.icon];
  const c = niche.colors;
  const sendTo = prospect.phone.length >= 11 ? prospect.phone : site.whatsapp;
  const serif = niche.serif ? "font-[family-name:var(--font-fraunces)]" : "font-display";
  const display = (s: string) => `${serif} ${s}`;
  const upper = look.heroStyle === "bold" ? "uppercase tracking-[-0.02em]" : "";
  const makeItYours = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Hi Arqora, I saw the ${niche.label.toLowerCase()} website${prospect.personalised ? ` made for ${prospect.name}` : " template"}. I'd like one for my business.`,
  )}`;
  const optIn = `https://wa.me/${sendTo}?text=${encodeURIComponent(`Hi ${prospect.name}, please send me your offers on WhatsApp.`)}`;
  const qr = await QRCode.toString(optIn, { type: "svg", margin: 0, color: { dark: c.ink, light: "#0000" } });
  const mapQuery = encodeURIComponent([prospect.name, prospect.area, prospect.city === "your city" ? "" : prospect.city].filter(Boolean).join(", "));
  const options = niche.offerings.map((o) => o.name);
  const cta = niche.feature.type === "order" ? "Order now" : niche.feature.type === "enquiry" ? "Enquire" : "Book now";
  const onPhoto = look.heroStyle === "photo";

  const style = {
    "--bg": c.bg,
    "--surface": c.surface,
    "--ink": c.ink,
    "--muted": c.muted,
    "--accent": c.accent,
    "--on-accent": c.onAccent,
  } as React.CSSProperties;

  /* ---------- pieces ---------- */

  const header = (light?: boolean) => (
    <header className={`relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 ${light ? "text-white" : ""}`}>
      <a href="#top" className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--on-accent)]">
          <Icon size={22} />
        </span>
        <span className={display(`truncate text-lg font-semibold leading-tight sm:text-xl ${upper}`)}>{prospect.name}</span>
      </a>
      <nav className={`hidden items-center gap-7 text-[15px] md:flex ${light ? "text-white/80" : "text-[var(--muted)]"}`}>
        <a href="#offer" className="hover:opacity-100">{niche.offeringsTitle}</a>
        <a href="#gallery">Gallery</a>
        <a href="#visit">Visit us</a>
      </nav>
      <a href="#action" className="shrink-0 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)]">
        {cta}
      </a>
    </header>
  );

  const buttons = (light?: boolean) => (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
      <a href="#action" className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-4 font-semibold text-[var(--on-accent)]">
        <MessageCircle size={18} /> {niche.feature.button}
      </a>
      {prospect.phone.length >= 11 && (
        <a
          href={`tel:+${prospect.phone}`}
          className={`flex items-center justify-center gap-2 rounded-xl border px-7 py-4 font-semibold ${light ? "border-white/40 text-white" : "border-[color-mix(in_srgb,var(--ink)_18%,transparent)]"}`}
        >
          <Phone size={18} /> Call us
        </a>
      )}
    </div>
  );

  const meta = (light?: boolean) => (
    <div className={`mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm ${light ? "text-white/80" : "text-[var(--muted)]"}`}>
      <span className="flex items-center gap-2"><Clock size={16} /> {niche.hours}</span>
      {place(prospect) && <span className="flex items-center gap-2"><MapPin size={16} /> {place(prospect)}</span>}
    </div>
  );

  /* ---------- hero variants ---------- */

  let hero: React.ReactNode;
  if (look.heroStyle === "photo") {
    hero = (
      <section id="top" className="relative overflow-hidden">
        <img src={img(look.hero, 2000)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.15))]" />
        {header(true)}
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-16 text-white sm:px-6 sm:pt-24">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">{fill(niche.kicker, prospect)}</p>
          <h1 className={display("mt-5 max-w-2xl text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-7xl")}>{fill(niche.headline, prospect)}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{fill(niche.sub, prospect)}</p>
          {buttons(true)}
          {meta(true)}
        </div>
      </section>
    );
  } else if (look.heroStyle === "bold") {
    hero = (
      <section id="top" className="relative overflow-hidden">
        {header()}
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)]">{fill(niche.kicker, prospect)}</p>
            <h1 className="mt-5 font-display text-[3.2rem] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] sm:text-8xl">
              {fill(niche.headline, prospect).split(" ").map((w, i, a) => (
                <span key={i} className={i === a.length - 1 ? "text-[var(--accent)]" : ""}>{w} </span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--muted)]">{fill(niche.sub, prospect)}</p>
            {buttons()}
            {meta()}
          </div>
          <div className="relative">
            <img src={img(look.hero, 1400)} alt="" className="aspect-[4/5] w-full rounded-[2rem] object-cover grayscale-[30%] [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]" />
            <div className="absolute -bottom-4 left-4 rounded-2xl bg-[var(--accent)] px-5 py-4 font-display text-[var(--on-accent)] shadow-2xl">
              <p className="text-3xl font-extrabold leading-none">FREE</p>
              <p className="text-sm font-semibold uppercase">first session</p>
            </div>
          </div>
        </div>
      </section>
    );
  } else if (look.heroStyle === "shop") {
    hero = (
      <section id="top">
        {header()}
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-2 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img src={img(look.hero, 2000)} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.75),rgba(0,0,0,0.25))]" />
            <div className="relative px-6 py-14 text-white sm:px-12 sm:py-20">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">{fill(niche.kicker, prospect)}</p>
              <h1 className={display("mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-6xl")}>{fill(niche.headline, prospect)}</h1>
              <p className="mt-5 max-w-lg text-lg text-white/85">{fill(niche.sub, prospect)}</p>
              <a href="#action" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-4 font-semibold text-[var(--on-accent)]">
                <ShoppingCart size={18} /> Start shopping
              </a>
            </div>
          </div>
          {look.special && (
            <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] p-5 sm:flex-row sm:items-center">
              <p>
                <span className="font-semibold">🏷️ {look.special.title}: </span>
                <span className="text-[var(--muted)]">{look.special.text}</span>
              </p>
              <a href="#offers" className="shrink-0 text-sm font-semibold text-[var(--accent)]">Get offers on WhatsApp →</a>
            </div>
          )}
        </div>
      </section>
    );
  } else {
    hero = (
      <section id="top">
        {header()}
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-6 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{fill(niche.kicker, prospect)}</p>
            <h1 className={display("mt-5 text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-6xl")}>{fill(niche.headline, prospect)}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{fill(niche.sub, prospect)}</p>
            {buttons()}
            {meta()}
          </div>
          <div className="relative">
            <img
              src={img(look.hero, 1400)}
              alt=""
              className={`aspect-[4/4.4] w-full object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] ${niche.slug === "school" || niche.slug === "bakery" ? "rounded-t-full rounded-b-[2rem]" : "rounded-[2rem]"}`}
            />
            <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-[var(--surface)] p-4 shadow-xl sm:-left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-white">
                <MessageCircle size={20} />
              </span>
              <span>
                <span className="block font-semibold">{niche.feature.title}</span>
                <span className="block text-sm text-[var(--muted)]">Straight to WhatsApp</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- offerings variants ---------- */

  const heading = (t: string, sub?: string) => (
    <div className="max-w-2xl">
      <h2 className={display(`text-3xl font-semibold tracking-[-0.01em] sm:text-5xl ${upper}`)}>{t}</h2>
      {sub && <p className="mt-3 text-[var(--muted)]">{sub}</p>}
    </div>
  );

  let offer: React.ReactNode;
  if (look.offerStyle === "cart") {
    offer = (
      <div id="action" className="scroll-mt-20">
        {heading(niche.offeringsTitle, niche.feature.text)}
        <div className="mt-10">
          <OrderCart items={niche.offerings} categories={look.categories} business={prospect.name} phone={sendTo} button={niche.feature.button} />
        </div>
      </div>
    );
  } else if (look.offerStyle === "menu") {
    offer = (
      <>
        {heading(niche.offeringsTitle)}
        <div className="mt-10 grid gap-x-14 gap-y-1 rounded-[2rem] bg-[var(--surface)] p-6 sm:p-10 md:grid-cols-2">
          {niche.offerings.map((o) => (
            <div key={o.name} className="flex items-baseline gap-3 py-3">
              <span className="font-medium">{o.name}</span>
              <span className="flex-1 border-b border-dotted border-[color-mix(in_srgb,var(--ink)_25%,transparent)]" />
              <span className={display("font-semibold text-[var(--accent)]")}>{o.price}</span>
            </div>
          ))}
        </div>
      </>
    );
  } else if (look.offerStyle === "plans") {
    offer = (
      <>
        {heading(niche.offeringsTitle)}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {niche.offerings.map((o) => {
            const pop = o.name === look.plansPopular;
            return (
              <div key={o.name} className={`relative rounded-3xl p-7 ${pop ? "bg-[var(--accent)] text-[var(--on-accent)]" : "border border-[color-mix(in_srgb,var(--ink)_14%,transparent)] bg-[var(--surface)]"}`}>
                {pop && <span className="absolute right-5 top-5 rounded-full bg-[var(--on-accent)] px-3 py-1 text-xs font-bold uppercase text-[var(--accent)]">Most popular</span>}
                <p className="font-display text-sm font-bold uppercase tracking-[0.15em] opacity-80">{o.name}</p>
                <p className="mt-4 font-display text-4xl font-extrabold">{o.price}</p>
                <ul className={`mt-6 space-y-2 text-sm ${pop ? "" : "text-[var(--muted)]"}`}>
                  {["Full gym access", "Trainer guidance", "Diet plan"].map((f) => (
                    <li key={f} className="flex items-center gap-2"><Check size={16} /> {f}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </>
    );
  } else if (look.offerStyle === "rooms") {
    offer = (
      <>
        {heading(niche.offeringsTitle, "All rooms with fresh linen, hot water and daily housekeeping.")}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {niche.offerings.map((o, i) => (
            <div key={o.name} className="overflow-hidden rounded-3xl bg-[var(--surface)] shadow-[0_20px_40px_-25px_rgba(0,0,0,0.35)]">
              <img src={img(look.gallery[i % look.gallery.length], 900)} alt={o.name} className="aspect-[16/10] w-full object-cover" />
              <div className="flex items-end justify-between gap-4 p-6">
                <div>
                  <p className={display("text-xl font-semibold")}>{o.name}</p>
                  {o.desc && <p className="text-sm text-[var(--muted)]">{o.desc}</p>}
                </div>
                <p className="shrink-0 font-semibold text-[var(--accent)]">{o.price}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else if (look.offerStyle === "courses") {
    offer = (
      <>
        {heading(niche.offeringsTitle, "Batch timings below. Ask for a free demo lecture before you join.")}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {niche.offerings.map((o) => (
            <div key={o.name} className="rounded-3xl border border-[color-mix(in_srgb,var(--ink)_10%,transparent)] bg-[var(--surface)] p-6">
              <p className="text-lg font-semibold">{o.name}</p>
              {o.desc && <p className="mt-1 text-sm text-[var(--muted)]">{o.desc}</p>}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-3 py-1.5 text-sm font-medium text-[var(--accent)]">
                  🕒 {look.courseTimes?.[o.name] ?? "Ask for timings"}
                </span>
                <span className="font-semibold">{o.price}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else if (look.offerStyle === "programs") {
    offer = (
      <>
        {heading(niche.offeringsTitle)}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {niche.offerings.map((o, i) => (
            <div key={o.name} className="rounded-3xl bg-[var(--surface)] p-6 text-center">
              <span className={display("mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-xl font-semibold text-[var(--on-accent)]")}>{i + 1}</span>
              <p className={display("mt-4 text-xl font-semibold")}>{o.name}</p>
              <p className="text-sm text-[var(--muted)]">{o.desc}</p>
              <p className="mt-3 text-sm font-semibold text-[var(--accent)]">{o.price}</p>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    offer = (
      <>
        {heading(niche.offeringsTitle)}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {niche.offerings.map((o) => (
            <div key={o.name} className="flex items-start gap-4 rounded-3xl bg-[var(--surface)] p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-semibold">{o.name}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--accent)]">{o.price}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div style={style} className="min-h-screen bg-[var(--bg)] font-sans text-[var(--ink)]">
      {/* Arqora demo banner */}
      <div className="sticky top-0 z-50 bg-[#090c18] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-[13px] sm:px-6">
          <p className="flex min-w-0 items-center gap-2">
            <Sparkles size={15} className="shrink-0 text-[#f0a04b]" />
            <span className="truncate">
              {prospect.personalised ? (
                <>Sample website made for <strong>{prospect.name}</strong> by Arqora. Not their official site.</>
              ) : (
                <>Template preview by Arqora. This design can be yours.</>
              )}
            </span>
          </p>
          <a href={makeItYours} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg bg-white px-3 py-1.5 font-semibold text-[#090c18]">
            Make it yours
          </a>
        </div>
      </div>

      {hero}

      {/* Facts band */}
      {look.facts && (
        <section className={onPhoto ? "relative z-10 -mt-12" : ""}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-3 divide-x divide-[color-mix(in_srgb,var(--ink)_10%,transparent)] rounded-3xl bg-[var(--surface)] py-6 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.35)]">
              {look.facts.map(([big, small]) => (
                <div key={big} className="px-3 text-center">
                  <p className={display(`text-2xl font-semibold text-[var(--accent)] sm:text-3xl ${upper}`)}>{big}</p>
                  <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">{small}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* School quick links */}
      {look.quickLinks && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {look.quickLinks.map((q) => (
              <a key={q} href={q === "Admissions" ? "#action" : q === "Gallery" ? "#gallery" : q === "Notices" ? "#notices" : "#visit"} className="rounded-2xl bg-[var(--surface)] p-4 text-center font-semibold shadow-[0_15px_30px_-25px_rgba(0,0,0,0.4)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--on-accent)]">
                {q}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          {niche.highlights.map(([t, d], i) => (
            <div key={t}>
              <span className={display(`text-sm font-semibold text-[var(--accent)]`)}>0{i + 1}</span>
              <h2 className={display(`mt-2 text-xl font-semibold ${upper}`)}>{t}</h2>
              <p className="mt-2 leading-relaxed text-[var(--muted)]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offerings */}
      <section id="offer" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6">
        {offer}
      </section>

      {/* Special offer (non-shop) */}
      {look.special && look.heroStyle !== "shop" && (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--accent)] p-8 text-[var(--on-accent)] sm:p-12">
            <Icon aria-hidden="true" className="absolute -right-6 -top-6 opacity-15" size={180} />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">Special</p>
            <p className={display("mt-3 text-3xl font-semibold sm:text-4xl")}>{look.special.title}</p>
            <p className="mt-3 max-w-xl opacity-90">{look.special.text}</p>
          </div>
        </section>
      )}

      {/* People: doctor or faculty */}
      {look.people && (
        <section className="bg-[var(--surface)] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {heading(niche.slug === "clinic" ? "Meet your doctor" : "Our faculty", "Sample profiles. Your real team goes here.")}
            <div className={`mt-10 grid gap-5 ${look.people.length > 1 ? "sm:grid-cols-3" : "max-w-2xl"}`}>
              {look.people.map((p) => (
                <div key={p.name} className="flex items-center gap-5 rounded-3xl border border-[color-mix(in_srgb,var(--ink)_10%,transparent)] p-5">
                  {p.photo ? (
                    <img src={img(p.photo, 300)} alt="" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                  ) : (
                    <span className={display("flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-xl font-semibold text-[var(--on-accent)]")}>
                      {p.name.split(" ").slice(-1)[0][0]}
                    </span>
                  )}
                  <div>
                    <p className="text-lg font-semibold">{p.name}</p>
                    <p className="text-sm text-[var(--muted)]">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      {look.amenities && (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          {heading("Amenities")}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {look.amenities.map((a) => (
              <div key={a} className="flex items-center gap-3 rounded-2xl bg-[var(--surface)] p-4">
                <Check size={18} className="text-[var(--accent)]" /> {a}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notices */}
      {niche.notices && (
        <section id="notices" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6">
          <div className="rounded-[2rem] border-l-4 border-[var(--accent)] bg-[var(--surface)] p-6 sm:p-10">
            <h2 className={display("text-2xl font-semibold sm:text-3xl")}>Notice board</h2>
            <ul className="mt-6 divide-y divide-[color-mix(in_srgb,var(--ink)_10%,transparent)]">
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

      {/* Booking / enquiry form */}
      {niche.feature.type !== "order" && (
        <section id="action" className="scroll-mt-20 bg-[color-mix(in_srgb,var(--accent)_7%,var(--bg))] py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className={display(`text-3xl font-semibold sm:text-5xl ${upper}`)}>{niche.feature.title}</h2>
              <p className="mt-4 text-[var(--muted)]">{niche.feature.text}</p>
              <p className="mt-6 flex items-center gap-2 text-sm text-[var(--muted)]">
                <MessageCircle size={16} className="text-[#25d366]" /> Arrives instantly on {prospect.name}&apos;s WhatsApp
              </p>
            </div>
            <RequestForm feature={niche.feature} options={options} business={prospect.name} phone={sendTo} />
          </div>
        </section>
      )}

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        {heading("Gallery")}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {look.gallery.map((g, i) => (
            <figure key={g} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <img src={img(g, i === 0 ? 1200 : 700)} alt={niche.gallery[i] ?? ""} className="h-full min-h-40 w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {niche.gallery[i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* WhatsApp offers opt-in */}
      <section id="offers" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6">
        <div className="grid items-center gap-8 rounded-[2rem] bg-[var(--surface)] p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.4)] sm:p-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#1da851]">
              <MessageCircle size={16} /> WhatsApp offers
            </p>
            <h2 className={display(`mt-3 text-3xl font-semibold sm:text-4xl ${upper}`)}>Never miss a deal from {prospect.name}.</h2>
            <p className="mt-3 max-w-lg text-[var(--muted)]">Get monthly offers and festival specials on WhatsApp. One tap to join, reply STOP anytime.</p>
            <a href={optIn} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-6 py-3.5 font-semibold text-[#062b14]">
              <MessageCircle size={18} /> Join on WhatsApp
            </a>
          </div>
          <div className="hidden text-center md:block">
            <div className="h-36 w-36 rounded-2xl bg-white p-3" dangerouslySetInnerHTML={{ __html: qr }} />
            <p className="mt-2 text-xs text-[var(--muted)]">Scan at the counter</p>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="scroll-mt-20 bg-[var(--surface)] py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            {heading("Visit us")}
            <ul className="mt-8 space-y-4 text-[var(--muted)]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-[var(--accent)]" size={20} />
                {[prospect.name, place(prospect)].filter(Boolean).join(", ")}
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
        <span>© {new Date().getFullYear()} {prospect.name}. Sample prices and content. Photos: Unsplash.</span>
        <Link href="/" className="hover:text-[var(--ink)]">Website by {site.name}</Link>
      </footer>

      {/* Arqora offer */}
      <section className="bg-[#090c18] px-4 py-16 pb-28 text-center text-white sm:px-6 lg:pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a6adc4]">{prospect.personalised ? `for ${prospect.name}` : "for your business"}</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">Make this website yours.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[#a6adc4]">
          Your photos, your prices, your domain, plus monthly WhatsApp offers to your customers. Live within a week, from{" "}
          <strong className="text-white">{niche.price}</strong>.
        </p>
        <a href={makeItYours} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[#090c18]">
          <MessageCircle size={18} /> Talk to Arqora on WhatsApp
        </a>
      </section>
    </div>
  );
}
