"use client";

// CartContext to manage shopping cart state
// Features:
//  Provides cart items and dispatch function
//  Reducer handles ADD, INC, DEC, REMOVE actions
//  useCart hook for easy access to cart context
//  Ensures proper usage within CartProvider
//  Initial cart state is an empty array

import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const exists = state.find((i) => i.id === action.payload.id);
      if (exists)
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...state, { ...action.payload, qty: 1 }];

    case "INC":
      return state.map((i) =>
        i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
      );

    case "DEC":
      return state.map((i) =>
        i.id === action.payload && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      );

    case "REMOVE":
      return state.filter((i) => i.id !== action.payload);

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
