import { serviceMeta, serviceParams, ServiceView } from "@/views/pages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = serviceParams;

export async function generateMetadata({ params }: Props) {
  return serviceMeta("de", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ServiceView lang="de" slug={(await params).slug} />;
}
