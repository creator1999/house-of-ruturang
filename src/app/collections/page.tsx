import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { collections, getProductsByCategory, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore the House of Ruturang edit — All Sarees, Festive Edit, Traditional Elegance and New Arrivals.",
};

export default function CollectionsPage() {
  const counts: Record<string, number> = {
    all: products.length,
    festive: getProductsByCategory("festive").length,
    traditional: getProductsByCategory("traditional").length,
    new: getProductsByCategory("new").length,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          The edit
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold sm:text-5xl">
          Collections
        </h1>
        <p className="mt-3 text-muted-foreground">
          Browse by mood and occasion — each edit is handpicked around a single
          feeling.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={
              collection.id === "all"
                ? "/shop"
                : `/shop?category=${collection.id}`
            }
            className="group relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[3/4]"
          >
            <OptimizedImage
              src={collection.image}
              alt={collection.name}
              width={800}
              height={1067}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                {collection.name}
              </h2>
              <p className="mt-1 text-sm text-white/80">{collection.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold">
                {counts[collection.id]} {counts[collection.id] === 1 ? "saree" : "sarees"}{" "}
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
