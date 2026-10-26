"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    //const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    /*if (!token || !storedUser) {
      router.replace("/login");
      return;
    }*/

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      router.replace("/login");
    }
  }, [router]);

  if (!user) {
    return <p className="p-10">Loading...</p>;
  }
 const handleLogout = async () => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    localStorage.removeItem("user");

    router.replace("/login");
    router.refresh();

  } catch (error) {
    console.error("Logout error:", error);
  }
};
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <h2 className="text-xl mb-4">
        Welcome, {user.name}!
      </h2>

      <p className="mb-2">
        <strong>Name:</strong> {user.name}
      </p>

      <p className="mb-4">
        <strong>Email:</strong> {user.email}
      </p>

      

     
        <button
  onClick={handleLogout}
  className="bg-red-600 text-white px-4 py-2 rounded"
>
  Logout
</button>
    </main>
  );
}
