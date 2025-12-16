import { supabase } from "./supabase";

const PAGE_SIZE = 3;

/**
 * Get paginated products for infinite scroll
 * Uses deterministic ordering to avoid duplicates
 */
export async function getProductsPage({ page }) {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false }) // ✅ IMPORTANT
    .range(from, to);

  if (error) {
    console.error("getProductsPage error:", error);
    throw error;
  }

  return data ?? [];
}

/**
 * Get single product by ID
 */
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
