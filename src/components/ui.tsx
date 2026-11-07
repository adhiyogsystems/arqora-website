import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.14em] text-saffron">{children}</p>;
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="border-b border-line bg-mist">
      <Container className="py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>
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
  variant?: "primary" | "ghost" | "light";
}) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-deep",
    ghost: "border border-line bg-white text-ink hover:border-brand hover:text-brand",
    light: "bg-white text-brand-deep hover:bg-saffron-soft",
  }[variant];
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-medium transition-colors ${styles}`;
  return external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function CtaBand() {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-deep px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-saffron/25 blur-3xl" />
          <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">Have something in mind?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/75">
            Tell us what you need in a few lines. We reply within a day with a clear plan and price.
          </p>
          <div className="relative mt-8">
            <ButtonLink href="/contact" variant="light">Get a free quote</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
