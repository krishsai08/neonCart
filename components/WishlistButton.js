"use client";

import { useWishlist } from "@/context/WishlistContext";

// WishlistButton component to toggle product wishlist status
// Features:
//  Heart icon button (filled if wishlisted, outlined if not)
//  Uses useWishlist context for wishlist state management
//  Prevents event propagation to avoid triggering parent click handlers
//  Styled with Tailwind CSS classes

export default function WishlistButton({ productId }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(productId);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
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
