"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "@/components/UserMenu";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { cart } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#748873]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link
          href="/products"
          className="
    text-lg font-semibold text-white
    tracking-tight
    font-[var(--font-playfair)]
  "
        >
          NeonCart
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="
              w-9 h-9 rounded-full
              bg-white/20 text-white
              flex items-center justify-center
            "
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user ? (
            <>
              {/* Cart */}
              <Link
                href="/cart"
                className="text-white  text-xl flex items-center gap-1"
              >
                🛒
                <span className="text-xs">({cart.length})</span>
              </Link>

              {/* User dropdown */}
              <UserMenu />
            </>
          ) : (
            <Link
              href="/login"
              className="
                px-4 py-2 rounded-lg
                bg-white text-[#748873]
                text-sm font-medium
              "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
