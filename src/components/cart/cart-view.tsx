"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { useCart } from "@/components/cart/cart-provider";
import { formatINR } from "@/lib/format";
import { computeShipping } from "@/lib/shipping";
import { cn } from "@/lib/utils";

export function CartView() {
  const { items, subtotal, setQuantity, removeItem } = useCart();
  const shipping = computeShipping(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="size-14 text-muted-foreground/40" />
        <h1 className="mt-6 font-heading text-3xl font-semibold">
          Your bag is empty
        </h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Looks like you haven&apos;t added any sarees yet. Explore the
          collection to find your next favourite.
        </p>
        <Link
          href="/shop"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 px-8")}
        >
          Browse sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Your Bag</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        {/* Items */}
        <ul className="space-y-4 lg:col-span-2">
          {items.map((line) => (
            <li
              key={line.productId}
              className="flex gap-4 rounded-xl border border-border bg-card p-4"
            >
              <Link href={`/product/${line.product.slug}`} className="shrink-0">
                <OptimizedImage
                  src={line.product.images[0]}
                  alt={line.product.name}
                  width={200}
                  height={250}
                  className="h-32 w-24 rounded-lg object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${line.product.slug}`}
                      className="font-heading text-lg font-medium leading-snug hover:text-primary"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {line.product.fabric} · {formatINR(line.product.price)}{" "}
                      each
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(line.productId)}
                    aria-label={`Remove ${line.product.name}`}
                    className="-mr-3 -mt-3 p-3 text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <QuantityStepper
                    value={line.quantity}
                    onChange={(q) => setQuantity(line.productId, q)}
                  />
                  <span className="font-semibold">
                    {formatINR(line.product.price * line.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 w-full")}
          >
            Proceed to checkout
          </Link>
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "link" }),
              "mt-3 h-auto w-full text-muted-foreground",
            )}
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
