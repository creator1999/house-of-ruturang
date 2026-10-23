import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative grid lg:min-h-[88vh] lg:grid-cols-5">
      {/* Photography — full-width on mobile, right column on desktop */}
      <div className="order-1 lg:order-2 lg:col-span-3">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full">
          <OptimizedImage
            src="/images/editorial/hero.jpg"
            alt="House of Ruturang — campaign photograph"
            width={1200}
            height={1600}
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>

      {/* Copy — below the image on mobile, left column on desktop */}
      <div className="order-2 flex items-center px-5 py-10 sm:px-10 sm:py-12 lg:order-1 lg:col-span-2 lg:px-12 lg:py-24">
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            The Art of Elegance
          </p>
          <h1 className="mt-4 font-heading text-[34px] font-semibold leading-[1.12] text-balance sm:text-5xl sm:leading-[1.08]">
            Draped in Tradition. Made for Your Moments.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            Thoughtfully curated sarees, celebrating timeless elegance and every
            shade of you.
          </p>
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 h-12 px-8 text-xs uppercase tracking-[0.15em]",
            )}
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
