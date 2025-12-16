"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // If user is already logged in, redirect
  useEffect(() => {
    if (!loading && user) {
      router.replace("/products");
    }
  }, [user, loading, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    // ✅ Email sent → show confirmation UI
    setSubmitted(true);
  }

  if (loading) return null;
  if (user) return null;

  /* ===============================
     EMAIL CONFIRMATION SCREEN
  =============================== */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-surface border border-border rounded-2xl shadow-soft p-8 space-y-6 text-center">
            <h1 className="text-2xl font-semibold text-text-main">
              Check your email 📩
            </h1>

            <p className="text-sm text-text-muted">
              We’ve sent a confirmation link to:
            </p>

            <p className="font-medium text-text-main break-all">{email}</p>

            <p className="text-sm text-text-muted">
              Click the link in the email to verify your account and start
              shopping on NeonCart.
            </p>

            <div className="pt-4">
              <Link href="/login" className="btn btn-primary w-full py-2.5">
                Go to Login
              </Link>
            </div>

            <p className="text-xs text-text-muted">
              Didn’t receive the email? Check spam or try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  //SIGNUP FORM

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-border rounded-2xl shadow-soft p-8 space-y-6">
          {/* Header COmponnet */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold text-text-main">
              Create account
            </h1>
            <p className="text-sm text-text-muted">
              Join NeonCart and start shopping
            </p>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label mb-1 block">Full name</label>
              <input
                type="text"
                required
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

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
                minLength={6}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
              />
            </div>

            <button className="btn btn-primary w-full py-2.5">
              Create account
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-accent font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
