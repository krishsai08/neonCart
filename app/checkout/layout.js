"use client";

import AuthGuard from "../../components/AuthGuard";
import { useCheckout } from "../../context/CheckoutContext";

export default function CheckoutLayout({ children }) {
  const { step } = useCheckout();

  const steps = ["Address", "Payment", "Summary", "Confirm"];

  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto p-6">
        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`text-sm font-medium ${
                step === i + 1 ? "text-[#2874f0]" : "text-gray-400"
              }`}
            >
              {i + 1}. {s}
            </div>
          ))}
        </div>

        {children}
      </div>
    </AuthGuard>
  );
}
