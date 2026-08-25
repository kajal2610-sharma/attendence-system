import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =========================
// GET ALL TIMETABLES
// =========================
export async function GET() {
  try {
    const timetables = await prisma.timetable.findMany({
      orderBy: [
        {
          day: "asc",
        },
        {
          startTime: "asc",
        },
      ],
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      timetables,
    });
  } catch (error) {
    console.error("GET TIMETABLE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch timetable",
      },
      { status: 500 }
    );
  }
}

// =========================
// ADD TIMETABLE
// =========================
export async function POST(req: Request) {
  try {
    const {
      subject,
      course,
      semester,
      section,
      day,
      startTime,
      endTime,
      room,
      teacherId,
    } = await req.json();

    if (
      !subject ||
      !course ||
      !semester ||
      !day ||
      !startTime ||
      !endTime ||
      !teacherId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
        },
        { status: 400 }
      );
    }

    // Check teacher
    const teacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        role: "teacher",
      },
    });

    if (!teacher) {
      return NextResponse.json(
        {
          success: false,
          message: "Teacher not found",
        },
        { status: 404 }
      );
    }

    // Create timetable
    const timetable = await prisma.timetable.create({
      data: {
        subject,
        course,
        semester,
        section: section || null,
        day,
        startTime,
        endTime,
        room: room || null,
        teacherId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Timetable added successfully",
      timetable,
    });
  } catch (error) {
    console.error("ADD TIMETABLE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add timetable",
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE TIMETABLE
// =========================
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Timetable ID is required",
        },
        { status: 400 }
      );
    }

    await prisma.timetable.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Timetable deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TIMETABLE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete timetable",
      },
      { status: 500 }
    );
  }
}