import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    console.log("JWT VERIFIED SUCCESSFULLY");

    return NextResponse.next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/products/:path*",
  ],
};