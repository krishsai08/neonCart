"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const router = useRouter();
  const { user, loading } = useAuth();

  function handleCheckout() {
    if (cart.length === 0) return;
    if (!user && !loading) return router.push("/login");
    router.push("/checkout/address");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((i) => (
          <div
            key={i.id}
            className="flex items-center gap-4 bg-surface p-4 rounded"
          >
            <Image
              src={i.image}
              alt={i.name}
              width={80}
              height={60}
              className="rounded object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-muted">₹{i.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch({ type: "DEC", payload: i.id })}
                    className="px-3 py-1 bg-bg rounded"
                  >
                    -
                  </button>
                  <div>{i.qty}</div>
                  <button
                    onClick={() => dispatch({ type: "INC", payload: i.id })}
                    className="px-3 py-1 bg-bg rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: "REMOVE", payload: i.id })}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-lg">Total: ₹{total}</h2>
        <button
          onClick={handleCheckout}
          className="mt-4 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
