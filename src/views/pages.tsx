import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/ContactForm";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ServiceRows } from "@/components/ServiceRows";
import { ButtonLink, Container, CtaBand, Eyebrow, PageHero } from "@/components/ui";
import { getProjects } from "@/data/projects";
import { getService, liveServices, serviceSeo } from "@/data/services";
import type { Lang } from "@/i18n/config";
import { localePath, pageMetadata } from "@/i18n/config";
import { dict } from "@/i18n/dict";
import { offices, primaryEmail, site, siteUrl, telHref, whatsappLink } from "@/lib/site";

/* ---------- Services ---------- */

export const servicesMeta = (lang: Lang) =>
  pageMetadata(lang, "/services", lang === "de" ? "Leistungen" : "Services", dict[lang].servicesPage.metaDescription);

export function ServicesView({ lang }: { lang: Lang }) {
  const t = dict[lang].servicesPage;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro} />
      <section data-theme="light" className="bg-white py-24 sm:py-32">
        <Container>
          <ServiceRows lang={lang} />
        </Container>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

export const serviceParams = () => liveServices("en").map((s) => ({ slug: s.slug }));

export function serviceMeta(lang: Lang, slug: string) {
  const s = getService(lang, slug);
  const seo = serviceSeo(lang, slug);
  return s ? pageMetadata(lang, `/services/${s.slug}`, seo?.seoTitle ?? s.title, seo?.seoDescription ?? s.short) : {};
}

/** Breadcrumb trail for search results: Home › Services › This service. */
function breadcrumbs(lang: Lang, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: new URL(localePath(lang, it.path), siteUrl).toString(),
    })),
  };
}

