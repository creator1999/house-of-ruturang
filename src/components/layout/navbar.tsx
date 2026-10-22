"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart/cart-sheet";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { WhatsAppIcon } from "@/components/icons";
import { useCart } from "@/components/cart/cart-provider";
import { site, whatsappLink } from "@/lib/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement bar */}
      <div className="bg-primary px-4 py-2 text-center text-[11px] tracking-wide text-primary-foreground">
        Complimentary shipping across India on orders over ₹1,999
      </div>

      <div className="border-b border-border bg-surface/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top row */}
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center">
              <Button
                variant="ghost"
                size="icon"
                className="-ml-2 lg:hidden"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu />
              </Button>
            </div>

            <Link
              href="/"
              className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center leading-none"
            >
              <span className="font-heading text-xl font-semibold tracking-[0.1em] sm:text-2xl lg:text-3xl">
                {site.name}
              </span>
              <span className="mt-1.5 text-[9px] uppercase tracking-[0.42em] text-gold">
                By Rutuja
              </span>
            </Link>

            <div className="flex flex-1 items-center justify-end gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search />
              </Button>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="hidden size-8 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
              >
                <WhatsAppIcon className="size-5" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open bag"
                onClick={() => setCartOpen(true)}
                className="relative"
              >
                <ShoppingBag />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-gold-foreground">
                    {count}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center justify-center gap-8 pb-3 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b px-5 py-4">
            <SheetTitle className="flex flex-col leading-none">
              <span className="font-heading text-xl font-semibold tracking-[0.1em]">
                {site.name}
              </span>
              <span className="mt-1.5 text-[9px] uppercase tracking-[0.42em] text-gold">
                By Rutuja
              </span>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-border p-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <WhatsAppIcon className="size-4" />
              {site.whatsappDisplay}
            </a>
          </div>
        </SheetContent>
      </Sheet>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
