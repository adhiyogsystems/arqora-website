import { pricingMeta, PricingView } from "@/views/PricingView";

export const metadata = pricingMeta();

export default function Page() {
  return <PricingView />;
}
