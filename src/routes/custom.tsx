import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/custom")({ component: CustomPage });

const steps = ["Flowers", "Color", "Style", "Wrapping", "Message", "Preview"];

const flowers = [
  { name: "Rose", image: "/bouquets/blush.jpg", note: "Soft, classic" },
  { name: "Tulip", image: "/bouquets/tulip-bag.jpg", note: "Clean stems" },
  { name: "Sunflower", image: "/bouquets/sunflower-smile.jpg", note: "Bright gold" },
  { name: "Daisy", image: "/bouquets/graduation.jpg", note: "Light & airy" },
  { name: "Lily", image: "/bouquets/elegant-romance.jpg", note: "Sculptural" },
  { name: "Baby's Breath", image: "/bouquets/classic-red.jpg", note: "A white cloud" },
];

const colors = [
  { name: "Pink", swatch: "#e8c9c5" },
  { name: "Red", swatch: "#8d2f39" },
  { name: "White", swatch: "#f7f1ea" },
  { name: "Yellow", swatch: "#e4c15c" },
  { name: "Purple", swatch: "#6d4c7d" },
  { name: "Blue", swatch: "#6f8fbf" },
  { name: "Mixed", swatch: "linear-gradient(135deg,#e8c9c5,#e4c15c 50%,#6f8fbf)" },
];

const styles = [
  { name: "Minimal", note: "A few perfect stems." },
  { name: "Romantic", note: "Full, soft, a little undone." },
  { name: "Wild", note: "Garden-picked, loose." },
  { name: "Luxury", note: "Dense, ribboned, grand." },
  { name: "Pastel", note: "Blush, cream, and air." },
];

const wraps = [
  { name: "Cream", image: "/bouquets/pastel.jpg" },
  { name: "Newspaper", image: "/bouquets/classic-red.jpg" },
  { name: "Black", image: "/bouquets/graduation.jpg" },
  { name: "Pink", image: "/bouquets/blush.jpg" },
  { name: "Sage", image: "/bouquets/turtle.jpg" },
];

