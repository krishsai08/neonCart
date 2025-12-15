"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [next, setNext] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setNext(params.get("next") ?? "/products");

      // If user is already signed in according to Supabase, redirect
      (async () => {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          const target = params.get("next") ?? "/products";
          router.replace(target);
        }
      })();
    }
  }, [router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Compute redirect target reliably from `next` state or URL
    let redirectTo = next;
    if (!redirectTo && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      redirectTo = params.get("next") ?? "/products";
    }

    router.replace(redirectTo ?? "/products");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-surface p-6 rounded-2xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-primary">
          Login to NeonCart
        </h1>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <input
          className="w-full p-3 rounded bg-bg outline-none"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-bg outline-none"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-primary py-3 rounded text-black font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-muted">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-accent">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
