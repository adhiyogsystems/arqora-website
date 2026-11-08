import Link from "next/link";

import { liveServices } from "@/data/services";

/** Large numbered service rows. Details open on hover (desktop) and always show on phones. */
export function ServiceRows() {
  return (
    <div className="border-b border-ink/10">
      {liveServices().map((s, i) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          data-reveal
          style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
          className="group block border-t border-ink/10 py-8 outline-none md:py-10"
        >
          <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 md:grid-cols-[5rem_1fr_auto]">
            <span className="font-display text-sm tabular-nums text-ink-soft transition-colors group-hover:text-saffron">
              0{i + 1}
            </span>
            <h3 className="font-display text-[1.7rem] font-semibold leading-tight tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl md:text-5xl">
              {s.title.toLowerCase()}
            </h3>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 group-hover:-rotate-45 group-hover:border-night group-hover:bg-night group-hover:text-white md:h-14 md:w-14">
              →
            </span>
          </div>
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className="grid gap-4 pt-4 md:grid-cols-[5rem_1fr] md:pt-6">
                <span />
                <div>
                  <p className="max-w-2xl text-ink-soft md:text-lg">{s.short}</p>
                  <ul className="mt-4 hidden flex-wrap gap-2 md:flex">
                    {s.includes.slice(0, 4).map((x) => (
                      <li key={x} className="rounded-full bg-cream px-3.5 py-1.5 text-sm">{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
