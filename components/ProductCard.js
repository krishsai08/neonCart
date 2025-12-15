import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="card p-4 hover:shadow-md transition">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={240}
          className="rounded-lg h-44 w-full object-cover mb-3"
        />

        <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>

        <p className="text-sm text-gray-500">{product.category}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-[#2874f0]">₹{product.price}</span>
          <span className="text-sm text-gray-600">⭐ {product.rating}</span>
        </div>
      </div>
    </Link>
  );
}
