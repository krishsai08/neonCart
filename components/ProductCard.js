import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-surface p-4 rounded-xl hover:scale-105 transition border border-primary/10 shadow-sm">
        <Image
          src={product.image}
          alt={product.name || "product image"}
          width={400}
          height={160}
          className="rounded-lg mb-3 h-40 w-full object-cover"
        />
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted">{product.category}</p>
        <div className="flex justify-between mt-2">
          <span className="text-primary font-semibold">₹{product.price}</span>
          <span>{product.rating}★</span>
        </div>
      </div>
    </Link>
  );
}
