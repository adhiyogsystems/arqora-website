import Link from "next/link";

import { ServiceIcon } from "@/components/ServiceIcon";
import { ButtonLink, Container, CtaBand, Eyebrow } from "@/components/ui";
import { projects } from "@/data/projects";
import { liveServices } from "@/data/services";

const steps = [
  { title: "Talk", text: "A short call or WhatsApp chat to understand your business and what you need." },
  { title: "Plan & price", text: "A clear written plan, timeline and fixed price. No surprises later." },
  { title: "Build", text: "We build in small steps and show you progress every week." },
  { title: "Launch & support", text: "We go live, train your team, and stay on for maintenance." },
];

const reasons = [
  { title: "Local and reachable", text: "You talk directly to the people building your project, in Marathi, Hindi or English." },
  { title: "Built for phones", text: "Everything we make is fast on everyday phones and patchy networks." },
  { title: "Start small, grow later", text: "Begin with what you need now. Add features when your business is ready." },
  { title: "You own it", text: "Your domain, your code, your data. Always handed over to you." },
];

export default function Home() {
  const featured = projects[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_85%_-10%,#e8e9f8,transparent),radial-gradient(40rem_20rem_at_0%_110%,#fdf1e4,transparent)]" />
        <Container className="pb-20 pt-20 sm:pb-28 sm:pt-28">
          <Eyebrow>Software studio · Maharashtra</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            Websites, apps and software that <span className="text-brand">work for your business.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Adhiyog Systems builds fast websites, installable apps, CRM and business software, and data dashboards
            for businesses and institutions. Simple to use, made to grow.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Get a free quote</ButtonLink>
            <ButtonLink href="/work" variant="ghost">See our work</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="border-t border-line bg-mist py-20">
        <Container>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Services</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liveServices().map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_10px_30px_-12px_rgba(27,37,99,0.25)]"
              >
                <ServiceIcon name={s.icon} />
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.short}</p>
                <span className="mt-4 inline-block text-sm font-medium text-brand">
                  Learn more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured work */}
      <section className="py-20">
        <Container>
          <div className="grid items-center gap-10 rounded-3xl border border-line p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Featured work</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{featured.name}</h2>
              <p className="mt-1 text-sm font-medium text-ink-soft">{featured.category}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">{featured.summary}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/work">Read the case study</ButtonLink>
                {featured.url && <ButtonLink href={featured.url} variant="ghost">Visit site ↗</ButtonLink>}
              </div>
            </div>
            <ul className="grid gap-3">
              {featured.built.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl bg-mist px-4 py-3.5 text-[15px]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-saffron" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="border-y border-line bg-mist py-20">
        <Container>
          <Eyebrow>Why Adhiyog</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Small team, careful work, direct contact.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title}>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{r.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20">
        <Container>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">From first call to launch</h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line p-6">
                <span className="text-sm font-semibold text-saffron">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
