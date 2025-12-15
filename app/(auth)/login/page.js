"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🚫 Block logged-in users
  useEffect(() => {
    if (!loading && user) router.push("/products");
  }, [user, loading, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/products");
  }

  if (loading || user) return null;

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
          placeholder="Email address"
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

        <button className="w-full bg-primary py-3 rounded text-black font-semibold hover:opacity-90 transition">
          Login
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
