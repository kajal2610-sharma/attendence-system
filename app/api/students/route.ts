import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get all students
export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: "student",
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
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("GET STUDENTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch students",
      },
      {
        status: 500,
      }
    );
  }
}


// POST - Add new student
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("ADD STUDENT BODY:", body);

    const {
      name,
      email,
      password,
      course,
      semester,
      section,
      rollNumber,
    } = body;

    // Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !course ||
      !semester ||
      !section ||
      !rollNumber
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    // Check existing email
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Student with this email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Check existing roll number
    const existingRollNumber = await prisma.user.findFirst({
      where: {
        rollNumber: rollNumber,
      },
    });

    if (existingRollNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Student with this roll number already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Create student
    const student = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "student",
        course,
        semester,
        section,
        rollNumber,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Student added successfully",
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
    console.error("POST STUDENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error while adding student",
      },
      {
        status: 500,
      }
    );
  }
}