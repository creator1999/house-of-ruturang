import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/shop-client";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop Sarees",
  description:
    "Browse the House of Ruturang edit — handpicked sarees in every shade, from timeless classics to fresh arrivals.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ShopClient products={products} />
    </div>
  );
}
