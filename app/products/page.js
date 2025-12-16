import { Suspense } from "react";
import ProductsIntro from "./ProductsIntro";
import ProductsClient from "./ProductsClient";
import { getProductsPage } from "@/lib/apiProducts";

export default async function ProductsPage() {
  // 👇 Server fetch for instant render
  const initialProducts = await getProductsPage({ page: 0 });

  return (
    <div className="w-full px-6 md:px-16 py-8">
      <ProductsIntro />

      <Suspense fallback={<ProductsLoading />}>
        <ProductsClient initialProducts={initialProducts} />
      </Suspense>
    </div>
  );
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-[320px] rounded-2xl bg-gray-100 animate-pulse"
        />
      ))}
    </div>
  );
}
