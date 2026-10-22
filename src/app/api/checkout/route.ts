import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";
import { toPaise } from "@/lib/format";
import {
  getRazorpay,
  getRazorpayKeyId,
  isRazorpayConfigured,
} from "@/lib/razorpay";

type CheckoutItem = { productId?: unknown; quantity?: unknown };

export async function POST(request: Request) {
  let body: { items?: CheckoutItem[] } | null = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const items = body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  // Validate every line against server-side product data and compute the
  // total on the server. We never trust a price sent by the client.
  const lines: { name: string; price: number; quantity: number }[] = [];
  let total = 0;

  for (const item of items) {
    const productId = typeof item.productId === "string" ? item.productId : "";
    const quantity = Number(item.quantity);
    const product = getProductById(productId);

    if (!product || !Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json({ error: "Invalid cart item." }, { status: 400 });
    }

    total += product.price * quantity;
    lines.push({ name: product.name, price: product.price, quantity });
  }

  const amountPaise = toPaise(total);

  // Phase 1: Razorpay TEST keys are not configured yet, so return a clear
  // signal rather than attempting (or faking) a payment.
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        amount: total,
        amountPaise,
        lines,
        message:
          "Payments are not configured yet. Add Razorpay TEST keys (see .env.example) to enable checkout.",
      },
      { status: 503 },
    );
  }

  const razorpay = getRazorpay();
  const order = await razorpay.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
    notes: { source: "rutuja-sadi" },
  });

  return NextResponse.json({
    configured: true,
    keyId: getRazorpayKeyId(),
    orderId: order.id,
    amount: amountPaise,
    currency: "INR",
    lines,
  });
}
