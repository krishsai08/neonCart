import Link from "next/link";
import Image from "next/image";
import WishlistButton from "@/components/WishlistButton";
import AddToCartMini from "@/components/AddToCartMini";
import { useAuth } from "@/context/AuthContext";

export default function ProductCard({ product }) {
  const { user } = useAuth(); //  check login

  return (
    <div className="relative">
      <WishlistButton productId={product.id} />

      <Link
        href={`/products/${product.id}`}
        className="block text-inherit no-underline"
      >
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
          {/* IMAGE */}
          <div className="relative w-full aspect-[16/11]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="px-6 py-4 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-lg font-medium truncate text-[var(--text-main)]">
                {product.name}
              </h3>
              <p className="text-sm mt-1 text-[var(--text-muted)]">
                {product.category}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-lg font-semibold text-accent">
                ₹{product.price}
              </span>

              {/*Only logged-in users see Add to Cart */}
              {user && <AddToCartMini product={product} />}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
