import { createFileRoute, Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const cart = useStore((s) => s.cart);
  const setQty = useStore((s) => s.setQty);
  const remove = useStore((s) => s.removeFromCart);
  const toggle = useStore((s) => s.toggleWish);
  const sub = cart.reduce((n, i) => n + i.price * i.qty, 0);
  const delivery = sub > 2000 || sub === 0 ? 0 : 149;
  return (
    <div className="site grid gap-8 pt-28 pb-16 lg:grid-cols-[1.3fr_0.7fr]">
      <div>
        <h1 className="display section-title">Your Flowers</h1>
        <p className="hand text-2xl text-burgundy">You can still add a personal message.</p>
        <div className="mt-8 space-y-4">
          {cart.length === 0 && (
            <p>
              Nothing here yet. <Link to="/shop" className="underline">Browse inspirations</Link>
            </p>
          )}
          {cart.map((item) => (
            <div key={item.slug + item.size} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
              <img src={item.image} alt="" className="h-44 w-full rounded-2xl object-cover sm:h-32 sm:w-28" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="display text-2xl">{item.name}</p>
                  <p className="shrink-0 text-sm">{formatPrice(item.price * item.qty)}</p>
                </div>
                <p className="text-sm text-ink/50">{item.size}</p>
                {item.message && <p className="hand text-lg">{item.message}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" className="h-11 w-11 rounded-full border" onClick={() => setQty(item.slug, item.size, item.qty - 1)}>-</button>
                  <span className="grid place-items-center">{item.qty}</span>
                  <button type="button" className="h-11 w-11 rounded-full border" onClick={() => setQty(item.slug, item.size, item.qty + 1)}>+</button>
                  <button type="button" className="text-xs underline" onClick={() => remove(item.slug, item.size)}>Remove</button>
                  <button type="button" className="text-xs underline" onClick={() => toggle(item.slug)}>Wishlist</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="card h-fit p-6">
        <p className="display text-3xl">Summary</p>
        <Row k="Subtotal" v={formatPrice(sub)} />
        <Row k="Delivery" v={delivery ? formatPrice(delivery) : "Complimentary"} />
        <Row k="Discount" v="—" />
        <Row k="Total" v={formatPrice(sub + delivery)} />
        <Link to="/checkout" className="btn btn-dark mt-6 w-full">
          Proceed to Checkout <span className="arrow">→</span>
        </Link>
      </aside>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-ink/5 py-2 text-sm">
      <span>{k}</span>
      <span>{v}</span>
    </div>
  );
}
