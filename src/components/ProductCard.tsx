import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const wished = useStore((s) => s.wishlist.includes(product.slug));
  const toggle = useStore((s) => s.toggleWish);
  const add = useStore((s) => s.addToCart);
  return (
    <article className="card group overflow-hidden transition duration-300 hover:-translate-y-1.5">
      <Link to="/shop/$slug" params={{ slug: product.slug }} className="relative block aspect-[4/5] overflow-hidden bg-beige">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            toggle(product.slug);
          }}
          className={`absolute top-2 right-2 grid h-10 w-10 place-items-center rounded-full bg-paper/90 sm:top-3 sm:right-3 sm:h-11 sm:w-11 ${wished ? "text-burgundy" : "text-ink"}`}
        >
          <Heart size={16} fill={wished ? "currentColor" : "none"} />
        </button>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to="/shop/$slug" params={{ slug: product.slug }} className="display min-w-0 text-base leading-tight sm:text-xl">
            {product.name}
          </Link>
          <span className="shrink-0 text-xs sm:text-sm">{formatPrice(product.price)}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-ink/60">{product.short}</p>
        <p className="mt-2 text-xs tracking-widest text-gold">
          {"★".repeat(Math.round(product.rating))} <span className="text-ink/50">{product.reviews}</span>
        </p>
        <button
          type="button"
          className="btn btn-dark mt-3 w-full translate-y-1 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          onClick={() => add({ slug: product.slug, name: product.name, price: product.price, image: product.image, size: product.sizes[0] })}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
