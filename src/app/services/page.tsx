import type { Metadata } from "next";

import { ServiceRows } from "@/components/ServiceRows";
import { Container, CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites and SEO, apps, CRM and business software, data dashboards and government projects.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="services"
        title="everything your business"
        accent="runs on."
        intro="Pick one service or combine them. Most clients start with one clear goal and build from there."
      />
      <section data-theme="light" className="bg-white py-24 sm:py-32">
        <Container>
          <ServiceRows />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
