import { createFileRoute, notFound } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";

const pages: Record<string, { title: string; accent: string; text: string; image: string; match: string[]; extra?: string[]; chips?: string[] }> = {
  birthday: {
    title: "Make Their Day Bloom",
    accent: "Sweet, bright, a little extra.",
    text: "Birthday bouquets with room for a card, a cake note, or a small surprise.",
    image: "/bouquets/pastel.jpg",
    match: ["Birthday"],
    extra: ["Chocolate", "Teddy", "Greeting Card", "Cake"],
  },
  anniversary: {
    title: "Celebrate Your Love",
    accent: "Roses, slowly.",
    text: "Romantic bouquets and rose arrangements for the date you still remember.",
    image: "/bouquets/elegant-romance.jpg",
    match: ["Anniversary", "Love & Romance"],
  },
  love: {
    title: "Say It With Flowers",
    accent: "For the unsent text.",
    text: "Red roses, pink roses and lilies, composed for romance.",
    image: "/bouquets/classic-red.jpg",
    match: ["Love & Romance", "Anniversary"],
  },
  congratulations: {
    title: "Honour the Moment",
    accent: "Graduation to new chapters.",
    text: "Sunflowers, daisies and colour for achievements worth marking.",
    image: "/bouquets/graduation.jpg",
    match: ["Congratulations", "Birthday"],
    chips: ["Graduation", "New Job", "Achievement", "Promotion"],
  },
  "just-because": {
    title: "No Reason Needed.",
    accent: "Send it anyway.",
    text: "Spontaneous mixed bouquets for ordinary Tuesdays.",
    image: "/bouquets/blue-sunshine.jpg",
    match: ["Just Because", "Birthday"],
  },
  sympathy: {
    title: "With Care, and Quiet.",
    accent: "Restrained, respectful.",
    text: "Soft whites and gentle palettes, delivered without fuss.",
    image: "/bouquets/tulip-bag.jpg",
    match: ["Sympathy"],
  },
};

export const Route = createFileRoute("/occasions/$kind")({
  loader: ({ params }) => {
    const page = pages[params.kind];
    if (!page) throw notFound();
    return { page, kind: params.kind };
  },
  component: OccasionPage,
});

function OccasionPage() {
  const { page } = Route.useLoaderData();
  const add = useStore((s) => s.addToCart);
  const list = products.filter((p) => p.occasions.some((o) => page.match.includes(o)));
  const quiet = page.title.startsWith("With Care");
  return (
    <div className="pb-10">
      <section className="site grid items-end gap-8 pt-28 md:grid-cols-2">
        <div>
          <p className="label">Occasion</p>
          <h1 className={`display section-title mt-3 ${quiet ? "text-ink" : ""}`}>{page.title}</h1>
          <p className={`hand mt-2 text-3xl ${quiet ? "text-olive" : "text-burgundy"}`}>{page.accent}</p>
          <p className="mt-4 max-w-md text-ink/70">{page.text}</p>
          {page.chips && (
            <div className="mt-4 flex flex-wrap gap-2">
              {page.chips.map((c) => (
                <span key={c} className="rounded-full border px-3 py-1 text-xs tracking-widest uppercase">
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
        <img src={page.image} alt="" className="h-[360px] w-full rounded-[28px] object-cover md:h-[440px]" />
      </section>
      {page.extra && (
        <div className="site mt-8">
          <p className="label">Add a little extra</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {page.extra.map((name) => (
              <button
                type="button"
                key={name}
                className="btn btn-light"
                onClick={() => add({ slug: name.toLowerCase().replace(" ", "-"), name, price: name === "Cake" ? 799 : 249, image: "/bouquets/pastel.jpg", size: "Add-on" })}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="site mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
