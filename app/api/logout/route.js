/*import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Logout successful",
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}*/
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  return NextResponse.json({
    message: "Logged out",
  });
}