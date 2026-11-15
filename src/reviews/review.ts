/**
 * Google review engine: shared logic for the customer review page, the QR
 * poster and the team's review kit builder.
 *
 * Google policy, built in on purpose:
 * - every customer gets the same Google button (no "review gating")
 * - private feedback is offered alongside, never instead of, the Google link
 * - nothing is offered in exchange for a review
 */

export type ReviewLang = "en" | "hi" | "mr";
export const reviewLangs: ReviewLang[] = ["en", "hi", "mr"];
export const langNames: Record<ReviewLang, string> = { en: "English", hi: "हिंदी", mr: "मराठी" };

export const copy: Record<
  ReviewLang,
  { title: string; sub: string; button: string; privately: string; steps: [string, string, string]; poster: string; posterSub: string; thanks: string; message: string }
> = {
  en: {
    title: "How was your visit?",
    sub: "Your review helps others find us. It takes just 30 seconds.",
    button: "Write a Google review",
    privately: "Have a suggestion? Tell us privately on WhatsApp",
    steps: ["Scan the code", "Tap the stars", "Write a line"],
    poster: "Loved our service?",
    posterSub: "Scan to review us on Google",
    thanks: "Thank you!",
    message:
      "Thank you for visiting {name}! 🙏 If you liked our service, could you leave us a quick Google review? It really helps a small business like ours: {link}",
  },
  hi: {
    title: "आपका अनुभव कैसा रहा?",
    sub: "आपका रिव्यू दूसरों को हमें ढूँढने में मदद करता है। सिर्फ़ 30 सेकंड लगते हैं।",
    button: "Google पर रिव्यू लिखें",
    privately: "कोई सुझाव है? हमें WhatsApp पर बताएँ",
    steps: ["कोड स्कैन करें", "स्टार चुनें", "एक लाइन लिखें"],
    poster: "हमारी सेवा पसंद आई?",
    posterSub: "स्कैन करें और Google पर रिव्यू दें",
    thanks: "धन्यवाद!",
    message:
      "{name} आने के लिए धन्यवाद! 🙏 अगर आपको हमारी सेवा पसंद आई, तो कृपया Google पर एक छोटा सा रिव्यू दें। इससे हम जैसे छोटे बिज़नेस को बहुत मदद मिलती है: {link}",
  },
  mr: {
    title: "तुमचा अनुभव कसा होता?",
    sub: "तुमचा रिव्ह्यू इतरांना आम्हाला शोधायला मदत करतो. फक्त ३० सेकंद लागतात.",
    button: "Google वर रिव्ह्यू लिहा",
    privately: "काही सूचना आहे? आम्हाला WhatsApp वर कळवा",
    steps: ["कोड स्कॅन करा", "स्टार निवडा", "एक ओळ लिहा"],
    poster: "आमची सेवा आवडली?",
    posterSub: "स्कॅन करा आणि Google वर रिव्ह्यू द्या",
    thanks: "धन्यवाद!",
    message:
      "{name} ला भेट दिल्याबद्दल धन्यवाद! 🙏 आमची सेवा आवडली असेल तर कृपया Google वर एक छोटासा रिव्ह्यू द्या. आमच्यासारख्या छोट्या व्यवसायाला याची खूप मदत होते: {link}",
  },
};

const allowedHosts = new Set(["g.page", "search.google.com", "www.google.com", "google.com", "maps.google.com", "maps.app.goo.gl", "goo.gl"]);

export type ReviewTarget = { name: string; googleUrl: string | null; whatsapp: string; color: string; lang: ReviewLang };

type Query = Record<string, string | string[] | undefined>;
const one = (q: Query, k: string) => (Array.isArray(q[k]) ? q[k]![0] : (q[k] as string | undefined))?.trim() ?? "";

/** Accepts a Place ID (pid), a g.page short code (gp) or a full Google review/Maps URL (g). */
export function googleReviewUrl(q: Query): string | null {
  const pid = one(q, "pid");
  if (/^[A-Za-z0-9_-]{10,200}$/.test(pid)) return `https://search.google.com/local/writereview?placeid=${pid}`;
  const gp = one(q, "gp");
  if (/^[A-Za-z0-9_-]{4,100}$/.test(gp)) return `https://g.page/r/${gp}/review`;
  const g = one(q, "g");
  if (!g) return null;
  try {
    const u = new URL(g);
    return u.protocol === "https:" && allowedHosts.has(u.hostname) ? u.toString() : null;
  } catch {
    return null;
  }
}

export function readTarget(q: Query): ReviewTarget {
  const digits = one(q, "w").replace(/\D/g, "");
  const color = one(q, "c").replace(/^#/, "");
  const lang = one(q, "l") as ReviewLang;
  return {
    name: one(q, "n").slice(0, 80) || "Our business",
    googleUrl: googleReviewUrl(q),
    whatsapp: digits.length === 10 ? `91${digits}` : digits,
    color: /^[0-9a-fA-F]{6}$/.test(color) ? `#${color}` : "#2f3fb8",
    lang: reviewLangs.includes(lang) ? lang : "en",
  };
}

/** Turns whatever the team pastes (review link, Maps link or Place ID) into the shortest query params. */
export function shortGoogleParams(input: string): Record<string, string> {
  const s = input.trim();
  if (!s) return {};
  const gpMatch = s.match(/g\.page\/r\/([A-Za-z0-9_-]+)/);
  if (gpMatch) return { gp: gpMatch[1] };
  const pidMatch = s.match(/placeid=([A-Za-z0-9_-]+)/i);
  if (pidMatch) return { pid: pidMatch[1] };
  if (/^ChIJ[A-Za-z0-9_-]{10,}$/.test(s)) return { pid: s };
  return { g: s };
}

export const fillMessage = (lang: ReviewLang, name: string, link: string) => copy[lang].message.replace("{name}", name).replace("{link}", link);
