export default function Loading() {
  return (
    <div className="px-6 md:px-16 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-[320px] rounded-2xl bg-gray-100 animate-pulse"
        />
      ))}
    </div>
  );
}
