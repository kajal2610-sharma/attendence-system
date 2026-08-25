import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const records = await prisma.attendance.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            rollNumber: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },

      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      records,
    });
  } catch (error) {
    console.error("ADMIN ATTENDANCE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load attendance records",
      },
      { status: 500 }
    );
  }
}