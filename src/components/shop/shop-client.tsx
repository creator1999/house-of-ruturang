"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductGrid } from "@/components/product/product-grid";
import { collections, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopClient({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("all");
  const [fabric, setFabric] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");

  // The catalog is statically exported, so a `?category=` deep link (from the
  // homepage / collections) can't be read server-side. Resolve it here on mount
  // so arriving at `/shop?category=festive` still opens the right edit.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category");
    if (c && collections.some((col) => col.id === c)) {
      // Sync the deep-link query into state once after mount. The page is
      // statically exported, so the server can't see `?category=`; reading it
      // here (rather than in the initial render) avoids a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategory(c);
    }
  }, []);

  const collection =
    collections.find((c) => c.id === category) ?? collections[0];

  const fabricOptions = useMemo(
    () => Array.from(new Set(products.map((p) => p.fabric))).sort(),
    [products],
  );

  const filtered = useMemo(() => {
    let result = products;

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }
    if (fabric !== "all") {
      result = result.filter((p) => p.fabric === fabric);
    }

    const sorted = [...result];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "featured":
        sorted.sort(
          (a, b) =>
            Number(b.featured ?? false) - Number(a.featured ?? false) ||
            a.price - b.price,
        );
        break;
    }
    return sorted;
  }, [products, category, fabric, sort]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          The collection
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold sm:text-5xl">
          {collection.name}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {collection.tagline}
        </p>
        <p className="mt-4 max-w-2xl rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
          Design prototype — the pieces shown here are demonstration
          placeholders while we finalise our inventory and pricing.
        </p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {collections.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              category === c.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "saree" : "sarees"}
        </p>
        <div className="flex flex-wrap gap-2">
          <Select
            value={fabric}
            onValueChange={(v) => setFabric((v as string) ?? "all")}
          >
            <SelectTrigger size="sm" className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All fabrics</SelectItem>
              {fabricOptions.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(v) => setSort((v as SortKey) ?? "featured")}
          >
            <SelectTrigger size="sm" className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
