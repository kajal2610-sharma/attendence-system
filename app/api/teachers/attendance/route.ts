import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get("token")?.value;

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

    // Make sure logged-in user is teacher
    if (payload.role !== "teacher") {
      return NextResponse.json(
        {
          success: false,
          message: "Only teachers can access attendance",
        },
        { status: 403 }
      );
    }

    // Get only this teacher's attendance
    const attendance = await prisma.attendance.findMany({
      where: {
        teacherId: payload.sub,
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            rollNumber: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error("GET ATTENDANCE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch attendance",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get("token")?.value;

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

    // Make sure logged-in user is teacher
    if (payload.role !== "teacher") {
      return NextResponse.json(
        {
          success: false,
          message: "Only teachers can mark attendance",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const { records, subject } = body;

    if (!Array.isArray(records) || records.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No attendance records received",
        },
        { status: 400 }
      );
    }

    // Use the logged-in teacher's ID
    const teacherId = payload.sub;

    // Save each attendance record
    for (const record of records) {
      await prisma.attendance.create({
        data: {
          studentId: record.studentId,

          teacherId: teacherId,

          date: new Date(),

          course: record.course || null,
          semester: record.semester || null,
          section: record.section || null,

          subject: record.subject || subject || "General",

          status: record.status || "Absent",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Attendance saved successfully",
    });
  } catch (error) {
    console.error("POST ATTENDANCE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save attendance",
        error: String(error),
      },
      { status: 500 }
    );
  }
}