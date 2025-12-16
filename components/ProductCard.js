import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div
        className="
          bg-[#EBF4DD]
          border border-border
          rounded-[28px]
          overflow-hidden
          transition
          
          hover:-translate-y-1
          hover:shadow-xl
          h-full
          flex flex-col
        "
      >
        {/* IMAGE — ~75% OF CARD */}
        <div className="relative w-full aspect-[16/11]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>

        {/* CONTENT — ~25% */}
        <div className="px-6 py-4 flex flex-col justify-between flex-1">
          <div>
            <h3
              className="
                text-lg
                font-medium
                text-[color:var(--text-main)]
                truncate
              "
            >
              {product.name}
            </h3>

            <p className="text-sm text-[color:var(--text-muted)] mt-1">
              {product.category}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-semibold text-accent">
              ₹{product.price}
            </span>

            <span className="text-sm text-[color:var(--text-muted)]">
              ⭐ {product.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
