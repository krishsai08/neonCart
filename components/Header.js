"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Header() {
  const { cart } = useCart();
  const { user } = useAuth();

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <header className="flex justify-between items-center p-4 bg-surface border-b border-primary/10">
      <Link href="/products" className="font-bold text-primary text-lg">
        NEONCART
      </Link>

      <div className="flex gap-4 items-center">
        {user && (
          <>
            <Link href="/user">Account</Link>
            <Link href="/orders" className="text-muted">
              My Orders
            </Link>
            <Link href="/cart" className="text-muted">
              Cart ({cart.length})
            </Link>
            <button onClick={handleLogout} className="text-sm text-red-400">
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}
