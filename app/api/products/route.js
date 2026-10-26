import connectDB from "@/app/lib/db";
import Product from "@/app/lib/models/Product";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";//لانشاء هويه المستخدم
import { NextResponse } from "next/server";//لارسال الردود
import {cookies} from "next/headers";
import User from "@/app/lib/models/User";


export async function POST(req) {
  try {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
     return NextResponse.json(
         { message: "Unauthorized" },
         { status: 401 }
        );
    } 
   //بدنا نسحب رقم المستخدم من التوكن
    const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
    );


    const { name, description, price } = await req.json();

    if (!name || !description || !price) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    await connectDB();

    const productExists = await Product.findOne({ name });

    if (productExists) {
      return NextResponse.json(
        { message: "Product already exists" },
        { status: 401 }
      );
    }
    
   //انشاء المنتج
    await Product.create({
    name,
    description,
    price,
    user:decoded.id
    });

    return NextResponse.json(
    { message: "Product created successfully" },
    { status: 201 }
    );

    } catch (error) {
        return NextResponse.json(
        { message: "Server error (Product):"+error },
        { status: 500 }
       );
    }
}

// جلب المنتجات
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(products);

  } catch (err) {
    return NextResponse.json(
      { message: "Server error "+err },
      { status: 500 }
    );
  }
}