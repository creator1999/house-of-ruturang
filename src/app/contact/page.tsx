import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { ContactForm } from "@/components/contact/contact-form";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with House of Ruturang — WhatsApp, Instagram or email.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          We&apos;d love to hear from you
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-3 text-muted-foreground">
          Questions about a saree, an order, or styling advice? Message us and
          we&apos;ll get back to you.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Contact details */}
        <div className="space-y-4">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
          >
            <WhatsAppIcon className="mt-0.5 size-5 text-gold" />
            <div>
              <p className="font-medium">WhatsApp</p>
              <p className="text-sm text-muted-foreground">{site.whatsappDisplay}</p>
            </div>
          </a>

          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
          >
            <InstagramIcon className="mt-0.5 size-5 text-gold" />
            <div>
              <p className="font-medium">Instagram</p>
              <p className="text-sm text-muted-foreground">{site.instagramHandle}</p>
            </div>
          </a>

          <a
            href={`mailto:${site.email}`}
            className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
          >
            <Mail className="mt-0.5 size-5 text-gold" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{site.email}</p>
            </div>
          </a>

          <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5">
            <Clock className="mt-0.5 size-5 text-gold" />
            <div>
              <p className="font-medium">Hours</p>
              <p className="text-sm text-muted-foreground">
                Mon–Sat, 10am–7pm IST
              </p>
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-heading text-xl font-semibold">Send a message</h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
