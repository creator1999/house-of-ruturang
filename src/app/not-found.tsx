import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold-foreground">
        Error 404
      </p>
      <h1 className="mt-4 font-heading text-5xl font-semibold">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 px-8")}
      >
        Back to home
      </Link>
    </div>
  );
}
