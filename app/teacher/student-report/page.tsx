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

type AttendanceRecord = {
  id: string;
  date: string;
  subject: string | null;
  status: string;
};

type Summary = {
  total: number;
  present: number;
  absent: number;
  percentage: number;
};

export default function StudentReportPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      setLoadingStudents(true);
      setMessage("");

      const response = await fetch("/api/students", {
        cache: "no-store",
      });

      const text = await response.text();

      if (!response.ok) {
        console.error("STUDENTS API ERROR:", text);
        setMessage(`Failed to load students (${response.status})`);
        return;
      }

      const data = JSON.parse(text);

      if (!data.success) {
        setMessage(data.message || "Failed to load students");
        return;
      }

      setStudents(data.students || []);
    } catch (error) {
      console.error("STUDENT LOAD ERROR:", error);
      setMessage("Failed to load students");
    } finally {
      setLoadingStudents(false);
    }
  }

  async function loadReport(studentId: string) {
    if (!studentId) {
      setSummary(null);
      setAttendance([]);
      return;
    }

    try {
      setLoadingReport(true);
      setMessage("");

      const response = await fetch(
        `/api/teachers/student-report?studentId=${studentId}`,
        {
          cache: "no-store",
        }
      );

      const text = await response.text();

      console.log("REPORT STATUS:", response.status);
      console.log("REPORT RESPONSE:", text);

      if (!response.ok) {
        setMessage(`Report API error: ${response.status}`);
        setSummary(null);
        setAttendance([]);
        return;
      }

      const data = JSON.parse(text);

      if (!data.success) {
        setMessage(data.message || "Failed to load report");
        setSummary(null);
        setAttendance([]);
        return;
      }

      setSummary(data.summary);
      setAttendance(data.attendance || []);
    } catch (error) {
      console.error("REPORT LOAD ERROR:", error);
      setMessage("Failed to load student report");
      setSummary(null);
      setAttendance([]);
    } finally {
      setLoadingReport(false);
    }
  }

  function handleStudentChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const studentId = e.target.value;

    setSelectedStudent(studentId);

    loadReport(studentId);
  }

  const student = students.find(
    (item) => item.id === selectedStudent
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 text-black">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-blue-600 font-semibold">
            Attendance Management
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
            Student Attendance Report
          </h1>

          <p className="text-slate-500 mt-2">
            Check individual student attendance and performance.
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {message}
          </div>
        )}

        {/* SELECT STUDENT */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Select Student
          </label>

          <select
            value={selectedStudent}
            onChange={handleStudentChange}
            disabled={loadingStudents}
            className="w-full md:w-[450px] border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              {loadingStudents
                ? "Loading students..."
                : "Select a student"}
            </option>

            {students.map((student) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.name || "Unnamed Student"}
                {student.rollNumber
                  ? ` - ${student.rollNumber}`
                  : ""}
              </option>
            ))}
          </select>

        </div>

        {/* STUDENT INFORMATION */}
        {student && (
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">

            <div className="flex flex-col lg:flex-row lg:items-center gap-6">

              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
                {(student.name || "S")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              {/* Name */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800">
                  {student.name || "-"}
                </h2>

                <p className="text-slate-500">
                  {student.email}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                <div>
                  <p className="text-xs text-slate-500">
                    Roll No.
                  </p>

                  <p className="font-semibold mt-1">
                    {student.rollNumber || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Course
                  </p>

                  <p className="font-semibold mt-1">
                    {student.course || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Semester
                  </p>

                  <p className="font-semibold mt-1">
                    {student.semester || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Section
                  </p>

                  <p className="font-semibold mt-1">
                    {student.section || "-"}
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* REPORT CARDS */}
        {student && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            {/* Percentage */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-slate-500">
                    Attendance Percentage
                  </p>

                  <h3 className="text-4xl font-bold text-blue-600 mt-3">
                    {loadingReport
                      ? "..."
                      : `${summary?.percentage ?? 0}%`}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                  📊
                </div>

              </div>

            </div>

            {/* Present */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-slate-500">
                    Present
                  </p>

                  <h3 className="text-4xl font-bold text-green-600 mt-3">
                    {loadingReport
                      ? "..."
                      : summary?.present ?? 0}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>

            </div>

            {/* Absent */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-slate-500">
                    Absent
                  </p>

                  <h3 className="text-4xl font-bold text-red-600 mt-3">
                    {loadingReport
                      ? "..."
                      : summary?.absent ?? 0}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                  ✕
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ATTENDANCE HISTORY */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-xl font-bold text-slate-800">
              Attendance History
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Daily attendance records
            </p>

          </div>

          {!selectedStudent ? (

            <div className="p-12 text-center">

              <div className="text-5xl mb-4">
                📊
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                Select a student
              </h3>

              <p className="text-slate-500 mt-2">
                Select a student above to view attendance.
              </p>

            </div>

          ) : loadingReport ? (

            <div className="p-12 text-center text-slate-500">
              Loading attendance report...
            </div>

          ) : attendance.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-4xl mb-3">
                📅
              </div>

              <p className="text-slate-500">
                No attendance records found for this student.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 border-b">

                    <th className="text-left p-4">
                      Date
                    </th>

                    <th className="text-left p-4">
                      Subject
                    </th>

                    <th className="text-left p-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {attendance.map((record) => (

                    <tr
                      key={record.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {new Date(
                          record.date
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4 font-medium">
                        {record.subject || "General"}
                      </td>

                      <td className="p-4">

                        {record.status === "Present" ? (

                          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Present
                          </span>

                        ) : (

                          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Absent
                          </span>

                        )}

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
