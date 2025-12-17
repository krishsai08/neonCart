"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartMini({ product }) {
  const { cart, dispatch } = useCart();
  const item = cart.find((i) => i.id === product.id);

  // 🟢 NOT IN CART
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

  // 🟢 IN CART → SHOW MINI CONTROLS
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
