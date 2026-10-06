import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProduct, related, formatPrice, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [img, setImg] = useState(product.image);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const add = useStore((s) => s.addToCart);
  const view = useStore((s) => s.view);
  const recent = useStore((s) => s.recent);
  const extra = size === "Deluxe" ? 400 : size === "Premium" ? 900 : 0;

  useEffect(() => {
    setImg(product.image);
    setSize(product.sizes[0]);
    view(product.slug);
  }, [product.slug, product.image, product.sizes, view]);

  return (
    <div className="site pt-28 pb-16">
      <p className="text-xs tracking-[0.16em] break-words text-ink/50 uppercase">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <img src={img} alt={product.name} className="aspect-[4/5] w-full rounded-[28px] bg-beige object-cover sm:aspect-auto sm:h-[420px] lg:h-[520px]" />
          <div className="mt-3 flex gap-2">
            {product.images.map((src) => (
              <button type="button" key={src} onClick={() => setImg(src)} className={`h-24 w-20 overflow-hidden rounded-xl border ${img === src ? "border-burgundy" : "border-transparent"}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="label">{product.collection}</p>
          <h1 className="display section-title mt-2">{product.name}</h1>
          <p className="mt-2 text-gold">
            ★★★★★ <span className="text-sm text-ink/50">{product.reviews} reviews</span>
          </p>
          <p className="display mt-4 text-3xl">{formatPrice(product.price + extra)}</p>
          <p className="mt-4 max-w-lg text-ink/75">{product.description}</p>
          <p className="label mt-6">Size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button type="button" key={s} onClick={() => setSize(s)} className={`min-h-11 rounded-full border px-4 ${size === s ? "bg-ink text-paper" : ""}`}>
                {s}
              </button>
            ))}
          </div>
          <label className="mt-5 block text-sm">
            Personal message
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="field mt-2" placeholder="A line only they should read." />
          </label>
          <div className="mt-4 flex items-center gap-3">
            <button type="button" className="h-11 w-11 rounded-full border" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
            <span>{qty}</span>
            <button type="button" className="h-11 w-11 rounded-full border" onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn btn-dark" onClick={() => add({ slug: product.slug, name: product.name, price: product.price + extra, image: product.image, size, message, qty })}>
              Add to Cart
            </button>
            <Link to="/checkout" className="btn btn-light" onClick={() => add({ slug: product.slug, name: product.name, price: product.price + extra, image: product.image, size, message, qty })}>
              Buy Now
            </Link>
          </div>
          <ul className="mt-6 space-y-1 text-sm text-ink/70">
            <li>Same day delivery in selected cities</li>
            <li>Fresh & premium flowers</li>
            <li>Secure payments</li>
          </ul>
        </div>
      </div>
      <h2 className="display mt-16 text-4xl">You May Also Like</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {related(product.slug).map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {recent.filter((s) => s !== product.slug).length > 0 && (
        <>
          <h2 className="display mt-12 text-4xl">Recently Viewed</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {recent
              .filter((s) => s !== product.slug)
              .map((s) => getProduct(s) || products.find((p) => p.slug === s))
              .filter(Boolean)
              .map((p) => (
                <ProductCard key={p!.slug} product={p!} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
