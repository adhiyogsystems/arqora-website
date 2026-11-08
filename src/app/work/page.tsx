import type { Metadata } from "next";

import { ButtonLink, Container, CtaBand, Eyebrow, PageHero } from "@/components/ui";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Our work",
  description: "Websites and apps built by Catholicon Technology Solutions.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Real projects, live and in use."
        intro="A look at what we have built, what it does, and the tools behind it."
      />
      <section className="py-16">
        <Container className="grid gap-8">
          {projects.map((p) => (
            <article key={p.slug} className="grid gap-10 rounded-3xl border border-line p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <Eyebrow>{p.category}</Eyebrow>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">{p.name}</h2>
                <p className="mt-4 leading-relaxed text-ink-soft">{p.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-sm text-ink-soft">{t}</span>
                  ))}
                </div>
                {p.url && (
                  <div className="mt-8">
                    <ButtonLink href={p.url}>Visit {p.name} ↗</ButtonLink>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">What we built</h3>
                <ul className="mt-4 grid gap-3">
                  {p.built.map((b) => (
                    <li key={b} className="flex items-start gap-3 rounded-xl bg-mist px-4 py-3.5 text-[15px]">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-saffron" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          <p className="text-center text-ink-soft">More projects coming soon.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
