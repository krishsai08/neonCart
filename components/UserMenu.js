"use client";

// UserMenu component
// Displays user initials and a dropdown menu with account options
// Features:
//  User initials display
//  Dropdown menu with account links
//  Logout functionality
//  Closes menu when clicking outside
//  Uses useAuth context for user info
//  Styled with Tailwind CSS classes
//  Responsive and user-friendly UI/UX

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function UserMenu() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const name = user?.user_metadata?.full_name || user?.email;
  const initial = name?.[0]?.toUpperCase();

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="
          w-10 h-10 rounded-full
          bg-white/20 text-white font-semibold
          flex items-center justify-center
        "
        aria-label="User menu"
      >
        {initial}
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-48
            bg-white text-black
            rounded-xl shadow-lg
            overflow-hidden
          "
        >
          <div className="px-4 py-3 border-b text-sm">
            <p className="font-medium truncate">{name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <nav className="flex flex-col text-sm">
            <MenuLink href="/user">My Account</MenuLink>
            <MenuLink href="/orders">Orders</MenuLink>
            <MenuLink href="/cart">Cart</MenuLink>

            <button
              onClick={logout}
              className="px-4 py-3 text-left text-red-600"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

function MenuLink({ href, children }) {
  return (
    <Link href={href} className="px-4 py-3">
      {children}
    </Link>
  );
}
