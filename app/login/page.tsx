"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", { email, password, redirect: false });

    setLoading(false);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Incorrect email or password.");
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="text-paper text-3xl font-bold mb-8">Log in</h1>

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
          <label className="block text-xs text-ink-soft mb-1.5 font-mono">Password</label>
          <input
            type="password"
            required
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
          {loading ? "Signing in…" : "Log in"}
        </button>
      </form>

      <p className="text-paper/60 text-sm mt-5">
        No account yet?{" "}
        <Link href="/signup" className="text-paper underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
