import { supabase } from "./supabase";

/* CREATE ORDER */
export async function createOrder({ userId, cart, total }) {
  const { data: order, error } = await supabase
    .from("orders")
    .insert([{ user_id: userId, total_amount: total }])
    .select()
    .single();

  if (error) throw new Error("Order creation failed");

  const items = cart.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.qty,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items);

  if (itemsError) throw new Error("Order items failed");

  return order;
}

/* GET USER ORDERS */
export async function getMyOrders() {
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
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not fetch orders");

  return data;
}
