"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "@/components/UserMenu";
import { useWishlist } from "@/context/WishlistContext";

// Header component with theme toggle, cart, wishlist, and user menu
// Features:
//  Theme toggle button (light/dark)
//  Cart link with item count
//  Wishlist link with item count
//  User menu for logged-in users
//  Login button for guests
//  Responsive layout with Tailwind CSS classes
//  Uses useTheme, useCart, useAuth, and useWishlist contexts for state management

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { cart } = useCart();
  const { user } = useAuth();
  const { wishlist } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-[#748873]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
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

        <div className="flex items-center gap-3">
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
              <Link
                href="/cart"
                className="text-white  text-xl flex items-center gap-1"
              >
                🛒
                <span className="text-xs">({cart.length})</span>
              </Link>
              <Link href="/wishlist" className="text-white text-sm">
                ❤️ {wishlist?.length}
              </Link>

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
