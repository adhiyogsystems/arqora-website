/**
 * Bulk outreach helpers: read a pasted lead list (Google Sheets, Apify or
 * Outscraper export), guess each business's niche, and write the messages.
 */

export type RawLead = {
  name: string;
  category: string;
  city: string;
  phone: string;
  address: string;
  hours: string;
  rating: string;
  reviews: string;
  email: string;
  website: string;
};

const fields = ["name", "category", "city", "phone", "address", "hours", "rating", "reviews", "email", "website"] as const;
type Field = (typeof fields)[number];

/** Column names used by Google Sheets templates, Apify and Outscraper exports. */
const aliases: Record<Field, string[]> = {
  name: ["name", "title", "business", "business name", "company", "place name"],
  category: ["category", "categoryname", "categories", "type", "niche", "industry", "subtypes"],
  city: ["city", "town", "locality"],
  phone: ["phone", "phone number", "mobile", "phoneunformatted", "contact", "whatsapp", "phone_1"],
  address: ["address", "full address", "full_address", "street", "area"],
  hours: ["hours", "opening hours", "working hours", "timings", "working_hours"],
  rating: ["rating", "totalscore", "stars", "score"],
  reviews: ["reviews", "reviewscount", "reviews count", "user ratings total", "reviews_count"],
  email: ["email", "emails", "email 1", "email_1", "mail"],
  website: ["website", "site", "url", "web"],
};

function parseRows(text: string): string[][] {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const delim = firstLine.includes("\t") ? "\t" : firstLine.includes(";") && !firstLine.includes(",") ? ";" : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"' && cell === "") quoted = true;
    else if (ch === delim) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  row.push(cell);
  rows.push(row);
  return rows.map((r) => r.map((c) => c.trim())).filter((r) => r.some(Boolean));
}

/** Without a header row, columns are read in this order. */
const defaultOrder: Field[] = ["name", "category", "city", "phone", "address", "rating", "reviews", "email"];

export function parseLeads(text: string): RawLead[] {
  const rows = parseRows(text);
  if (!rows.length) return [];
  const head = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9 _]/g, "").trim());
  const map = new Map<number, Field>();
  head.forEach((h, i) => {
    const f = fields.find((k) => aliases[k].includes(h));
    if (f && ![...map.values()].includes(f)) map.set(i, f);
  });
  const hasHeader = map.has(head.findIndex((h) => aliases.name.includes(h)));
  const body = hasHeader ? rows.slice(1) : rows;
  if (!hasHeader) defaultOrder.forEach((f, i) => map.set(i, f));
  return body
    .map((r) => {
      const lead = Object.fromEntries(fields.map((f) => [f, ""])) as RawLead;
      r.forEach((v, i) => {
        const f = map.get(i);
        if (f && !lead[f]) lead[f] = v;
      });
      lead.rating = lead.rating.replace(",", ".").match(/\d(\.\d)?/)?.[0] ?? "";
      return lead;
    })
    .filter((l) => l.name);
}

const rules: [string, RegExp][] = [
  ["salon", /salon|parlou?r|beauty|\bspa\b|makeup|hair|barber|unisex|\bnails?\b|bridal/i],
  ["clinic", /clinic|doctor|hospital|dental|dentist|physio|medical|health|ayurved|homeopath|nursing|diagnostic|skin care clinic|eye care|pediatric|gyna|ortho/i],
  ["gym", /gym|fitness|yoga|crossfit|zumba|martial|sports club/i],
  ["bakery", /bakery|bakers|cake|pastry|patisserie|sweet|mithai|confection/i],
  ["restaurant", /restaurant|caf[eé]|dhaba|food|kitchen|biryani|pizza|eatery|\bbar\b|bistro|tiffin|\bmess\b|bhojanalay|juice|\btea\b|thali/i],
  ["hotel", /hotel|lodge|resort|guest ?house|homestay|\binn\b|hostel|residency|bhakta ?niwas|dharma?shala/i],
  ["school", /school|vidyalaya|vidya mandir|convent|kindergarten|pre-?school|play ?school|academy school/i],
  ["coaching", /coaching|classes|tuition|tutorial|academy|institute|training|education|learning|study centre/i],
  ["bookshop", /book|stationery|stationer|library/i],
  ["supermarket", /supermarket|grocery|kirana|\bmart\b|general store|provision|departmental|store|shop/i],
];

