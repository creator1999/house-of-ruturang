// A tiny localStorage-backed store for the cart, read via useSyncExternalStore
// so that hydration from the browser is clean (no server/client mismatch).

import { getProductById, isPurchasable, type Product } from "@/lib/products";

export type CartLine = { productId: string; quantity: number };
export type CartLineItem = CartLine & { product: Product };

const STORAGE_KEY = "rutuja-sadi:cart";
const EMPTY: CartLine[] = [];

let lines: CartLine[] =
  typeof window === "undefined" ? EMPTY : readStorage();

const listeners = new Set<() => void>();

function readStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as CartLine[];
    }
  } catch {
    // ignore malformed storage
  }
  return [];
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore write failures (private mode, quota, etc.)
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CartLine[] {
  return lines;
}

export function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

export function addItem(productId: string, quantity = 1) {
  const product = getProductById(productId);
  // Demo and sold-out products are not purchasable — guard the store too, so
  // they can never reach the bag or checkout.
  if (!product || !isPurchasable(product)) return;
  const next = lines.map((l) => ({ ...l }));
  const existing = next.find((l) => l.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    next.push({ productId, quantity });
  }
  commit(next);
}

export function removeItem(productId: string) {
  commit(lines.filter((l) => l.productId !== productId));
}

export function setQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeItem(productId);
    return;
  }
  commit(
    lines.map((l) =>
      l.productId === productId ? { ...l, quantity } : l,
    ),
  );
}

export function clearCart() {
  commit([]);
}

export function joinProducts(lines: CartLine[]): CartLineItem[] {
  return lines
    .map((l) => {
      const product = getProductById(l.productId);
      return product ? { ...l, product } : null;
    })
    .filter((x): x is CartLineItem => x !== null);
}
