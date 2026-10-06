import { createFileRoute, Link } from "@tanstack/react-router";
const links = ["/", "/shop", "/occasions", "/custom", "/about", "/contact", "/faq", "/shipping", "/returns", "/cart", "/wishlist", "/search"] as const;
export const Route = createFileRoute("/sitemap")({
  component: () => (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="display section-title">Sitemap</h1>
      <ul className="mt-6 space-y-2">
        {links.map((l) => (
          <li key={l}>
            <Link to={l} className="underline">
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ),
});
