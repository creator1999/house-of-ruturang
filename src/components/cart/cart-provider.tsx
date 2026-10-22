"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  addItem,
  clearCart,
  getServerSnapshot,
  getSnapshot,
  joinProducts,
  removeItem,
  setQuantity,
  subscribe,
  type CartLine,
  type CartLineItem,
} from "@/components/cart/cart-store";

type CartContextValue = {
  lines: CartLine[];
  /** Flattened, product-joined lines. */
  items: CartLineItem[];
  count: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<CartContextValue>(() => {
    const items = joinProducts(lines);
    const count = items.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = items.reduce(
      (sum, l) => sum + l.product.price * l.quantity,
      0,
    );
    return {
      lines,
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clear: clearCart,
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
