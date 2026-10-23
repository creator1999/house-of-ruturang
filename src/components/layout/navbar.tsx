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
      {/* Announcement bar — brand tagline only, no unverified offers */}
      <div className="bg-primary px-4 py-2 text-center text-[11px] tracking-[0.14em] text-primary-foreground">
        Elegance in Every Shade
      </div>

      <div className="border-b border-border bg-surface/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top row — three-column grid so the wordmark stays centred no matter
              how wide the left/right icon groups are */}
          <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* Left — menu (mobile only) */}
            <div className="flex items-center justify-start">
              <Button
                variant="ghost"
                size="icon"
                className="-ml-2 size-11 lg:hidden"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="size-5" />
              </Button>
            </div>

            {/* Centre — wordmark */}
            <Link
              href="/"
              className="flex flex-col items-center justify-center text-center leading-none"
            >
              <span className="whitespace-nowrap font-heading text-lg font-semibold tracking-[0.06em] sm:text-xl lg:text-3xl lg:tracking-[0.1em]">
                <span className="lg:hidden">{site.shortName}</span>
                <span className="hidden lg:inline">{site.name}</span>
              </span>
              <span className="mt-1.5 text-[9px] uppercase tracking-[0.32em] text-gold sm:text-[10px] sm:tracking-[0.42em]">
                By Rutuja
              </span>
            </Link>

            {/* Right — search + WhatsApp + bag */}
            <div className="flex items-center justify-end gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="size-11"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="size-5" />
              </Button>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="hidden size-11 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
              >
                <WhatsAppIcon className="size-5" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open bag"
                onClick={() => setCartOpen(true)}
                className="relative size-11"
              >
                <ShoppingBag className="size-5" />
                {count > 0 && (
                  <span className="absolute right-1 top-1 flex size-4.5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-gold-foreground">
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
