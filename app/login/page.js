
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }
    
    //لغينا التخزين للتوكن داخل اللوكال لاننا اصبحنا نستخدم ال كوكيز
    //localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />
<div className="flex gap-3 w-full">
  <button
    type="submit"
    className="bg-black text-white flex-1 py-2 rounded-lg
               hover:bg-gray-800 transition-colors cursor-pointer"
  >
    Login
  </button>

  <Link
    href="/register"
    className="bg-red-600 text-white flex-1 py-2 rounded-lg
               hover:bg-red-700 transition-colors
               text-center cursor-pointer"
  >
    Register
  </Link>
</div>


        
        {error && (
          <p className="mt-3 text-red-500 text-center">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
