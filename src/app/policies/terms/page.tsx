import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/policy-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "House of Ruturang terms of service.",
};

export default function TermsPage() {
  return (
    <PolicyPage title="Terms of Service" updated="Draft">
      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Use of the site
        </h2>
        <p className="mt-2 leading-relaxed">
          By browsing this storefront you agree to use it lawfully and not to
          misuse content, imagery or product information.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Products &amp; pricing
        </h2>
        <p className="mt-2 leading-relaxed">
          Product details, colours and prices are shown in good faith. Because
          handwoven pieces can vary slightly, minor differences between
          photographs and the item are possible.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Orders &amp; payment
        </h2>
        <p className="mt-2 leading-relaxed">
          Orders are confirmed once payment is received. Payment is processed
          securely through Razorpay.
        </p>
      </section>
    </PolicyPage>
  );
}
