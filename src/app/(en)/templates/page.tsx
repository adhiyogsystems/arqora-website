import { templatesMeta, TemplatesView } from "@/views/TemplatesView";

export const metadata = templatesMeta("en");

export default function Page() {
  return <TemplatesView lang="en" />;
}
