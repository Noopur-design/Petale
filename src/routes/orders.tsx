import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

function OrdersPage() {
  const orders = useStore((s) => s.orders);
  const list = orders.length ? orders : [{ id: "PET102546", total: 1799, date: "12 Oct 2026", status: "Preparing flowers" }];
  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="display section-title">My Orders</h1>
      <div className="mt-8 space-y-4">
        {list.map((o) => (
          <article key={o.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:p-6">
            <img src="/bouquets/classic-red.jpg" alt="" className="h-40 w-full rounded-2xl object-cover sm:h-28 sm:w-24" />
            <div>
              <p className="display text-2xl">{o.id}</p>
              <p className="text-sm text-ink/60">
                {o.date} · {o.status} · ₹{o.total.toLocaleString("en-IN")}
              </p>
              <Link to="/track-order" className="text-sm underline">
                View order
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
