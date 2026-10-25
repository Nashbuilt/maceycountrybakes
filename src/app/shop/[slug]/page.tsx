import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToBasket } from "@/components/add-to-basket";
import { formatProductPrice, getProductImage } from "@/lib/catalogue";
import { getProduct, getProducts } from "@/lib/data";

export async function generateStaticParams() {
  return (await getProducts()).map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const image = getProductImage(product);
  const available = product.is_available && product.stock > 0;
  const related = (await getProducts()).filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <>
      <section className={`shell grid gap-10 py-12 lg:py-20 ${image ? "lg:grid-cols-[1.05fr_.95fr]" : "max-w-4xl"}`}>
        {image && (
          <Image
            src={image}
            alt={product.name}
            width={1100}
            height={1350}
            priority
            className="aspect-[4/5] w-full object-cover"
          />
        )}
        <div className="flex flex-col justify-center lg:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">{product.category}</p>
            <span className="text-[.65rem] font-bold uppercase tracking-[.13em] text-cocoa/55">
              <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${available ? "bg-sage" : "bg-berry"}`} />
              {available ? "Available" : "Unavailable"}
            </span>
          </div>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-none sm:text-6xl">{product.name}</h1>
          <p className="mt-5 text-2xl font-semibold">{formatProductPrice(product)}</p>
          <p className="mt-7 max-w-xl text-lg text-cocoa/70">{product.description}</p>
          <div className="my-8 border-y border-cocoa/20 py-4 text-sm">
            <strong>Allergens:</strong> {product.allergens.join(", ")}. Made in a kitchen that handles nuts, peanuts and sesame.
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <AddToBasket product={product} />
            <span className="text-sm text-cocoa/60">
              {available ? `${product.stock} available` : "Currently unavailable"}
            </span>
          </div>
        </div>
      </section>

      <section className="shell border-t border-cocoa/20 pt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-4xl">You may also love</h2>
          <Link href="/shop" className="text-sm font-bold">Full price list →</Link>
        </div>
        <ul className="mt-7 grid border-b border-cocoa/20 sm:grid-cols-2">
          {related.map((item) => (
            <li key={item.id} className="border-t border-cocoa/20 sm:odd:border-r">
              <Link href={`/shop/${item.slug}`} className="flex items-center justify-between gap-5 px-1 py-5 sm:px-5">
                <span className="font-serif text-xl">{item.name}</span>
                <span className="whitespace-nowrap text-sm font-semibold">{formatProductPrice(item)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