function CustomPage() {
  const [step, setStep] = useState(0);
  const [flower, setFlower] = useState(flowers[0]);
  const [color, setColor] = useState(colors[0]);
  const [style, setStyle] = useState(styles[1]);
  const [wrap, setWrap] = useState(wraps[0]);
  const [message, setMessage] = useState("");
  const add = useStore((s) => s.addToCart);
  const navigate = useNavigate();
  const price = useMemo(() => 1299 + (style.name === "Luxury" ? 700 : 200) + (flower.name === "Lily" ? 200 : 0), [style, flower]);
  const preview = step >= 3 ? wrap.image : flower.image;

  return (
    <div className="site grid gap-6 pt-28 pb-16 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="min-w-0">
        <p className="label">Create</p>
        <h1 className="display section-title">Your Idea. Our Flowers.</h1>
        <div className="mt-6 flex gap-2 overflow-x-auto hide-scroll pb-1">
          {steps.map((s, i) => (
            <button type="button" key={s} onClick={() => setStep(i)} className={`shrink-0 rounded-full px-3 py-2 text-[11px] tracking-widest uppercase ${i === step ? "bg-ink text-paper" : "border bg-paper/80"}`}>
              {i + 1} {s}
            </button>
          ))}
        </div>
        <div className="card relative mt-6 overflow-hidden p-4 sm:p-6">
          <img src={preview} alt="" aria-hidden className="pointer-events-none absolute -right-16 -bottom-24 h-72 w-72 max-w-none rounded-full object-cover opacity-50 sm:h-96 sm:w-96" style={{ filter: "blur(22px)" }} />
          <svg aria-hidden className="pointer-events-none absolute top-3 right-3 h-20 w-20 text-burgundy/25" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.1">
            <path d="M40 72V34" />
            <path d="M40 46c-12 3-20-6-16-18 12 2 16 9 16 18z" />
            <path d="M40 42c12 2 20-8 15-20-12 3-15 11-15 20z" />
            <circle cx="40" cy="26" r="5" />
            <path d="M18 22c6 2 8 8 6 12M62 18c-4 4-4 10 0 14" />
          </svg>
          <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {step === 0 && (
                <Picker title="Choose flowers" hint="Tap a bloom. We’ll build around it.">
                  <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                    <div className="relative min-h-52 overflow-hidden rounded-3xl">
                      <img src={flower.image} alt={flower.name} className="h-56 w-full object-cover sm:h-72" />
                      <p className="hand absolute bottom-4 left-4 rounded-full bg-paper/90 px-4 py-1 text-2xl text-burgundy">{flower.note}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 content-start">
                      {flowers.map((f) => (
                        <button type="button" key={f.name} onClick={() => setFlower(f)} className={`overflow-hidden rounded-2xl border bg-paper text-left ${flower.name === f.name ? "border-burgundy ring-2 ring-burgundy" : "border-ink/10"}`}>
                          <img src={f.image} alt="" className="h-16 w-full object-cover sm:h-20" />
                          <span className="block px-2 py-2 text-sm">{f.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Picker>
              )}
              {step === 1 && (
                <Picker title="Choose colour" hint="The feeling, not just the shade.">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {colors.map((c) => (
                      <button type="button" key={c.name} onClick={() => setColor(c)} className={`flex items-center gap-3 rounded-2xl border bg-cream/60 px-3 py-4 text-left ${color.name === c.name ? "border-burgundy" : "border-ink/10"}`}>
                        <span className="h-10 w-10 shrink-0 rounded-full border border-ink/10" style={{ background: c.swatch }} />
                        <span className="text-sm">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </Picker>
              )}
              {step === 2 && (
                <Picker title="Choose style" hint="How full should it feel?">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {styles.map((s) => (
                      <button type="button" key={s.name} onClick={() => setStyle(s)} className={`rounded-2xl border px-4 py-5 text-left ${style.name === s.name ? "border-burgundy bg-burgundy text-paper" : "border-ink/10 bg-cream/50"}`}>
                        <span className="display block text-2xl">{s.name}</span>
                        <span className={`mt-1 block text-sm ${style.name === s.name ? "text-paper/80" : "text-ink/60"}`}>{s.note}</span>
                      </button>
                    ))}
                  </div>
                </Picker>
              )}
              {step === 3 && (
                <Picker title="Choose wrapping" hint="The last thing they see before the flowers.">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {wraps.map((w) => (
                      <button type="button" key={w.name} onClick={() => setWrap(w)} className={`overflow-hidden rounded-2xl border text-left ${wrap.name === w.name ? "border-burgundy ring-2 ring-burgundy" : "border-transparent"}`}>
                        <img src={w.image} alt="" className="h-28 w-full object-cover sm:h-32" />
                        <span className="block px-3 py-2 text-sm">{w.name}</span>
                      </button>
                    ))}
                  </div>
                </Picker>
              )}
              {step === 4 && (
                <label className="block">
                  <span className="display text-3xl">A personal message</span>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="field mt-4" placeholder="Write what the flowers should say." />
                </label>
              )}
              {step === 5 && (
                <div className="grid items-center gap-4 sm:grid-cols-2">
                  <img src={preview} alt="Preview" className="h-64 w-full rounded-2xl object-cover sm:h-72" />
                  <div>
                    <p className="display text-3xl">
                      {color.name} {flower.name}
                    </p>
                    <p className="hand text-2xl text-burgundy">
                      {style.name} · {wrap.name} wrap
                    </p>
                    <p className="mt-3 text-sm text-ink/70">{message || "No card note yet."}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
        <div className="mt-4 flex justify-between gap-3">
          <button type="button" className="btn btn-light" disabled={step === 0} onClick={() => setStep(step - 1)}>
            Back
          </button>
          {step < 5 ? (
            <button type="button" className="btn btn-dark" onClick={() => setStep(step + 1)}>
              Continue
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                add({ slug: "custom-" + flower.name.toLowerCase(), name: `${color.name} ${flower.name} custom`, price, image: preview, size: style.name, message });
                navigate({ to: "/cart" });
              }}
            >
              Create My Bouquet <span className="arrow">→</span>
            </button>
          )}
        </div>
      </div>
      <aside className="relative min-h-[24rem] overflow-hidden rounded-[28px] bg-ink text-paper lg:sticky lg:top-28">
        <img src={preview} alt="" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-80" style={{ filter: "blur(14px) saturate(1.15)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/45 to-ink/80" />
        <svg aria-hidden className="absolute top-5 right-5 h-24 w-24 text-paper/40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.1">
          <path d="M32 58V28" />
          <path d="M32 36c-8 2-14-4-12-12 8 1 12 6 12 12z" />
          <path d="M32 32c8 1 14-6 11-14-8 2-11 8-11 14z" />
          <circle cx="32" cy="22" r="4" />
        </svg>
        <svg aria-hidden className="absolute bottom-6 left-4 h-16 w-28 text-blush/50" viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M4 28c18-22 32-8 40 2 8-16 24-18 40-4" />
          <circle cx="44" cy="18" r="3" />
          <circle cx="78" cy="14" r="2.5" />
        </svg>
        <p className="hand absolute top-8 left-6 text-xl text-paper/80">made for you.</p>
        <div className="relative flex min-h-[24rem] flex-col justify-end p-6">
          <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Live summary</p>
          <p className="display mt-3 text-3xl sm:text-4xl">
            {color.name} {flower.name}
          </p>
          <p className="hand mt-1 text-2xl text-blush">
            {style.name} style · {wrap.name}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] tracking-widest uppercase">
            <span className="rounded-full border border-paper/30 px-3 py-1">{flower.name}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-3 py-1">
              <i className="h-2.5 w-2.5 rounded-full border border-paper/40" style={{ background: color.swatch }} />
              {color.name}
            </span>
            <span className="rounded-full border border-paper/30 px-3 py-1">{style.name}</span>
          </div>
          <p className="mt-3 max-w-[18rem] text-sm text-paper/80">{message || "A note can wait. The flowers already know."}</p>
          <p className="display mt-6 text-4xl">₹{price.toLocaleString("en-IN")}</p>
        </div>
      </aside>
    </div>
  );
}

function Picker({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <div>
      <p className="display text-3xl">{title}</p>
      <p className="hand mt-1 mb-4 text-xl text-burgundy">{hint}</p>
      {children}
    </div>
  );
}
