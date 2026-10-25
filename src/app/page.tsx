import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getProductImage } from "@/lib/catalogue";
import { getProducts } from "@/lib/data";

export default async function Home() {
  const products = await getProducts();
  const featured = products.filter((product) => getProductImage(product)).slice(0, 3);

  return (
    <>
      <section className="shell py-5 sm:py-8">
        <div className="relative isolate min-h-[680px] overflow-hidden border border-cocoa/10 bg-oat sm:min-h-[720px] lg:min-h-[660px]">
          <Image
            priority
            src="/images/maceys-scones-banana-bread.png"
            alt="Freshly baked scones and banana bread from Macey’s Country Bakery"
            fill
            className="object-cover object-[68%_center]"
            sizes="(max-width: 1180px) 100vw, 1180px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,237,.98)_0%,rgba(251,246,237,.92)_38%,rgba(251,246,237,.2)_68%,transparent_100%)] max-lg:bg-[linear-gradient(180deg,rgba(251,246,237,.96)_0%,rgba(251,246,237,.9)_46%,rgba(251,246,237,.15)_78%,transparent_100%)]" />
          <div className="relative z-10 flex min-h-[680px] items-start px-6 py-12 sm:min-h-[720px] sm:px-10 sm:py-16 lg:min-h-[660px] lg:items-center lg:px-16">
            <div className="max-w-xl">
              <p className="eyebrow">Small-batch bakery · Local collection</p>
              <h1 className="mt-5 font-serif text-6xl leading-[.9] tracking-[-.035em] sm:text-7xl lg:text-8xl">
                Beautiful bakes,
                <br />
                <span className="italic text-berry">made slowly.</span>
              </h1>
              <p className="mt-7 max-w-md text-base text-cocoa/75 sm:text-lg">
                Golden scones, deeply comforting banana bread and seasonal cakes—mixed, shaped and wrapped by hand.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="button" href="/shop">
                  Shop this week <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link className="button secondary bg-cream/60" href="/about">
                  Our story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-24">
        <div className="mb-10 flex items-end justify-between border-b border-cocoa/20 pb-5">
          <div>
            <p className="eyebrow">Fresh from the oven</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">This week&apos;s favourites</h2>
          </div>
          <Link className="hidden text-sm font-bold sm:block" href="/shop">
            See the full price list →
          </Link>
        </div>
        <div className="grid gap-x-7 gap-y-12 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link className="mt-10 inline-block text-sm font-bold sm:hidden" href="/shop">
          See the full price list →
        </Link>
      </section>

      <section className="shell border-y border-cocoa/20 py-16 text-center sm:py-20">
        <p className="eyebrow">A note from the kitchen</p>
        <blockquote className="mx-auto mt-5 max-w-3xl font-serif text-3xl leading-tight sm:text-5xl">
          “The best bakes feel both special and familiar—something you cannot wait to share, but secretly hope no one else notices.”
        </blockquote>
        <p className="mt-6 text-sm font-bold">— Mara, baker &amp; founder</p>
      </section>
    </>
  );
}
