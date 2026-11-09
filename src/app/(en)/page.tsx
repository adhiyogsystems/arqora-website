import { pageMetadata } from "@/i18n/config";
import { siteText } from "@/lib/site";
import { HomeView } from "@/views/HomeView";

export const metadata = pageMetadata("en", "/", undefined, siteText.en.description);

export default function Page() {
  return <HomeView lang="en" />;
}
