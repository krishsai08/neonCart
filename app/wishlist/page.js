"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist, loading } = useWishlist();
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) {
      setProducts([]);
      setFetching(false);
      return;
    }

    fetchProducts();
  }, [wishlist]);

  async function fetchProducts() {
    setFetching(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("id", wishlist);

    if (!error) setProducts(data || []);
    setFetching(false);
  }

  if (loading || fetching) return null;

  if (products.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Your wishlist is empty 💔
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
