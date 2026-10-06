import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const flowers = ["Rose", "Tulip", "Sunflower", "Daisy", "Lily", "Baby's Breath"];
const colors = ["Pink", "Red", "White", "Yellow", "Purple", "Blue", "Mixed"];
const occ = ["Birthday", "Anniversary", "Love & Romance", "Congratulations", "Just Because", "Sympathy"];
const sizes = ["Regular", "Deluxe", "Premium"];
const sorts = ["Featured", "Price Low to High", "Price High to Low", "Newest", "Best Rated"];

type Search = { collection?: string; occasion?: string };

export const Route = createFileRoute("/shop/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    collection: typeof s.collection === "string" ? s.collection : undefined,
    occasion: typeof s.occasion === "string" ? s.occasion : undefined,
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const [flower, setFlower] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [occasion, setOccasion] = useState<string[]>(search.occasion ? [search.occasion] : []);
  const [size, setSize] = useState<string[]>([]);
  const [stock, setStock] = useState(false);
  const [sort, setSort] = useState("Featured");
  const [max, setMax] = useState(9000);
  const [open, setOpen] = useState(false);
  const collection = search.collection || "";

  const list = useMemo(() => {
    let out = products.filter((p) => p.price <= max);
    if (flower.length) out = out.filter((p) => p.flowers.some((f) => flower.includes(f)));
    if (color.length) out = out.filter((p) => p.colors.some((f) => color.includes(f)));
    if (occasion.length) out = out.filter((p) => p.occasions.some((f) => occasion.includes(f)));
    if (size.length) out = out.filter((p) => p.sizes.some((f) => size.includes(f)));
    if (stock) out = out.filter((p) => p.availability === "In stock");
    if (collection) out = out.filter((p) => p.collection === collection);
    if (sort === "Price Low to High") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "Price High to Low") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "Best Rated") out = [...out].sort((a, b) => b.rating - a.rating);
    if (sort === "Newest") out = [...out].reverse();
    return out;
  }, [flower, color, occasion, size, stock, collection, sort, max]);

  function toggle(list: string[], set: (v: string[]) => void, v: string) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  const filters = (
    <div className="space-y-6 text-sm">
      <Chips title="Flower type" options={flowers} value={flower} onToggle={(v) => toggle(flower, setFlower, v)} />
      <Chips title="Color" options={colors} value={color} onToggle={(v) => toggle(color, setColor, v)} />
      <Chips title="Occasion" options={occ} value={occasion} onToggle={(v) => toggle(occasion, setOccasion, v)} />
      <Chips title="Size" options={sizes} value={size} onToggle={(v) => toggle(size, setSize, v)} />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)} /> In stock only
      </label>
      <label className="block">
        Price up to ₹{max}
        <input type="range" min={1000} max={9000} value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full" />
      </label>
    </div>
  );

  return (
    <div className="site pt-28 pb-16">
      <p className="label">The atelier</p>
      <h1 className="display section-title">All Bouquets</h1>
      <p className="hand text-2xl text-burgundy">Fresh flowers, thoughtfully arranged for every occasion.</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-light md:hidden" onClick={() => setOpen(true)}>
          Filters
        </button>
        <SortMenu value={sort} onChange={setSort} options={sorts} />
        <span className="text-sm text-ink/50 sm:ml-auto">{list.length} designs</span>
      </div>
      <div className="mt-6 grid gap-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">{filters}</aside>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-70 overflow-y-auto bg-paper p-6 md:hidden">
          <button type="button" className="mb-4" onClick={() => setOpen(false)}>
            Close
          </button>
          {filters}
        </div>
      )}
    </div>
  );
}

function SortMenu({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [box, setBox] = useState({ top: 0, left: 0, width: 220 });

  function place() {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    const width = Math.max(r.width, 240);
    const left = Math.min(r.left, window.innerWidth - width - 12);
    setBox({ top: r.bottom + 8, left: Math.max(12, left), width });
  }

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function move() {
      place();
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", move);
    window.addEventListener("scroll", move, true);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", move);
      window.removeEventListener("scroll", move, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="flex w-full max-w-[16rem] items-center gap-3 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-left text-sm text-ink shadow-sm sm:w-64"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sort bouquets"
        onClick={() => {
          place();
          setOpen((v) => !v);
        }}
      >
        <span className="text-[10px] tracking-[0.22em] text-olive uppercase">Sort</span>
        <span className="min-w-0 flex-1 truncate">{value}</span>
        <svg aria-hidden viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 text-burgundy transition ${open ? "rotate-180" : ""}`}>
          <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      {open &&
        createPortal(
          <ul
            ref={menuRef}
            role="listbox"
            aria-label="Sort bouquets"
            className="overflow-hidden rounded-2xl border border-ink/10 bg-paper py-1 text-ink shadow-2xl"
            style={{ position: "fixed", top: box.top, left: box.left, width: box.width, zIndex: 400 }}
          >
            {options.map((s) => {
              const selected = value === s;
              return (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-ink hover:bg-cream"
                    style={selected ? { background: "#f3e6e4", color: "#5a2027" } : undefined}
                    onClick={() => {
                      onChange(s);
                      setOpen(false);
                    }}
                  >
                    <span className="grid h-4 w-4 place-items-center text-xs text-burgundy">{selected ? "✓" : ""}</span>
                    {s}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </>
  );
}

function Chips({ title, options, value, onToggle }: { title: string; options: string[]; value: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="label mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button type="button" key={o} onClick={() => onToggle(o)} className={`rounded-full border px-3 py-1 text-xs ${value.includes(o) ? "bg-ink text-paper" : "bg-paper/70"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
