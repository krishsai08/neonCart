"use client";

import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { createOrder } from "../../../lib/apiOrders";
import { useRouter } from "next/navigation";

export default function Confirm() {
  const { cart, dispatch } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  async function handleConfirm() {
    await createOrder({
      userId: user.id,
      cart,
      total,
    });

    cart.forEach((i) => dispatch({ type: "REMOVE", payload: i.id }));

    router.push("/orders");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Confirm Order</h1>
      <p>Total: ₹{total}</p>
      <button
        onClick={handleConfirm}
        className="mt-4 bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
