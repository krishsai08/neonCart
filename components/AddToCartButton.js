"use client";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

// AddToCartButton component
// Props: product - the product object to add to cart
// Features:
//  If user is not logged in, prompts to login
//  If product is in cart, shows quantity controls and remove option
//  If product is not in cart, shows "Add to Cart" button
//  Uses useCart and useAuth contexts for cart and user state management
//  Styled with Tailwind CSS classes
//  Handles adding, incrementing, decrementing, and removing items from cart
//  Responsive and usefriendly UI/UX
//  Prevents actions if user is not authenticated
//  Full width button for better accessibility on mobile devices
//  Clear visual feedback for different states (in cart vs not in cart)
//  Easy to integrate into product detail pages
//  Reusable component for consistent cart functionality across the app

export default function AddToCartButton({ product }) {
  const { cart, dispatch } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const item = cart.find((c) => c.id === product.id);

  if (!user) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="btn btn-ghost w-full mt-4"
      >
        Login to add to cart
      </button>
    );
  }

  if (item) {
    return (
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => dispatch({ type: "DEC", payload: product.id })}
          className="btn bg-emerald-300 btn-ghost px-3"
        >
          −
        </button>

        <span className="min-w-[24px] text-center font-medium">{item.qty}</span>

        <button
          onClick={() => dispatch({ type: "INC", payload: product.id })}
          className="btn bg-emerald-300 btn-ghost px-3"
        >
          +
        </button>

        <button
          onClick={() => dispatch({ type: "REMOVE", payload: product.id })}
          className="text-sm text-red-500 ml-2"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => dispatch({ type: "ADD", payload: { ...product, qty: 1 } })}
      className="btn btn-primary w-full mt-4"
    >
      Add to Cart
    </button>
  );
}
