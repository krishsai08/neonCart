"use client";

//products listing page with filters and infinite scroll
//uses getProductsPage from lib/apiProducts to fetch products
//displays ProductCard for each product
//uses Filters component for filtering
//uses useInfiniteScroll hook to load more products when scrolling
//manages filters and pagination state
//shows loading spinner when fetching more products
//deduplicates products when loading more
//applies filters on the client side
//initial products are passed as props
//layout and styling with CSS grid
//divides page into sidebar for filters and main section for products
//responsive design with grid layout
//uses useState and useRef hooks
//handles loading and hasMore state for infinite scroll

import { useEffect, useRef, useState } from "react";
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import { getProductsPage } from "@/lib/apiProducts";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function ProductsClient({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialProducts.length > 0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    price: 10000,
    rating: 1,
    category: "all",
  });

  const loaderRef = useRef(null);

  async function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);
    const newProducts = await getProductsPage({ page });

    if (!newProducts.length) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    setProducts((prev) => {
      const map = new Map(prev.map((p) => [p.id, p]));
      newProducts.forEach((p) => map.set(p.id, p));
      return Array.from(map.values());
    });

    setPage((p) => p + 1);
    setLoading(false);
  }

  useInfiniteScroll(loaderRef, loadMore);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      p.price <= filters.price &&
      p.rating >= filters.rating &&
      (filters.category === "all" || p.category === filters.category)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
      <aside className=" top-24">
        <Filters filters={filters} setFilters={setFilters} />
      </aside>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {hasMore && (
          <div ref={loaderRef} className="flex justify-center h-24">
            {loading && <Spinner />}
          </div>
        )}
      </section>
    </div>
  );
}
