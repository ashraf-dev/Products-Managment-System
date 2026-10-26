"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
const router = useRouter();
    async function logout() {
  await fetch("/api/logout", {
    method: "POST",
  });

  router.push("/login");
}

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">

      {/* Logo */}
      <h1 className="text-xl font-bold">
        Products Managment System
      </h1>

      {/* Links */}
      <nav className="flex gap-6">

        <Link
          href="/dashboard"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          href="/profile"
          className="hover:text-gray-300"
        >
          Profile
        </Link>

        <Link
          href="/products"
          className="hover:text-gray-300"
        >
          Products
        </Link>

<button
  onClick={logout}
  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
>
  Logout
</button>
      </nav>

    </header>
  );
}