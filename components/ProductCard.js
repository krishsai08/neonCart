import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-surface p-4 rounded-xl hover:scale-105 transition">
        <img
          src={product.image}
          className="rounded-lg mb-3 h-40 w-full object-cover"
        />
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted">{product.category}</p>
        <div className="flex justify-between mt-2">
          <span className="text-accent">₹{product.price}</span>
          <span>{product.rating}★</span>
        </div>
      </div>
    </Link>
  );
}
