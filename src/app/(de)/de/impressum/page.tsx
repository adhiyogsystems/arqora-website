import { impressumMeta, ImpressumView } from "@/views/legal";

export const metadata = impressumMeta("de");

export default function Page() {
  return <ImpressumView lang="de" />;
}
