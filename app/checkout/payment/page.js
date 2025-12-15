"use client";

import { useState } from "react";
import { useCheckout } from "../../../context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function Payment() {
  const { step, setPayment, setStep } = useCheckout();
  const router = useRouter();

  if (step < 2) router.push("/checkout/address");

  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ name: "", number: "", exp: "", cvv: "" });
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (method === "card") {
      if (
        !card.name.trim() ||
        !/^[0-9]{12,19}$/.test(card.number) ||
        !/^[0-9]{3,4}$/.test(card.cvv)
      ) {
        setError("Please enter valid card details");
        return;
      }
    }

    setPayment({
      method,
      details:
        method === "card"
          ? { name: card.name, last4: card.number.slice(-4) }
          : null,
    });
    setStep(3);
    router.push("/checkout/summary");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>
      {error && <div className="text-red-400 mb-2">{error}</div>}

      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="method"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            <span>Credit / Debit Card</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="method"
              checked={method === "upi"}
              onChange={() => setMethod("upi")}
            />
            <span>UPI</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="method"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        {method === "card" && (
          <div className="space-y-2">
            <input
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
              placeholder="Name on card"
              className="w-full p-3 rounded bg-bg"
            />
            <input
              value={card.number}
              onChange={(e) =>
                setCard({ ...card, number: e.target.value.replace(/\s+/g, "") })
              }
              placeholder="Card number"
              className="w-full p-3 rounded bg-bg"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={card.exp}
                onChange={(e) => setCard({ ...card, exp: e.target.value })}
                placeholder="MM/YY"
                className="p-3 rounded bg-bg"
              />
              <input
                value={card.cvv}
                onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                placeholder="CVV"
                className="p-3 rounded bg-bg"
              />
            </div>
          </div>
        )}

        {method === "upi" && (
          <div>
            <input
              placeholder="UPI ID (e.g. name@bank)"
              className="w-full p-3 rounded bg-bg"
            />
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-black px-4 py-2 rounded"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
