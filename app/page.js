import { redirect } from "next/navigation";

// Redirect to /products page

export default function Home() {
  redirect("/products");
}
