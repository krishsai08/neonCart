"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [nextPath, setNextPath] = useState("/products");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(params.get("next") || "/products");
  }, []);

  useEffect(() => {
    if (!loading && user) router.replace(nextPath);
  }, [user, loading, router, nextPath]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace(nextPath);
  }

  if (loading || user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center auth-bg px-4">
      <div className="w-full max-w-md">
        <div className="card p-8 space-y-5">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">Login to continue shopping</p>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label mb-1 block">Email</label>
              <input
                type="email"
                required
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="label mb-1 block">Password</label>
              <input
                type="password"
                required
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={submitting}
              className="btn btn-primary w-full mt-2"
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-[#2874f0] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
