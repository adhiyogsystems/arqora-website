import type { Metadata } from "next";
import Link from "next/link";

import { ServiceIcon } from "@/components/ServiceIcon";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { liveServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites and SEO, apps, CRM and business software, data dashboards and government projects.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to run your business online."
        intro="Pick one service or combine them. We usually start small, with one clear goal, and build from there."
      />
      <section className="py-16">
        <Container className="grid gap-6">
          {liveServices().map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid gap-6 rounded-2xl border border-line p-6 transition-colors hover:border-brand/40 sm:p-8 md:grid-cols-[auto_1fr_1fr]"
            >
              <ServiceIcon name={s.icon} />
              <div>
                <h2 className="text-xl font-semibold group-hover:text-brand">{s.title}</h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.intro}</p>
              </div>
              <ul className="space-y-1.5 text-[15px] text-ink-soft">
                {s.includes.slice(0, 4).map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-saffron">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
