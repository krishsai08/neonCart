"use client";

import { useEffect, useRef, useState } from "react";
import Filters from "../../components/Filters";
import ProductCard from "../../components/ProductCard";
import { getProductsPage } from "../../lib/apiProducts";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    price: 10000,
    rating: 1,
    category: "all",
  });

  const loaderRef = useRef(null);

  async function loadMore() {
    if (!hasMore) return;

    const newProducts = await getProductsPage({ page });
    if (newProducts.length === 0) {
      setHasMore(false);
      return;
    }

    setProducts((p) => [...p, ...newProducts]);
    setPage((p) => p + 1);
  }

  useInfiniteScroll(loaderRef, loadMore);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const newProducts = await getProductsPage({ page: 0 });
      if (!mounted) return;
      if (newProducts.length === 0) {
        setHasMore(false);
        return;
      }
      setProducts(newProducts);
      setPage(1);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      p.price <= filters.price &&
      p.rating >= filters.rating &&
      (filters.category === "all" || p.category === filters.category)
  );

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 p-6">
      <Filters filters={filters} setFilters={setFilters} />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <ProductCard key={`${p.id}-${i}`} product={p} />
        ))}
        {hasMore && (
          <div ref={loaderRef} className="col-span-full text-center">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
