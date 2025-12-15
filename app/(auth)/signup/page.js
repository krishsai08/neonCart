"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";

export default function SignupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [next, setNext] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setNext(params.get("next") ?? "/products");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // 🚫 Block logged-in users
  useEffect(() => {
    if (!loading && user && next !== null) router.push(next);
  }, [user, loading, router, next]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signUp(
      { email, password },
      { data: { full_name: name, phone } }
    );

    if (error) {
      setError(error.message);
      return;
    }

    // Supabase auto-login if email confirmation is OFF
    router.push(next);
  }

  if (loading || user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-surface p-6 rounded-2xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-primary">
          Create NeonCart Account
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
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-bg outline-none"
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-bg outline-none"
          type="password"
          placeholder="Password (min 6 chars)"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-gradient-to-r from-primary to-accent py-3 rounded text-white font-semibold hover:opacity-90 transition">
          Sign Up
        </button>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
