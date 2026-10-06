import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { products, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/occasions", label: "Occasions" },
  { to: "/custom", label: "Custom Bouquet" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const groups = [
  { title: "Shop", links: [["All Bouquets", "/shop"], ["By Occasion", "/occasions"], ["Custom Bouquets", "/custom"], ["Gift Hampers", "/shop"]] },
  { title: "Help", links: [["Track Order", "/track-order"], ["Shipping", "/shipping"], ["Returns", "/returns"], ["FAQ", "/faq"]] },
  { title: "Company", links: [["About Us", "/about"], ["Contact", "/contact"], ["Sustainability", "/about"]] },
] as const;

const moments = [
  ["/bouquets/classic-red.jpg", "classic-red"],
  ["/bouquets/sunflower-smile.jpg", "sunflower-smile"],
  ["/bouquets/blue-sunshine.jpg", "blue-sunshine"],
  ["/bouquets/pastel.jpg", "pastel-dreams"],
  ["/bouquets/butterfly.jpg", "butterfly-bloom"],
  ["/bouquets/tulip-bag.jpg", "elegant-tulips"],
] as const;

export function Chrome({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      <Navbar />
      <motion.div key={path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        {children}
      </motion.div>
      <Footer path={path} />
      <CartDrawer />
      <SearchOverlay />
      <Toasts />
    </>
  );
}

function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const count = useStore((s) => s.cart.reduce((n, i) => n + i.qty, 0));
  const wish = useStore((s) => s.wishlist.length);
  const setSearch = useStore((s) => s.setSearchOpen);
  const setCart = useStore((s) => s.setCartOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-ink/10 ${scrolled ? "bg-paper/95 shadow-md backdrop-blur-md" : "bg-cream/95 backdrop-blur-md"}`}>
      <div className="site relative flex h-16 items-center gap-2 xl:h-[4.5rem] xl:gap-6">
        <button type="button" className="grid h-11 w-11 shrink-0 place-items-center xl:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu />
        </button>
        <Link to="/" className="brand absolute left-1/2 z-10 -translate-x-1/2 px-2 text-[1.25rem] leading-[1.35] whitespace-nowrap sm:text-[1.5rem] xl:static xl:translate-x-0 xl:px-0 xl:text-[2rem]">
          Petalé
        </Link>
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 text-[11px] tracking-[0.12em] whitespace-nowrap uppercase xl:flex 2xl:gap-6">
          {nav.map((l) => {
            const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={active ? "text-burgundy" : "hover:text-burgundy"}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex shrink-0 items-center">
          <button type="button" aria-label="Search" className="grid h-11 w-9 place-items-center sm:w-10 xl:w-11" onClick={() => setSearch(true)}>
            <Search size={18} />
          </button>
          <Link to="/account" aria-label="Account" className="hidden h-11 w-11 place-items-center sm:grid">
            <User size={18} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative grid h-11 w-9 place-items-center sm:w-10 xl:w-11">
            <Heart size={18} />
            {wish > 0 && <span className="absolute top-1 right-1 text-[10px]">{wish}</span>}
          </Link>
          <button type="button" aria-label="Cart" className="relative grid h-11 w-9 place-items-center sm:w-10 xl:w-11" onClick={() => setCart(true)}>
            <ShoppingBag size={18} />
            {count > 0 && <span className="absolute top-1 right-1 grid h-4 w-4 place-items-center rounded-full bg-burgundy text-[10px] text-paper">{count}</span>}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-0 left-0 z-60 h-dvh w-screen overflow-y-auto bg-ink px-7 pt-5 pb-10 text-paper xl:hidden">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" onClick={() => setOpen(false)} className="brand inline-block py-1 pr-3 pl-1 text-[2rem] leading-[1.4]">
                Petalé
              </Link>
              <button type="button" aria-label="Close menu" className="grid h-11 w-11 shrink-0 place-items-center" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-4">
              {nav.map((l) => {
                const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
                return (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className={`display text-[1.85rem] leading-tight ${active ? "text-blush" : ""}`}>
                    {l.label}
                  </Link>
                );
              })}
            </nav>
            <p className="hand mt-10 text-2xl text-blush">More than flowers. They're feelings.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function footerMood(path: string) {
  if (path.startsWith("/custom")) return { image: "/bouquets/tulip-bag.jpg", quote: "Your idea. Our flowers.", note: "Anything you like, tell us." };
  if (path.startsWith("/about")) return { image: "/bouquets/installation.jpg", quote: "You bring the inspiration.", note: "Fresh flowers, chosen with care." };
  if (path.startsWith("/occasions/sympathy")) return { image: "/bouquets/tulip-bag.jpg", quote: "Sent gently.", note: "Quiet arrangements." };
  if (path.startsWith("/occasions")) return { image: "/bouquets/elegant-romance.jpg", quote: "Every moment deserves flowers.", note: "Styled for the story." };
  if (path.startsWith("/shop")) return { image: "/bouquets/classic-red.jpg", quote: "Save the reference. Send the feeling.", note: "Hand-tied, never hurried." };
  return { image: "/bouquets/blush.jpg", quote: "Flowers that speak from the heart.", note: "Made with flowers, made with feeling." };
}

function Footer({ path }: { path: string }) {
  const mood = footerMood(path);
  const [open, setOpen] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  function subscribe(e: FormEvent) {
    e.preventDefault();
    if (email.includes("@")) setDone(true);
  }
  return (
    <footer className="mt-8">
      <section className="paper-grain bg-cream">
        <div className="site grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="label">Your next bouquet</p>
            <h2 className="display section-title mt-3">
              Have Something
              <br /> Beautiful In Mind?
            </h2>
            <p className="hand mt-3 text-3xl text-burgundy">Let's make it bloom.</p>
            <p className="mt-4 max-w-md text-ink/75">Send us the bouquet you love. We'll create something inspired by it, made especially for you.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/custom" className="btn btn-dark">
                Create My Bouquet <span className="arrow">→</span>
              </Link>
              <Link to="/shop" className="btn btn-light">
                Browse Inspirations
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src={mood.image} alt="" className="h-72 w-full rounded-[28px] object-cover sm:h-96 md:h-[420px]" />
            <p className="hand absolute bottom-5 left-4 rounded-full bg-paper/90 px-4 py-2 text-xl text-burgundy">{mood.note}</p>
          </div>
        </div>
      </section>
      <section className="ink-grain">
        <div className="site py-16">
          <p className="main-head text-[clamp(4rem,12vw,9rem)] leading-none">PETALÉ</p>
          <p className="main-head mt-2 text-2xl md:text-4xl">
            More Than Flowers. <span className="hand text-blush">They're feelings.</span>
          </p>
          <p className="mt-3 max-w-md text-paper/70">{mood.quote}</p>
          <div className="mt-12 hidden gap-10 md:grid md:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="mb-4 text-[11px] tracking-[0.28em] text-gold uppercase">{g.title}</p>
                <ul className="space-y-3 text-sm text-paper/80">
                  {g.links.map(([label, to]) => (
                    <li key={label}>
                      <Link to={to}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 divide-y divide-white/10 md:hidden">
            {groups.map((g) => (
              <div key={g.title}>
                <button type="button" className="flex w-full justify-between py-4 text-xs tracking-[0.22em] uppercase" onClick={() => setOpen(open === g.title ? null : g.title)}>
                  {g.title} <span>{open === g.title ? "–" : "+"}</span>
                </button>
                {open === g.title && (
                  <ul className="space-y-3 pb-4 text-sm text-paper/80">
                    {g.links.map(([label, to]) => (
                      <li key={label}>
                        <Link to={to}>{label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={subscribe} className="mt-12 max-w-xl">
            <p className="main-head text-4xl">Stay Blooming.</p>
            <p className="hand text-2xl text-blush">Beautiful things are coming.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <label className="relative block min-w-0 flex-1">
                {email === "" && (
                  <span className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-[0.95rem] text-[#5c534c]">you@email.com</span>
                )}
                <input
                  className="ink-field min-w-0"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ color: "#171615", backgroundColor: "#fffdfc", WebkitTextFillColor: email ? "#171615" : "transparent" }}
                />
              </label>
              <button className="btn shrink-0 bg-paper text-ink" type="submit">
                Subscribe <span className="arrow">→</span>
              </button>
            </div>
            {done && <p className="hand mt-3 text-blush">You're on the list.</p>}
          </form>
          <p className="mt-8 text-sm text-paper/70">Follow the flowers · @petale.flowers</p>
          <div className="mt-8 flex gap-3 overflow-x-auto hide-scroll">
            {moments.map(([src, slug]) => (
              <Link key={slug} to="/shop/$slug" params={{ slug }} className="relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl">
                <img src={src} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </Link>
            ))}
          </div>
          <p className="main-head mx-auto mt-14 max-w-3xl text-center text-[clamp(2rem,5vw,4rem)]">
            Some feelings are better delivered <span className="hand text-blush">in flowers.</span>
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-5 text-[11px] tracking-[0.16em] text-paper/55 uppercase md:flex-row md:justify-between">
            <span>© 2026 Petalé</span>
            <span className="hand text-base tracking-normal text-blush normal-case">Made with flowers & feeling.</span>
            <span className="flex gap-4">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </span>
          </div>
        </div>
      </section>
    </footer>
  );
}

function CartDrawer() {
  const open = useStore((s) => s.cartOpen);
  const setOpen = useStore((s) => s.setCartOpen);
  const cart = useStore((s) => s.cart);
  const setQty = useStore((s) => s.setQty);
  const remove = useStore((s) => s.removeFromCart);
  const total = cart.reduce((n, i) => n + i.price * i.qty, 0);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-70 flex justify-end">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close cart" onClick={() => setOpen(false)} />
      <aside className="relative h-full w-full max-w-md overflow-y-auto bg-paper p-6">
        <div className="flex items-center justify-between">
          <h2 className="display text-3xl">Your Flowers</h2>
          <button type="button" aria-label="Close" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {cart.length === 0 && <p className="text-ink/60">Your cart is waiting to bloom.</p>}
          {cart.map((item) => (
            <div key={item.slug + item.size + (item.message || "")} className="flex gap-3 border-b border-ink/10 pb-4">
              <img src={item.image} alt="" className="h-24 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="display text-lg">{item.name}</p>
                <p className="text-xs text-ink/50">{item.size}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button type="button" className="h-8 w-8 rounded-full border" onClick={() => setQty(item.slug, item.size, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button type="button" className="h-8 w-8 rounded-full border" onClick={() => setQty(item.slug, item.size, item.qty + 1)}>+</button>
                  <button type="button" className="ml-auto text-xs underline" onClick={() => remove(item.slug, item.size)}>
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-sm">{formatPrice(item.price * item.qty)}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </p>
        <Link to="/cart" onClick={() => setOpen(false)} className="btn btn-light mt-4 w-full">
          View cart
        </Link>
        <Link to="/checkout" onClick={() => setOpen(false)} className="btn btn-dark mt-2 w-full">
          Proceed to Checkout <span className="arrow">→</span>
        </Link>
      </aside>
    </div>
  );
}

function SearchOverlay() {
  const open = useStore((s) => s.searchOpen);
  const setOpen = useStore((s) => s.setSearchOpen);
  const [q, setQ] = useState("");
  if (!open) return null;
  const results = products.filter((p) => (p.name + p.short + p.occasions.join(" ")).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fixed inset-0 z-70 overflow-y-auto bg-cream/95 p-6 backdrop-blur-md md:p-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end justify-between">
          <p className="label">Search Petalé</p>
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Roses, birthday, sunflower..." className="field mt-4 border-0 border-b bg-transparent text-2xl" aria-label="Search" />
        <div className="mt-4 flex flex-wrap gap-2">
          {["Classic Red", "Birthday", "Sunflower"].map((t) => (
            <button type="button" key={t} className="rounded-full border px-3 py-1 text-sm" onClick={() => setQ(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {results.map((p) => (
            <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} onClick={() => setOpen(false)} className="flex gap-3 rounded-2xl bg-paper p-3">
              <img src={p.image} alt="" className="h-20 w-16 rounded-xl object-cover" />
              <div>
                <p className="display text-xl">{p.name}</p>
                <p className="text-xs text-ink/60">{p.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toasts() {
  const toasts = useStore((s) => s.toasts);
  return (
    <div className="fixed right-4 bottom-4 z-80 space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className="max-w-xs rounded-2xl bg-ink px-4 py-3 text-sm text-paper">
          {t.text}
        </div>
      ))}
    </div>
  );
}
