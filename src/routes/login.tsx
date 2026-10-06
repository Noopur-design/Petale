import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent } from "react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const signIn = useStore((s) => s.signInLocal);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    signIn({ name: "Guest", email: String(data.get("email")), phone: "" });
    navigate({ to: "/account" });
  }
  return (
    <div className="grid pt-24 pb-16 md:min-h-screen md:grid-cols-2 md:pt-0 md:pb-0">
      <img src="/bouquets/blush.jpg" alt="" className="h-56 w-full object-cover md:h-screen" />
      <form onSubmit={submit} className="flex flex-col justify-center gap-3 px-5 py-8 sm:p-8 md:p-16">
        <h1 className="display text-5xl">Welcome back</h1>
        <input required type="email" name="email" placeholder="Email" aria-label="Email" className="field" />
        <input required type="password" placeholder="Password" aria-label="Password" className="field" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" /> Remember me
        </label>
        <button className="btn btn-dark" type="submit">
          Login
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            signIn({ name: "Guest", email: "hello@petale.flowers", phone: "" });
            navigate({ to: "/account" });
          }}
        >
          Continue with Google
        </button>
        <Link to="/register" className="text-sm underline">
          Create account
        </Link>
      </form>
    </div>
  );
}
