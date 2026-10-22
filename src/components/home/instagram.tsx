import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { InstagramIcon } from "@/components/icons";
import { site } from "@/lib/site";

const shots = [
  "/images/products/banarasi-maroon-1.jpg",
  "/images/products/kanjivaram-emerald-2.jpg",
  "/images/products/chanderi-blush-1.jpg",
  "/images/products/georgette-sapphire-1.jpg",
  "/images/products/handloom-indigo-1.jpg",
  "/images/products/banarasi-rose-gold-3.jpg",
];

export function InstagramFeed() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Follow Our Journey
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
          Behind the weave
        </h2>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <InstagramIcon className="size-4" />
          {site.instagramHandle}
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {shots.map((src, i) => (
          <Link
            key={src}
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-sm"
            aria-label={`View our Instagram, post ${i + 1}`}
          >
            <OptimizedImage
              src={src}
              alt=""
              width={400}
              height={400}
              sizes="(max-width: 640px) 33vw, 16vw"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
