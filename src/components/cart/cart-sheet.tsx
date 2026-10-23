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
      <SheetContent side="right" className="flex flex-col gap-0 p-0">
        {/* Fixed header */}
        <SheetHeader className="shrink-0 border-b py-4 pl-5 pr-14">
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
            {/* Scrollable item list */}
            <ul className="min-h-0 flex-1 divide-y divide-border overflow-y-auto overscroll-contain px-5">
              {items.map((line) => (
                <li
                  key={line.productId}
                  className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 py-4"
                >
                  <Link
                    href={`/product/${line.product.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="shrink-0"
                  >
                    <OptimizedImage
                      src={line.product.images[0]}
                      alt={line.product.name}
                      width={180}
                      height={240}
                      className="aspect-[3/4] w-full rounded-lg object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col">
                    <Link
                      href={`/product/${line.product.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="line-clamp-2 font-heading text-sm font-medium leading-snug hover:text-primary"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {line.product.fabric}
                    </p>
                    <span className="mt-1.5 font-heading text-base font-semibold text-primary">
                      {formatINR(line.product.price * line.quantity)}
                    </span>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <QuantityStepper
                        size="sm"
                        value={line.quantity}
                        onChange={(q) => setQuantity(line.productId, q)}
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(line.productId)}
                        className="shrink-0 rounded px-1 py-2 text-xs font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Fixed footer */}
            <SheetFooter
              className="shrink-0 flex-col gap-3 border-t px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            >
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
