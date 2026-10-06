import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const cart = useStore((s) => s.cart);
  const place = useStore((s) => s.placeOrder);
  const navigate = useNavigate();
  const [pay, setPay] = useState("UPI");
  const [slot, setSlot] = useState("Morning");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const total = cart.reduce((n, i) => n + i.price * i.qty, 0);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date) {
      setDateError(true);
      return;
    }
    const data = new FormData(e.currentTarget);
    const address = `${data.get("address")}, ${data.get("city")}`;
    const id = place(total);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("petale-order", JSON.stringify({ id, total, address, pay }));
    navigate({ to: "/order-success" });
  }
  return (
    <form onSubmit={submit} className="site grid gap-6 pt-28 pb-16 lg:grid-cols-3">
      <section className="min-w-0 space-y-6 lg:col-span-2">
        <h1 className="display section-title">Checkout</h1>
        <div className="card p-4 sm:p-6">
          <h2 className="display mb-4 text-3xl">Delivery Details</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Name", "Phone", "Email", "Address", "City", "State", "Pincode"].map((f) => (
              <input key={f} name={f.toLowerCase()} required placeholder={f} aria-label={f} className="field" autoComplete={f === "Email" ? "email" : f === "Phone" ? "tel" : "on"} />
            ))}
            <DateField value={date} onChange={(v) => { setDate(v); setDateError(false); }} invalid={dateError} />
            <input type="hidden" name="slot" value={slot} />
            <div className="sm:col-span-2">
              <p className="mb-2 text-sm">Time slot</p>
              <div className="flex flex-wrap gap-2">
                {["Morning", "Afternoon", "Evening"].map((s) => (
                  <button type="button" key={s} onClick={() => setSlot(s)} className={`min-h-11 rounded-full border px-4 ${slot === s ? "bg-ink text-paper" : "bg-paper"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <textarea className="field mt-3" name="gift" placeholder="Gift message" rows={3} />
        </div>
        <div className="card p-4 sm:p-6">
          <h2 className="display mb-4 text-3xl">Payment</h2>
          <div className="flex flex-wrap gap-2">
            {["UPI", "Card", "Cash on Delivery"].map((p) => (
              <button type="button" key={p} onClick={() => setPay(p)} className={`min-h-11 rounded-full border px-4 ${pay === p ? "bg-ink text-paper" : "bg-paper"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>
      <aside className="card h-fit p-4 sm:p-6">
        <p className="display text-3xl">Order Summary</p>
        {cart.map((i) => (
          <div key={i.slug + i.size} className="flex justify-between gap-3 py-2 text-sm">
            <span className="min-w-0">
              {i.name} × {i.qty}
            </span>
            <span className="shrink-0">{formatPrice(i.price * i.qty)}</span>
          </div>
        ))}
        <p className="display mt-4 text-2xl">{formatPrice(total)}</p>
        <button className="btn btn-dark mt-4 w-full" type="submit">
          Place Order
        </button>
      </aside>
    </form>
  );
}

function DateField({ value, onChange, invalid }: { value: string; onChange: (v: string) => void; invalid?: boolean }) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [cursor, setCursor] = useState(new Date(start.getFullYear(), start.getMonth(), 1));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const label = value ? value.split("-").reverse().join("-") : "dd-mm-yyyy";

  function pick(day: number) {
    const chosen = new Date(year, month, day);
    if (chosen < start) return;
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative min-w-0">
      <input type="hidden" name="date" value={value} />
      <button type="button" className={`field flex items-center justify-between gap-3 text-left ${invalid ? "border-burgundy" : ""}`} aria-label="Delivery date" aria-expanded={open} aria-invalid={invalid} onClick={() => setOpen((v) => !v)}>
        <span className={value ? "text-ink" : "text-[#5c534c]"}>{label}</span>
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-burgundy">
          <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 10h18M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-80 w-[min(100%,18rem)] rounded-2xl border border-ink/10 bg-paper p-3 text-ink shadow-xl">
          <div className="mb-2 flex items-center justify-between gap-2">
            <button type="button" aria-label="Previous month" className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream" onClick={() => setCursor(new Date(year, month - 1, 1))}>
              ‹
            </button>
            <p className="display text-lg">{cursor.toLocaleString("en-GB", { month: "long", year: "numeric" })}</p>
            <button type="button" aria-label="Next month" className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream" onClick={() => setCursor(new Date(year, month + 1, 1))}>
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] tracking-wide text-ink/45">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <span key={`e${i}`} />;
              const chosen = new Date(year, month, day);
              const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const disabled = chosen < start;
              const selected = value === iso;
              return (
                <button
                  type="button"
                  key={iso}
                  disabled={disabled}
                  onClick={() => pick(day)}
                  className={`grid h-8 place-items-center rounded-full text-sm ${selected ? "bg-burgundy text-paper" : "hover:bg-cream"} ${disabled ? "cursor-default text-ink/25 hover:bg-transparent" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {invalid && <p className="mt-1 text-xs text-burgundy">Choose a delivery date.</p>}
    </div>
  );
}