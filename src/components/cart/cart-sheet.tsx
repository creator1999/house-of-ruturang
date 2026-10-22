"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { useCart } from "@/components/cart/cart-provider";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, subtotal, setQuantity, removeItem } = useCart();

  const primaryLink = cn(buttonVariants({ size: "lg" }), "h-11 w-full");
  const secondaryLink = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "h-11 w-full",
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="font-heading text-xl">
            Your Bag ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">Your bag is empty.</p>
            <Link
              href="/shop"
              onClick={() => onOpenChange(false)}
              className={primaryLink}
            >
              Browse sarees
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((line) => (
                <li key={line.productId} className="flex gap-4 py-4">
                  <Link
                    href={`/product/${line.product.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="shrink-0"
                  >
                    <OptimizedImage
                      src={line.product.images[0]}
                      alt={line.product.name}
                      width={160}
                      height={200}
                      className="h-24 w-20 rounded-lg object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${line.product.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="font-heading text-base font-medium leading-snug hover:text-primary"
                      >
                        {line.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(line.productId)}
                        className="text-xs text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {line.product.fabric}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        value={line.quantity}
                        onChange={(q) => setQuantity(line.productId, q)}
                      />
                      <span className="font-medium">
                        {formatINR(line.product.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <SheetFooter className="flex-col gap-3 border-t px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-heading text-lg font-semibold">
                  {formatINR(subtotal)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Separator />
              <Link
                href="/checkout"
                onClick={() => onOpenChange(false)}
                className={primaryLink}
              >
                Proceed to checkout
              </Link>
              <Link
                href="/cart"
                onClick={() => onOpenChange(false)}
                className={secondaryLink}
              >
                View bag
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
