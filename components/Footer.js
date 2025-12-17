import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

// Footer component with company info, quick links, and social media icons
// Uses Tailwind CSS for styling
// Includes links to Products, Cart, and Wishlist pages
// Social media icons link to external profiles

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-sm text-gray-600">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">NeonCart</h3>
          <p className="mt-2 text-gray-500">
            A modern e-commerce experience for the ergonomic designs
          </p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/products" className="hover:text-gray-800 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-gray-800 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-gray-800 transition">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Connect</h4>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/"
              target="_blank"
              className="hover:text-gray-800 transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              className="hover:text-gray-800 transition"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} NeonCart · Built by Krishna
      </div>
    </footer>
  );
}
