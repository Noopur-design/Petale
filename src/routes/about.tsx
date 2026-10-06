import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <div className="pt-28 pb-10">
      <section className="site grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="label">About</p>
          <h1 className="display section-title">Flowers With A Feeling</h1>
          <p className="hand text-3xl text-burgundy">You bring the inspiration. We bring it to life.</p>
          <p className="mt-4 max-w-lg text-ink/75">
            Petalé is a studio for people who fall in love with a bouquet and want it made, freshly, for someone specific. See it. Send it. We make it. We deliver it.
          </p>
        </div>
        <img src="/bouquets/installation.jpg" alt="Studio installation" className="h-72 w-full rounded-[28px] object-cover sm:h-96 md:h-[460px]" />
      </section>
      <section className="site mt-12 grid gap-4 sm:grid-cols-3">
        {[
          ["5K+", "Happy customers"],
          ["100%", "Fresh flowers"],
          ["4.8", "Customer rating"],
        ].map(([n, l]) => (
          <div key={l} className="card p-6">
            <p className="display text-5xl">{n}</p>
            <p className="text-sm text-ink/60">{l}</p>
          </div>
        ))}
      </section>
      <section className="site mt-8 grid gap-2 md:grid-cols-2">
        {[
          ["Our Story", "A reference photo, a florist, and a same-day promise."],
          ["Our Philosophy", "More than flowers. They're feelings."],
          ["Our Flowers", "Seasonal stems. Eco-friendly paper and ribbon."],
          ["Our Process", "See it. Send it. We make it. We deliver it."],
          ["Sustainability", "Paper wraps, local stems when the season allows."],
        ].map(([t, d]) => (
          <article key={t} className="border-t border-ink/10 py-6">
            <h2 className="display text-3xl">{t}</h2>
            <p className="mt-2 text-ink/70">{d}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
