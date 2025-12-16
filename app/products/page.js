"use client";

import { useEffect, useRef, useState } from "react";
import Filters from "../../components/Filters";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";
import { getProductsPage } from "../../lib/apiProducts";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

function ProductsIntro() {
  return (
    <section className="mb-8">
      <div
        className="
          flex flex-col gap-6
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* LEFT — INTRO TEXT */}
        <div className="max-w-xl">
          <h1
            className="
              text-2xl sm:text-3xl
              font-semibold
              text-gray-900
              font-[var(--font-playfair)]
              leading-tight
            "
          >
            Thoughtfully curated for modern living
          </h1>

          <p
            className="
              mt-3
              text-sm sm:text-base
              text-gray-600
              leading-relaxed
            "
          >
            NeonCart is a premium shopping destination offering carefully
            selected products that balance quality, simplicity, and everyday
            elegance — designed to elevate your shopping experience.
          </p>
        </div>

        {/* RIGHT — BIG BRAND TEXT */}
        <div
          className="
            text-right
            font-[var(--font-playfair)]
            text-5xl sm:text-6xl md:text-7xl
            text-pink-900/20
            select-none
            leading-none
          "
        >
          NeonCart
        </div>
      </div>
    </section>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
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

  useEffect(() => {
    (async () => {
      setLoading(true);
      const firstPage = await getProductsPage({ page: 0 });
      setProducts(firstPage);
      setPage(1);
      setHasMore(firstPage.length > 0);
      setLoading(false);
    })();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      p.price <= filters.price &&
      p.rating >= filters.rating &&
      (filters.category === "all" || p.category === filters.category)
  );

  if (products.length === 0 && loading) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center">
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <div className="w-full px-16 py-8">
      <ProductsIntro />
      <div className="grid grid-cols-[280px_1fr] gap-10 items-start">
        {/* Filters */}
        <aside className="sticky top-24">
          <Filters filters={filters} setFilters={setFilters} />
        </aside>

        {/* Products */}
        <section>
          <div className="grid grid-cols-3 gap-10">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {hasMore && (
            <div
              ref={loaderRef}
              className="flex justify-center items-center h-24"
            >
              {loading && <Spinner />}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
