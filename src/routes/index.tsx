import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { collections, occasions, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({ component: Home });

const gallery = [
  "/bouquets/classic-red.jpg",
  "/bouquets/blush.jpg",
  "/bouquets/sunflower-smile.jpg",
  "/bouquets/tulip-bag.jpg",
  "/bouquets/pastel.jpg",
];

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % gallery.length), 5600);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    gsap.fromTo(".gsap-hero", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power2.out" });
  }, [i]);
  const main = gallery[i];
  const thumbs = gallery.filter((_, n) => n !== i).slice(0, 4);
  const best = ["blush-romance", "sunflower-smile", "classic-red", "daisy-dream", "butterfly-bloom", "turtle-love"]
    .map((slug) => products.find((p) => p.slug === slug)!)
    .filter(Boolean);

  return (
    <div>
      <section className="relative grid items-center overflow-hidden pt-24 pb-8 md:min-h-svh md:grid-cols-2 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <img src={main} alt="" className="absolute inset-[-8%] h-[116%] w-[116%] max-w-none object-cover" style={{ filter: "blur(28px) saturate(1.05)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-cream/35" />
        </div>
        <div className="relative px-5 py-6 md:px-16 md:py-10">
          <p className="gsap-hero label">Flowers for every story</p>
          <h1 className="gsap-hero hero-mark hero-title mt-4">
            More
            <br /> Than
            <br /> Flowers.
          </h1>
          <p className="gsap-hero hand mt-3 text-3xl text-burgundy md:text-4xl">They're feelings.</p>
          <p className="gsap-hero mt-4 max-w-md text-ink/75">Handcrafted bouquets for life's most beautiful moments.</p>
          <div className="gsap-hero mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="btn btn-dark">
              Shop Bouquets <span className="arrow">→</span>
            </Link>
            <Link to="/about" className="btn btn-light">
              Watch Our Story ▶
            </Link>
          </div>
        </div>
        <div className="relative px-5 pb-4 md:pr-12 md:pl-4">
          <div className="grid h-[58vh] grid-cols-[1fr_58px] gap-3 sm:h-[68vh] sm:grid-cols-[1fr_84px] sm:gap-4 md:h-[76vh]">
            <div className="relative min-h-0">
              <img key={main} src={main} alt="Petalé bouquet" className="hero-arc h-full w-full rounded-[22px] object-cover sm:rounded-[28px]" />
              <div className="absolute top-2 right-[-20px] z-10 h-16 w-16 overflow-hidden rounded-full sm:top-1 sm:right-[-26px] sm:h-24 sm:w-24">
                <img src="/bouquets/butterfly.jpg" alt="" className="spin-place h-full w-full origin-center object-cover" />
              </div>
              <p className="hand absolute bottom-4 left-4 rounded-full bg-paper/90 px-4 py-2 text-lg sm:text-2xl">A little happiness, in bloom.</p>
            </div>
            <div className="flex h-full min-h-0 flex-col gap-2 pt-[4.6rem] sm:pt-[6.8rem]">
              {thumbs.map((src) => (
                <button
                  type="button"
                  key={src}
                  aria-label="Show this bouquet"
                  onClick={() => setI(gallery.indexOf(src))}
                  className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-ink/10"
                >
                  <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site relative z-10 mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [Leaf, "Fresh & Premium Flowers", "Handpicked stems, arranged the same day."],
          [Truck, "Same Day Delivery", "Selected cities, carefully wrapped."],
          [Sparkles, "Custom Bouquets", "Send a reference. We recreate the feeling."],
          [ShieldCheck, "Secure Payments", "UPI, card, or cash on delivery."],
        ].map(([Icon, title, text]) => {
          const Ico = Icon as typeof Leaf;
          return (
            <div key={title as string} className="card p-5 transition hover:-translate-y-1">
              <Ico size={18} />
              <p className="display mt-3 text-xl">{title as string}</p>
              <p className="mt-1 text-sm text-ink/60">{text as string}</p>
            </div>
          );
        })}
      </section>

      <section className="site py-20">
        <p className="label">Bestsellers</p>
        <h2 className="display section-title mt-2">Our Bestsellers</h2>
        <p className="hand text-2xl text-burgundy">Flowers chosen to make every moment memorable.</p>
        <div className="mt-8 flex snap-x gap-4 overflow-x-auto hide-scroll md:grid md:grid-cols-3 md:overflow-visible xl:grid-cols-4">
          {best.map((p) => (
            <div key={p.slug} className="min-w-[240px] snap-start md:min-w-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige/70 py-20">
        <div className="site">
          <h2 className="display section-title">
            Make Moments <span className="hand text-burgundy">more meaningful</span>
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {occasions.map((o) => (
              <Link key={o.slug} to="/occasions/$kind" params={{ kind: o.slug }} className="group relative h-72 overflow-hidden rounded-[26px]">
                <img src={o.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute bottom-5 left-5 text-paper">
                  <p className="display text-3xl">{o.name}</p>
                  <p className="text-sm text-paper/80">{o.note} →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="flex gap-4 overflow-x-auto hide-scroll px-4 md:px-8">
          {collections.map((c) => (
            <Link key={c.slug} to="/shop" search={{ collection: c.name }} className="group relative h-80 min-w-[260px] overflow-hidden rounded-[26px]">
              <img src={c.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-ink/25 transition group-hover:bg-ink/40" />
              <div className="absolute bottom-5 left-5 text-paper">
                <p className="display text-3xl">{c.name}</p>
                <p className="text-sm">{c.line} →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="site grid items-center gap-8 py-8 md:grid-cols-2">
        <div>
          <p className="label">Atelier</p>
          <h2 className="display section-title">Custom Bouquets</h2>
          <p className="hand text-3xl text-burgundy">Design something that feels completely yours.</p>
          <p className="mt-4 max-w-md text-ink/70">Choose your flowers, colours, wrapping and personal message.</p>
          <Link to="/custom" className="btn btn-dark mt-6">
            Create Your Bouquet <span className="arrow">→</span>
          </Link>
        </div>
        <div className="relative">
          <img src="/bouquets/tulip-bag.jpg" alt="Tulip handbag bouquet" className="h-72 w-full rounded-[28px] object-cover sm:h-96 md:h-[460px]" />
          <svg className="pointer-events-none absolute -top-6 -left-4 text-olive/50" width="80" height="80" viewBox="0 0 80 80" aria-hidden>
            <path d="M10 60 C30 10 50 10 70 40" fill="none" stroke="currentColor" />
            <circle cx="68" cy="38" r="5" fill="none" stroke="currentColor" />
          </svg>
        </div>
      </section>

      <section className="relative mx-4 my-10 overflow-hidden rounded-[28px] bg-blush/40 px-6 py-16 md:mx-8">
        <p className="main-head text-center text-5xl">Stay Blooming</p>
        <p className="hand text-center text-2xl text-burgundy">Get flower care tips, special offers and new arrivals.</p>
        <form
          className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input className="field" placeholder="you@email.com" aria-label="Email address" type="email" required />
          <button className="btn btn-dark" type="submit">
            Subscribe <span className="arrow">→</span>
          </button>
        </form>
      </section>
    </div>
  );
}
