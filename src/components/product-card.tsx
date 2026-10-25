import Image from "next/image";
import Link from "next/link";
import { formatProductPrice, getProductImage } from "@/lib/catalogue";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = getProductImage(product);
  const available = product.is_available && product.stock > 0;

  return (
    <article className="group">
      {image && (
        <Link href={`/shop/${product.slug}`} className="block overflow-hidden bg-oat">
          <Image
            src={image}
            alt={product.name}
            width={800}
            height={1000}
            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.015]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      )}
      <div className="border-b border-cocoa/20 py-5">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">{product.category}</p>
          <p className="text-xs font-semibold text-cocoa/55">
            <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${available ? "bg-sage" : "bg-berry"}`} />
            {available ? "Available" : "Unavailable"}
          </p>
        </div>
        <div className="mt-2 flex items-start justify-between gap-5">
          <div>
            <h3 className="font-serif text-2xl leading-tight">
              <Link href={`/shop/${product.slug}`}>{product.name}</Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cocoa/65">{product.short_description}</p>
          </div>
          <p className="whitespace-nowrap text-sm font-semibold">{formatProductPrice(product)}</p>
        </div>
      </div>
    </article>
  );
}
