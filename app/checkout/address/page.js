"use client";

import { useState } from "react";
import { useCheckout } from "../../../context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function Address() {
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
  const [error, setError] = useState("");

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name.trim()) return "Name is required";
    if (!form.street.trim()) return "Street address is required";
    if (!form.city.trim()) return "City is required";
    if (!form.postal.trim()) return "Postal code is required";
    if (!/^[0-9]{6,10}$/.test(form.postal)) return "Postal code looks invalid";
    if (!/^[0-9]{7,15}$/.test(form.phone)) return "Phone number looks invalid";
    return "";
  }

  function submit(e) {
    e.preventDefault();
    const err = validate();
    setError(err);
    if (err) return;

    setAddress({ ...form });
    setStep(2);
    router.push("/checkout/payment");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Shipping Address</h1>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={update}
          placeholder="Full name"
          className="w-full p-3 rounded bg-bg"
        />
        <input
          name="street"
          value={form.street}
          onChange={update}
          placeholder="Street address"
          className="w-full p-3 rounded bg-bg"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="city"
            value={form.city}
            onChange={update}
            placeholder="City"
            className="p-3 rounded bg-bg"
          />
          <input
            name="state"
            value={form.state}
            onChange={update}
            placeholder="State"
            className="p-3 rounded bg-bg"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="postal"
            value={form.postal}
            onChange={update}
            placeholder="Postal code"
            className="p-3 rounded bg-bg"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={update}
            placeholder="Phone"
            className="p-3 rounded bg-bg"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-black px-4 py-2 rounded"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
}
