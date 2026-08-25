import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const teachers = await prisma.user.findMany({
      where: {
        role: "teacher",
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      teachers,
    });
  } catch (error) {
    console.error("GET TEACHERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch teachers",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("ADD TEACHER BODY:", body);

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and password are required",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 400 }
      );
    }

    const teacher = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        role: "teacher",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Teacher added successfully",
      teacher: {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
      },
    });
  } catch (error) {
    console.error("POST TEACHER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error while adding teacher",
      },
      { status: 500 }
    );
  }
}