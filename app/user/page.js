"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

export default function UserPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");

    if (user) {
      setName(user.user_metadata?.full_name || "");
      setPhone(user.user_metadata?.phone || "");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);
    setStatus("");

    const { error } = await supabase.auth.updateUser({
      data: { full_name: name, phone },
    });

    setStatus(error ? error.message : "Profile updated successfully ✨");
    setSaving(false);
  }

  const initial = (user.user_metadata?.full_name ||
    user.email)?.[0]?.toUpperCase();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-white px-4 py-6">
        <div className="max-w-xl mx-auto space-y-6">
          {/* PROFILE HERO */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-400 to-pink-300 p-6 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-2xl font-semibold">
                {initial}
              </div>

              <div className="flex-1">
                <h1 className="text-xl font-semibold truncate">
                  {name || "My Account"}
                </h1>
                <p className="text-sm opacity-90 truncate">{user.email}</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/orders")}
              className="
                mt-4 w-full min-h-[44px]
                rounded-xl
                bg-white text-blue-600
                text-sm font-medium
              "
            >
              View My Orders →
            </button>
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Update Profile
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                className="
                  w-full rounded-xl border border-blue-100
                  px-4 py-3 outline-none
                  focus:border-blue-400
                "
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="
                  w-full rounded-xl border border-pink-100
                  px-4 py-3 outline-none
                  focus:border-pink-400
                "
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button
                disabled={saving}
                className="
                  w-full min-h-[44px]
                  rounded-xl
                  bg-violet-400
                  text-white font-medium
                  hover:bg-blue-400
                  disabled:opacity-60
                "
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              {status && (
                <p className="text-center text-sm text-gray-500">{status}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}
