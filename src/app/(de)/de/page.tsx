import { pageMetadata } from "@/i18n/config";
import { siteText } from "@/lib/site";
import { HomeView } from "@/views/HomeView";

export const metadata = pageMetadata("de", "/", { absolute: siteText.de.seoTitle }, siteText.de.seoDescription);

export default function Page() {
  return <HomeView lang="de" />;
}
