"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Student = {
  id: string;
  name: string | null;
  email: string;
  course: string | null;
  semester: string | null;
  section: string | null;
  rollNumber: string | null;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET STUDENTS
  // =========================
  useEffect(() => {
    getStudents();
  }, []);

  async function getStudents() {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();

      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error("GET STUDENTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // DELETE STUDENT
  // =========================
 async function deleteStudent(id: string) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    const text = await response.text();

    let data;

    try {
      data = text ? JSON.parse(text) : { success: response.ok };
    } catch {
      throw new Error("Server returned an invalid response");
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Failed to delete student (${response.status})`
      );
    }

    if (data.success) {
      alert("Student deleted successfully");

      setStudents((currentStudents) =>
        currentStudents.filter(
          (student) => student.id !== id
        )
      );
    } else {
      alert(data.message || "Failed to delete student");
    }
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  }
}

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Student Management
        </h1>

        <Link href="/admin/students/add">
          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
            + Add Student
          </button>
        </Link>

      </div>

      {/* =========================
          STUDENT TABLE
      ========================= */}
      <div className="bg-white rounded-lg shadow p-6">

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No Students Found
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b bg-gray-50">

                  <th className="text-left p-3">
                    Name
                  </th>

                  <th className="text-left p-3">
                    Email
                  </th>

                  <th className="text-left p-3">
                    Course
                  </th>

                  <th className="text-left p-3">
                    Semester
                  </th>

                  <th className="text-left p-3">
                    Section
                  </th>

                  <th className="text-left p-3">
                    Roll No.
                  </th>

                  <th className="text-left p-3">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {students.map((student) => (

                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {student.name || "-"}
                    </td>

                    <td className="p-3">
                      {student.email}
                    </td>

                    <td className="p-3">
                      {student.course || "-"}
                    </td>

                    <td className="p-3">
                      {student.semester || "-"}
                    </td>

                    <td className="p-3">
                      {student.section || "-"}
                    </td>

                    <td className="p-3">
                      {student.rollNumber || "-"}
                    </td>

                    <td className="p-3">

                      <div className="flex gap-2">

                        {/* EDIT */}
                        <Link
                          href={`/admin/students/edit?id=${student.id}`}
                        >
                          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Edit
                          </button>
                        </Link>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteStudent(student.id)
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}