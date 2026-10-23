import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BrandStory() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
          <OptimizedImage
            src="/images/editorial/story.jpg"
            alt="The House of Ruturang — campaign photography"
            width={1200}
            height={1500}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className="lg:py-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            The House of Ruturang
          </p>
          <h2 className="mt-3 font-heading text-[28px] font-semibold leading-tight text-balance sm:text-4xl">
            Every Colour Tells a Story.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            At House of Ruturang, we believe a saree is more than an outfit. It is an
            expression of tradition, individuality, and the moments we cherish.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            From heirloom weaves to contemporary edits, each piece is chosen to
            drape with ease and to carry a little of your story with it.
          </p>
          <Link
            href="/our-story"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-6 h-11 px-8 text-xs uppercase tracking-[0.15em]",
            )}
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
