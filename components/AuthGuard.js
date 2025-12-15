"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/products");
    }
  }, [user, loading, router]);

  if (loading) return <Spinner />;
  if (!user) return null;

  return children;
}
