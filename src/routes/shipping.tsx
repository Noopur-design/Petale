import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({ component: ShippingPage });

const items = [
  ["Same-day delivery", "Orders before 2pm in selected cities leave the studio the same afternoon."],
  ["Scheduled delivery", "Choose a date and a morning, afternoon or evening window."],
  ["Delivery zones", "Gurgaon, Delhi NCR and nearby. We confirm before charging."],
  ["Delivery timings", "Morning, afternoon and evening slots."],
  ["Packaging", "Paper, ribbon and a card. Eco-friendly, no unnecessary plastic."],
  ["Tracking", "A request number follows the bouquet from studio to door."],
];

function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="display section-title">Shipping & Delivery</h1>
      <ol className="mt-8 space-y-6 border-l border-burgundy/30 pl-6">
        {items.map(([t, d]) => (
          <li key={t}>
            <p className="display text-2xl">{t}</p>
            <p className="text-ink/70">{d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
