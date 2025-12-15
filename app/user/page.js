"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

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
    setStatus("");

    const { error } = await supabase.auth.updateUser({
      data: { full_name: name, phone },
    });
    if (error) {
      setStatus(error.message);
      return;
    }
    setStatus("Saved");
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto bg-surface p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Account Details</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            className="w-full p-3 rounded bg-bg outline-none"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-3 rounded bg-bg outline-none"
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="w-full bg-gradient-to-r from-primary to-accent py-2 rounded text-white">
            Save
          </button>
          {status && <p className="text-sm text-muted">{status}</p>}
        </form>
      </div>
    </div>
  );
}
