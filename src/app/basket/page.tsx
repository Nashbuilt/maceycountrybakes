"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatProductPrice } from "@/lib/catalogue";

type Slot = { id: string; starts_at: string; ends_at: string };

export default function Basket() {
  const { items, total, setQuantity, remove } = useCart();
  const [slot, setSlot] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/slots")
      .then((response) => (response.ok ? response.json() : []))
      .then(setSlots)
      .catch(() => setSlots([]));
  }, []);

  async function checkout() {
    setBusy(true);
    setError("");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
        collectionSlotId: slot,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Checkout failed");
      setBusy(false);
      return;
    }

    location.href = data.url;
  }

  return (
    <section className="shell py-16">
      <p className="eyebrow">Your order</p>
      <h1 className="mt-3 font-serif text-6xl">Your basket</h1>
      {!items.length ? (
        <div className="mt-12 border-y border-cocoa/20 py-14 text-center">
          <p className="font-serif text-3xl">Your basket is waiting.</p>
          <Link className="button mt-6" href="/shop">Browse the bakery</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {items.map((item) => (
              <article key={item.id} className="grid grid-cols-[1fr_auto] gap-5 border-t border-cocoa/20 py-5">
                <div>
                  <Link className="font-serif text-2xl" href={`/shop/${item.slug}`}>{item.name}</Link>
                  <p className="mt-1 text-sm text-cocoa/60">{formatProductPrice(item)}</p>
                </div>
                <div className="text-right">
                  <label className="text-xs font-bold">
                    Qty
                    <input
                      aria-label={`Quantity of ${item.name}`}
                      className="ml-2 w-16 border border-cocoa/25 bg-white p-2"
                      type="number"
                      min="1"
                      max="20"
                      value={item.quantity}
                      onChange={(event) => setQuantity(item.id, Number(event.target.value))}
                    />
                  </label>
                  <button className="mt-3 block text-xs underline" onClick={() => remove(item.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
          <aside className="h-fit border border-cocoa/20 bg-white/70 p-6">
            <h2 className="font-serif text-3xl">Collection</h2>
            <label className="label mt-5" htmlFor="slot">Choose a date and time</label>
            <select id="slot" className="field" value={slot} onChange={(event) => setSlot(event.target.value)} required>
              <option value="">Select a collection slot</option>
              {slots.map((collectionSlot) => (
                <option key={collectionSlot.id} value={collectionSlot.id}>
                  {new Date(collectionSlot.starts_at).toLocaleString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </option>
              ))}
            </select>
            {!slots.length && <p className="mt-2 text-xs text-cocoa/55">No collection slots are currently available.</p>}
            <div className="my-6 flex justify-between border-t border-cocoa/20 pt-5 text-xl font-bold">
              <span>Total</span>
              <span>{new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(total / 100)}</span>
            </div>
            {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
            <button className="button w-full" disabled={!slot || busy} onClick={checkout}>
              {busy ? "Opening checkout…" : "Secure checkout"}
            </button>
            <p className="mt-3 text-center text-xs text-cocoa/55">Payment handled securely by Stripe.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
