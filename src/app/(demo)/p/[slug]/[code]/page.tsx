import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoSite, prospectFromLead } from "@/demo/DemoSite";
import { decodeLead } from "@/demo/lead";
import { img, looks } from "@/demo/looks";
import { getNiche } from "@/demo/niches";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string; code: string }> };

async function load(params: Props["params"]) {
  const { slug, code } = await params;
  const lead = decodeLead(code);
  const niche = lead && getNiche(lead.niche);
  if (!lead || !niche) return null;
  return { lead, niche, url: new URL(`/p/${slug}/${code}`, siteUrl).toString() };
}

/** WhatsApp and email previews show the business name and a large niche photo. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await load(params);
  if (!d) return {};
  const title = `${d.lead.name}: your new website`;
  const description = `A free website preview made for ${d.lead.name}${d.lead.city ? `, ${d.lead.city}` : ""}. Tap to see it.`;
  const image = `${img(looks[d.niche.slug].hero, 1200)}&h=630`;
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, images: [{ url: image, width: 1200, height: 630 }], type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** A lead's personalised preview website. Everything comes from the link. */
export default async function Page({ params }: Props) {
  const d = await load(params);
  if (!d) notFound();
  return <DemoSite niche={d.niche} prospect={prospectFromLead(d.lead, d.url)} />;
}
