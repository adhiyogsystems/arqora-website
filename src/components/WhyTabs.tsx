"use client";

import { useState } from "react";

const items = [
  {
    label: "speed",
    title: "launch in weeks, not months.",
    text: "We start with what matters most, ship it quickly, and keep improving in small, steady steps you can see every week.",
  },
  {
    label: "fair cost",
    title: "pay only for what you need.",
    text: "Fixed, written quotes before work begins. Start small, then add features when your business is ready for them.",
  },
  {
    label: "ownership",
    title: "you own everything.",
    text: "Your code, your domain, your data. Always handed over to you, never locked in.",
  },
  {
    label: "partnership",
    title: "we stay after launch.",
    text: "Maintenance, support and new features as you grow, with direct access to the engineers who built it.",
  },
];

export function WhyTabs() {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
      <div role="tablist" aria-label="Why Catholicon" className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-1">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.label}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`group flex items-baseline gap-4 rounded-xl px-3 py-2 text-left transition-colors md:px-0 md:py-3 ${
                on ? "bg-white/10 md:bg-transparent" : ""
              }`}
            >
              <span className={`font-display text-sm tabular-nums transition-colors ${on ? "text-saffron" : "text-white/35"}`}>
                0{i + 1}
              </span>
              <span
                className={`font-display text-xl font-medium transition-colors md:text-3xl ${
                  on ? "text-white" : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {it.label}
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" key={active} className="fade-in md:pt-3">
        <h3 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl">
          {item.title}
        </h3>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">{item.text}</p>
        <div className="mt-10 h-px w-full bg-night-line">
          <div
            className="h-px bg-gradient-to-r from-iris to-saffron transition-all duration-700"
            style={{ width: `${((active + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
