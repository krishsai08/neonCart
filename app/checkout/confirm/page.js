"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { useCheckout } from "../../../context/CheckoutContext";
import { createOrder } from "../../../lib/apiOrders";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import Spinner from "../../../components/Spinner";

export default function ConfirmPage() {
  const { cart, dispatch } = useCart();
  const { setStep } = useCheckout();
  const { user } = useAuth();
  const router = useRouter();

  const [placing, setPlacing] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  async function confirm() {
    if (placing) return;

    setPlacing(true);

    try {
      await createOrder({ userId: user.id, cart, total });

      cart.forEach((i) => dispatch({ type: "REMOVE", payload: i.id }));

      setStep(1);
      router.replace("/orders");
    } catch (err) {
      console.error("Order failed", err);
      setPlacing(false);
    }
  }

  //ORDER PLACING LOADER

  if (placing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Spinner size={42} />
        <p className="text-sm text-text-muted">Placing your order…</p>
      </div>
    );
  }

  return (
    <div className="card p-8 max-w-xl mx-auto text-center space-y-4">
      <h1 className="text-2xl font-semibold text-green-600">
        Order Confirmed 🎉
      </h1>

      <p className="text-text-muted">Thank you for shopping with NeonCart.</p>

      <div className="font-semibold text-lg">Total Paid: ₹{total}</div>

      <button onClick={confirm} className="btn btn-primary w-full mt-4">
        View My Orders
      </button>
    </div>
  );
}
