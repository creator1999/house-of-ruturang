import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/policy-page";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: "House of Ruturang returns and exchanges information.",
};

export default function ReturnsPage() {
  return (
    <PolicyPage title="Returns & Exchanges" updated="Draft">
      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Eligibility
        </h2>
        <p className="mt-2 leading-relaxed">
          We want you to love your saree. If something isn&apos;t right, reach
          out within 7 days of delivery and we&apos;ll help with a return or
          exchange. Items should be unworn and in their original condition with
          tags intact.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Process
        </h2>
        <p className="mt-2 leading-relaxed">
          Message us on WhatsApp with your order details and a photo of the
          item. We&apos;ll confirm the next steps and arrange a pickup where
          available.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Refunds
        </h2>
        <p className="mt-2 leading-relaxed">
          Refunds are issued to the original payment method once the returned
          item is received and checked. Exact timelines will be confirmed
          before launch.
        </p>
      </section>
    </PolicyPage>
  );
}
