"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { hasKnownPrice } from "@/lib/catalogue";
import type { CartItem, Product } from "@/lib/types";

type Value = {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<Value | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem("maceys-country-bakery-cart") || "[]") as CartItem[];
        setItems(stored.filter(hasKnownPrice));
      } catch {
        setItems([]);
      } finally {
        setReady(true);
      }
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("maceys-country-bakery-cart", JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      total: items.reduce((total, item) => total + item.price_pence * item.quantity, 0),
      add: (product: Product) => {
        if (!hasKnownPrice(product)) return;
        setItems((current) =>
          current.some((item) => item.id === product.id)
            ? current.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              )
            : [
                ...current,
                {
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price_pence: product.price_pence,
                  image_url: product.image_url,
                  quantity: 1,
                },
              ],
        );
      },
      remove: (id: string) => setItems((current) => current.filter((item) => item.id !== id)),
      setQuantity: (id: string, quantity: number) =>
        setItems((current) =>
          quantity < 1
            ? current.filter((item) => item.id !== id)
            : current.map((item) =>
                item.id === id ? { ...item, quantity: Math.min(quantity, 20) } : item,
              ),
        ),
      clear: () => setItems([]),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
