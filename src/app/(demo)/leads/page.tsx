import Link from "next/link";

import { LeadGenerator } from "@/demo/LeadGenerator";
import { niches } from "@/demo/niches";

export const metadata = { title: { absolute: "Lead engine · Arqora" } };

/** Internal sales tool: paste a lead list, get a personalised preview website and message for every business. */
export default function Page() {
  return (
    <main className="min-h-screen bg-cream px-4 py-12 text-ink sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">arqora · sales tool</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">lead engine</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Search Google for businesses in any city (or paste a list). Each one gets its own finished website with their name, city, phone, address and Google rating,
          a clean link, and a ready message offering it to them. Single business? Use the{" "}
          <Link href="/demo" className="font-semibold text-iris">demo link builder</Link>.
        </p>
        <div className="mt-10">
          <LeadGenerator niches={niches.map((n) => ({ slug: n.slug, label: n.label, type: n.feature.type }))} />
        </div>
      </div>
    </main>
  );
}
