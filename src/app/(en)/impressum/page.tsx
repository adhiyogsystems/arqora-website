import { impressumMeta, ImpressumView } from "@/views/legal";

export const metadata = impressumMeta("en");

export default function Page() {
  return <ImpressumView lang="en" />;
}
