"use client";

import { useEffect, useState } from "react";
import { getMyOrders } from "../../lib/apiOrders";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import AuthGuard from "../../components/AuthGuard";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) getMyOrders().then(setOrders);
  }, [user]);

  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block card p-4 mb-4 hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toDateString()}
                </p>
              </div>
              <div className="font-semibold">₹{order.total_amount}</div>
            </div>
          </Link>
        ))}
      </div>
    </AuthGuard>
  );
}
