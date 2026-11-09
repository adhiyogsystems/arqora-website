import { aboutMeta, AboutView } from "@/views/pages";

export const metadata = aboutMeta("de");

export default function Page() {
  return <AboutView lang="de" />;
}
