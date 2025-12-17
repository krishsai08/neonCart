"use client";

//login form component. it is client component and contains two input fields which redirects to products page when the user give correct fields.
//it wont be shown if the user is already logged in
//redirects to /products

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";

export default function LoginClient() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [nextPath, setNextPath] = useState("/products");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(params.get("next") || "/products");
  }, []);

  useEffect(() => {
    if (!loading && user) {
      setRedirecting(true);
      router.replace(nextPath);
    }
  }, [user, loading, router, nextPath]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    setRedirecting(true);
  }

  if (loading || redirecting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Spinner size={42} />
        <p className="text-sm text-text-muted">Loading…</p>
      </div>
    );
  }

  if (user) return null;

  return (
    //login form
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-border rounded-2xl shadow-soft p-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold text-text-main">
              Welcome back
            </h1>
            <p className="text-sm text-text-muted">
              Login to continue shopping
            </p>
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
              className="btn btn-primary w-full py-2.5"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-text-muted">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-accent font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
