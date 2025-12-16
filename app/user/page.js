"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";

export default function UserPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const [lastOrder, setLastOrder] = useState(null);
  const [wishlistItem, setWishlistItem] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");

    if (user) {
      setName(user.user_metadata?.full_name || "");
      setPhone(user.user_metadata?.phone || "");
      fetchSideData();
    }
  }, [user, loading, router]);

  async function fetchSideData() {
    const { data: orders } = await supabase
      .from("orders")
      .select("id, total_amount, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    setLastOrder(orders?.[0] || null);

    const { data: wishlist } = await supabase
      .from("wishlists")
      .select("product_id, products(name)")
      .eq("user_id", user.id)
      .limit(1);

    setWishlistItem(wishlist?.[0] || null);
  }

  if (loading || !user) return null;

  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);
    setStatus("");

    const { error } = await supabase.auth.updateUser({
      data: { full_name: name, phone },
    });

    setStatus(error ? error.message : "Profile updated ✨");
    setSaving(false);
  }

  const initial = (name || user.email)?.[0]?.toUpperCase();

  return (
    <AuthGuard>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
          {/* LEFT */}
          <div className="space-y-10">
            {/* PROFILE HEADER */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border flex items-center justify-center text-2xl font-semibold">
                {initial}
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  {name || "My Account"}
                </h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoCard
                label="Auth Provider"
                value={user.app_metadata?.provider || "email"}
              />
              <InfoCard
                label="Joined"
                value={new Date(user.created_at).toDateString()}
              />
            </div>

            {/* UPDATE PROFILE */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Update Profile</h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  className="input"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="input"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <button disabled={saving} className="btn btn-primary w-full">
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                {status && (
                  <p className="text-sm text-gray-500 text-center">{status}</p>
                )}
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* ORDERS */}
            <FloatingCard>
              <h3 className="font-semibold mb-2">Recent Order</h3>

              {lastOrder ? (
                <div className="text-sm text-gray-600">
                  <p>{new Date(lastOrder.created_at).toDateString()}</p>
                  <p className="font-medium">₹{lastOrder.total_amount}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No orders yet</p>
              )}

              <Link
                href="/orders"
                className="inline-block mt-3 text-sm font-medium text-blue-600"
              >
                View orders →
              </Link>
            </FloatingCard>

            {/* WISHLIST */}
            <FloatingCard>
              <h3 className="font-semibold mb-2">Wishlist</h3>

              {wishlistItem ? (
                <p className="text-sm text-gray-600">
                  {wishlistItem.products?.name}
                </p>
              ) : (
                <p className="text-sm text-gray-500">No wishlisted items</p>
              )}

              <Link
                href="/wishlist"
                className="inline-block mt-3 text-sm font-medium text-blue-600"
              >
                View wishlist →
              </Link>
            </FloatingCard>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function FloatingCard({ children }) {
  return <div className="rounded-xl border p-5 shadow-sm">{children}</div>;
}
