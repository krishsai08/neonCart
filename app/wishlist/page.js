"use client";

// Wishlist Page - Displays products added to the wishlist
// Features:
//  Fetches wishlist product IDs from WishlistContext
//  Retrieves product details from Supabase based on wishlist IDs
//  Shows empty state when no products are wishlisted
//  Displays products in a responsive grid using ProductCard component
//  Manages loading states for wishlist and product fetching
// Uses Tailwind CSS for styling
// Utilizes useEffect for data fetching on wishlist changes
// Uses useState for managing products and fetching state
// Supabase client for database interactions

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

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
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-4">
        <span className="text-5xl">🤍</span>

        <h2 className="text-2xl font-semibold text-gray-800">
          Your wishlist is empty
        </h2>

        <p className="text-gray-500">
          Save items you love and come back later.
        </p>

        <Link
          href="/products"
          className="bg-accent text-white px-6 py-2 rounded"
        >
          Explore Products
        </Link>
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
