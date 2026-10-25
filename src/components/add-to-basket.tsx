"use client";

import { useState } from "react";
import { hasKnownPrice } from "@/lib/catalogue";
import type { Product } from "@/lib/types";
import { useCart } from "./cart-provider";

export function AddToBasket({ product }: { product: Product }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  const canOrder = product.is_available && product.stock > 0 && hasKnownPrice(product);

  let label = "Add to basket";
  if (!hasKnownPrice(product)) label = "Price to be confirmed";
  else if (!product.is_available || product.stock < 1) label = "Unavailable";
  else if (done) label = "Added to basket";

  return (
    <button
      disabled={!canOrder}
      className="button w-full sm:w-auto"
      onClick={() => {
        add(product);
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {label}
    </button>
  );
}
