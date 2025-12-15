"use client";

import { useEffect, useState } from "react";
import { getProduct } from "../../../lib/apiProducts";
import { useCart } from "../../../context/CartContext";

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    getProduct(params.id).then(setProduct);
  }, [params.id]);

  if (!product) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={product.image} className="rounded mb-4" />
      <h1 className="text-3xl">{product.name}</h1>
      <p className="text-muted">{product.description}</p>
      <p className="mt-2">₹{product.price}</p>
      <button
        onClick={() => dispatch({ type: "ADD", payload: product })}
        className="mt-4 bg-accent text-black px-6 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
