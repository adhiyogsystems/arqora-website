import type { Metadata } from "next";

import { RootDocument } from "@/components/RootDocument";
import { NotFoundView } from "@/views/pages";

/** 404 for URLs that match no route (the site has separate English and German root layouts). */
export const metadata: Metadata = { title: "404 | Arqora", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en">
      <NotFoundView lang="en" />
    </RootDocument>
  );
}
