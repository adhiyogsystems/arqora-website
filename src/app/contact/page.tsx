import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { Container, PageHero } from "@/components/ui";
import { liveServices } from "@/data/services";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project and get a free quote from Catholicon Technology Solutions.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const options = liveServices().map((s) => ({ slug: s.slug, title: s.title }));
  const preset = options.some((o) => o.slug === service) ? service : undefined;
  const wa = whatsappLink(`Hello ${site.shortName}, I would like to discuss a project.`);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your project."
        intro="A few lines are enough. We reply with questions, a plan and a clear price. The first conversation is always free."
      />
      <section className="py-16">
        <Container className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <ContactForm services={options} defaultService={preset} />
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line p-6">
              <h2 className="font-semibold">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-1 block text-brand hover:underline">{site.email}</a>
            </div>
            {wa && (
              <div className="rounded-2xl border border-line p-6">
                <h2 className="font-semibold">WhatsApp</h2>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-1 block text-brand hover:underline">
                  Chat with us
                </a>
              </div>
            )}
            <div className="rounded-2xl bg-mist p-6">
              <h2 className="font-semibold">Based in</h2>
              <p className="mt-1 text-ink-soft">{site.location}</p>
              <p className="mt-3 text-sm text-ink-soft">We work with clients worldwide, online or in person.</p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
