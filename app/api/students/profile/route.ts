import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  try {
    // Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Not logged in",
        },
        { status: 401 }
      );
    }

    // Verify JWT
    const payload = await verifyToken(token);

    if (!payload || !payload.sub) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401 }
      );
    }

    // Find student
    const student = await prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        course: true,
        semester: true,
        section: true,
        rollNumber: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    // Check role
    if (student.role !== "student") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Student account required.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: student,
    });
  } catch (error) {
    console.error("STUDENT PROFILE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}