"use client";

import { useEffect } from "react";

export default function useInfiniteScroll(ref, callback) {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback, ref]);
}
