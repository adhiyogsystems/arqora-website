import type { Metadata } from "next";

import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Our work",
  description: "Websites and apps built by Arqora Technology Solutions.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="our work"
        title="real projects,"
        accent="live and in use."
        intro="A look at what we have built, what it does, and the tools behind it."
      />
      <section data-theme="light" className="bg-cream py-24 sm:py-32">
        <Container className="grid gap-28">
          {projects.map((p, i) => (
            <ProjectShowcase key={p.slug} project={p} headingLevel="h2" reverse={i % 2 === 1} />
          ))}
          <p data-reveal className="text-center font-display text-xl text-ink-soft">more projects coming soon.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
