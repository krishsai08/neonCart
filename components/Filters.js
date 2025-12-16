"use client";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="card p-5 space-y-6 bg-[color:var(--surface)]">
      <h3 className="font-semibold text-[color:var(--text-main)] text-lg">
        Filters
      </h3>

      {/* Search */}
      <div>
        <label className="label mb-1 block">Search</label>
        <input
          className="
            w-full rounded-lg px-3 py-2
            bg-[#FFFDF2]
            border border-[color:var(--border)]
            text-[color:var(--text-main)]
            outline-none
            focus:border-[#748873]
            focus:ring-2 focus:ring-[#748873]/30
            transition
          "
          placeholder="Search products"
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
        />
      </div>

      {/* Price */}
      <div>
        <label className="label mb-1 block">Max Price: ₹{filters.price}</label>
        <input
          type="range"
          min="0"
          max="10000"
          step="500"
          value={filters.price}
          onChange={(e) =>
            setFilters((f) => ({ ...f, price: Number(e.target.value) }))
          }
          className="
            w-full
            accent-[#748873]
          "
        />
      </div>

      {/* Rating */}
      <div>
        <label className="label mb-1 block">
          Minimum Rating: {filters.rating}★
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={filters.rating}
          onChange={(e) =>
            setFilters((f) => ({ ...f, rating: Number(e.target.value) }))
          }
          className="
            w-full
            accent-[#748873]
          "
        />
      </div>

      {/* Category */}
      <div>
        <label className="label mb-1 block">Category</label>
        <select
          className="
            w-full rounded-lg px-3 py-2
            bg-[#FFFDF2]
            border border-[color:var(--border)]
            text-[color:var(--text-main)]
            outline-none
            focus:border-[#748873]
            focus:ring-2 focus:ring-[#748873]/30
            transition
          "
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
    </div>
  );
}
