import { Faq } from "@/components/Faq";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ServiceRows } from "@/components/ServiceRows";
import { ButtonLink, Container, CtaBand, Eyebrow, Words } from "@/components/ui";
import { WhyTabs } from "@/components/WhyTabs";
import { faqs } from "@/data/faq";
import { getProjects } from "@/data/projects";
import type { Lang } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { dict } from "@/i18n/dict";
import { site } from "@/lib/site";

export function HomeView({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const featured = getProjects(lang)[0];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqs[lang].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const l1 = t.hero.line1.split(" ").length;
  const l2 = t.hero.line2.split(" ").length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section data-theme="dark" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="orb absolute -right-32 -top-32 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(140,155,255,0.32),transparent_62%)]" />
          <div className="orb absolute -bottom-48 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(240,160,75,0.2),transparent_62%)] [animation-delay:-9s]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>

        <Container className="relative flex flex-1 flex-col justify-center pb-16 pt-36">
          <p className="word text-xs font-semibold uppercase tracking-[0.28em] text-mute">{site.name}</p>
          <h1
            lang={lang}
            className="mt-7 max-w-5xl font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] [hyphens:auto] min-[400px]:text-[3.1rem] sm:text-7xl md:text-[6.5rem]"
          >
            <Words text={t.hero.line1} start={1} />
            <br className="hidden sm:block" />
            <Words text={t.hero.line2} start={1 + l1} />
            <Words text={t.hero.accent} start={1 + l1 + l2} className="text-gradient" />
          </h1>
          <p className="word mt-8 max-w-xl text-lg leading-relaxed text-mute sm:text-xl" style={{ "--i": 8 } as React.CSSProperties}>
            {t.hero.intro}
          </p>
          <div className="word mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--i": 10 } as React.CSSProperties}>
            <ButtonLink href={localePath(lang, "/contact")} variant="light">{t.hero.start}</ButtonLink>
            <ButtonLink href={localePath(lang, "/work")} variant="ghost-light">{t.hero.work}</ButtonLink>
          </div>
        </Container>

        <div className="relative border-t border-white/10 py-5">
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee">
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                  {t.capabilities.map((c) => (
                    <li key={c} className="flex items-center gap-8 pr-8 font-display text-lg text-white/55 sm:text-xl">
                      {c}
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron/80" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section data-theme="light" className="bg-cream py-28 sm:py-36">
        <Container>
          <Eyebrow>{t.who.eyebrow}</Eyebrow>
          <p data-reveal className="mt-8 max-w-5xl font-display text-3xl font-medium leading-[1.2] tracking-[-0.025em] sm:text-5xl">
            {t.who.lead} <span className="text-ink-soft">{t.who.rest}</span>
          </p>
          <div data-reveal className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {t.who.cells.map(([title, text]) => (
              <div key={title} className="bg-cream p-7">
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section data-theme="light" className="bg-white py-28 sm:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>{t.servicesSection.eyebrow}</Eyebrow>
              <h2 data-reveal className="mt-6 font-display text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
                {t.servicesSection.title}
              </h2>
            </div>
            <p data-reveal className="max-w-sm text-ink-soft">{t.servicesSection.side}</p>
          </div>
          <div className="mt-14">
            <ServiceRows lang={lang} />
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section data-theme="dark" className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
        <div aria-hidden="true" className="orb pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(140,155,255,0.18),transparent_65%)]" />
        <Container className="relative">
          <Eyebrow light>{t.why.eyebrow}</Eyebrow>
          <h2 data-reveal className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            {t.why.title} <span className="text-gradient">{t.why.accent}</span>
          </h2>
          <div className="mt-16">
            <WhyTabs items={t.why.items} label={t.why.label} />
          </div>
        </Container>
      </section>

      {/* Work */}
      <section data-theme="light" className="bg-cream py-28 sm:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>{t.workSection.eyebrow}</Eyebrow>
              <h2 data-reveal className="mt-6 font-display text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
                {t.workSection.title}
              </h2>
            </div>
            <div data-reveal>
              <ButtonLink href={localePath(lang, "/work")} variant="ghost">{t.workSection.all}</ButtonLink>
            </div>
          </div>
          <div className="mt-16">
            <ProjectShowcase project={featured} lang={lang} />
          </div>
        </Container>
      </section>

      {/* Process */}
      <section data-theme="light" className="bg-white py-28 sm:py-36">
        <Container>
          <Eyebrow>{t.process.eyebrow}</Eyebrow>
          <h2 data-reveal className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            {t.process.title}
          </h2>
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {t.process.steps.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="relative">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-night font-display text-sm font-semibold text-white">
                    0{i + 1}
                  </span>
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-ink/20 to-transparent lg:block" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section data-theme="light" className="border-t border-ink/10 bg-white py-28 sm:py-36">
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
