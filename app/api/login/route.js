import connectDB from "@/app/lib/db";
import User from "@/app/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";//لانشاء هويه المستخدم
import { NextResponse } from "next/server";//لارسال الردود
import {cookies} from "next/headers";
export async function POST(req) {
  try {
    const { email, password } = await req.json();
   if (!email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }
    await connectDB();

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return NextResponse.json(
        { message: "Invalid Cerdintinals !!" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(
    password,
    userExists.password
    );

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Cerdintinals !!!!" },
        { status: 401 }
      );
    }

/*const token = jwt.sign(
  { id: userExists._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);*/

const token = jwt.sign(
  { id: userExists._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
//انشاء التوكن و تخزينه بالكوكي
const cookieStore = await cookies();

cookieStore.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});

return NextResponse.json({
  //token,
  message:"login success",
  user: {
    id: userExists._id,
    name: userExists.name,
    email: userExists.email,
  },
});

    } catch (error) {
        return NextResponse.json(
        { message: "Server error:"+error },
        { status: 500 }
       );
    }
}
