"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Banknote, Truck, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ImageViewer } from "@/components/product/image-viewer";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppIcon } from "@/components/icons";
import { useCart } from "@/components/cart/cart-provider";
import { formatINR } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import {
  availabilityLabel,
  categoryLabel,
  type Product,
} from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  const soldOut = product.availability === "sold-out";
  const demo = product.availability === "demo";
  const unavailable = soldOut || demo;

  const handleBuyNow = () => {
    addItem(product.id, quantity);
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="truncate text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="flex gap-4">
            <div className="hidden flex-col gap-3 lg:flex">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "relative aspect-[3/4] w-16 overflow-hidden rounded-sm bg-muted ring-1",
                    i === activeIndex ? "ring-primary" : "ring-transparent",
                  )}
                >
                  <OptimizedImage
                    src={img}
                    alt=""
                    width={96}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => setViewerOpen(true)}
              aria-label="Open full-screen viewer"
              className="relative aspect-[3/4] flex-1 overflow-hidden rounded-sm bg-muted"
            >
              <OptimizedImage
                src={product.images[activeIndex]}
                alt={product.name}
                width={900}
                height={1200}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-surface/90 text-primary shadow-sm">
                <ZoomIn className="size-4" />
              </span>
            </button>
          </div>

          <div className="mt-3 flex gap-3 lg:hidden">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "aspect-[3/4] w-16 overflow-hidden rounded-sm bg-muted ring-1",
                  i === activeIndex ? "ring-primary" : "ring-transparent",
                )}
              >
                <OptimizedImage
                  src={img}
                  alt=""
                  width={96}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">
              {product.fabric}
            </p>
            <h1 className="font-heading text-3xl font-semibold leading-tight sm:text-4xl">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span>{product.color}</span>
              <span aria-hidden>·</span>
              <span>{categoryLabel[product.category]}</span>
              <span aria-hidden>·</span>
              <span
                className={
                  soldOut
                    ? "font-medium text-destructive"
                    : demo
                      ? "font-medium text-gold"
                      : "font-medium text-primary"
                }
              >
                {availabilityLabel[product.availability]}
              </span>
            </div>
          </div>

          <p className="font-heading text-3xl font-semibold">
            {formatINR(product.price)}
          </p>

          <p className="leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-muted-foreground">Colour:</span>
            <span className="font-medium">{product.color}</span>
            <span className="mx-1 text-muted-foreground" aria-hidden>·</span>
            <span className="text-muted-foreground">Fabric:</span>
            <span className="font-medium">{product.fabric}</span>
          </div>

          <Separator />

          <div className="flex flex-wrap items-center gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <AddToCartButton
              productId={product.id}
              quantity={quantity}
              disabled={unavailable}
              className="h-11 flex-1 sm:flex-none sm:px-8"
            >
              Add to bag
            </AddToCartButton>
            <Button
              onClick={handleBuyNow}
              disabled={unavailable}
              variant="secondary"
              className="h-11 flex-1 sm:flex-none sm:px-8"
            >
              Buy now
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-3">
              <Truck className="size-5 text-gold" />
              <span>Free shipping over ₹1,999</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-3">
              <Banknote className="size-5 text-gold" />
              <span>Cash on delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-3">
              <WhatsAppIcon className="size-5 text-gold" />
              <a
                href={whatsappLink(`Hi! I'd like to know more about the ${product.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                WhatsApp us
              </a>
            </div>
          </div>

          <Accordion>
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{product.description}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Fabric &amp; care</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  {product.fabric}. Dry clean recommended for silk and organza;
                  gentle hand wash in cold water for cotton and chiffon. Store
                  folded in muslin cloth and air out occasionally. Includes a
                  running blouse piece unless stated otherwise.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping &amp; returns</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Dispatched within 2–3 business days. Free shipping across
                  India on orders over ₹1,999, otherwise a flat ₹99 fee. See our{" "}
                  <Link
                    href="/policies/shipping"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    shipping
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/policies/returns"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    returns
                  </Link>{" "}
                  pages for full details.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-heading text-2xl font-semibold sm:text-3xl">
            You may also like
          </h2>
          <ProductGrid products={related} />
        </section>
      )}

      {viewerOpen && (
        <ImageViewer
          images={product.images}
          alt={product.name}
          startIndex={activeIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}
