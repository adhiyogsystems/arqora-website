import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoSite, readProspect } from "@/demo/DemoSite";
import { getNiche } from "@/demo/niches";

type Props = {
  params: Promise<{ niche: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const niche = getNiche((await params).niche);
  if (!niche) return {};
  const p = readProspect(niche, await searchParams);
  return { title: p.name, description: `${niche.label} website sample for ${p.name}.` };
}

export default async function Page({ params, searchParams }: Props) {
  const niche = getNiche((await params).niche);
  if (!niche) notFound();
  return <DemoSite niche={niche} prospect={readProspect(niche, await searchParams)} />;
}
