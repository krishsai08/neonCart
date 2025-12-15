"use client";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="bg-surface p-4 rounded-xl space-y-4">
      <input
        className="w-full p-2 rounded bg-bg"
        placeholder="Search products"
        value={filters.search}
        onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
      />

      <label>Max Price: ₹{filters.price}</label>
      <input
        type="range"
        min="0"
        max="10000"
        step="500"
        value={filters.price}
        onChange={(e) =>
          setFilters((f) => ({ ...f, price: Number(e.target.value) }))
        }
      />

      <label>Min Rating: {filters.rating}★</label>
      <input
        type="range"
        min="1"
        max="5"
        value={filters.rating}
        onChange={(e) =>
          setFilters((f) => ({ ...f, rating: Number(e.target.value) }))
        }
      />

      <select
        className="w-full p-2 rounded bg-bg"
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
