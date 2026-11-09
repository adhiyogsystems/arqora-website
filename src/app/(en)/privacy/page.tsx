import { privacyMeta, PrivacyView } from "@/views/legal";

export const metadata = privacyMeta("en");

export default function Page() {
  return <PrivacyView lang="en" />;
}
