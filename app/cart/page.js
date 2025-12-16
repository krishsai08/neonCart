"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const router = useRouter();

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AuthGuard>
      <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
        {/* CART ITEMS */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Your Cart</h1>

          {cart.length === 0 && (
            <p className="text-gray-600">Your cart is empty.</p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              {/* CLICKABLE PRODUCT PREVIEW */}
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

              {/* ACTIONS */}
              <div className="flex flex-row sm:flex-col gap-3 items-center">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch({ type: "DEC", payload: item.id })}
                    className="btn btn-ghost px-3"
                  >
                    −
                  </button>

                  <span className="font-medium">{item.qty}</span>

                  <button
                    onClick={() => dispatch({ type: "INC", payload: item.id })}
                    className="btn btn-ghost px-3"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch({ type: "REMOVE", payload: item.id })}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>

              {/* PRICE */}
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
            <span>Total items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-3">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => router.push("/checkout/address")}
            className="
              btn btn-primary w-full mt-4
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
