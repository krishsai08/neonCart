"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { useCheckout } from "../../../context/CheckoutContext";
import { createOrder } from "../../../lib/apiOrders";
import { useAuth } from "../../../context/AuthContext";

export default function ConfirmPage() {
  const { cart, dispatch } = useCart();
  const { setStep } = useCheckout();
  const { user } = useAuth();
  const router = useRouter();

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  async function confirm() {
    await createOrder({ userId: user.id, cart, total });
    cart.forEach((i) => dispatch({ type: "REMOVE", payload: i.id }));
    setStep(1);
    router.push("/orders");
  }

  return (
    <div className="card p-8 max-w-xl mx-auto text-center space-y-4">
      <h1 className="text-2xl font-semibold text-green-600">
        Order Confirmed 🎉
      </h1>

      <p className="text-gray-600">Thank you for shopping with NeonCart.</p>

      <div className="font-semibold text-lg">Total Paid: ₹{total}</div>

      <button onClick={confirm} className="btn btn-primary w-full mt-4">
        View My Orders
      </button>
    </div>
  );
}
