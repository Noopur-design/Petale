import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/faq")({ component: FAQPage });

const faqs = [
  ["Orders", "How do custom requests work?", "Send a reference. A florist confirms stems, wrap and price before we make it."],
  ["Delivery", "Do you deliver same day?", "Yes, in selected cities, for orders placed before 2pm."],
  ["Flowers", "Are the flowers fresh?", "Every bouquet is made to order. Reference photos are inspiration, not silk replicas."],
  ["Payments", "Which payments do you take?", "UPI, cards and cash on delivery."],
  ["Returns", "Can I return flowers?", "If a bouquet arrives damaged, tell us within 3 hours with a photo."],
  ["Custom Bouquets", "Can I change the colour?", "Yes. Colour, size, wrap and card note are part of the builder."],
];

function FAQPage() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="display section-title">FAQ</h1>
      <div className="mt-8 divide-y border-y border-ink/10">
        {faqs.map(([cat, q, a], i) => {
          const on = open === i;
          return (
            <div key={q}>
              <button type="button" className="flex w-full items-start justify-between gap-4 py-4 text-left" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}>
                <span>
                  <span className="label">{cat}</span>
                  <span className="display block text-2xl">{q}</span>
                </span>
                <motion.span aria-hidden animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.3 }} className="mt-5 inline-block text-2xl leading-none">
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pb-5 text-ink/70">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}