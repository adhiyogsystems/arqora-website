import type { Metadata } from "next";

import { Container, CtaBand, Eyebrow, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a technology company building websites, apps, business software and data solutions.`,
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Clarity", text: "Plain language, written plans and fixed prices agreed before work begins." },
  { title: "Craft", text: "Fast, secure, tested software we would be proud to use ourselves." },
  { title: "Partnership", text: "We stay after launch with support, maintenance and new features as you grow." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="One technology partner for every business need."
        intro={`${site.name} is a full-stack technology company. We design and build websites, apps, business software and data solutions, and we stay with our clients long after launch.`}
      />
      <section className="py-16">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>The name</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Catholicon</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              From the Greek <em>katholikon</em>, meaning &ldquo;universal.&rdquo; A catholicon is a remedy for
              every need. That is our promise: whatever your business needs from technology, one partner who can
              build it, connect it and keep it running.
            </p>
          </div>
          <div>
            <Eyebrow>What we work on</Eyebrow>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Full-stack web development, installable and native apps, CRM and business software, and data work,
              from cleaning datasets to live dashboards and automation. For large government and enterprise
              projects, we bring in trusted specialist partners so every part is handled by experienced hands.
            </p>
          </div>
        </Container>
      </section>
      <section className="border-y border-line bg-mist py-16">
        <Container className="grid gap-8 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title}>
              <h3 className="font-semibold">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{v.text}</p>
            </div>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
