"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchProfile() {

      const res = await fetch("/api/profile", {
        credentials: "include",
      });

      if (!res.ok) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setUser(data);
      setLoading(false);
    }

    fetchProfile();
      }, []);

  if (loading) return <p>Loading...</p>;

return (
  <main className="p-10">
    <h1 className="text-3xl font-bold mb-6">
      Profile
    </h1>

    <div className="bg-white p-6 rounded shadow w-96">
      <p>
        <b>Name:</b> {user.name}
      </p>

      <p>
        <b>Email:</b> {user.email}
      </p>

      <p>
        <b>Joined:</b> {new Date(user.createdAt).toDateString()}
      </p>
    </div>
  </main>
);
}