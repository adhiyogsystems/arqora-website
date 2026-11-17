import Link from "next/link";

import { LinkBuilder } from "@/demo/LinkBuilder";
import { niches } from "@/demo/niches";

export const metadata = { title: "Demo link builder" };

/** Internal sales tool: build a personalised demo link for a business after a call. */
export default function Page() {
  return (
    <main className="min-h-screen bg-cream px-4 py-12 text-ink sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">arqora · sales tool</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">demo link builder</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Pick the industry, type the business details, and share the personalised sample site after your call. Orders and bookings on the demo go to the business&apos;s own WhatsApp, so they can try it themselves.
          Many businesses at once? Use the{" "}
          <Link href="/leads" className="font-semibold text-iris">bulk website generator</Link>.
        </p>
        <div className="mt-10">
          <LinkBuilder niches={niches.map((n) => ({ slug: n.slug, label: n.label }))} />
        </div>
        <h2 className="mt-16 font-display text-2xl font-semibold">all {niches.length} sample sites</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {niches.map((n) => (
            <li key={n.slug}>
              <Link href={`/demo/${n.slug}`} className="block rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-night">
                <span className="block h-2 w-10 rounded-full" style={{ background: n.colors.accent }} />
                <span className="mt-4 block font-semibold">{n.label}</span>
                <span className="mt-1 block text-sm text-ink-soft">{n.defaultName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
