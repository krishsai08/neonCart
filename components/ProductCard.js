import Link from "next/link";
import Image from "next/image";
import WishlistButton from "@/components/WishlistButton";
import AddToCartMini from "@/components/AddToCartMini";

// Product Card Component
// Displays product image, name, category, and price
// Includes Wishlist and Add to Cart mini button functionalities
// Styled with Tailwind CSS for a modern look
// Links to the product detail page on click

export default function ProductCard({ product }) {
  return (
    <div className="relative">
      <WishlistButton productId={product.id} />

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
          <div className="relative w-full aspect-[16/11]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="px-6 py-4 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-lg font-medium truncate">{product.name}</h3>
              <p className="text-sm text-muted mt-1">{product.category}</p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-lg font-semibold text-accent">
                ₹{product.price}
              </span>

              <AddToCartMini product={product} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
