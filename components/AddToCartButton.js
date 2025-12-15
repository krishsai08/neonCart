"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {
  const { dispatch } = useCart();

  if (!product) return null;

  return (
    <button
      onClick={() => dispatch({ type: "ADD", payload: product })}
      className="mt-4 bg-accent text-black px-6 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}
