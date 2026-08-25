import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

// GET ONE TEACHER
export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const teacher = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!teacher || teacher.role !== "teacher") {
      return NextResponse.json(
        {
          success: false,
          message: "Teacher not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      teacher,
    });
  } catch (error) {
    console.error("GET TEACHER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch teacher",
      },
      { status: 500 }
    );
  }
}

// UPDATE TEACHER
export async function PUT(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const { name, email, password } = await req.json();

    const teacher = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!teacher || teacher.role !== "teacher") {
      return NextResponse.json(
        {
          success: false,
          message: "Teacher not found",
        },
        { status: 404 }
      );
    }

    const updatedTeacher = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        ...(password ? { password } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error("UPDATE TEACHER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update teacher",
      },
      { status: 500 }
    );
  }
}

// DELETE TEACHER
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const teacher = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!teacher || teacher.role !== "teacher") {
      return NextResponse.json(
        {
          success: false,
          message: "Teacher not found",
        },
        { status: 404 }
      );
    }

    // Delete attendance records created by this teacher
    await prisma.attendance.deleteMany({
      where: {
        teacherId: id,
      },
    });

    // Delete timetable records of this teacher
    await prisma.timetable.deleteMany({
      where: {
        teacherId: id,
      },
    });

    // Now delete the teacher
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TEACHER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete teacher",
      },
      { status: 500 }
    );
  }
}