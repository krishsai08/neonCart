export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500 flex justify-between">
        <span>© {new Date().getFullYear()} NeonCart</span>
        <span>Built by Krishna</span>
      </div>
    </footer>
  );
}
