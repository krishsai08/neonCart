"use client";

//orders page that displays user's past orders
//fetches orders from supabase on component mount
//shows loading state while fetching
//if not logged in, prompts user to login
//if no orders, shows message indicating no orders placed yet
//displays each order with date, status, items, and total amount
//uses OrderCard and StatusBadge components for display
//handles different order statuses with colored badges
//links each order to its detailed view page
//uses useAuth context to get current user
//uses supabase client for data fetching

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (user) fetchOrders();
    else setFetching(false);
  }, [loading, user]);

  async function fetchOrders() {
    setFetching(true);

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        final_amount,
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
      .order("created_at", { ascending: false });

    if (error) {
      console.error("FETCH ORDERS ERROR:", error);
    } else {
      setOrders(data || []);
    }

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

//components

function OrderCard({ order }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-4 space-y-3 hover:shadow-md">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{new Date(order.created_at).toDateString()}</span>
        <StatusBadge status={order.status} />
      </div>

      <div className="space-y-2">
        {order.order_items.slice(0, 2).map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-semibold border-t pt-2">
        <span>Total</span>
        <span>₹{order.final_amount}</span>
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
    <span className={`px-2 py-0.5 rounded text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}
