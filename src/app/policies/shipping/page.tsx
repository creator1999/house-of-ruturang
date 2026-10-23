import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/policy-page";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description: "House of Ruturang shipping and delivery information.",
};

export default function ShippingPage() {
  return (
    <PolicyPage title="Shipping & Delivery" updated="Draft">
      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Dispatch
        </h2>
        <p className="mt-2 leading-relaxed">
          Orders are dispatched within 2–3 business days of confirmation. Once
          shipped, tracking details are shared over WhatsApp.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Shipping charges
        </h2>
        <p className="mt-2 leading-relaxed">
          Shipping charges and delivery timelines are being finalised. Please
          reach out on WhatsApp for current delivery details.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Delivery timelines
        </h2>
        <p className="mt-2 leading-relaxed">
          Most deliveries within India arrive in 4–7 business days, depending on
          your location. Timelines are estimates and may vary during peak
          festive periods.
        </p>
      </section>
    </PolicyPage>
  );
}
