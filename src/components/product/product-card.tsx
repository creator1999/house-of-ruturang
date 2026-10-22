"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useCart } from "@/components/cart/cart-provider";
import { formatINR } from "@/lib/format";
import { availabilityLabel, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const soldOut = product.availability === "sold-out";
  const demo = product.availability === "demo";
  const unavailable = soldOut || demo;
  const lowStock = product.availability === "low-stock";

  const quickAdd = () => {
    addItem(product.id);
    toast.success(`${product.name} added to bag`);
  };

  return (
    <div className={cn("group flex flex-col", className)}>
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-[3/4] overflow-hidden rounded-sm bg-muted"
        >
          <OptimizedImage
            src={product.images[0]}
            alt={product.name}
            width={800}
            height={1067}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {unavailable && (
            <span
              className={cn(
                "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium",
                demo
                  ? "bg-gold text-white"
                  : "bg-surface/90 text-foreground",
              )}
            >
              {demo ? "Demo" : "Sold out"}
            </span>
          )}
        </Link>

        {!unavailable && (
          <button
            type="button"
            onClick={quickAdd}
            aria-label={`Add ${product.name} to bag`}
            className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-surface text-primary shadow-sm ring-1 ring-border transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="size-4" />
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {product.fabric}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-medium leading-snug hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-medium">{formatINR(product.price)}</span>
          {lowStock && (
            <span className="text-xs text-primary">
              {availabilityLabel[product.availability]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
