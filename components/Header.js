"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="flex justify-between p-4 bg-surface">
      <Link href="/products" className="font-bold text-primary">
        NEONCART
      </Link>
      <Link href="/cart">Cart ({cart.length})</Link>
      <Link href="/orders" className="mr-4">
        My Orders
      </Link>
    </header>
  );
}
