"use client";

// CheckoutContext to manage checkout process state
// Features:
//  Manages current checkout step, address, and payment info
//  useCheckout hook for easy access to checkout context
//  Ensures proper usage within CheckoutProvider
//  Initial states for step, address, and payment

import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);

  return (
    <CheckoutContext.Provider
      value={{ step, setStep, address, setAddress, payment, setPayment }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);
