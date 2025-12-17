import { Suspense } from "react";
import ProductsIntro from "./ProductsIntro";
import ProductsClient from "./ProductsClient";
import { getProductsPage } from "@/lib/apiProducts";

//page to display list of products with infinite scroll
//fetches initial products on server side
//uses ProductsClient component for infinite scroll functionality
//displays loading placeholders while fetching
//includes ProductsIntro component at the top
//uses getProductsPage API function to fetch products
//arranges products in a responsive grid layout
//applies padding and max width for better presentation
//ensures good user experience with loading states
//optimizes for performance with server-side rendering of initial data
//and client-side fetching for more products
//enhances SEO with server-side rendering
//provides a visually appealing layout for product browsing

export default async function ProductsPage() {
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
