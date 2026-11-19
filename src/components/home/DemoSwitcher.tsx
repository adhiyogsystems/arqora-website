"use client";

import { ArrowUpRight, BedDouble, BookOpen, CakeSlice, Check, Dumbbell, GraduationCap, School, Scissors, ShoppingCart, Stethoscope, UtensilsCrossed } from "lucide-react";
import { useState } from "react";

import { PhoneFrame } from "@/components/home/frames";

const icons = { Scissors, GraduationCap, School, ShoppingCart, BookOpen, Stethoscope, Dumbbell, UtensilsCrossed, BedDouble, CakeSlice };

export type DemoItem = {
  slug: string;
  label: string;
  name: string;
  icon: keyof typeof icons;
  accent: string;
  onAccent: string;
  feature: string;
  points: string[];
};

/** Pick a business type and see its demo website on a phone. */
export function DemoSwitcher({
  items,
  t,
  getHref,
}: {
  items: DemoItem[];
  t: { open: string; get: string; pick: string };
  getHref: string;
}) {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
      {/* Business types */}
      <div role="tablist" aria-label={t.pick} className="-mx-5 flex gap-2 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 lg:flex-col lg:items-end">
        {items.map((it, i) => {
          const Icon = icons[it.icon];
          const on = i === active;
          return (
            <button
              key={it.slug}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`inline-flex shrink-0 items-center whitespace-nowrap gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                on ? "border-transparent shadow-lg" : "border-ink/10 bg-white text-ink hover:border-ink/30"
              }`}
              style={on ? { background: it.accent, color: it.onAccent } : undefined}
            >
              <Icon size={16} />
              {it.label}
            </button>
          );
        })}
      </div>

      {/* Phone */}
      <div className="relative mx-auto w-[min(78vw,290px)]">
        <div
          aria-hidden="true"
          className="absolute -inset-10 rounded-full opacity-40 blur-3xl transition-colors duration-700"
          style={{ background: item.accent }}
        />
        <a href={`/demo/${item.slug}`} target="_blank" rel="noopener noreferrer" className="relative block transition-transform duration-500 hover:-translate-y-1">
          <PhoneFrame key={item.slug} src={`/showcase/phone-${item.slug}.jpg`} alt={`${item.name}: ${item.label}`} className="fade-in" />
        </a>
        <span className="absolute -right-3 top-16 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-ink shadow-xl sm:-right-10">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#25d366]" />
          {item.feature}
        </span>
      </div>

      {/* Details */}
      <div key={item.slug} className="fade-in rounded-[2rem] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(14,18,34,0.35)] sm:p-8">
        <p className="text-sm font-semibold" style={{ color: item.accent }}>{item.label}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em]">{item.name}</h3>
        {item.points.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {item.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-ink-soft">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: item.accent, color: item.onAccent }}>
                  <Check size={12} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={`/demo/${item.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: item.accent, color: item.onAccent }}
          >
            {t.open} <ArrowUpRight size={15} />
          </a>
          <a href={`${getHref}?service=websites`} className="inline-flex items-center rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold hover:border-ink">
            {t.get}
          </a>
        </div>
      </div>
    </div>
  );
}
