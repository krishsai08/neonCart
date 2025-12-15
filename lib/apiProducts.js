import { supabase } from "./supabase";

const PAGE_SIZE = 6;

export async function getProductsPage({ page }) {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data } = await supabase.from("products").select("*").range(from, to);

  return data;
}

export async function getProduct(id) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}
