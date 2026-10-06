import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/order-success")({ component: SuccessPage });

function SuccessPage() {
  const [order, setOrder] = useState<{ id: string; total: number; address?: string } | null>(null);
  useEffect(() => {
    const raw = sessionStorage.getItem("petale-order");
    if (raw) setOrder(JSON.parse(raw));
  }, []);
  return (
    <div className="relative px-4 pt-32 pb-20 text-center">
      <div className="petal-float text-6xl text-burgundy">✿</div>
      <h1 className="display section-title mt-4">Your flowers are on their way.</h1>
      <p className="hand text-3xl text-burgundy">Order {order?.id || "PET102546"}</p>
      <p className="mt-3 text-ink/70">
        Tomorrow · {order?.address || "Gurgaon, Haryana"} · ₹{(order?.total || 1499).toLocaleString("en-IN")}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/track-order" className="btn btn-dark">
          Track Order
        </Link>
        <Link to="/shop" className="btn btn-light">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
