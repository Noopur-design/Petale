import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({ component: ReturnsPage });

function ReturnsPage() {
  return (
    <div className="site pt-28 pb-16">
      <h1 className="display section-title">Returns</h1>
      <p className="hand text-2xl text-burgundy">Fresh flowers are a promise, not a product you can rewind.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["If it arrives damaged", "Photograph the bouquet within 3 hours and we will remake or refund."],
          ["If the feeling is off", "Tell us. We adjust the next one, or credit the studio."],
          ["Custom requests", "Once stems are cut, custom work cannot be cancelled."],
        ].map(([t, d]) => (
          <article key={t} className="card p-6">
            <h2 className="display text-2xl">{t}</h2>
            <p className="mt-2 text-sm text-ink/70">{d}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
