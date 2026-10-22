import Link from "next/link";
import { CurrentYear } from "@/components/layout/current-year";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];

const policyLinks = [
  { label: "Shipping & Delivery", href: "/policies/shipping" },
  { label: "Returns & Exchanges", href: "/policies/returns" },
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Service", href: "/policies/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex flex-col leading-none">
            <span className="font-heading text-xl font-semibold tracking-[0.1em] sm:text-2xl">
              {site.name}
            </span>
            <span className="mt-1.5 text-[9px] uppercase tracking-[0.42em] text-gold">
              By Rutuja
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline}. {site.description}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Customer care
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <WhatsAppIcon className="size-4" />
                {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <InstagramIcon className="size-4" />
                {site.instagramHandle}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <p>Handcrafted in India · Prices in INR</p>
        </div>
      </div>
    </footer>
  );
}
