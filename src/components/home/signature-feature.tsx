import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SignatureFeature() {
  return (
    <section className="relative overflow-hidden">
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
            Tradition, Beautifully Reimagined.
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
    </section>
  );
}
