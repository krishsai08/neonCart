import { supabase } from "./supabase";

/* CREATE ORDER */
export async function createOrder({
  userId,
  items,
  pricing,
  couponCode = null,
}) {
  const { data: order, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        subtotal_amount: pricing.subtotal,
        tax_amount: pricing.tax,
        discount_amount: pricing.discount,
        coupon_discount: pricing.couponDiscount ?? 0,
        coupon_code: couponCode,
        final_amount: pricing.total,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Order insert error:", error);
    throw new Error("Order creation failed");
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.qty,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Order items insert error:", itemsError);
    throw new Error("Order items failed");
  }

  return order;
}

/* GET USER ORDERS */
export async function getMyOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      subtotal_amount,
      tax_amount,
      discount_amount,
      coupon_discount,
      coupon_code,
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

  if (error) throw new Error("Could not fetch orders");

  return data || [];
}
