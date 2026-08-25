import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
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

    const payload = await verifyToken(token);

    if (!payload?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    const teacherId = payload.sub as string;

    const teacher = await prisma.user.findUnique({
      where: {
        id: teacherId,
      },
      select: {
        role: true,
      },
    });

    if (!teacher || teacher.role !== "teacher") {
      return NextResponse.json(
        {
          success: false,
          message: "Teacher access required",
        },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);

    const date = searchParams.get("date");
    const subject = searchParams.get("subject");

    const where: any = {
      teacherId,
    };

    // Date filter
    if (date) {
      const start = new Date(`${date}T00:00:00`);
      const end = new Date(`${date}T23:59:59.999`);

      where.date = {
        gte: start,
        lte: end,
      };
    }

    // Subject filter
    if (subject && subject !== "all") {
      where.subject = subject;
    }

    const records = await prisma.attendance.findMany({
      where,

      select: {
        id: true,
        date: true,
        subject: true,
        course: true,
        semester: true,
        section: true,
        status: true,

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

    const total = records.length;

    const present = records.filter(
      (record) =>
        record.status.toLowerCase() === "present"
    ).length;

    const absent = records.filter(
      (record) =>
        record.status.toLowerCase() === "absent"
    ).length;

    const percentage =
      total > 0
        ? Math.round((present / total) * 100)
        : 0;

    const subjects = [
      ...new Set(
        records
          .map((record) => record.subject)
          .filter(Boolean)
      ),
    ];

    return NextResponse.json({
      success: true,

      summary: {
        total,
        present,
        absent,
        percentage,
      },

      subjects,

      records,
    });

  } catch (error) {
    console.error(
      "ATTENDANCE HISTORY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load attendance history",
      },
      { status: 500 }
    );
  }
}