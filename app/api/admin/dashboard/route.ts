import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalTimetables,
      totalAttendance,
      presentToday,
      absentToday,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          role: "student",
        },
      }),

      prisma.user.count({
        where: {
          role: "teacher",
        },
      }),

      prisma.timetable.count(),

      prisma.attendance.count(),

      prisma.attendance.count({
        where: {
          status: "Present",
          date: {
            gte: new Date(
              new Date().setHours(0, 0, 0, 0)
            ),
            lt: new Date(
              new Date().setHours(24, 0, 0, 0)
            ),
          },
        },
      }),

      prisma.attendance.count({
        where: {
          status: "Absent",
          date: {
            gte: new Date(
              new Date().setHours(0, 0, 0, 0)
            ),
            lt: new Date(
              new Date().setHours(24, 0, 0, 0)
            ),
          },
        },
      }),
    ]);

    const todayTotal =
      presentToday + absentToday;

    const todayPercentage =
      todayTotal > 0
        ? Math.round(
            (presentToday / todayTotal) * 100
          )
        : 0;

    return NextResponse.json({
      success: true,

      stats: {
        students: totalStudents,
        teachers: totalTeachers,
        timetables: totalTimetables,
        attendance: totalAttendance,

        today: {
          present: presentToday,
          absent: absentToday,
          total: todayTotal,
          percentage: todayPercentage,
        },
      },
    });
  } catch (error) {
    console.error(
      "ADMIN DASHBOARD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}