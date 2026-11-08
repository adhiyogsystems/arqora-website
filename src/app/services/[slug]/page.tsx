import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink, Container, CtaBand, Eyebrow, PageHero } from "@/components/ui";
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
  const others = liveServices().filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero eyebrow="services" title={service.title.toLowerCase()} intro={service.intro} />

      <section data-theme="light" className="bg-white py-24 sm:py-32">
        <Container className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Eyebrow>what&apos;s included</Eyebrow>
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
            <Eyebrow>good for</Eyebrow>
            <div className="mt-8 flex flex-wrap gap-2">
              {service.goodFor.map((g) => (
                <span key={g} className="rounded-full bg-cream px-4 py-2 font-medium">{g}</span>
              ))}
            </div>
            <div className="mt-12 rounded-2xl bg-night p-7 text-white" data-theme="dark">
              <p className="font-display text-2xl font-semibold leading-tight">want this for your business?</p>
              <p className="mt-3 text-mute">Get a fixed, written quote. No obligation.</p>
              <div className="mt-6">
                <ButtonLink href={`/contact?service=${service.slug}`} variant="light">get a quote</ButtonLink>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section data-theme="light" className="border-t border-ink/10 bg-cream py-20">
        <Container>
          <Eyebrow>other services</Eyebrow>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-ink/10 bg-white px-6 py-5 transition-colors hover:border-night"
              >
                <span className="font-display text-lg font-semibold">{s.title.toLowerCase()}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
