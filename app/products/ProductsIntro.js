export default function ProductsIntro() {
  return (
    <section className="mb-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* LEFT */}
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-3xl font-semibold font-[var(--font-playfair)] leading-tight">
            Thoughtfully curated for modern living
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            NeonCart is a premium shopping destination offering carefully
            selected products that balance quality, simplicity, and everyday
            elegance — designed to elevate your shopping experience.
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-right px-4 font-[var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl text-pink-900/30 select-none leading-none">
          NeonCart
        </div>
      </div>
    </section>
  );
}
