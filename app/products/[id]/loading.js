import Spinner from "../../../components/Spinner";

export default function LoadingProduct() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Spinner size={84} />
      <h1 className="ml-4 text-xl font-semibold">Loading product...</h1>
    </div>
  );
}
