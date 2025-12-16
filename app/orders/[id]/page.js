"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function OrderDetail() {
  const { id } = useParams();
  const { user, loading } = useAuth();

  const [order, setOrder] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (user && id) fetchOrder();
    else if (!loading) setFetching(false);
  }, [user, id, loading]);

  async function fetchOrder() {
    setFetching(true);

    const { data } = await supabase
      .from("orders")
      .select(
        `
        id,
        total_amount,
        created_at,
        order_items (
          id,
          product_id,
          name,
          price,
          quantity
        )
      `
      )
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    setOrder(data);
    setFetching(false);
  }

  if (loading || fetching) return null;

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">
        Please login to view order details
      </div>
    );
  }

  if (!order) {
    return <div className="p-6 text-center text-gray-500">Order not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Order #{order.id.slice(0, 8)}
        </h1>
        <p className="text-sm text-gray-500">
          Placed on {new Date(order.created_at).toDateString()}
        </p>
      </div>

      {/* ITEMS */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
        {order.order_items.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.product_id}`}
            className="flex justify-between items-center p-2 rounded hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>

            <p className="font-semibold">₹{item.price * item.quantity}</p>
          </Link>
        ))}

        <div className="border-t pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{order.total_amount}</span>
        </div>
      </div>
    </div>
  );
}
