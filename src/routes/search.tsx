import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/search")({ component: SearchPage });

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => products.filter((p) => (p.name + p.description).toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="display section-title">Search</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search bouquets" className="field mt-6 text-xl" aria-label="Search bouquets" />
      <p className="label mt-4">Popular · roses, birthday, sunflower</p>
      <div className="mt-6 space-y-3">
        {results.map((p) => (
          <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="flex items-center gap-3">
            <img src={p.image} alt="" className="h-20 w-16 rounded-xl object-cover" />
            <span className="display text-2xl">{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
