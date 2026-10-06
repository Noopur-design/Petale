import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account")({ component: AccountPage });

function AccountPage() {
  const profile = useStore((s) => s.profile);
  const out = useStore((s) => s.signOutLocal);
  return (
    <div className="site pt-28 pb-16">
      <h1 className="display section-title">My Account</h1>
      <p className="mt-2 text-ink/70">{profile ? `${profile.name} · ${profile.email}` : "Sign in to keep your studio notes on this device."}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/account" className="card p-6">
          <p className="display text-3xl">Profile</p>
          <p className="mt-2 text-sm text-ink/60">{profile?.phone || "Name, phone, preferences"}</p>
        </Link>
        <Link to="/orders" className="card p-6">
          <p className="display text-3xl">Orders</p>
          <p className="mt-2 text-sm text-ink/60">Open</p>
        </Link>
        <Link to="/wishlist" className="card p-6">
          <p className="display text-3xl">Wishlist</p>
          <p className="mt-2 text-sm text-ink/60">Saved blooms</p>
        </Link>
        <Link to="/login" className="card p-6" onClick={() => out()}>
          <p className="display text-3xl">Logout</p>
          <p className="mt-2 text-sm text-ink/60">This device</p>
        </Link>
      </div>
    </div>
  );
}
