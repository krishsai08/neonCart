"use client";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="bg-surface p-4 rounded-xl space-y-4 border border-primary/20">
      <input
        className="w-full p-2 rounded bg-bg border border-primary/10 focus:ring-2 focus:ring-highlight/30 outline-none"
        placeholder="Search products"
        value={filters.search}
        onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
      />

      <label className="text-sm text-muted">Max Price: ₹{filters.price}</label>
      <input
        type="range"
        min="0"
        max="10000"
        step="500"
        value={filters.price}
        onChange={(e) =>
          setFilters((f) => ({ ...f, price: Number(e.target.value) }))
        }
        className="w-full"
      />

      <label className="text-sm text-muted">
        Min Rating: {filters.rating}★
      </label>
      <input
        type="range"
        min="1"
        max="5"
        value={filters.rating}
        onChange={(e) =>
          setFilters((f) => ({ ...f, rating: Number(e.target.value) }))
        }
        className="w-full"
      />

      <select
        className="w-full p-2 rounded bg-bg border border-primary/10 outline-none"
        value={filters.category}
        onChange={(e) =>
          setFilters((f) => ({ ...f, category: e.target.value }))
        }
      >
        <option value="all">All</option>
        <option value="Tech">Tech</option>
        <option value="Home">Home</option>
        <option value="Furniture">Furniture</option>
        <option value="Stationery">Stationery</option>
      </select>
    </div>
  );
}
