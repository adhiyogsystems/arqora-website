import { contactMeta, ContactView } from "@/views/pages";

export const metadata = contactMeta("de");

type Props = { searchParams: Promise<{ service?: string }> };

export default async function Page({ searchParams }: Props) {
  return <ContactView lang="de" service={(await searchParams).service} />;
}
