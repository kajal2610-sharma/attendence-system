import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Student ID is required",
        },
        { status: 400 }
      );
    }

    // Check student
    const student = await prisma.user.findUnique({
      where: {
        id: studentId,
      },
      select: {
        id: true,
        name: true,
        email: true,
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

    // Get attendance records
    const attendance = await prisma.attendance.findMany({
      where: {
        studentId: studentId,
      },
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        date: true,
        subject: true,
        status: true,
      },
    });

    // Calculate attendance
    const total = attendance.length;

    const present = attendance.filter(
      (record) =>
        record.status.toLowerCase() === "present"
    ).length;

    const absent = attendance.filter(
      (record) =>
        record.status.toLowerCase() === "absent"
    ).length;

    const percentage =
      total > 0
        ? Math.round((present / total) * 100)
        : 0;

    return NextResponse.json({
      success: true,

      student,

      summary: {
        total,
        present,
        absent,
        percentage,
      },

      attendance,
    });
  } catch (error) {
    console.error(
      "STUDENT REPORT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate student report",
      },
      { status: 500 }
    );
  }
}