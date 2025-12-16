"use client";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }) {
  const { cart, dispatch } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  // Check if product already in cart
  const item = cart.find((c) => c.id === product.id);

  // 🔒 Not logged in
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

  // 🛒 Already in cart → show quantity controls
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

  // ➕ Not in cart yet
  return (
    <button
      onClick={() => dispatch({ type: "ADD", payload: { ...product, qty: 1 } })}
      className="btn btn-primary w-full mt-4"
    >
      Add to Cart
    </button>
  );
}
