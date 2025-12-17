import { supabase } from "./supabase";
//  API functions for managing products using Supabase
// Features:
//  getProductsPage to fetch products with pagination
//  getProduct to fetch a single product by ID

const PAGE_SIZE = 3;

//fetch all products using pagination
export async function getProductsPage({ page }) {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("getProductsPage error:", error);
    throw error;
  }

  return data ?? [];
}

//fetch product by ID
export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getProduct error:", error);
    return null;
  }

  return data;
}
