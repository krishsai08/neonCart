import { supabase } from "../../../lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default async function OrderDetail({ params }) {
  const { id } = await params;

  const { data: order } = await supabase
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
    .single();

  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">
        Order #{order.id.slice(0, 8)}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Placed on {new Date(order.created_at).toDateString()}
      </p>

      <div className="card p-4 space-y-4">
        {order.order_items.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.product_id}`}
            className="flex justify-between items-center hover:bg-gray-50 p-2 rounded"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">₹{item.price * item.quantity}</p>
          </Link>
        ))}

        <div className="border-t pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{order.total_amount}</span>
        </div>
      </div>
    </div>
  );
}
