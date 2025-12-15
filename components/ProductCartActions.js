"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function ProductCartActions({ product }) {
  const { cart, dispatch } = useCart();
  const item = cart.find((c) => c.id === product.id);

  if (!item)
    return (
      <button
        onClick={() =>
          dispatch({ type: "ADD", payload: { ...product, qty: 1 } })
        }
        className="mt-4 bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded"
      >
        Add to Cart
      </button>
    );

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => dispatch({ type: "DEC", payload: product.id })}
        className="px-3 py-1 bg-surface border rounded"
      >
        -
      </button>
      <span className="font-medium">{item.qty}</span>
      <button
        onClick={() => dispatch({ type: "INC", payload: product.id })}
        className="px-3 py-1 bg-surface border rounded"
      >
        +
      </button>
      <button
        onClick={() => dispatch({ type: "REMOVE", payload: product.id })}
        className="px-3 py-1 text-sm text-red-500"
      >
        Remove
      </button>
    </div>
  );
}
