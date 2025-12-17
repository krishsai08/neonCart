"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import { useState } from "react";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const router = useRouter();

  //const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // inside CartPage component (above return)
  const TAX_RATE = 0.18;

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const total = subtotal + tax - discount;

  function applyCoupon() {
    setCouponError("");
    setDiscount(0);

    if (coupon === "NEON10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else if (coupon === "NEON20") {
      if (subtotal >= 1000) {
        setDiscount(Math.round(subtotal * 0.2));
      } else {
        setCouponError("Minimum cart value ₹1000 required");
      }
    } else {
      setCouponError("Invalid coupon code");
    }
  }

  return (
    <AuthGuard>
      {cart.length === 0 ? (
        // ✅ EMPTY CART STATE
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-4">
          <span className="text-5xl">🛒</span>

          <h2 className="text-2xl font-semibold text-gray-800">
            Your cart is empty
          </h2>

          <p className="text-gray-500">
            Looks like you haven’t added anything yet.
          </p>

          <Link
            href="/products"
            className="bg-primary text-white px-6 py-2 rounded"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        // ✅ NORMAL CART UI
        <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
          {/* CART ITEMS */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Your Cart</h1>

            {cart.map((item) => (
              <div
                key={item.id}
                className="card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <Link
                  href={`/products/${item.id}`}
                  className="flex gap-4 flex-1 group"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={90}
                    className="rounded-lg object-cover group-hover:opacity-90"
                  />

                  <div>
                    <h3 className="font-medium text-gray-800 group-hover:underline">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </Link>

                <div className="flex flex-row sm:flex-col gap-3 items-center">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        dispatch({ type: "DEC", payload: item.id })
                      }
                      className="btn bg-emerald-100 btn-ghost px-3"
                    >
                      −
                    </button>

                    <span className="font-medium">{item.qty}</span>

                    <button
                      onClick={() =>
                        dispatch({ type: "INC", payload: item.id })
                      }
                      className="btn bg-emerald-100 btn-ghost px-3"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE", payload: item.id })
                    }
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="font-semibold text-gray-800 sm:text-right min-w-[80px]">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="card p-4 h-fit">
            <h2 className="font-semibold mb-4">Price Details</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Tax (18%)</span>
              <span>₹{tax}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm mb-2 text-green-600">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
            )}

            {/* COUPON */}
            <div className="mt-4">
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Coupon code"
                  className="flex-1 border rounded px-3 py-2 text-sm"
                />
                <button onClick={applyCoupon} className="btn btn-ghost px-4">
                  Apply
                </button>
              </div>

              {couponError && (
                <p className="text-xs text-red-500 mt-1">{couponError}</p>
              )}
            </div>

            <div className="flex justify-between font-semibold text-lg border-t pt-3 mt-4">
              <span>Total Payable</span>
              <span>₹{total}</span>
            </div>

            <button
              disabled={cart.length === 0}
              onClick={() => router.push("/checkout/address")}
              className="btn btn-primary w-full mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </AuthGuard>
  );
}
