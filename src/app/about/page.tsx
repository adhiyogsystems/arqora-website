import type { Metadata } from "next";

import { Container, CtaBand, Eyebrow, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a technology company building websites, apps, business software and data solutions.`,
  alternates: { canonical: "/about" },
};

const values = [
  { title: "clarity", text: "Plain language, written plans and fixed prices agreed before work begins." },
  { title: "craft", text: "Fast, secure, tested software we would be proud to use ourselves." },
  { title: "partnership", text: "We stay after launch with support, maintenance and new features as you grow." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="about us"
        title="one technology partner"
        accent="for every need."
        intro={`${site.name} is a full-stack technology company. We design and build websites, apps, business software and data solutions, and we stay with our clients long after launch.`}
      />

      <section data-theme="light" className="bg-cream py-24 sm:py-32">
        <Container className="grid gap-16 md:grid-cols-[1fr_1.3fr] md:gap-24">
          <div>
            <Eyebrow>the name</Eyebrow>
            <p data-reveal className="mt-8 font-display text-6xl font-semibold tracking-[-0.04em] sm:text-7xl">
              catholicon
            </p>
            <p data-reveal className="mt-3 text-ink-soft">/kəˈθɒlɪkɒn/ · from Greek <em>katholikon</em>, &ldquo;universal&rdquo;</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
            <p data-reveal>
              A catholicon is a remedy for every need. That is our promise: whatever your business needs from
              technology, one partner who can build it, connect it and keep it running.
            </p>
            <p data-reveal>
              We work across full-stack web development, installable and native apps, CRM and business software,
              and data, from cleaning datasets to live dashboards and automation. For large government and
              enterprise projects, we bring in trusted specialist partners so every part is handled by experienced
              hands.
            </p>
          </div>
        </Container>
      </section>

      <section data-theme="light" className="bg-white py-24 sm:py-32">
        <Container>
          <Eyebrow>what we value</Eyebrow>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="border-t border-ink/15 pt-6">
                <span className="font-display text-sm text-saffron">0{i + 1}</span>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em]">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
