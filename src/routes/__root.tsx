import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Chrome } from "@/components/Chrome";
import { Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Petalé — More Than Flowers" },
      { name: "description", content: "Handcrafted bouquets for life's most beautiful moments." },
      { name: "theme-color", content: "#F8F4EF" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: () => (
    <Chrome>
      <Outlet />
    </Chrome>
  ),
  notFoundComponent: Floral404,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>{children}</AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function Floral404() {
  return (
    <div className="relative min-h-[70vh] overflow-hidden px-4 pt-36 text-center">
      <p className="display text-[18vw] leading-none text-blush">404</p>
      <h1 className="display section-title -mt-4">Oops, this page hasn't bloomed yet.</h1>
      <Link to="/" className="btn btn-dark mt-6">
        Back Home <span className="arrow">→</span>
      </Link>
      <span className="petal-float pointer-events-none absolute top-40 left-8 text-4xl text-rose">✿</span>
      <span className="petal-float pointer-events-none absolute top-56 right-10 text-3xl text-blush">❀</span>
    </div>
  );
}
