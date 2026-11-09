import { privacyMeta, PrivacyView } from "@/views/legal";

export const metadata = privacyMeta("de");

export default function Page() {
  return <PrivacyView lang="de" />;
}
