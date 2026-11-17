import { Check, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

import { Faq } from "@/components/Faq";
import { PayBox } from "@/components/PayBox";
import { ButtonLink, Container, CtaBand, Eyebrow, PageHero } from "@/components/ui";
import { pageMetadata } from "@/i18n/config";
import { site, siteUrl, whatsappLink } from "@/lib/site";

/** Pricing for local businesses in India (English only: prices are in rupees). */

const plans = [
  {
    name: "Website",
    price: "₹4,999",
    then: "one-time, then ₹499/month",
    pitch: "Your complete business website, live in 48 hours.",
    items: [
      "Full website, up to 8 pages: no per-page charges",
      "Your photos, services, prices and timings",
      "Bookings or orders straight to your WhatsApp",
      "Google Maps, call button, works on every phone",
      "English plus Marathi or Hindi",
      "Menu or catalogue up to 50 items, with QR menu",
      "Google Business Profile setup",
      "Google review poster and review page",
      "Hosting, security and small updates every month",
    ],
    featured: true,
  },
  {
    name: "Growth",
    price: "₹999",
    then: "per month",
    pitch: "Bring customers back, month after month.",
    items: ["Everything in Website", "Monthly WhatsApp offers to your customers", "Reminders: next visit, renewal, fees due", "Digital loyalty card", "Monthly report: reviews, enquiries, orders"],
    early: true,
  },
  {
    name: "Pro",
    price: "₹1,999",
    then: "per month",
    pitch: "Your business runs itself on WhatsApp.",
    items: ["Everything in Growth", "WhatsApp auto-replies: timings, prices, location", "Missed call → automatic WhatsApp reply", "Weekly Google posts and replies to every review", "Features for your industry (clinic, salon, gym…)"],
    early: true,
  },
];

const addons: [string, string][] = [
  ["Your own .com or .in domain", "at cost, about ₹999/year"],
  ["Business email (info@yourname.com)", "₹99/month per inbox"],
  ["UPI / online payment button on your site", "₹999 one-time"],
  ["Another language (beyond the first)", "₹999 one-time"],
  ["Catalogue beyond 50 items", "₹999 one-time"],
  ["Several branches on one website", "₹1,999 one-time"],
  ["AI hairstyle try-on (salons)", "3 months free, then ₹99/month"],
  ["Click-to-WhatsApp ads, managed", "₹1,999/month + ad budget"],
  ["Social media posts (8 a month)", "₹1,499/month"],
];

const faqs = [
  { q: "Do you charge per page?", a: "No. The Website plan includes up to 8 pages for one price, ₹4,999. Most local businesses need 4 to 6." },
  { q: "What does the ₹499 a month cover?", a: "Hosting and security so your site stays online, small updates (prices, photos, timings), and the Google review poster and review page. No long contract: stop any month." },
  { q: "How fast is it live?", a: "Within 48 hours of receiving your details and photos. We often show you a free preview before you pay anything." },
  { q: "Can I change the design?", a: "Yes. Start from one of our templates and we customise colours, sections and wording for you, at no extra cost before launch." },
  { q: "Do I need my own domain?", a: "It's recommended (yourname.com). We buy and connect it for you at cost, about ₹999 a year, and it stays in your name." },
  { q: "How do I pay?", a: "By UPI, card or netbanking. Pay once you've seen and approved your website, and send us the screenshot on WhatsApp." },
];

export const pricingMeta = (): Metadata => {
  const m = pageMetadata(
    "en",
    "/pricing",
    "Website Price for Small Business in India: ₹4,999 Complete",
    "A complete business website for ₹4,999 with WhatsApp booking, Google Maps, reviews and hosting from ₹499/month. No per-page charges. Live in 48 hours.",
  );
  return { ...m, alternates: { canonical: "/pricing" } };
};

export async function PricingView() {
  const wa = (plan: string) => whatsappLink(`Hi Arqora, I'm interested in the ${plan} plan.`) ?? `mailto:${site.email}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Arqora website plans",
    url: new URL("/pricing", siteUrl).toString(),
    itemListElement: plans.map((p) => ({
      "@type": "Offer",
      name: `${p.name} plan`,
      description: p.pitch,
      price: p.price.replace(/[^\d]/g, ""),
      priceCurrency: "INR",
      seller: { "@type": "Organization", name: site.name },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
      <PageHero
        eyebrow="pricing"
        title="one simple price."
        accent="no surprises."
        intro="A complete website for your business for ₹4,999, with no per-page charges. Then grow with WhatsApp offers, reminders and reviews when you're ready."
      />

      <section data-theme="light" className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr_1fr]">
            {plans.map((p, i) => (
              <article
                key={p.name}
                data-reveal
                style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                data-theme={p.featured ? "dark" : undefined}
                className={`flex flex-col rounded-3xl p-7 sm:p-9 ${p.featured ? "bg-night text-white shadow-[0_40px_80px_-40px_rgba(14,18,34,0.7)]" : "border border-ink/10 bg-white"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-semibold">{p.name}</h2>
                  {p.featured && <span className="rounded-full bg-[#f0a04b] px-3 py-1 text-xs font-bold uppercase text-night">start here</span>}
                  {p.early && <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink-soft">early access</span>}
                </div>
                <p className={`mt-2 ${p.featured ? "text-mute" : "text-ink-soft"}`}>{p.pitch}</p>
                <p className="mt-6 font-display">
                  <span className="text-5xl font-semibold tracking-[-0.03em]">{p.price}</span>
                  <span className={`ml-2 ${p.featured ? "text-mute" : "text-ink-soft"}`}>{p.then}</span>
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {p.items.map((x) => (
                    <li key={x} className="flex gap-3">
                      <Check size={18} className={`mt-0.5 shrink-0 ${p.featured ? "text-[#f0a04b]" : "text-brand"}`} /> {x}
                    </li>
                  ))}
                </ul>
                <div className={`mt-8 border-t pt-7 ${p.featured ? "border-white/10" : "border-ink/10"}`}>
                  {p.featured ? (
                    <PayBox amount={4999} note="Arqora Website plan" dark />
                  ) : (
                    <a href={wa(p.name)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-night px-5 py-3 font-semibold text-white">
                      <MessageCircle size={17} /> Join early access
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-ink-soft">
            Need an app, CRM or custom software? <a href="/contact" className="font-semibold text-ink underline underline-offset-4">Get a quote</a>.
          </p>
        </Container>
      </section>

      <section data-theme="light" className="bg-white py-20 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <Eyebrow>add-ons</Eyebrow>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">only if you need them.</h2>
            <p className="mt-4 text-ink-soft">Everything most businesses need is already in the Website plan. These are optional extras.</p>
          </div>
          <ul className="border-b border-ink/10">
            {addons.map(([name, price], i) => (
              <li key={name} data-reveal style={{ "--d": `${i * 40}ms` } as React.CSSProperties} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink/10 py-4">
                <span className="text-lg">{name}</span>
                <span className="text-ink-soft">{price}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section data-theme="light" className="bg-cream py-20 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <Eyebrow>questions</Eyebrow>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">before you decide.</h2>
            <div className="mt-8">
              <ButtonLink href="/templates">see the templates</ButtonLink>
            </div>
          </div>
          <Faq items={faqs} />
        </Container>
      </section>

      <CtaBand lang="en" />
    </>
  );
}
