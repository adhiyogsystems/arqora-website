import { ReviewBuilder } from "@/reviews/ReviewBuilder";

export const metadata = { title: { absolute: "Review kit builder · Arqora" } };

/** Internal tool: set up a client's Google review engine (poster, review page, WhatsApp messages). */
export default function Page() {
  return (
    <main className="min-h-screen bg-cream px-4 py-12 text-ink sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">arqora · growth kit tool</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">google review engine</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Set up a client in one minute: a branded review page in English, Hindi or Marathi, a printable QR poster for the counter, and
          WhatsApp messages staff send after every visit. More reviews means more people choose them on Google Maps.
        </p>
        <div className="mt-10">
          <ReviewBuilder />
        </div>
      </div>
    </main>
  );
}
