import { createFileRoute, Link } from "@tanstack/react-router";
import { occasions } from "@/lib/products";

export const Route = createFileRoute("/occasions/")({ component: OccasionsPage });

function OccasionsPage() {
  return (
    <div className="site pt-28 pb-16">
      <p className="label">Occasions</p>
      <h1 className="section-title max-w-[16em] text-balance">A bouquet for every beautiful moment.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {occasions.map((o, i) => (
          <Link key={o.slug} to="/occasions/$kind" params={{ kind: o.slug }} className={`card grid overflow-hidden ${i % 2 ? "md:grid-cols-[1fr_1.1fr]" : "md:grid-cols-[1.1fr_1fr]"}`}>
            <img src={o.image} alt="" className={`h-64 w-full object-cover md:h-80 ${i % 2 ? "md:order-2" : ""}`} />
            <div className="flex flex-col justify-end p-6">
              <p className="display text-4xl">{o.name}</p>
              <p className="hand text-2xl text-burgundy">{o.line}</p>
              <p className="mt-2 text-sm text-ink/60">{o.note}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
