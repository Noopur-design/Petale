import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({ component: WishlistPage });

function WishlistPage() {
  const slugs = useStore((s) => s.wishlist);
  const list = products.filter((p) => slugs.includes(p.slug));
  return (
    <div className="site pt-28 pb-16">
      <h1 className="display section-title">Flowers I'm Saving</h1>
      {list.length === 0 ? (
        <p className="mt-6">
          Your wishlist is waiting to bloom. <Link to="/shop" className="underline">Browse</Link>
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
