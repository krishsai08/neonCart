"use client";

//order detail page showing order info and items
//fetches order details from supabase using order id from URL params
//displays order items, pricing breakdown, and total paid
//handles loading states and user authentication
//shows message if order not found or user not logged in
//uses useAuth context to get current user
//uses supabase client from lib/supabase

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
    if (!loading && user && id) {
      fetchOrder();
    } else if (!loading && !user) {
      setFetching(false);
    }
  }, [user, id, loading]);

  async function fetchOrder() {
    setFetching(true);

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        created_at,
        subtotal_amount,
        tax_amount,
        discount_amount,
        coupon_code,
        coupon_discount,
        final_amount,
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
      .single();

    if (error) {
      console.error("FETCH ORDER DETAIL ERROR:", error);
    } else {
      setOrder(data);
    }

    setFetching(false);
  }

  if (loading || fetching) return null;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Please login to view order details
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Order #{order.id.slice(0, 8)}
        </h1>
        <p className="text-sm text-gray-500">
          Placed on {new Date(order.created_at).toDateString()}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
        <h2 className="font-semibold mb-2">Items</h2>

        {order.order_items.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.product_id}`}
            className="flex justify-between items-center p-2 rounded hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.quantity}
              </p>
            </div>

            <p className="font-semibold">₹{item.price * item.quantity}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
        <h2 className="font-semibold mb-2">Price Details</h2>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{order.subtotal_amount}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>₹{order.tax_amount}</span>
        </div>

        {order.discount_amount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>- ₹{order.discount_amount}</span>
          </div>
        )}

        {order.coupon_code && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Coupon ({order.coupon_code})</span>
            <span>- ₹{order.coupon_discount}</span>
          </div>
        )}

        <div className="border-t pt-3 flex justify-between font-semibold text-lg">
          <span>Total Paid</span>
          <span>₹{order.final_amount}</span>
        </div>
      </div>

      <div>
        <Link href="/orders" className="text-sm text-primary hover:underline">
          ← Back to orders
        </Link>
      </div>
    </div>
  );
}
