"use client";

import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
  const { address, payment, setStep } = useCheckout();
  const { cart } = useCart();
  const router = useRouter();

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="card p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Order Summary</h1>

      <div className="text-sm text-gray-600">
        <b>Shipping</b>
        <p>{address?.name}</p>
        <p>{address?.street}</p>
      </div>

      <div className="text-sm">
        <b>Payment:</b> Card ending {payment?.card?.number?.slice(-4)}
      </div>

      <div className="font-semibold text-lg">Total: ₹{total}</div>

      <div className="flex justify-between pt-4">
        <button onClick={() => router.back()} className="btn btn-ghost">
          Back
        </button>

        <button
          onClick={() => {
            setStep(4);
            router.push("/checkout/confirm");
          }}
          className="btn btn-primary"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
