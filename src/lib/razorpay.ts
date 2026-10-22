import Razorpay from "razorpay";
import { createHmac, timingSafeEqual } from "node:crypto";

// Server-only Razorpay helpers. These read secret keys from the environment
// and must never be imported by client components.

let instance: Razorpay | null = null;

export function isRazorpayConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET,
  );
}

/** The publishable key id — safe to send to the client (NEXT_PUBLIC_ prefix). */
export function getRazorpayKeyId(): string {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
}

export function getRazorpay(): Razorpay {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay is not configured. Set NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (see .env.example).",
    );
  }
  if (!instance) {
    instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }
  return instance;
}

/**
 * Verify a Razorpay payment signature server-side. This is the only way to
 * confirm a payment actually succeeded — the client is never trusted.
 * Used in Phase 2, after the checkout SDK reports a successful payment.
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret || !signature) return false;
  const generated = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  try {
    return timingSafeEqual(Buffer.from(generated), Buffer.from(signature));
  } catch {
    return false;
  }
}
