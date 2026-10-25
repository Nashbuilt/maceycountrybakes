import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatProductPrice } from "@/lib/catalogue";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";

export const metadata = { title: "Shop" };

function PriceListItem({ product }: { product: Product }) {
  const available = product.is_available && product.stock > 0;

  return (
    <li>
      <Link
        href={`/shop/${product.slug}`}
        className="group grid gap-3 border-t border-cocoa/20 py-5 transition-colors hover:bg-white/45 sm:grid-cols-[minmax(0,1fr)_7rem_1.25rem] sm:items-center sm:px-3"
      >
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-serif text-2xl leading-tight sm:text-[1.7rem]">{product.name}</h3>
            <span className="whitespace-nowrap text-[.65rem] font-bold uppercase tracking-[.13em] text-cocoa/55">
              <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${available ? "bg-sage" : "bg-berry"}`} />
              {available ? "Available" : "Unavailable"}
            </span>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-cocoa/65">{product.short_description}</p>
        </div>
        <p className="text-lg font-semibold sm:text-right">{formatProductPrice(product)}</p>
        <ArrowUpRight className="hidden h-4 w-4 text-berry transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" aria-hidden="true" />
      </Link>
    </li>
  );
}

export default async function Shop() {
  const products = await getProducts();
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <section className="shell py-10 sm:py-16">
      <div className="grid items-end gap-8 border-b border-cocoa/20 pb-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">Made for this week</p>
          <h1 className="mt-3 max-w-xl font-serif text-6xl leading-[.95] sm:text-7xl">The bakery counter</h1>
        </div>
        <p className="max-w-2xl text-cocoa/65 lg:justify-self-end">
          Everything is made in small batches. Choose your collection time in the basket; availability is checked again before payment.
        </p>
      </div>

      <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-oat sm:aspect-[16/7]">
        <Image
          priority
          src="/images/maceys-scones-banana-bread.png"
          alt="A selection of Macey’s freshly baked scones and banana bread"
          fill
          className="object-cover object-[68%_center]"
          sizes="(max-width: 1180px) 100vw, 1180px"
        />
      </div>

      <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
        {categories.map((category) => {
          const categoryProducts = products.filter((product) => product.category === category);

          return (
            <section key={category} className="pb-14 sm:pb-16">
              <div className="mb-4 flex items-baseline justify-between gap-5">
                <h2 className="font-serif text-3xl sm:text-4xl">{category}</h2>
                <span className="text-xs font-bold uppercase tracking-[.16em] text-cocoa/45">
                  {categoryProducts.length} {categoryProducts.length === 1 ? "item" : "items"}
                </span>
              </div>
              <ul className="border-b border-cocoa/20">
                {categoryProducts.map((product) => (
                  <PriceListItem key={product.id} product={product} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="grid gap-3 border-t border-cocoa/20 pt-12 sm:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-oat">
          <Image
            src="/images/maceys-banana-bread.png"
            alt="Golden homemade banana bread, sliced and ready to serve"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-oat">
          <Image
            src="/images/maceys-packaged-scones.png"
            alt="Handmade scones individually wrapped in bakery bags"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
