import Image from "next/image";
import { getProduct } from "../../../lib/apiProducts";
import AddToCartButton from "../../../components/AddToCartButton";

export default async function ProductDetail({ params }) {
  const product = await getProduct(params.id);

  if (!product) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Image
        src={product.image}
        alt={product.name || "product image"}
        width={800}
        height={500}
        className="rounded mb-4 object-cover"
      />
      <h1 className="text-3xl">{product.name}</h1>
      <p className="text-muted">{product.description}</p>
      <p className="mt-2">₹{product.price}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