const JsonLd = ({ data }: { data: object }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export function ServiceView({ lang, slug }: { lang: Lang; slug: string }) {
  const service = getService(lang, slug);
  if (!service) notFound();
  const t = dict[lang].servicePage;
  const others = liveServices(lang).filter((s) => s.slug !== service.slug);
  const seo = serviceSeo(lang, service.slug);
  const url = new URL(localePath(lang, `/services/${service.slug}`), siteUrl).toString();
  const de = lang === "de";

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: seo?.seoTitle ?? service.title,
    serviceType: service.title,
    description: seo?.seoDescription ?? service.short,
    url,
    inLanguage: lang,
    provider: { "@type": "Organization", name: site.name, url: siteUrl.toString() },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.includes.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x } })),
    },
  };
  const faqLd = seo?.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: lang,
        mainEntity: seo.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;

  return (
    <>
      <JsonLd data={serviceLd} />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd
        data={breadcrumbs(lang, [
          { name: de ? "Startseite" : "Home", path: "/" },
          { name: de ? "Leistungen" : "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <PageHero eyebrow={dict[lang].servicesPage.eyebrow} title={service.title.toLowerCase()} intro={service.intro} />

      <section data-theme="light" className="bg-white py-24 sm:py-32">
        <Container className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Eyebrow>{t.included}</Eyebrow>
            <ul className="mt-8 border-b border-ink/10">
              {service.includes.map((item, i) => (
                <li
                  key={item}
                  data-reveal
                  style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
                  className="flex items-baseline gap-5 border-t border-ink/10 py-5 font-display text-lg sm:text-xl"
                >
                  <span className="text-sm tabular-nums text-saffron">0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside>
            <Eyebrow>{t.goodFor}</Eyebrow>
            <div className="mt-8 flex flex-wrap gap-2">
              {service.goodFor.map((g) => (
                <span key={g} className="rounded-full bg-cream px-4 py-2 font-medium">{g}</span>
              ))}
            </div>
            <div className="mt-12 rounded-2xl bg-night p-7 text-white" data-theme="dark">
              <p className="font-display text-2xl font-semibold leading-tight">{t.boxTitle}</p>
              <p className="mt-3 text-mute">{t.boxText}</p>
              <div className="mt-6">
                <ButtonLink href={`${localePath(lang, "/contact")}?service=${service.slug}`} variant="light">{t.boxButton}</ButtonLink>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {seo && seo.faqs.length > 0 && (
        <section data-theme="light" className="border-t border-ink/10 bg-white py-20 sm:py-24">
          <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <div>
              <Eyebrow>faq</Eyebrow>
              <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
                {de ? "häufige fragen zu " : "common questions about "}
                {service.title.toLowerCase()}
              </h2>
            </div>
            <div className="border-b border-ink/10">
              {seo.faqs.map((f) => (
                <details key={f.q} className="group border-t border-ink/10">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-display text-lg font-medium">
                    {f.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-transform duration-300 group-open:rotate-45 group-open:bg-night group-open:text-white">
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-6 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section data-theme="light" className="border-t border-ink/10 bg-cream py-20">
        <Container>
          <Eyebrow>{t.others}</Eyebrow>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={localePath(lang, `/services/${s.slug}`)}
                className="group flex items-center justify-between rounded-2xl border border-ink/10 bg-white px-6 py-5 transition-colors hover:border-night"
              >
                <span className="font-display text-lg font-semibold">{s.title.toLowerCase()}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}

/* ---------- Work ---------- */

export const workMeta = (lang: Lang) =>
  pageMetadata(lang, "/work", lang === "de" ? "Projekte" : "Our work", dict[lang].workPage.metaDescription);

export function WorkView({ lang }: { lang: Lang }) {
  const t = dict[lang].workPage;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro} />
      <section data-theme="light" className="bg-cream py-24 sm:py-32">
        <Container className="grid gap-28">
          {getProjects(lang).map((p, i) => (
            <ProjectShowcase key={p.slug} project={p} lang={lang} headingLevel="h2" reverse={i % 2 === 1} />
          ))}
          <p data-reveal className="text-center font-display text-xl text-ink-soft">{t.more}</p>
        </Container>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------- About ---------- */

export const aboutMeta = (lang: Lang) =>
  pageMetadata(lang, "/about", lang === "de" ? "Über uns" : "About", dict[lang].aboutPage.metaDescription);

export function AboutView({ lang }: { lang: Lang }) {
  const t = dict[lang].aboutPage;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro} />

      <section data-theme="light" className="bg-cream py-24 sm:py-32">
        <Container className="grid gap-16 md:grid-cols-[1fr_1.3fr] md:gap-24">
          <div>
            <Eyebrow>{t.nameEyebrow}</Eyebrow>
            <p data-reveal className="mt-8 font-display text-6xl font-semibold tracking-[-0.04em] sm:text-7xl">arqora</p>
            <p data-reveal className="mt-3 text-ink-soft">{t.pronounce}</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
            <p data-reveal>{t.story}</p>
            <p data-reveal>{t.work}</p>
          </div>
        </Container>
      </section>

      <section data-theme="light" className="bg-white py-24 sm:py-32">
        <Container>
          <Eyebrow>{t.valuesEyebrow}</Eyebrow>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {t.values.map((v, i) => (
              <div key={v.title} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="border-t border-ink/15 pt-6">
                <span className="font-display text-sm text-saffron">0{i + 1}</span>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em]">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}

/* ---------- Contact ---------- */

export const contactMeta = (lang: Lang) =>
  pageMetadata(lang, "/contact", lang === "de" ? "Kontakt" : "Contact", dict[lang].contactPage.metaDescription);

export function ContactView({ lang, service }: { lang: Lang; service?: string }) {
  const t = dict[lang].contactPage;
  const options = liveServices(lang).map((s) => ({ slug: s.slug, title: s.title }));
  const preset = options.some((o) => o.slug === service) ? service : undefined;
  const wa = whatsappLink(dict[lang].cta.waMessage);
  const email = primaryEmail(lang);

  const channels = [
    { label: t.email, value: email, href: `mailto:${email}` },
    ...(email !== site.email ? [{ label: `${t.email} · India`, value: site.email, href: `mailto:${site.email}` }] : []),
    { label: t.phone, value: site.phone, href: telHref(site.phone) },
    ...(wa ? [{ label: t.whatsapp, value: t.chat, href: wa }] : []),
  ];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro} />
      <section data-theme="light" className="bg-cream py-20 sm:py-28">
        <Container className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <ContactForm lang={lang} services={options} defaultService={preset} />
          <aside className="space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-night"
              >
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">{c.label}</span>
                  <span className="mt-1 block truncate font-display text-lg font-semibold">{c.value}</span>
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            ))}
            <div className="rounded-2xl bg-night p-6 text-white" data-theme="dark">
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-mute">{t.offices}</span>
              <div className="mt-4 grid gap-5">
                {offices.map((o) => (
                  <div key={o.key} className="border-t border-night-line pt-4 first:border-0 first:pt-0">
                    <p className="font-display text-lg font-semibold">
                      {o.country[lang]} <span className="text-sm font-normal text-mute">· {o.label[lang]}</span>
                    </p>
                    {o.lines[lang].length > 0 && (
                      <address className="mt-2 text-sm not-italic leading-relaxed text-mute">
                        {o.lines[lang].map((l) => (
                          <span key={l} className="block">{l}</span>
                        ))}
                      </address>
                    )}
                    {o.phone && (
                      <a href={telHref(o.phone)} className="mt-2 block text-sm text-white hover:text-saffron">{o.phone}</a>
                    )}
                    {o.email && (
                      <a href={`mailto:${o.email}`} className="mt-2 block text-sm text-white hover:text-saffron">{o.email}</a>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-night-line pt-4 text-sm text-mute">{t.worldwide}</p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}

/* ---------- 404 ---------- */

export function NotFoundView({ lang }: { lang: Lang }) {
  const t = dict[lang].notFound;
  return (
    <section data-theme="dark" className="flex min-h-[80svh] items-center bg-night text-white">
      <Container className="py-32 text-center">
        <p className="text-gradient font-display text-[7rem] font-semibold leading-none tracking-[-0.06em] sm:text-[10rem]">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">{t.title}</h1>
        <div className="mt-10">
          <ButtonLink href={localePath(lang, "/")} variant="light">{t.back}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
