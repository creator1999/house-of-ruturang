"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { useCart } from "@/components/cart/cart-provider";
import { formatINR } from "@/lib/format";
import { computeShipping } from "@/lib/shipping";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export function CheckoutForm() {
  const { items, subtotal } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<{
    type: "info" | "error";
    text: string;
  } | null>(null);

  const shipping = computeShipping(subtotal);
  const total = subtotal + shipping;

  const update = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      next.phone = "Enter a valid 10-digit mobile number";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Enter a valid email";
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.state.trim()) next.state = "State is required";
    if (!/^\d{6}$/.test(form.pincode.trim()))
      next.pincode = "Enter a valid 6-digit PIN code";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // WhatsApp-first fallback: this prototype has no server, so a submitted form
  // can never create an order or charge a card. We hand the details to WhatsApp
  // for the team to confirm personally.
  const orderMessage = [
    "Hi! I'd like to place an order:",
    ...items.map((l) => `• ${l.product.name} × ${l.quantity}`),
    "",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    form.email ? `Email: ${form.email}` : "",
    `Address: ${form.address}, ${form.city}, ${form.state} ${form.pincode}`,
    `Total: ${formatINR(total)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitted(false);
    if (!validate()) return;

    // Demo-only checkout: nothing is charged and no order is persisted.
    setSubmitted(true);
    setMessage({
      type: "info",
      text: "This is a demo checkout — no payment has been processed. Tap the button below to place your order on WhatsApp.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="size-14 text-muted-foreground/40" />
        <h1 className="mt-6 font-heading text-3xl font-semibold">
          Nothing to checkout yet
        </h1>
        <p className="mt-2 text-muted-foreground">
          Add a saree to your bag before checking out.
        </p>
        <Link
          href="/shop"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 px-8")}
        >
          Browse sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">
            Delivery details
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={errors.name} className="sm:col-span-2">
              <Input
                value={form.name}
                onChange={(e) => update("name")(e.target.value)}
                placeholder="Asha Sharma"
                autoComplete="name"
              />
            </Field>
            <Field label="Mobile number" error={errors.phone}>
              <Input
                value={form.phone}
                onChange={(e) => update("phone")(e.target.value)}
                placeholder="9876543210"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
              />
            </Field>
            <Field label="Email (optional)" error={errors.email}>
              <Input
                value={form.email}
                onChange={(e) => update("email")(e.target.value)}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
              />
            </Field>
            <Field label="Address" error={errors.address} className="sm:col-span-2">
              <Input
                value={form.address}
                onChange={(e) => update("address")(e.target.value)}
                placeholder="Flat, street, area"
                autoComplete="street-address"
              />
            </Field>
            <Field label="City" error={errors.city}>
              <Input
                value={form.city}
                onChange={(e) => update("city")(e.target.value)}
                placeholder="Mumbai"
                autoComplete="address-level2"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="State" error={errors.state}>
                <Input
                  value={form.state}
                  onChange={(e) => update("state")(e.target.value)}
                  placeholder="Maharashtra"
                  autoComplete="address-level1"
                />
              </Field>
              <Field label="PIN code" error={errors.pincode}>
                <Input
                  value={form.pincode}
                  onChange={(e) => update("pincode")(e.target.value)}
                  placeholder="400001"
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="postal-code"
                />
              </Field>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Payment</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Online payment is not enabled in this prototype yet. No charge will
            be made — after you continue, you&apos;ll confirm your order with us
            on WhatsApp.
          </p>
        </section>

        {message && (
          <div
            className={cn(
              "rounded-lg border px-4 py-3 text-sm",
              message.type === "error"
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-gold/40 bg-gold/10 text-gold-foreground",
            )}
          >
            {message.text}
          </div>
        )}

        {submitted && (
          <a
            href={whatsappLink(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full gap-2 text-base",
            )}
          >
            <WhatsAppIcon className="size-4" />
            Confirm order on WhatsApp
          </a>
        )}

        <Button type="submit" size="lg" className="h-12 w-full text-base">
          Continue
        </Button>
      </form>

      {/* Summary */}
      <aside className="h-fit rounded-xl border border-border bg-card p-6">
        <h2 className="font-heading text-xl font-semibold">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((l) => (
            <li key={l.productId} className="flex justify-between gap-3">
              <span className="text-muted-foreground">
                {l.product.name}
                <span className="text-xs"> × {l.quantity}</span>
              </span>
              <span className="shrink-0 font-medium">
                {formatINR(l.product.price * l.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
