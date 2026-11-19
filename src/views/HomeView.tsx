/* eslint-disable @next/next/no-img-element -- stock photos come from Unsplash's image CDN, sized via URL parameters */
import { ArrowUpRight, BarChart3, Check, Code2, Globe2, MapPin, MessageCircle, Smartphone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Faq } from "@/components/Faq";
import { BrowserFrame, PhoneFrame } from "@/components/home/frames";
import { DemoSwitcher, type DemoItem } from "@/components/home/DemoSwitcher";
import { ButtonLink, Container, CtaBand, Eyebrow } from "@/components/ui";
import { faqs } from "@/data/faq";
import { homeText } from "@/data/home";
import { getProjects } from "@/data/projects";
import { img, looks } from "@/demo/looks";
import { niches } from "@/demo/niches";
import type { Lang } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { dict } from "@/i18n/dict";
import { deLabels } from "@/views/TemplatesView";

/** Order of business types in the demo switcher: the most common first. */
const demoOrder = ["restaurant", "salon", "clinic", "gym", "hotel", "bakery", "school", "supermarket", "coaching", "bookshop"];

export function HomeView({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const h = homeText[lang];
  const projects = getProjects(lang);
  const contact = localePath(lang, "/contact");
  const service = (slug: string) => localePath(lang, `/services/${slug}`);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqs[lang].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const demoItems: DemoItem[] = demoOrder
    .map((slug) => niches.find((n) => n.slug === slug)!)
    .map((n) => ({
      slug: n.slug,
      label: lang === "de" ? deLabels[n.slug] : n.label,
      name: n.defaultName,
      icon: n.icon,
      accent: n.colors.accent,
      onAccent: n.colors.onAccent,
      feature: h.demo.feature[n.feature.type],
      points: lang === "en" ? n.highlights.map((x) => x[0]) : [],
    }));

  const stagger = (i: number, step = 80) => ({ "--d": `${i * step}ms` }) as React.CSSProperties;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero: short promise on the left, real demo websites on the right */}
      <section data-theme="dark" className="relative overflow-hidden rounded-b-[2.5rem] bg-night text-white sm:rounded-b-[4rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="orb absolute -right-40 -top-40 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(140,155,255,0.35),transparent_62%)]" />
          <div className="orb absolute -bottom-60 -left-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(240,160,75,0.25),transparent_62%)] [animation-delay:-9s]" />
        </div>

        <Container className="relative grid items-center gap-14 pb-20 pt-32 sm:pt-40 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28">
          <div>
            <p className="word inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#25d366] shadow-[0_0_0_4px_rgba(37,211,102,0.2)]" />
              {h.badge}
            </p>
            <h1 lang={lang} className="word mt-7 font-display text-[2.7rem] font-semibold leading-[1] tracking-[-0.045em] [hyphens:auto] sm:text-7xl" style={{ "--i": 2 } as React.CSSProperties}>
              {h.title} <span className="text-gradient">{h.accent}</span>
            </h1>
            <p className="word mt-6 max-w-lg text-lg leading-relaxed text-mute" style={{ "--i": 5 } as React.CSSProperties}>
              {h.intro}
            </p>
            <div className="word mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--i": 7 } as React.CSSProperties}>
              <ButtonLink href={contact} variant="light">{h.start}</ButtonLink>
              <ButtonLink href="#demos" variant="ghost-light">{h.demos}</ButtonLink>
            </div>
          </div>

          {/* Device collage */}
          <div className="word relative mx-auto w-full max-w-[34rem] pb-10 pr-6 sm:pr-14" style={{ "--i": 4 } as React.CSSProperties}>
            <BrowserFrame src="/showcase/desk-hotel.jpg" alt="Hotel website design by Arqora" url="shanti-residency.in" priority className="float-slow" />
            <PhoneFrame
              src="/showcase/phone-restaurant.jpg"
              alt="Restaurant website on a phone, with WhatsApp ordering"
              priority
              sizes="200px"
              className="float-fast absolute -bottom-2 right-0 w-[38%] max-w-[12.5rem]"
            />
            <span className="absolute -left-2 top-[58%] flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-2xl sm:-left-8">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25d366] text-white"><MessageCircle size={16} /></span>
              {h.chips.order}
            </span>
            <span className="absolute -top-5 right-10 hidden items-center gap-2 rounded-full bg-saffron px-4 py-2 text-sm font-semibold text-night shadow-xl sm:flex">
              <Check size={16} strokeWidth={3} /> {h.chips.live}
            </span>
          </div>
        </Container>

        {/* Quick facts */}
        <Container className="relative pb-12">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {h.stats.map(([k, v]) => (
              <div key={v} className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur">
                <dt className="font-display text-2xl font-semibold sm:text-3xl">{k}</dt>
                <dd className="mt-0.5 text-sm text-mute">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Live demo switcher */}
      <section id="demos" data-theme="light" className="scroll-mt-20 bg-cream py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">{h.demo.eyebrow}</p>
            <h2 data-reveal className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              {h.demo.title} <span className="text-gradient-dark">{h.demo.accent}</span>
            </h2>
            <p data-reveal className="mt-5 text-lg text-ink-soft">{h.demo.text}</p>
          </div>
          <div data-reveal className="mt-14">
            <DemoSwitcher items={demoItems} t={h.demo} getHref={contact} />
          </div>
          <div className="mt-12 text-center">
            <ButtonLink href={localePath(lang, "/templates")} variant="ghost">{h.demo.all}</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Services as a picture grid */}
      <section data-theme="light" className="bg-white py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>{h.services.eyebrow}</Eyebrow>
              <h2 data-reveal className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
                {h.services.title} <span className="text-gradient-dark">{h.services.accent}</span>
              </h2>
            </div>
            <div data-reveal>
              <ButtonLink href={localePath(lang, "/services")} variant="ghost">{h.services.all}</ButtonLink>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-6 lg:auto-rows-[minmax(15rem,auto)]">
            {/* Websites */}
            <Link href={service("websites")} data-reveal className="group relative overflow-hidden rounded-[2rem] bg-night p-7 text-white md:col-span-4 md:row-span-2 sm:p-9">
              <div aria-hidden="true" className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(140,155,255,0.35),transparent_65%)]" />
              <Tile icon={<Globe2 size={20} />} title={h.services.web[0]} text={h.services.web[1]} light />
              <div className="relative mt-8 transition-transform duration-700 group-hover:-translate-y-2">
                <BrowserFrame src="/showcase/desk-restaurant.jpg" alt="Restaurant website design" url="annapurna-restaurant.in" />
              </div>
            </Link>

            {/* Apps */}
            <Link href={service("apps")} data-reveal style={stagger(1)} className="group relative overflow-hidden rounded-[2rem] bg-[#e9ecff] p-7 md:col-span-2 md:row-span-2">
              <Tile icon={<Smartphone size={20} />} title={h.services.apps[0]} text={h.services.apps[1]} />
              <div className="relative mx-auto mt-8 w-[62%] max-w-[13rem] rotate-[4deg] transition-transform duration-700 group-hover:rotate-0 md:w-[78%]">
                <PhoneFrame src="/showcase/phone-gym.jpg" alt="Gym app on a phone" sizes="220px" />
              </div>
            </Link>

            {/* WhatsApp */}
            <Link href={service("websites")} data-reveal className="group overflow-hidden rounded-[2rem] bg-[#e3f7ea] p-7 md:col-span-3 lg:col-span-2">
              <Tile icon={<MessageCircle size={20} />} title={h.services.whatsapp[0]} text={h.services.whatsapp[1]} />
              <div className="mt-6 space-y-2 text-sm">
                <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#d9fdd3] px-4 py-2.5 shadow-sm">{h.services.mock.chatIn}</p>
                <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 shadow-sm">{h.services.mock.chatOut}</p>
              </div>
            </Link>

            {/* Dashboards */}
            <Link href={service("data-automation")} data-reveal style={stagger(1)} className="group overflow-hidden rounded-[2rem] bg-[#fdf1e4] p-7 md:col-span-3 lg:col-span-2">
              <Tile icon={<BarChart3 size={20} />} title={h.services.data[0]} text={h.services.data[1]} />
              <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold text-ink-soft">{h.services.mock.sales}</p>
                <div className="mt-3 flex h-20 items-end gap-2">
                  {[38, 55, 42, 70, 62, 88, 100].map((v, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-saffron to-[#f7c58c] transition-all duration-500 group-hover:opacity-90"
                      style={{ height: `${v}%` }}
                    />
                  ))}
                </div>
              </div>
            </Link>

            {/* Google & reviews, with a photo */}
            <Link href={service("websites")} data-reveal style={stagger(2)} className="group relative min-h-[16rem] overflow-hidden rounded-[2rem] p-7 text-white md:col-span-6 lg:col-span-2">
              <img src={img(looks.restaurant.gallery[0], 900)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              <div className="relative">
                <Tile icon={<MapPin size={20} />} title={h.services.google[0]} text={h.services.google[1]} light />
                <div className="mt-6 w-fit rounded-2xl bg-white/95 px-4 py-3 text-ink shadow-lg">
                  <p className="flex gap-0.5 text-saffron">
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                  </p>
                  <p className="mt-1 text-sm font-medium">“{h.services.mock.review}”</p>
                </div>
              </div>
            </Link>

            {/* CRM, wide strip */}
            <Link href={service("crm-software")} data-reveal className="group flex flex-col justify-between gap-6 overflow-hidden rounded-[2rem] border border-ink/10 bg-mist p-7 sm:flex-row sm:items-center md:col-span-6">
              <Tile icon={<Code2 size={20} />} title={h.services.crm[0]} text={h.services.crm[1]} />
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-night px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-brand">
                {h.services.all} <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Work: dark rounded panel inset on the page */}
      <section data-theme="dark" className="bg-white pb-6">
        <div className="mx-3 overflow-hidden rounded-[2.5rem] bg-night py-20 text-white sm:mx-6 sm:rounded-[3.5rem] sm:py-28">
          <Container>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow light>{h.work.eyebrow}</Eyebrow>
                <h2 data-reveal className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                  {h.work.title} <span className="text-gradient">{h.work.accent}</span>
                </h2>
              </div>
              <div data-reveal>
                <ButtonLink href={localePath(lang, "/work")} variant="ghost-light">{h.work.all}</ButtonLink>
              </div>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {projects.map((p, i) => (
                <a
                  key={p.slug}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                  style={stagger(i)}
                  className={`group overflow-hidden rounded-[2rem] bg-night-2 ring-1 ring-white/10 transition-colors hover:ring-white/30 ${i === 0 ? "lg:col-span-2" : ""}`}
                >
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/9] sm:aspect-[2.2/1]" : "aspect-[16/9]"}`}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={`${p.name} website`}
                        fill
                        sizes={i === 0 ? "(min-width: 1024px) 1100px, 94vw" : "(min-width: 1024px) 540px, 94vw"}
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6">
                    <div>
                      <p className="text-sm text-mute">{p.category}</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold">{p.name}</h3>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-night transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* Process: numbered steps on soft rounded cards */}
      <section data-theme="light" className="bg-white py-24 sm:py-32">
        <Container>
          <div className="text-center">
            <Eyebrow>{h.process.eyebrow}</Eyebrow>
          </div>
          <h2 data-reveal className="mx-auto mt-6 max-w-3xl text-center font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            {h.process.title}
          </h2>
          <ol className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {h.process.steps.map(([title, text], i) => (
              <li
                key={title}
                data-reveal
                style={stagger(i, 90)}
                className={`relative overflow-hidden rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-7 ${["bg-cream", "bg-[#e9ecff]", "bg-[#e3f7ea]", "bg-[#fdf1e4]"][i]}`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-ink/10 sm:text-6xl">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-semibold sm:mt-6 sm:text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Pricing teaser (India, English only) or ways to work together (German) */}
      {h.pricing ? (
        <section data-theme="light" className="bg-cream py-24 sm:py-32">
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img src={img(looks.salon.hero, 700)} alt="" loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
                <div className="flex flex-col gap-4 pt-12">
                  <img src={img(looks.bakery.hero, 600)} alt="" loading="lazy" className="aspect-square w-full rounded-full object-cover" />
                  <img src={img(looks.clinic.hero, 600)} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 w-[78%] -translate-x-1/2 rounded-[2rem] bg-night p-6 text-white shadow-2xl sm:p-7">
                <p className="text-sm text-mute">{h.pricing.once}</p>
                <p className="font-display text-5xl font-semibold tracking-[-0.03em]">{h.pricing.price}</p>
                <p className="mt-2 text-sm text-mute">{h.pricing.monthly}</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow>{h.pricing.eyebrow}</Eyebrow>
              <h2 data-reveal className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
                {h.pricing.title} <span className="text-gradient-dark">{h.pricing.accent}</span>
              </h2>
              <ul className="mt-8 space-y-3">
                {h.pricing.items.map((it, i) => (
                  <li key={it} data-reveal style={stagger(i, 60)} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 font-medium shadow-[0_10px_30px_-20px_rgba(14,18,34,0.4)]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-saffron text-night">
                      <Check size={15} strokeWidth={3} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <ButtonLink href="/pricing">{h.pricing.cta}</ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <section data-theme="light" className="bg-cream py-24 sm:py-32">
          <Container>
            <Eyebrow>{t.models.eyebrow}</Eyebrow>
            <h2 data-reveal className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] [hyphens:auto] sm:text-6xl">{t.models.title}</h2>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {t.models.items.map((m, i) => (
                <div key={m.title} data-reveal style={stagger(i, 90)} className="rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-45px_rgba(14,18,34,0.4)]">
                  <span className="rounded-full bg-saffron-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{m.tag}</span>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.02em]">{m.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{m.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Global: two offices, compact */}
      <section data-theme="light" className="bg-white py-24 sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>{h.global.eyebrow}</Eyebrow>
            <h2 data-reveal className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              {h.global.title} <span className="text-gradient-dark">{h.global.accent}</span>
            </h2>
            <p data-reveal className="mt-5 max-w-md text-lg text-ink-soft">{t.global.text}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            {t.global.points.map(([k, v], i) => (
              <div key={k} data-reveal style={stagger(i, 70)} className={`rounded-[1.75rem] p-6 ${i === 0 ? "bg-night text-white" : i === 3 ? "bg-saffron text-night" : "bg-mist"}`}>
                <dt className="font-display text-2xl font-semibold capitalize">{k}</dt>
                <dd className={`mt-1 text-sm ${i === 0 ? "text-mute" : i === 3 ? "text-night/75" : "text-ink-soft"}`}>{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* FAQ */}
      <section data-theme="light" className="bg-cream py-24 sm:py-32">
        <Container className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <Eyebrow>{t.faqSection.eyebrow}</Eyebrow>
            <h2 data-reveal className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              {t.faqSection.title}
            </h2>
            <p data-reveal className="mt-5 max-w-xs text-ink-soft">{t.faqSection.side}</p>
          </div>
          <Faq lang={lang} />
        </Container>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}

function Tile({ icon, title, text, light = false }: { icon: React.ReactNode; title: string; text: string; light?: boolean }) {
  return (
    <div className="relative">
      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${light ? "bg-white/15 text-white" : "bg-white text-ink shadow-sm"}`}>{icon}</span>
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em]">{title}</h3>
      <p className={`mt-2 max-w-md leading-relaxed ${light ? "text-white/75" : "text-ink-soft"}`}>{text}</p>
    </div>
  );
}
