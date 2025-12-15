"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function CheckoutLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // double-check with Supabase in case AuthContext is stale
      (async () => {
        const { data } = await supabase.auth.getUser();
        if (data?.user) return; // user is actually logged in, don't redirect
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      })();
    }
  }, [user, loading, pathname, router]);

  if (!user) return null;

  return children;
}
