import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="mt-4 text-6xl font-extrabold tracking-widest text-gray-800">
        404
      </h1>

      <p className="mt-3 text-xl font-semibold text-gray-700">
        Oops! Page not found
      </p>

      <p className="mt-2 text-gray-500 max-w-md">
        The page you’re trying to reach doesn’t exist or was removed.
      </p>

      <div className="flex gap-4 mt-6">
        <Link
          href="/products"
          className="bg-primary text-white px-6 py-2 rounded"
        >
          Browse Products
        </Link>

        <Link href="/" className="border px-6 py-2 rounded hover:bg-gray-50">
          Home
        </Link>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        © {new Date().getFullYear()} NeonCart
      </p>
    </div>
  );
}
