"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchWishlist();
    else {
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  async function fetchWishlist() {
    setLoading(true);
    const { data } = await supabase
      .from("wishlists")
      .select("product_id")
      .eq("user_id", user.id);

    setWishlist(data?.map((w) => w.product_id) || []);
    setLoading(false);
  }

  async function toggleWishlist(productId) {
    if (!user) return;

    const isWishlisted = wishlist.includes(productId);

    // Optimistic UI
    setWishlist((prev) =>
      isWishlisted
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    if (isWishlisted) {
      await supabase
        .from("wishlists")
        .delete()
        .eq("product_id", productId)
        .eq("user_id", user.id);
    } else {
      await supabase.from("wishlists").insert({
        product_id: productId,
        user_id: user.id,
      });
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted: (id) => wishlist.includes(id),
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
