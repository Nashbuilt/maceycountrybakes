import type { Product } from "./types";

type CatalogueItem = Pick<Product, "slug" | "price_pence">;

const PRICE_TO_BE_CONFIRMED = new Set(["classic-buttermilk-scones"]);

export function hasKnownPrice(product: CatalogueItem) {
  return product.price_pence > 0 && !PRICE_TO_BE_CONFIRMED.has(product.slug);
}

export function formatProductPrice(product: CatalogueItem) {
  return hasKnownPrice(product)
    ? new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(product.price_pence / 100)
    : "£---";
}

export function getProductImage(product: Pick<Product, "slug">): string | null {
  if (product.slug === "macey-country-treat-box") {
    return "/images/maceys-scones-banana-bread.png";
  }

  if (product.slug.includes("banana")) {
    return "/images/maceys-banana-bread.png";
  }

  if (product.slug.includes("scone")) {
    return "/images/maceys-packaged-scones.png";
  }

  return null;
}
