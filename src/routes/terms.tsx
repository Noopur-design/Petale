import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/terms")({
  component: () => (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="display section-title">Terms</h1>
      <p className="mt-4 text-ink/70">Bouquets are made to order from a reference. Fresh flowers vary slightly with the season. Same-day slots close at 2pm.</p>
    </div>
  ),
});
