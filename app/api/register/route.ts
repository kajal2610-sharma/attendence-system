
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password, role } = body;

    // Check required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, password and role are required",
        },
        { status: 400 }
      );
    }

    // Public registration: only teacher and student allowed
    if (!["teacher", "student"].includes(role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin registration is not allowed",
        },
        { status: 403 }
      );
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
