"use client";

import { useState } from "react";
import { useCheckout } from "../../../context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function AddressPage() {
  const { setAddress, setStep } = useCheckout();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postal: "",
    phone: "",
  });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    setAddress(form);
    setStep(2);
    router.push("/checkout/payment");
  }

  return (
    <div className="card p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Delivery Address</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          name="name"
          onChange={update}
          className="input"
          placeholder="Full name"
        />
        <input
          name="street"
          onChange={update}
          className="input"
          placeholder="Street address"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="city"
            onChange={update}
            className="input"
            placeholder="City"
          />
          <input
            name="state"
            onChange={update}
            className="input"
            placeholder="State"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="postal"
            onChange={update}
            className="input"
            placeholder="Postal code"
          />
          <input
            name="phone"
            onChange={update}
            className="input"
            placeholder="Phone number"
          />
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary">Continue</button>
        </div>
      </form>
    </div>
  );
}
