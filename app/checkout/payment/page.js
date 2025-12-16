"use client";

import { useCheckout } from "../../../context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const { setPayment, setStep } = useCheckout();
  const router = useRouter();

  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  function update(e) {
    setCard({ ...card, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();

    // basic validation for card written by regex
    if (method === "card") {
      if (
        !card.name ||
        !/^[0-9]{12,19}$/.test(card.number) ||
        !/^[0-9]{2}\/[0-9]{2}$/.test(card.expiry) ||
        !/^[0-9]{3,4}$/.test(card.cvv)
      ) {
        alert("Please enter valid card details");
        return;
      }
    }

    setPayment({
      method,
      card: method === "card" ? card : null,
    });

    setStep(3);
    router.push("/checkout/summary");
  }

  return (
    <div className="card p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Payment Method</h1>

      <form onSubmit={submit} className="space-y-5">
        {/* CARD OPTION */}
        <label className="flex gap-2 items-center">
          <input
            type="radio"
            name="payment"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Credit / Debit Card
        </label>

        {method === "card" && (
          <div className="space-y-3 pl-6">
            <input
              name="name"
              value={card.name}
              onChange={update}
              className="input"
              placeholder="Name on card"
            />
            <input
              name="number"
              value={card.number}
              onChange={update}
              className="input"
              placeholder="Card number"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                name="expiry"
                value={card.expiry}
                onChange={update}
                className="input"
                placeholder="MM/YY"
              />
              <input
                name="cvv"
                value={card.cvv}
                onChange={update}
                className="input"
                placeholder="CVV"
              />
            </div>
          </div>
        )}

        {/* COD OPTION */}
        <label className="flex gap-2 items-center">
          <input
            type="radio"
            name="payment"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          Cash on Delivery
        </label>

        {/* NAVIGATION */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-ghost"
          >
            Back
          </button>
          <button className="btn btn-primary">Review Order</button>
        </div>
      </form>
    </div>
  );
}
