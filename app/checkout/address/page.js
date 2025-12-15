"use client";

import { useCheckout } from "../../../context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function Address() {
  const { setAddress, setStep } = useCheckout();
  const router = useRouter();

  function submit() {
    setAddress(true);
    setStep(2);
    router.push("/checkout/payment");
  }

  return <button onClick={submit}>Save Address</button>;
}
