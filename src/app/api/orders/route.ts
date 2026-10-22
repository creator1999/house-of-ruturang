import { NextResponse } from "next/server";

// Phase 2 (order persistence):
//  1. The client completes a Razorpay payment and posts { orderId, paymentId,
//     signature, items, customer } here.
//  2. We verify the signature server-side with verifyPaymentSignature()
//     (src/lib/razorpay.ts) — never trusting the client that a payment
//     succeeded.
//  3. On success we insert the order + line items into Supabase via
//     getSupabaseAdminClient() (src/lib/supabase.ts).
export async function POST() {
  return NextResponse.json(
    { error: "Order persistence is not enabled yet (coming in Phase 2)." },
    { status: 501 },
  );
}
