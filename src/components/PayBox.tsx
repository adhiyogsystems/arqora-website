import { CreditCard, MessageCircle, Smartphone } from "lucide-react";
import QRCode from "qrcode";

import { payments, site } from "@/lib/site";

/** "₹4,999" → 4999. Only rupee prices can be paid by UPI. */
export function rupees(price: string): number | null {
  if (!/₹|rs\.?|inr/i.test(price)) return null;
  const n = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 && n < 1_000_000 ? Math.round(n) : null;
}

/**
 * Payment box: UPI QR (scan with any UPI app), a tap-to-pay UPI button for
 * phones, and an optional Razorpay link for cards. Without a UPI ID or
 * Razorpay link set in src/lib/site.ts it falls back to "pay on WhatsApp".
 */
export async function PayBox({ amount, note, dark = false }: { amount: number | null; note: string; dark?: boolean }) {
  const label = amount ? `₹${amount.toLocaleString("en-IN")}` : "";
  const upiLink =
    payments.upi && amount
      ? // encodeURIComponent (not URLSearchParams) so spaces become %20, which every UPI app reads correctly
        `upi://pay?${Object.entries({ pa: payments.upi, pn: payments.upiName, am: amount.toFixed(2), cu: "INR", tn: note.slice(0, 50) })
          .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
          .join("&")}`
      : null;
  const qr = upiLink ? await QRCode.toString(upiLink, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#0e1222", light: "#ffffff" } }) : null;
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi Arqora, I'd like to pay${label ? ` ${label}` : ""} for: ${note}`)}`;

  const muted = dark ? "text-[#a6adc4]" : "text-ink-soft";
  const ghost = dark ? "border-white/20 text-white" : "border-ink/15 text-ink";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {qr && (
        <div className="shrink-0 text-center">
          <div className="mx-auto h-36 w-36 rounded-2xl bg-white p-2" dangerouslySetInnerHTML={{ __html: qr }} />
          <p className={`mt-1.5 text-xs ${muted}`}>Scan with any UPI app</p>
        </div>
      )}
      <div className="grid gap-2.5">
        {upiLink && (
          <a href={upiLink} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f0a04b] px-5 py-3 font-semibold text-[#090c18] sm:justify-start">
            <Smartphone size={17} /> Pay {label} by UPI
          </a>
        )}
        {payments.razorpay && (
          <a href={payments.razorpay} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 font-semibold sm:justify-start ${ghost}`}>
            <CreditCard size={17} /> Card, netbanking or wallet
          </a>
        )}
        {!upiLink && !payments.razorpay && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-5 py-3 font-semibold text-[#062b14] sm:justify-start">
            <MessageCircle size={17} /> Pay{label ? ` ${label}` : ""}: get payment details on WhatsApp
          </a>
        )}
        <p className={`text-xs ${muted}`}>
          Paying to {payments.upiName} (Arqora Technology Solutions). Send a screenshot on WhatsApp after paying and we start the same day.
        </p>
      </div>
    </div>
  );
}
