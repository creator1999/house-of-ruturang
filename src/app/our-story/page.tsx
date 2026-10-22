import type { Metadata } from "next";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The House of Ruturang — every colour tells a story, and every saree is more than an outfit.",
};

export default function OurStoryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          The House of Ruturang
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight sm:text-5xl">
          Every Colour Tells a Story.
        </h1>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-3">
          <p>
            At House of Ruturang, we believe a saree is more than an outfit. It is an
            expression of tradition, individuality, and the moments we cherish.
          </p>
          <p>
            Our edit is built around a simple idea: that every shade carries a
            feeling, and the right saree should feel like it was made for the
            moment you&apos;re living in — a quiet celebration, a milestone, or
            simply an ordinary day worth dressing for.
          </p>
          <p>
            We keep our point of view personal and our selection considered.
            From the richness of handloom weaves to the ease of a contemporary
            drape, every piece is chosen to be worn and loved, not just admired
            from afar.
          </p>
          <p className="text-muted-foreground/80">
            <em>
              This story is a draft — it will grow as Rutuja&apos;s journey does.
            </em>
          </p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted lg:col-span-2">
          <OptimizedImage
            src="/images/editorial/story.jpg"
            alt="The House of Ruturang — campaign photography"
            width={1200}
            height={1500}
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-xs uppercase tracking-[0.15em]")}>
          Shop the Collection
        </Link>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-8 text-xs uppercase tracking-[0.15em]")}
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
