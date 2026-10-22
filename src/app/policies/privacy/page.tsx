import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "House of Ruturang privacy policy.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy Policy" updated="Draft">
      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          What we collect
        </h2>
        <p className="mt-2 leading-relaxed">
          We collect only the details needed to fulfil your order — your name,
          contact information and delivery address — along with any messages you
          send us.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          How we use it
        </h2>
        <p className="mt-2 leading-relaxed">
          Your information is used to process and deliver orders and to respond
          to enquiries. We do not sell or rent your personal information.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Payments
        </h2>
        <p className="mt-2 leading-relaxed">
          Payments are handled by our payment provider (Razorpay). Card and
          banking details are processed by them and never touch our servers.
        </p>
      </section>
    </PolicyPage>
  );
}
