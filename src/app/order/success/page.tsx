import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Received",
  description: "Thank you for your order.",
};

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <CheckCircle2 className="size-16 text-gold" />
      <h1 className="mt-6 font-heading text-4xl font-semibold">
        Thank you for your order
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        We&apos;ve received your request. Our team will confirm your order on
        WhatsApp shortly.
      </p>

      <div className="mt-8 w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-left text-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          A note
        </p>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          This is a design prototype — no payment has been processed. Order
          confirmation and payment will be enabled once our Razorpay account is
          connected.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={whatsappLink("Hi! I'd like to know more about my order.")}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-6")}
        >
          <WhatsAppIcon className="size-4" />
          Message us
        </a>
        <Link
          href="/shop"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-6")}
        >
          Continue shopping
        </Link>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Questions? {site.whatsappDisplay} · {site.instagramHandle}
      </p>
    </div>
  );
}
