import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoSite, prospectFromLead } from "@/demo/DemoSite";
import { decodeLead, decodePlace, type Lead } from "@/demo/lead";
import { img, looks } from "@/demo/looks";
import { getNiche } from "@/demo/niches";
import { getPlaceBasics } from "@/lib/places";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string; code: string }> };

/**
 * Two kinds of link:
 * - pasted leads carry their details in the link;
 * - Google leads carry only a place ID, and the name and address are looked
 *   up live from Google (never stored). If the lookup fails, the page shows
 *   a basic version for the industry and city.
 */
async function load(params: Props["params"]) {
  const { slug, code } = await params;
  const url = new URL(`/p/${slug}/${code}`, siteUrl).toString();

  const ref = decodePlace(code);
  if (ref) {
    const niche = getNiche(ref.niche);
    if (!niche) return null;
    const live = await getPlaceBasics(ref.placeId);
    const lead: Lead = {
      niche: ref.niche,
      name: live?.name ?? "Your business",
      city: ref.city,
      phone: "",
      address: live?.address ?? "",
      hours: "",
      rating: "",
      reviews: "",
      price: ref.price,
      monthly: ref.monthly,
    };
    return { lead, niche, url, google: Boolean(live) };
  }

  const lead = decodeLead(code);
  const niche = lead && getNiche(lead.niche);
  if (!lead || !niche) return null;
  return { lead, niche, url, google: false };
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

/** A lead's personalised preview website. */
export default async function Page({ params }: Props) {
  const d = await load(params);
  if (!d) notFound();
  return <DemoSite niche={d.niche} prospect={{ ...prospectFromLead(d.lead, d.url), googleData: d.google }} />;
}
