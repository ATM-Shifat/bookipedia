import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import prisma from "@/db/prismaClient";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { formData }: { formData: FormData } = await req.json();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      return NextResponse.json({ statusCode: 400, error: "All fields are required!" });
    }

    if (formData.password.length < 6) {
      return NextResponse.json({ statusCode: 400, error: "Password must be at least 6 characters long" });
    }

    if (formData.password !== formData.confirmPassword) {
      return NextResponse.json({ statusCode: 400, error: "Passwords do not match" });
    }

    const existingUser = await prisma.users.findUnique({
      where: { email: formData.email },
    });
    if (existingUser) {
      return NextResponse.json({ statusCode: 409, error: "User already exists"});
    }

    const hashedPassword = CryptoJS.SHA256(formData.password).toString(CryptoJS.enc.Hex);

    await prisma.users.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ statusCode: 201, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json({ statusCode: 500, error: "An error occurred during registration" });
  }
}
