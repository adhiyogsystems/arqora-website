import { aboutMeta, AboutView } from "@/views/pages";

export const metadata = aboutMeta("en");

export default function Page() {
  return <AboutView lang="en" />;
}
