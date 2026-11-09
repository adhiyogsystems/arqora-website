import { contactMeta, ContactView } from "@/views/pages";

export const metadata = contactMeta("en");

type Props = { searchParams: Promise<{ service?: string }> };

export default async function Page({ searchParams }: Props) {
  return <ContactView lang="en" service={(await searchParams).service} />;
}
