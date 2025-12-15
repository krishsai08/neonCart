"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {
  const { dispatch } = useCart();

  if (!product) return null;

  return (
    <button
      onClick={() => dispatch({ type: "ADD", payload: product })}
      className="mt-4 bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded shadow"
    >
      Add to Cart
    </button>
  );
}
