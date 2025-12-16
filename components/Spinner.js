export default function Spinner({ size = 28 }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div
        className="animate-spin rounded-full
                   border-[3px] border-primary/30
                   border-t-accent"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}
