"use client";

import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Header() {
  const { cart } = useCart();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <Link
          href="/products"
          className="text-xl font-semibold tracking-tight text-[#2874f0]"
        >
          NeonCart
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 transition"
            title="Toggle theme"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {/* Navigation */}
          {user ? (
            <>
              <Link
                href="/cart"
                className="text-sm text-gray-700 hover:text-[#2874f0] transition"
              >
                Cart <span className="text-gray-400">({cart.length})</span>
              </Link>

              <Link
                href="/orders"
                className="text-sm text-gray-700 hover:text-[#2874f0] transition"
              >
                Orders
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
