import { RootDocument, rootMetadata, rootViewport } from "@/components/RootDocument";

export const metadata = rootMetadata("de");
export const viewport = rootViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="de">{children}</RootDocument>;
}