export function guessNiche(category: string, name: string): string | null {
  for (const text of [category, name]) {
    if (!text) continue;
    for (const [slug, re] of rules) if (re.test(text)) return slug;
  }
  return null;
}

export type MsgLang = "en" | "hi" | "mr";
export const msgLangs: MsgLang[] = ["en", "hi", "mr"];
export const msgLangNames: Record<MsgLang, string> = { en: "English", hi: "हिंदी", mr: "मराठी" };

type FeatureType = "booking" | "order" | "enquiry";
const featureWord: Record<MsgLang, Record<FeatureType, string>> = {
  en: { booking: "bookings", order: "orders", enquiry: "enquiries" },
  hi: { booking: "बुकिंग", order: "ऑर्डर", enquiry: "पूछताछ" },
  mr: { booking: "बुकिंग", order: "ऑर्डर", enquiry: "चौकशी" },
};

export function outreachMessage(lang: MsgLang, o: { name: string; link: string; price: string; feature: FeatureType; sender: string }) {
  const f = featureWord[lang][o.feature];
  if (lang === "hi")
    return `नमस्ते ${o.name} टीम,\n\nहमने ${o.name} के लिए एक वेबसाइट बनाई है। बिल्कुल मुफ्त, देखिए:\n${o.link}\n\nमोबाइल पर बढ़िया चलती है, आपकी सेवाएँ दिखाती है, और ${f} सीधे आपके WhatsApp पर आते हैं।\n\nसिर्फ ${o.price} में यह आपकी हो सकती है, 48 घंटे में लाइव। बदलाव चाहिए? हम आपके हिसाब से बना देंगे।\n\nपसंद आए तो YES लिखिए।\n— ${o.sender}`;
  if (lang === "mr")
    return `नमस्कार ${o.name} टीम,\n\nआम्ही ${o.name} साठी एक वेबसाइट तयार केली आहे. मोफत पाहा:\n${o.link}\n\nमोबाईलवर छान चालते, तुमच्या सेवा दाखवते, आणि ${f} थेट तुमच्या WhatsApp वर येतात.\n\nफक्त ${o.price} मध्ये ही तुमची होऊ शकते, 48 तासांत लाइव्ह. बदल हवे असतील तर तुमच्या पसंतीनुसार करून देऊ.\n\nआवडली तर YES लिहा.\n— ${o.sender}`;
  return `Hi ${o.name} team,\n\nWe made a website for ${o.name}. It's free to look at:\n${o.link}\n\nIt works beautifully on mobile, shows your services, and ${f} come straight to your WhatsApp.\n\nIt can be yours for ${o.price}, live in 48 hours. Want changes? We'll customise it for you.\n\nReply YES and we'll set it up.\n— ${o.sender}`;
}

export function emailSubject(lang: MsgLang, name: string) {
  if (lang === "hi") return `${name} के लिए नई वेबसाइट (मुफ्त प्रीव्यू)`;
  if (lang === "mr") return `${name} साठी नवीन वेबसाइट (मोफत प्रिव्ह्यू)`;
  return `We made a website for ${name}`;
}

/** Email adds the sender's identity and an easy opt-out (required for cold email in the US/UK). */
export function emailFooter(lang: MsgLang) {
  if (lang === "hi") return `\n\nArqora Technology Solutions (Adhiyog Systems), India\nआगे ईमेल नहीं चाहिए? बस "NO" लिखकर जवाब दें।`;
  if (lang === "mr") return `\n\nArqora Technology Solutions (Adhiyog Systems), India\nपुढे ईमेल नको असतील तर फक्त "NO" लिहून उत्तर द्या.`;
  return `\n\nArqora Technology Solutions (Adhiyog Systems), India\nNot interested? Just reply "no" and we won't email again.`;
}

export function toCsv(rows: string[][]) {
  return rows.map((r) => r.map((c) => (/[",\n\r]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(",")).join("\r\n");
}
