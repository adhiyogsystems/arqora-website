import { Star } from "lucide-react";
import type { Metadata } from "next";
import QRCode from "qrcode";

import { siteUrl } from "@/lib/site";
import { PrintButton } from "@/reviews/PrintButton";
import { copy, readTarget } from "@/reviews/review";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const t = readTarget(await searchParams);
  return { title: { absolute: `Review poster: ${t.name}` } };
}

/** A5 counter poster. The QR opens the business's review page (/r) in the chosen language. */
export default async function PosterPage({ searchParams }: Props) {
  const q = await searchParams;
  const t = readTarget(q);
  const c = copy[t.lang];
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) if (typeof v === "string") params.set(k, v);
  const target = new URL(`/r?${params.toString()}`, siteUrl).toString();
  const qr = await QRCode.toString(target, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0e1222", light: "#0000" } });
  const deva = t.lang !== "en" ? "var(--font-deva), var(--font-inter), sans-serif" : undefined;

  return (
    <main className="flex min-h-svh flex-col items-center gap-6 bg-[#e9e7e2] p-6 print:block print:bg-white print:p-0">
      <style>{`@page { size: A5 portrait; margin: 0 } @media print { html, body { background: #fff } }`}</style>
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <PrintButton />
        <span className="text-sm text-[#545b70]">A5 size. Print in colour on thick paper, or laminate it.</span>
      </div>

      <section
        lang={t.lang}
        style={{ "--accent": t.color, fontFamily: deva } as React.CSSProperties}
        className="relative flex h-[210mm] w-[148mm] flex-col overflow-hidden bg-white text-[#0e1222] shadow-2xl print:shadow-none"
      >
        <div className="bg-[var(--accent)] px-[12mm] pb-[10mm] pt-[12mm] text-white">
          <p className="font-display text-[15pt] font-semibold leading-tight">{t.name}</p>
          <h1 className="mt-[6mm] text-[28pt] font-bold leading-[1.1]">{c.poster}</h1>
          <p className="mt-[2mm] text-[13pt] opacity-90">{c.posterSub}</p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-[12mm]">
          <div aria-hidden="true" className="flex gap-[2mm] text-[#f5b301]">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={30} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <div className="mt-[6mm] rounded-[6mm] border-[1.5mm] border-[var(--accent)] p-[5mm]">
            <div className="h-[62mm] w-[62mm]" dangerouslySetInnerHTML={{ __html: qr }} />
          </div>
          <ol className="mt-[8mm] grid w-full grid-cols-3 gap-[3mm] text-center text-[10pt]">
            {c.steps.map((s, i) => (
              <li key={s}>
                <span className="mx-auto mb-[1.5mm] flex h-[8mm] w-[8mm] items-center justify-center rounded-full bg-[var(--accent)] text-[10pt] font-bold text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-center justify-between border-t border-[#e6e1d7] px-[12mm] py-[5mm] text-[9pt] text-[#545b70]">
          <span style={{ fontFamily: "var(--font-deva), var(--font-inter), sans-serif" }}>Thank you · धन्यवाद · धन्यवाद!</span>
          <span>Google</span>
        </div>
      </section>
    </main>
  );
}
