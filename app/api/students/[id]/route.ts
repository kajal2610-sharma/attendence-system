import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const student = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!student || student.role !== "student") {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        course: student.course,
        semester: student.semester,
        section: student.section,
        rollNumber: student.rollNumber,
      },
    });
  } catch (error) {
    console.error("GET STUDENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch student",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await req.json();

    const {
      name,
      email,
      course,
      semester,
      section,
      rollNumber,
    } = body;

    const existingStudent = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingStudent || existingStudent.role !== "student") {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    const updatedStudent = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        course,
        semester,
        section,
        rollNumber,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("UPDATE STUDENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update student",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const student = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!student || student.role !== "student") {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    // First delete student's attendance records
    await prisma.attendance.deleteMany({
      where: {
        studentId: id,
      },
    });

    // Now delete the student
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete student",
      },
      { status: 500 }
    );
  }
}