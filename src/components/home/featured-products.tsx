import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/products";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="border-y border-border bg-rose/40">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              The edit
            </p>
            <h2 className="mt-3 font-heading text-[28px] font-semibold text-balance sm:text-4xl">
              Handpicked for You
            </h2>
            <p className="mt-3 text-muted-foreground">
              A curated selection of sarees we return to again and again.
            </p>
          </div>
          <Link
            href="/shop"
            className={cn(buttonVariants({ variant: "outline" }), "gap-1.5 text-sm")}
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        <ProductGrid products={featured} />
      </div>
    </section>
  );
}
