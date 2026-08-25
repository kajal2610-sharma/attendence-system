"use client";

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

export default function TeacherAttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  // =========================
  // LOAD STUDENTS
  // =========================
  async function loadStudents() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/students", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Failed to load students");
        return;
      }

      const studentList = data.students || [];

      setStudents(studentList);

      // Default all students to Present
      const initialAttendance: Record<string, string> = {};

      studentList.forEach((student: Student) => {
        initialAttendance[student.id] = "Present";
      });

      setAttendance(initialAttendance);
    } catch (error) {
      console.error("LOAD STUDENTS ERROR:", error);
      setMessage("Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // CHANGE ATTENDANCE STATUS
  // =========================
  function changeStatus(studentId: string, status: string) {
    setAttendance((previous) => ({
      ...previous,
      [studentId]: status,
    }));
  }

  // =========================
  // SAVE ATTENDANCE
  // =========================
 async function saveAttendance() {
  if (!subject.trim()) {
    setMessage("Please enter a subject");
    return;
  }

  try {

      const records = students.map((student) => ({
        studentId: student.id,
        status: attendance[student.id] || "Present",
        course: student.course,
        semester: student.semester,
        section: student.section,
      }));

      const response = await fetch("/api/teachers/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  records,
  subject: subject.trim(),
}),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Failed to save attendance");
        return;
      }

      alert("Attendance saved successfully");
    } catch (error) {
      console.error("SAVE ATTENDANCE ERROR:", error);
      setMessage("Failed to save attendance");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* =========================
            HEADER
        ========================= */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Mark Attendance
            </h1>

            <p className="text-gray-500 mt-2">
              Mark attendance of your students
            </p>
          </div>

          <button
            onClick={saveAttendance}
            disabled={saving || students.length === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? "Saving..." : "Save Attendance"}
          </button>

        </div>

        {/* =========================
            MESSAGE
        ========================= */}
        {message && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Subject
  </label>

  <input
    type="text"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    placeholder="Enter subject, e.g. Java, DBMS, Python"
    className="w-full border border-gray-300 rounded-lg px-4 py-3"
  />
</div>

        {/* =========================
            STUDENT TABLE
        ========================= */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Loading students...
              </p>
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No students found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="bg-gray-50 border-b">

                    <th className="text-left p-4">
                      Roll No.
                    </th>

                    <th className="text-left p-4">
                      Student
                    </th>

                    <th className="text-left p-4">
                      Course
                    </th>

                    <th className="text-left p-4">
                      Semester
                    </th>

                    <th className="text-left p-4">
                      Section
                    </th>

                    <th className="text-left p-4">
                      Attendance
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {students.map((student) => (

                    <tr
                      key={student.id}
                      className="border-b hover:bg-gray-50"
                    >

                      {/* Roll Number */}
                      <td className="p-4">
                        {student.rollNumber || "-"}
                      </td>

                      {/* Student Name */}
                      <td className="p-4 font-medium">
                        {student.name || "-"}
                      </td>

                      {/* Course */}
                      <td className="p-4">
                        {student.course || "-"}
                      </td>

                      {/* Semester */}
                      <td className="p-4">
                        {student.semester || "-"}
                      </td>

                      {/* Section */}
                      <td className="p-4">
                        {student.section || "-"}
                      </td>

                      {/* Attendance */}
                      <td className="p-4">

                        <div className="flex gap-3">

                          {/* Present */}
                          <button
                            type="button"
                            onClick={() =>
                              changeStatus(student.id, "Present")
                            }
                            className={`px-4 py-2 rounded-lg ${
                              attendance[student.id] === "Present"
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            Present
                          </button>

                          {/* Absent */}
                          <button
                            type="button"
                            onClick={() =>
                              changeStatus(student.id, "Absent")
                            }
                            className={`px-4 py-2 rounded-lg ${
                              attendance[student.id] === "Absent"
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            Absent
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
    </div>
  );
}