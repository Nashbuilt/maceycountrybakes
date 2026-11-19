import type { Product } from "./types";

type CatalogueItem = Pick<Product, "slug" | "price_pence">;

const CHOCOLATE_CAKE_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1";
const SIX_SCONES_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3";
const SINGLE_SCONE_ID = "11111111-1111-1111-1111-111111111111";
const HIDDEN_CUPCAKE_IDS = new Set([
  "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2",
  "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4",
  "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5",
]);

const PRODUCT_OVERRIDES: Record<string, Partial<Product>> = {
  [CHOCOLATE_CAKE_ID]: {
    slug: "chocolate-cake",
    name: "Chocolate Cake",
    short_description: "A generous homemade chocolate cake, made for sharing.",
    description: "A generous homemade chocolate cake, made by hand and finished with chocolate.",
    price_pence: 3000,
    category: "Cakes",
    image_url: "/images/maceys-chocolate-cake.jpeg",
  },
  [SIX_SCONES_ID]: {
    slug: "classic-scones-6",
    name: "Classic Scones — 6",
    short_description: "Six tender homemade scones.",
    description: "Six classic homemade scones, baked until golden and ready for cream and jam.",
    price_pence: 1000,
    category: "Scones",
    image_url: "/images/maceys-scone-with-tea.jpeg",
  },
  [SINGLE_SCONE_ID]: {
    slug: "classic-scone",
    name: "Classic Scone — 1",
    short_description: "One tender homemade scone.",
    description: "One classic homemade scone, baked until golden and ready for cream and jam.",
    price_pence: 200,
    category: "Scones",
    image_url: "/images/maceys-scone-with-tea.jpeg",
  },
};

export function curateProduct(product: Product): Product | null {
  if (HIDDEN_CUPCAKE_IDS.has(product.id)) return null;

  const override = PRODUCT_OVERRIDES[product.id];
  const curated = override ? { ...product, ...override } : product;
  return curated.category === "Cupcakes" ? null : curated;
}

export function curateProducts(products: Product[]) {
  return products.flatMap((product) => {
    const curated = curateProduct(product);
    return curated ? [curated] : [];
  });
}

type CheckoutProduct = {
  id: string;
  slug: string;
  name: string;
  price_pence: number;
};

export function curateCheckoutProduct<T extends CheckoutProduct>(product: T): T | null {
  if (HIDDEN_CUPCAKE_IDS.has(product.id)) return null;

  const override = PRODUCT_OVERRIDES[product.id];
  if (!override) return product;

  return {
    ...product,
    slug: override.slug ?? product.slug,
    name: override.name ?? product.name,
    price_pence: override.price_pence ?? product.price_pence,
  };
}

export function hasKnownPrice(product: CatalogueItem) {
  return product.price_pence > 0;
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
  if (product.slug === "chocolate-cake") {
    return "/images/maceys-chocolate-cake.jpeg";
  }

  if (product.slug.includes("banana")) {
    return "/images/maceys-banana-bread.png";
  }

  if (product.slug.includes("scone")) {
    return "/images/maceys-scone-with-tea.jpeg";
  }

  return null;
}
