export const FREE_SHIPPING_THRESHOLD = 1999;
export const FLAT_SHIPPING_FEE = 99;

/** Compute shipping fee in INR for a given cart subtotal. */
export function computeShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
}
