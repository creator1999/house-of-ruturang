import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your Bag",
  description: "Review the sarees in your bag.",
};

export default function CartPage() {
  return <CartView />;
}
