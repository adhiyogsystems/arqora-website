import Link from "next/link";

import type { Lang } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { dict } from "@/i18n/dict";
import { primaryEmail, whatsappLink } from "@/lib/site";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] ${light ? "text-mute" : "text-ink-soft"}`}>
      <span className="h-px w-8 bg-gradient-to-r from-iris to-saffron" />
      {children}
    </p>
  );
}

/** Splits a line into words that rise in one after another. */
export function Words({ text, start = 0, className = "" }: { text: string; start?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={`word ${className}`} style={{ "--i": start + i } as React.CSSProperties}>
          {w}
          {" "}
        </span>
      ))}
    </>
  );
}

export function PageHero({ eyebrow, title, accent, intro }: { eyebrow: string; title: string; accent?: string; intro: string }) {
  const n = title.split(" ").length;
  return (
    <section data-theme="dark" className="relative overflow-hidden rounded-b-[2.5rem] bg-night pb-20 pt-36 text-white sm:rounded-b-[4rem] sm:pb-24 sm:pt-44">
      <div aria-hidden="true" className="orb pointer-events-none absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(240,160,75,0.18),transparent_65%)] [animation-delay:-9s]" />
      <div aria-hidden="true" className="orb pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(140,155,255,0.28),transparent_65%)]" />
      <Container className="relative">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.03em] [hyphens:auto] sm:text-6xl md:text-7xl">
          <Words text={title} />
          {accent && <Words text={accent} start={n} className="text-gradient" />}
        </h1>
        <p data-reveal className="mt-7 max-w-2xl text-lg leading-relaxed text-mute">{intro}</p>
      </Container>
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light" | "ghost-light";
}) {
  const styles = {
    primary: "bg-night text-white hover:bg-brand",
    ghost: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
    light: "bg-white text-night hover:bg-saffron",
    "ghost-light": "border border-white/20 text-white hover:border-white hover:bg-white hover:text-night",
  }[variant];
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors duration-300 ${styles}`;
  const inner = (
    <>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </>
  );
  return external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Photos of the kinds of businesses we build for, shown as a row of circles. */
const ctaFaces = ["1580618672591-eb180b1a973f", "1583338917451-face2751d8d5", "1758691463582-11aea602cd4a", "1611892440504-42a792e24d32", "1689877020200-403d8542d95d"];

export function CtaBand({ lang }: { lang: Lang }) {
  const t = dict[lang].cta;
  const wa = whatsappLink(t.waMessage);
  const email = primaryEmail(lang);
  return (
    <section data-theme="dark" className="bg-white px-3 pb-3 pt-6 sm:px-6 sm:pb-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-night py-20 text-white sm:rounded-[3.5rem] sm:py-28">
        <div aria-hidden="true" className="orb pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,160,75,0.22),transparent_60%)]" />
        <div aria-hidden="true" className="orb pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(140,155,255,0.25),transparent_65%)] [animation-delay:-6s]" />
        <Container className="relative text-center">
          <div data-reveal aria-hidden="true" className="flex justify-center -space-x-3">
            {ctaFaces.map((id) => (
              // eslint-disable-next-line @next/next/no-img-element -- Unsplash CDN, sized via URL
              <img key={id} src={`https://images.unsplash.com/photo-${id}?w=160&h=160&q=70&auto=format&fit=crop`} alt="" loading="lazy" className="h-14 w-14 rounded-full object-cover ring-4 ring-night sm:h-16 sm:w-16" />
            ))}
          </div>
          <p data-reveal className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-mute">{t.eyebrow}</p>
          <h2 data-reveal className="mx-auto mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1] tracking-[-0.04em] sm:text-7xl">
            {t.title} <span className="text-gradient">{t.accent}</span>
          </h2>
          <p data-reveal className="mx-auto mt-7 max-w-lg text-lg text-mute">{t.text}</p>
          <div data-reveal className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={localePath(lang, "/contact")} variant="light">{t.quote}</ButtonLink>
            {wa && <ButtonLink href={wa} variant="ghost-light">{t.whatsapp}</ButtonLink>}
          </div>
          <a data-reveal href={`mailto:${email}`} className="mt-8 inline-block text-mute underline-offset-4 hover:text-white hover:underline">
            {email}
          </a>
        </Container>
      </div>
    </section>
  );
}
