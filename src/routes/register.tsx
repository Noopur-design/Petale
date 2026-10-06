import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent } from "react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const navigate = useNavigate();
  const signIn = useStore((s) => s.signInLocal);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    signIn({ name: String(data.get("name")), email: String(data.get("email")), phone: String(data.get("phone")) });
    navigate({ to: "/account" });
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-3 px-4 pt-28 pb-16">
      <h1 className="display section-title">Create account</h1>
      <input required name="name" placeholder="Name" aria-label="Name" className="field" />
      <input required name="email" type="email" placeholder="Email" aria-label="Email" className="field" />
      <input required name="phone" placeholder="Phone" aria-label="Phone" className="field" />
      <input required type="password" placeholder="Password" aria-label="Password" className="field" />
      <input required type="password" placeholder="Confirm Password" aria-label="Confirm Password" className="field" />
      <button className="btn btn-dark" type="submit">
        Create Account
      </button>
    </form>
  );
}
