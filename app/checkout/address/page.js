"use client";

//asks the user to enter delivery address details during checkout process
//on submitting valid details, saves the address in checkout context and navigates to /checkout/payment
//validates that all fields are filled before allowing submission
//uses useCheckout context to set address and step

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

  const [error, setError] = useState("");

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function isValid() {
    return Object.values(form).every((value) => value.trim() !== "");
  }

  function submit(e) {
    e.preventDefault();

    if (!isValid()) {
      setError("Please fill in all address details");
      return;
    }

    setAddress(form);
    setStep(2);
    router.push("/checkout/payment");
  }

  return (
    <div className="card p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Delivery Address</h1>

      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      <form onSubmit={submit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={update}
          className="input"
          placeholder="Full name"
        />

        <input
          name="street"
          value={form.street}
          onChange={update}
          className="input"
          placeholder="Street address"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="city"
            value={form.city}
            onChange={update}
            className="input"
            placeholder="City"
          />
          <input
            name="state"
            value={form.state}
            onChange={update}
            className="input"
            placeholder="State"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="postal"
            value={form.postal}
            onChange={update}
            className="input"
            placeholder="Postal code"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={update}
            className="input"
            placeholder="Phone number"
          />
        </div>

        <div className="flex justify-end">
          <button
            disabled={!isValid()}
            className="
              btn btn-primary
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
