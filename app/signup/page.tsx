"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (signInRes?.ok) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="text-paper text-3xl font-bold mb-2">Create an account</h1>
      <p className="text-paper/60 text-sm mb-8">
        Needed to list domains for sale and to make or receive offers.
      </p>

      <form onSubmit={handleSubmit} className="border border-rule bg-paper p-6 space-y-4">
        <div>
          <label className="block text-xs text-ink-soft mb-1.5 font-mono">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full font-mono text-sm bg-paper-soft border border-rule px-3 py-2.5 focus:outline-2 focus:outline-brass"
          />
        </div>
        <div>
          <label className="block text-xs text-ink-soft mb-1.5 font-mono">
            Password (8+ characters)
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full font-mono text-sm bg-paper-soft border border-rule px-3 py-2.5 focus:outline-2 focus:outline-brass"
          />
        </div>
        {error && <p className="text-stamp text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full font-serif font-semibold bg-ink text-paper py-2.5 disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-paper/60 text-sm mt-5">
        Already have an account?{" "}
        <Link href="/login" className="text-paper underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
