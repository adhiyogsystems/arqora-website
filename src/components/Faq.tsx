import { faqs } from "@/data/faq";
import type { Lang } from "@/i18n/config";

/** Native <details> accordion: works without JavaScript and is readable by search engines. */
export function Faq({ lang }: { lang: Lang }) {
  return (
    <div className="border-b border-ink/10">
      {faqs[lang].map((f, i) => (
        <details key={f.q} data-reveal style={{ "--d": `${i * 40}ms` } as React.CSSProperties} className="group border-t border-ink/10">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 font-display text-lg font-medium sm:text-xl">
            {f.q}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-lg transition-transform duration-300 group-open:rotate-45 group-open:bg-night group-open:text-white">
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-7 leading-relaxed text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
