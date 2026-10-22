import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative grid lg:min-h-[88vh] lg:grid-cols-5">
      {/* Copy — 40% */}
      <div className="order-2 flex items-center px-6 py-14 sm:px-10 lg:order-1 lg:col-span-2 lg:px-12 lg:py-24">
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            The Art of Elegance
          </p>
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl">
            Draped in Tradition. Made for Your Moments.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Thoughtfully curated sarees, celebrating timeless elegance and every
            shade of you.
          </p>
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-12 px-8 text-xs uppercase tracking-[0.15em]",
            )}
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Photography — 60% */}
      <div className="relative order-1 aspect-[3/4] bg-muted lg:order-2 lg:col-span-3 lg:aspect-auto">
        <OptimizedImage
          src="/images/editorial/hero.jpg"
          alt="House of Ruturang — campaign photograph"
          width={1200}
          height={1600}
          priority
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
