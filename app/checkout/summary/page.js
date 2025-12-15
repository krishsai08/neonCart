"use client";

import { useCheckout } from "../../../context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";

export default function Summary() {
  const { step, address, payment } = useCheckout();
  const router = useRouter();
  const { cart } = useCart();

  if (step < 3) router.push("/checkout/address");

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>

      <section className="mb-4">
        <h2 className="font-semibold">Shipping</h2>
        {address ? (
          <div className="text-sm text-muted">
            <div>{address.name}</div>
            <div>{address.street}</div>
            <div>
              {address.city}, {address.state} {address.postal}
            </div>
            <div>{address.phone}</div>
          </div>
        ) : (
          <div className="text-sm text-red-400">
            No address — please complete shipping
          </div>
        )}
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Payment</h2>
        {payment ? (
          <div className="text-sm text-muted">
            {payment.method === "card"
              ? `Card ending ${payment.details?.last4}`
              : payment.method}
          </div>
        ) : (
          <div className="text-sm text-red-400">No payment selected</div>
        )}
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Items</h2>
        <div className="space-y-2">
          {cart.map((i) => (
            <div key={`${i.id}-${i.qty}`} className="flex justify-between">
              <div>
                {i.name} × {i.qty}
              </div>
              <div>₹{i.price * i.qty}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-between items-center mt-6">
        <div className="text-lg font-semibold">Total: ₹{total}</div>
        <div>
          <button
            onClick={() => router.push("/checkout/confirm")}
            className="bg-primary text-black px-4 py-2 rounded"
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
