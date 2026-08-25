import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

async function getLoggedInTeacher() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);

  if (!payload?.sub) {
    return null;
  }

  const teacher = await prisma.user.findUnique({
    where: {
      id: payload.sub,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!teacher || teacher.role !== "teacher") {
    return null;
  }

  return teacher;
}

// GET PROFILE
export async function GET() {
  try {
    const teacher = await getLoggedInTeacher();

    if (!teacher) {
      return NextResponse.json(
        {
          success: false,
          message: "Not logged in",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: teacher,
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

// UPDATE PROFILE
export async function PUT(req: Request) {
  try {
    const teacher = await getLoggedInTeacher();

    if (!teacher) {
      return NextResponse.json(
        {
          success: false,
          message: "Not logged in",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const name = body.name?.trim();
    const email = body.email?.trim();

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required",
        },
        { status: 400 }
      );
    }

    // Check if email is already used
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: teacher.id,
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    const updatedTeacher = await prisma.user.update({
      where: {
        id: teacher.id,
      },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedTeacher,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      { status: 500 }
    );
  }
}