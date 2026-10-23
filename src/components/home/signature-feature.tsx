import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SignatureFeature() {
  const heading = "Tradition, Beautifully Reimagined.";

  return (
    <section>
      {/* Mobile / tablet — the landscape editorial shows in full (no side crop),
          with the headline + CTA beneath on a warm ivory block */}
      <div className="lg:hidden">
        <OptimizedImage
          src="/images/editorial/signature.jpg"
          alt="The signature edit — campaign photography"
          width={1920}
          height={1080}
          sizes="100vw"
          className="aspect-video w-full object-cover object-top"
        />
        <div className="bg-rose/50 px-6 py-12 text-center sm:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            The Signature Edit
          </p>
          <h2 className="mx-auto mt-3 max-w-md font-heading text-[28px] font-semibold leading-tight text-balance sm:text-4xl">
            {heading}
          </h2>
          <Link
            href="/collections"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 h-12 px-8 text-xs uppercase tracking-[0.15em]",
            )}
          >
            Explore the Edit
          </Link>
        </div>
      </div>

      {/* Desktop — full-bleed editorial overlay, unchanged */}
      <div className="relative hidden overflow-hidden lg:block">
        <OptimizedImage
          src="/images/editorial/signature.jpg"
          alt="The signature edit — campaign photography"
          width={1920}
          height={1080}
          className="h-[70vh] w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-center px-6 pb-16 text-center text-white">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-balance sm:text-5xl">
              {heading}
            </h2>
            <Link
              href="/collections"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-8 h-12 border-white/50 bg-transparent px-8 text-xs uppercase tracking-[0.15em] text-white hover:bg-white/10 hover:text-white",
              )}
            >
              Explore the Edit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
