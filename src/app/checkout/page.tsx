import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order securely.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-semibold">Checkout</h1>
      <p className="mt-2 text-muted-foreground">
        Enter your delivery details to place your order.
      </p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
