const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Format a rupee amount, e.g. 12500 -> ₹12,500 */
export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

/** Convert rupees to paise (integer subunits) for Razorpay. */
export function toPaise(rupees: number): number {
  return Math.round(rupees * 100);
}
