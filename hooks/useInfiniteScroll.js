import { useEffect } from "react";

// Hook to implement infinite scroll functionality
// Features:
//  Uses IntersectionObserver to detect when a target element is in view
//  Calls onLoadMore callback when the element is visible
//  Accepts a ref to the target element and the callback function
//  Cleans up the observer on unmount

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
        rootMargin: "200px",
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, onLoadMore]);
}
