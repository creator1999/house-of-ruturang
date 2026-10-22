"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { formatINR } from "@/lib/format";
import { getAllProducts } from "@/lib/products";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return getAllProducts().filter((p) =>
      [p.name, p.fabric, p.color].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <div className="mx-auto w-full max-w-2xl px-4 pt-16 sm:pt-24">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, fabrics, colours…"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground/70"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <p className="text-sm text-muted-foreground">
              Try &ldquo;maroon&rdquo;, &ldquo;emerald&rdquo; or
              &ldquo;saree&rdquo;.
            </p>
          ) : results.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No sarees match &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-primary"
                  >
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {p.fabric} · {p.color}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium">
                      {formatINR(p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
