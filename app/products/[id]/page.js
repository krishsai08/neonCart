import Image from "next/image";
import { getProduct } from "../../../lib/apiProducts";
import AddToCartButton from "../../../components/AddToCartButton";

export default async function ProductDetail({ params }) {
  // ✅ unwrap params
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="card p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={500}
          className="rounded-lg object-cover w-full h-[420px]"
        />
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>

        <p className="text-gray-600">{product.description}</p>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#2874f0]">
            ₹{product.price}
          </span>
          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
            ⭐ {product.rating}
          </span>
        </div>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>✔ Free delivery</li>
          <li>✔ 7-day replacement</li>
          <li>✔ Secure payments</li>
        </ul>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
