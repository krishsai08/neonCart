"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {cart.map((i) => (
        <div key={i.id} className="flex justify-between mb-2">
          <span>
            {i.name} x {i.qty}
          </span>
          <div>
            <button onClick={() => dispatch({ type: "INC", payload: i.id })}>
              +
            </button>
            <button onClick={() => dispatch({ type: "DEC", payload: i.id })}>
              -
            </button>
            <button onClick={() => dispatch({ type: "REMOVE", payload: i.id })}>
              ❌
            </button>
          </div>
        </div>
      ))}
      <h2>Total: ₹{total}</h2>
      <Link href="/checkout/address">
        <button className="mt-4 bg-primary px-4 py-2 rounded">Checkout</button>
      </Link>
    </div>
  );
}
