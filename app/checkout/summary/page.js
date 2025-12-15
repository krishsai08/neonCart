"use client";

import { useCheckout } from "../../../context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function Summary() {
  const { step } = useCheckout();
  const router = useRouter();

  if (step < 3) router.push("/checkout/address");

  return (
    <button onClick={() => router.push("/checkout/confirm")}>
      Confirm Order
    </button>
  );
}
