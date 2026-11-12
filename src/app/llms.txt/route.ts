import { faqs } from "@/data/faq";
import { getProjects } from "@/data/projects";
import { liveServices, serviceSeo } from "@/data/services";
import { localePath } from "@/i18n/config";
import { legal, offices, site, siteText, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** A plain-text summary for AI answer engines (llmstxt.org), built from the same data as the site. */
export function GET() {
  const u = (p: string) => new URL(p, siteUrl).toString();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${siteText.en.seoDescription}`,
    "",
    `${site.name} (${site.shortName}) is a brand of ${legal.operator}, ${legal.operatorCountry.en}. Engineering in India, with an office in Kiel, Germany. Works with clients worldwide in English and German.`,
    "",
    "## Services",
    ...liveServices("en").map((s) => `- [${serviceSeo("en", s.slug)?.seoTitle ?? s.title}](${u(`/services/${s.slug}`)}): ${s.short}`),
    "",
    "## Engagement models",
    "- Fixed-price project: defined scope, fixed price and delivery date.",
    "- Dedicated developers: engineers working as part of the client's team, billed monthly.",
    "- Care & growth plan: monthly hosting, updates, fixes, security and improvements.",
    "",
    "## Selected work",
    ...getProjects("en").map((p) => `- [${p.name}](${p.url}): ${p.summary}`),
    "",
    "## FAQ",
    ...faqs.en.map((f) => `- ${f.q} ${f.a}`),
    "",
    "## Contact",
    `- Email: ${site.email}`,
    ...offices.filter((o) => o.email).map((o) => `- Email (${o.country.en}): ${o.email}`),
    `- Phone / WhatsApp: ${site.phone}`,
    ...offices.filter((o) => o.lines.en.length).map((o) => `- ${o.country.en} office: ${o.lines.en.slice(1).join(", ")}`),
    "",
    "## Pages",
    `- [Home](${u("/")}) · [German version](${u(localePath("de", "/"))})`,
    `- [Services](${u("/services")})`,
    `- [Our work](${u("/work")})`,
    `- [About](${u("/about")})`,
    `- [Contact](${u("/contact")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
