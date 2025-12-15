"use client";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="card p-4 space-y-5">
      <h3 className="font-semibold text-gray-800">Filters</h3>

      {/* Search */}
      <div>
        <label className="label mb-1 block">Search</label>
        <input
          className="input"
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
          className="w-full accent-[#2874f0]"
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
          className="w-full accent-[#2874f0]"
        />
      </div>

      {/* Category */}
      <div>
        <label className="label mb-1 block">Category</label>
        <select
          className="input"
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
