"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (user) fetchOrders();
    else setFetching(false);
  }, [user]);

  async function fetchOrders() {
    setFetching(true);

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        total_amount,
        status,
        created_at,
        order_items (
          id,
          name,
          price,
          quantity
        )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setOrders(data || []);
    setFetching(false);
  }

  if (loading || fetching) return null;

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">
        Please login to view your orders
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        You haven’t placed any orders yet 📦
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">My Orders</h1>

      {orders.map((order) => (
        <Link key={order.id} href={`/orders/${order.id}`} className="block">
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function OrderCard({ order }) {
  return (
    <div
      className="
        rounded-2xl bg-white border border-gray-200 p-4 space-y-3
        transition
        hover:shadow-md
        hover:border-gray-300
        active:scale-[0.99]
      "
    >
      {/* HEADER */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>{new Date(order.created_at).toDateString()}</span>
        <StatusBadge status={order.status} />
      </div>

      {/* ITEMS (PREVIEW) */}
      <div className="space-y-2">
        {order.order_items.slice(0, 2).map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="truncate">
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        {order.order_items.length > 2 && (
          <p className="text-xs text-gray-400">
            +{order.order_items.length - 2} more item(s)
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center font-semibold border-t pt-2">
        <span>Total</span>
        <span>₹{order.total_amount}</span>
      </div>

      <p className="text-xs text-blue-600 font-medium">View order details →</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    placed: "bg-blue-100 text-blue-700",
    shipped: "bg-yellow-100 text-yellow-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        px-2 py-0.5 rounded text-xs capitalize
        ${styles[status] || "bg-gray-100 text-gray-600"}
      `}
    >
      {status}
    </span>
  );
}
