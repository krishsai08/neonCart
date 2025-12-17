"use client";

import { useCart } from "@/context/CartContext";

// Mini Add to Cart component for product listings
// Props: product - the product object to add to cart
// Features:
//  If product is not in cart, shows "+ Cart" button
//  If product is in cart, shows quantity controls and remove option
//  Uses useCart context for cart state management
//  Styled with Tailwind CSS classes
//  Handles adding, incrementing, decrementing, and removing items from cart
//  Prevents event propagation to avoid unwanted navigation when used inside links
//  Compact design suitable for product listing pages
//  Clear visual feedback for different states (in cart vs not in cart)
//  Easy to integrate into product listing components

export default function AddToCartMini({ product }) {
  const { cart, dispatch } = useCart();
  const item = cart.find((i) => i.id === product.id);

  if (!item) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch({ type: "ADD", payload: { ...product, qty: 1 } });
        }}
        className="text-xs px-3 py-1 rounded-full bg-accent text-white"
      >
        + Cart
      </button>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="flex items-center gap-1"
    >
      <button
        onClick={() => dispatch({ type: "DEC", payload: product.id })}
        className="px-2 py-0.5 text-xs bg-surface border rounded"
      >
        −
      </button>

      <span className="text-xs font-medium min-w-[14px] text-center">
        {item.qty}
      </span>

      <button
        onClick={() => dispatch({ type: "INC", payload: product.id })}
        className="px-2 py-0.5 text-xs bg-surface border rounded"
      >
        +
      </button>

      <button
        onClick={() => dispatch({ type: "REMOVE", payload: product.id })}
        className="ml-1 text-[10px] text-red-500"
      >
        Remove
      </button>
    </div>
  );
}
