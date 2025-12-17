"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "./Spinner";

// AuthGuard component to protect routes that require authentication
// Redirects unauthenticated users to /products
// Displays a loading spinner while authentication status is being determined
// Renders child components if the user is authenticated
// Usage: Wrap protected components with <AuthGuard>...</AuthGuard>

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
