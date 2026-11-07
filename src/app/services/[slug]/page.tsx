import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceIcon } from "@/components/ServiceIcon";
import { ButtonLink, Container, CtaBand, Eyebrow } from "@/components/ui";
import { getService, liveServices } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return liveServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <section className="border-b border-line bg-mist">
        <Container className="py-16 sm:py-20">
          <ServiceIcon name={service.icon} />
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{service.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{service.intro}</p>
          <div className="mt-8">
            <ButtonLink href={`/contact?service=${service.slug}`}>Ask about {service.title.split(" ")[0]}</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow>What&apos;s included</Eyebrow>
            <ul className="mt-5 grid gap-3">
              {service.includes.map((i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-line px-4 py-3.5">
                  <svg className="mt-0.5 shrink-0 text-brand" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <aside>
            <Eyebrow>Good for</Eyebrow>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.goodFor.map((g) => (
                <span key={g} className="rounded-full bg-saffron-soft px-3.5 py-1.5 text-sm font-medium text-ink">
                  {g}
                </span>
              ))}
            </div>
          </aside>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
