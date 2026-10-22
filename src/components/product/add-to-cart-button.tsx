"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { getProductById } from "@/lib/products";

export function AddToCartButton({
  productId,
  quantity = 1,
  disabled,
  className,
  children,
}: {
  productId: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const { addItem } = useCart();
  const product = getProductById(productId);

  return (
    <Button
      type="button"
      disabled={disabled}
      className={className}
      onClick={() => {
        addItem(productId, quantity);
        toast.success(
          product ? `${product.name} added to bag` : "Added to bag",
        );
      }}
    >
      <ShoppingBag />
      {children ?? "Add to cart"}
    </Button>
  );
}
