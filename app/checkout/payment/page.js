"use client";

import { useCheckout } from "../../../context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function Payment() {
  const { step, setPayment, setStep } = useCheckout();
  const router = useRouter();

  if (step < 2) router.push("/checkout/address");

  function submit() {
    setPayment(true);
    setStep(3);
    router.push("/checkout/summary");
  }

  return <button onClick={submit}>Pay</button>;
}
