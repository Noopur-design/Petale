import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/privacy")({
  component: () => (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="display section-title">Privacy</h1>
      <p className="mt-4 text-ink/70">We keep your name, delivery address and bouquet notes only to make and deliver the order. We do not sell them.</p>
    </div>
  ),
});
