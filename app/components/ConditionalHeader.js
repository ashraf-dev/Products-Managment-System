"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  const hiddenRoutes = ["/login", "/register"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return <Header />;
}