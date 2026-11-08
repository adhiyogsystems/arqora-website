import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { Container, PageHero } from "@/components/ui";
import { liveServices } from "@/data/services";
import { offices, site, telHref, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project and get a free quote from Arqora Technology Solutions.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const options = liveServices().map((s) => ({ slug: s.slug, title: s.title }));
  const preset = options.some((o) => o.slug === service) ? service : undefined;
  const wa = whatsappLink(`Hello ${site.shortName}, I would like to discuss a project.`);

  const channels = [
    { label: "email", value: site.email, href: `mailto:${site.email}` },
    { label: "phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    ...(wa ? [{ label: "whatsapp", value: "chat with us", href: wa }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="contact"
        title="tell us about"
        accent="your project."
        intro="A few lines are enough. We reply with questions, a plan and a clear price. The first conversation is always free."
      />
      <section data-theme="light" className="bg-cream py-20 sm:py-28">
        <Container className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <ContactForm services={options} defaultService={preset} />
          <aside className="space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-night"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">{c.label}</span>
                  <span className="mt-1 block font-display text-lg font-semibold">{c.value}</span>
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            ))}
            <div className="rounded-2xl bg-night p-6 text-white" data-theme="dark">
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-mute">our offices</span>
              <div className="mt-4 grid gap-5">
                {offices.map((o) => (
                  <div key={o.country} className="border-t border-night-line pt-4 first:border-0 first:pt-0">
                    <p className="font-display text-lg font-semibold">
                      {o.country} <span className="text-sm font-normal text-mute">· {o.label}</span>
                    </p>
                    {o.lines.length > 0 && (
                      <address className="mt-2 text-sm not-italic leading-relaxed text-mute">
                        {o.lines.map((l) => (
                          <span key={l} className="block">{l}</span>
                        ))}
                      </address>
                    )}
                    {o.phone && (
                      <a href={telHref(o.phone)} className="mt-2 inline-block text-sm text-white hover:text-saffron">{o.phone}</a>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-night-line pt-4 text-sm text-mute">Working with clients worldwide, online or in person.</p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
