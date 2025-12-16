import { useEffect } from "react";

export default function useInfiniteScroll(ref, onLoadMore) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "200px", // load a bit earlier
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, onLoadMore]);
}
