import connectDB from "@/app/lib/db";
import User from "@/app/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    await connectDB();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    
    //تشفير قاعدة البيانات
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.create({
    name,
    email,
    password: hashedPassword,
    });

    return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
    );

    } catch (error) {
        return NextResponse.json(
        { message: "Server error:"+error },
        { status: 500 }
       );
    }
}