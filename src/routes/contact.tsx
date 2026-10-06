import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <div className="site grid gap-10 pt-28 pb-16 md:grid-cols-2">
      <div>
        <h1 className="display section-title">Contact Us</h1>
        <p className="hand text-3xl text-burgundy">Have a bouquet in mind?</p>
        <ul className="mt-6 space-y-2 text-sm">
          <li>hello@petale.flowers</li>
          <li>+91 98100 44210</li>
          <li>Gurgaon, Haryana, India</li>
          <li>Open 8am – 8pm</li>
        </ul>
        <img src="/bouquets/pastel.jpg" alt="" className="mt-6 h-64 w-full rounded-[28px] object-cover" />
      </div>
      <form onSubmit={submit} className="card space-y-3 p-6">
        {["Name", "Email", "Subject"].map((f) => (
          <input key={f} required placeholder={f} aria-label={f} className="field" />
        ))}
        <textarea required placeholder="Message" rows={5} aria-label="Message" className="field" />
        <button className="btn btn-dark" type="submit">
          Send Message <span className="arrow">→</span>
        </button>
        {sent && <p className="hand text-xl text-burgundy">Received. We will write back.</p>}
      </form>
    </div>
  );
}
