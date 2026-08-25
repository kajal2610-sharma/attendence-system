import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =========================
// GET SINGLE TIMETABLE
// =========================
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const timetable = await prisma.timetable.findUnique({
      where: {
        id,
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!timetable) {
      return NextResponse.json(
        {
          success: false,
          message: "Timetable not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      timetable,
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
// UPDATE TIMETABLE
// =========================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    const existingTimetable = await prisma.timetable.findUnique({
      where: {
        id,
      },
    });

    if (!existingTimetable) {
      return NextResponse.json(
        {
          success: false,
          message: "Timetable not found",
        },
        { status: 404 }
      );
    }

    const timetable = await prisma.timetable.update({
      where: {
        id,
      },
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
      message: "Timetable updated successfully",
      timetable,
    });
  } catch (error) {
    console.error("UPDATE TIMETABLE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update timetable",
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE TIMETABLE
// =========================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingTimetable = await prisma.timetable.findUnique({
      where: {
        id,
      },
    });

    if (!existingTimetable) {
      return NextResponse.json(
        {
          success: false,
          message: "Timetable not found",
        },
        { status: 404 }
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