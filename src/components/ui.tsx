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
    <section data-theme="dark" className="relative overflow-hidden bg-night pb-20 pt-36 text-white sm:pb-24 sm:pt-44">
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
  const cls = `group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold transition-colors duration-300 ${styles}`;
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

export function CtaBand({ lang }: { lang: Lang }) {
  const t = dict[lang].cta;
  const wa = whatsappLink(t.waMessage);
  const email = primaryEmail(lang);
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
      <div aria-hidden="true" className="orb pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,160,75,0.18),transparent_60%)]" />
      <Container className="relative text-center">
        <p data-reveal className="text-xs font-semibold uppercase tracking-[0.24em] text-mute">{t.eyebrow}</p>
        <h2 data-reveal className="mx-auto mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1] tracking-[-0.04em] sm:text-7xl md:text-8xl">
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
    </section>
  );
}
