import { templatesMeta, TemplatesView } from "@/views/TemplatesView";

export const metadata = templatesMeta("de");

export default function Page() {
  return <TemplatesView lang="de" />;
}
