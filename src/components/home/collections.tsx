import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { collections } from "@/lib/products";

export function Collections() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Curated for you
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
          Discover Your Shade of Elegance
        </h2>
        <p className="mt-3 text-muted-foreground">
          Explore the edit — from timeless classics to fresh-from-the-loom
          arrivals.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={
              collection.id === "all"
                ? "/shop"
                : `/shop?category=${collection.id}`
            }
            className="group relative aspect-[3/4] overflow-hidden rounded-sm"
          >
            <OptimizedImage
              src={collection.image}
              alt={collection.name}
              width={600}
              height={800}
              sizes="(max-width: 640px) 50vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
              <h3 className="font-heading text-xl font-semibold sm:text-2xl">
                {collection.name}
              </h3>
              <p className="mt-1 text-xs text-white/80">{collection.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gold">
                Explore <ArrowRight className="size-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
