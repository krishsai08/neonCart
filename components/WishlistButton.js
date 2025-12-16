"use client";

import { useWishlist } from "@/context/WishlistContext";

export default function WishlistButton({ productId }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(productId);

  function handleClick(e) {
    e.preventDefault(); // ⛔ stop Link navigation
    e.stopPropagation(); // ⛔ stop bubbling
    toggleWishlist(productId);
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle wishlist"
      className="
        absolute top-3 right-3 z-10
        w-9 h-9 rounded-full
        bg-white/90
        flex items-center justify-center
        text-lg
        shadow-sm
      "
    >
      {active ? "❤️" : "🤍"}
    </button>
  );
}
