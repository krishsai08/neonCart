"use client";

import { useEffect, useState } from "react";
import { getMyOrders } from "../../lib/apiOrders";
import { useAuth } from "../../context/AuthContext";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) getMyOrders().then(setOrders);
  }, [user]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="bg-surface p-4 rounded-xl mb-4">
          <p className="text-sm text-muted">
            Order placed on {new Date(order.created_at).toLocaleDateString()}
          </p>

          {order.order_items.map((item) => (
            <div key={item.id} className="flex justify-between mt-2">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <div className="mt-3 font-bold">Total: ₹{order.total_amount}</div>
        </div>
      ))}
    </div>
  );
}
