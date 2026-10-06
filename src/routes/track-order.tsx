import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/track-order")({ component: TrackPage });

const steps = ["Order Placed", "Preparing Flowers", "Out for Delivery", "Delivered"];

function TrackPage() {
  const [found, setFound] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault();
    setFound(true);
  }
  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="display section-title">Track Request</h1>
      <p className="hand text-2xl text-burgundy">We will tell you where the feeling is.</p>
      <form onSubmit={submit} className="mt-8 grid gap-3">
        <input required placeholder="Order number" aria-label="Order number" className="field" />
        <input required placeholder="Phone or email" aria-label="Phone or email" className="field" />
        <button className="btn btn-dark" type="submit">
          Track My Order
        </button>
      </form>
      {found && (
        <ol className="relative mt-10 space-y-6 border-l border-burgundy/40 pl-6">
          {steps.map((s, i) => (
            <li key={s} className={i < 2 ? "reveal" : "text-ink/40"} style={{ animationDelay: `${i * 120}ms` }}>
              {s}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
