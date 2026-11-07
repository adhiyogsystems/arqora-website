import type { Metadata } from "next";

import { Container, CtaBand, Eyebrow, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Adhiyog Systems is a small software studio in Maharashtra building websites, apps and business software.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Plain words", text: "We explain things simply and put prices in writing before we start." },
  { title: "Careful work", text: "Fast, secure and tested. We build things we would be happy to use ourselves." },
  { title: "Long-term", text: "Most clients stay with us for maintenance and new features. That is the goal." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A small studio that builds things properly."
        intro="Adhiyog Systems is a full-stack software studio. We design and build websites, apps, business software and data tools, and we stay with our clients after launch."
      />
      <section className="py-16">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>The name</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Adhiyog</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              The name brings together <em>Adhi</em>, the first and foundational, and <em>Yog</em>, union. It is what
              we try to do for every client: build a strong foundation and bring the pieces of a business together in
              one working system.
            </p>
          </div>
          <div>
            <Eyebrow>What we work on</Eyebrow>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Full-stack web development, installable apps, CRM and business software, and data work, from cleaning
              datasets to live dashboards. For larger government and institutional projects, we work with trusted
              partners so every part is handled by someone experienced.
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
