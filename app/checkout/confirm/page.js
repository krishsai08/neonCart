"use client";

//final confirmation page during checkout process
//displays order summary with subtotal, tax, total
//on confirming order, creates order via createOrder API function
//clears cart and navigates to /orders page
//shows loading spinner while order is being placed
//uses useCart, useCheckout, and useAuth contexts
//handles placing state to prevent duplicate orders

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { createOrder } from "@/lib/apiOrders";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Spinner from "@/components/Spinner";

const TAX_RATE = 0.18;

export default function ConfirmPage() {
  const { cart, dispatch } = useCart();
  const { setStep } = useCheckout();
  const { user } = useAuth();
  const router = useRouter();

  const [placing, setPlacing] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const discount = 0;
  const couponDiscount = 0;
  const total = subtotal + tax - discount - couponDiscount;

  async function confirmOrder() {
    if (placing || cart.length === 0) return;

    setPlacing(true);

    try {
      await createOrder({
        userId: user.id,
        items: cart,
        pricing: {
          subtotal,
          tax,
          discount,
          couponDiscount,
          total,
        },
        couponCode: null,
      });

      cart.forEach((i) => dispatch({ type: "REMOVE", payload: i.id }));
      setStep(1);
      router.replace("/orders");
    } catch (err) {
      console.error("Order failed", err);
      setPlacing(false);
    }
  }

  if (placing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size={42} />
      </div>
    );
  }

  return (
    <div className="card p-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Confirm your order</h1>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax}</span>
        </div>
        <div className="flex justify-between font-semibold border-t pt-3">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button onClick={confirmOrder} className="btn btn-primary w-full">
        Place Order
      </button>
    </div>
  );
}
