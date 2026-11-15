import { MessageCircle, Star } from "lucide-react";
import type { Metadata } from "next";

import { copy, langNames, readTarget, reviewLangs } from "@/reviews/review";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const t = readTarget(await searchParams);
  return { title: { absolute: `${t.name}: ${copy[t.lang].title}` } };
}

/** What a customer sees after scanning the counter QR or tapping the WhatsApp link. */
export default async function ReviewPage({ searchParams }: Props) {
  const q = await searchParams;
  const t = readTarget(q);
  const c = copy[t.lang];
  const deva = t.lang !== "en";
  const switchTo = (l: string) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(q)) if (typeof v === "string" && k !== "l") p.set(k, v);
    p.set("l", l);
    return `?${p.toString()}`;
  };
  const feedback = t.whatsapp
    ? `https://wa.me/${t.whatsapp}?text=${encodeURIComponent(`Feedback for ${t.name}: `)}`
    : null;

  return (
    <main
      lang={t.lang}
      style={{ "--accent": t.color, fontFamily: deva ? "var(--font-deva), var(--font-inter), sans-serif" : undefined } as React.CSSProperties}
      className="flex min-h-svh flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--accent)_22%,white),white_60%)] px-5 py-10 text-[#0e1222]"
    >
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-[0_40px_80px_-40px_rgba(14,18,34,0.45)]">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)] font-display text-2xl font-semibold text-white">
          {t.name.trim()[0]?.toUpperCase()}
        </span>
        <p className="mt-4 font-display text-lg font-semibold">{t.name}</p>

        <h1 className="mt-6 text-3xl font-bold leading-tight">{c.title}</h1>
        <p className="mt-3 text-[#545b70]">{c.sub}</p>

        <div aria-hidden="true" className="mt-6 flex justify-center gap-1.5 text-[#f5b301]">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={30} fill="currentColor" strokeWidth={0} />
          ))}
        </div>

        {t.googleUrl ? (
          <a
            href={t.googleUrl}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[var(--accent)] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-transform active:scale-[0.98]"
          >
            <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#fff" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
            </svg>
            {c.button}
          </a>
        ) : (
          <p className="mt-7 rounded-2xl bg-[#fdf1e4] p-4 text-sm">Review link not set up yet. Please ask the staff.</p>
        )}

        {feedback && (
          <a href={feedback} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-[#545b70] underline-offset-4 hover:underline">
            <MessageCircle size={16} /> {c.privately}
          </a>
        )}

        <nav aria-label="Language" className="mt-8 flex justify-center gap-2 border-t border-[#e6e1d7] pt-6 text-sm">
          {reviewLangs.map((l) => (
            <a
              key={l}
              href={switchTo(l)}
              lang={l}
              className={`rounded-full px-3 py-1.5 ${l === t.lang ? "bg-[#0e1222] text-white" : "text-[#545b70] ring-1 ring-[#e6e1d7]"}`}
              style={l !== "en" ? { fontFamily: "var(--font-deva), sans-serif" } : undefined}
            >
              {langNames[l]}
            </a>
          ))}
        </nav>
      </div>
      <p className="mt-6 text-xs text-[#8a90a3]">Powered by Arqora</p>
    </main>
  );
}
