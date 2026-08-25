"use client";

import { useEffect, useState } from "react";

type AttendanceRecord = {
  id: string;
  date: string;
  subject: string | null;
  course: string | null;
  semester: string | null;
  section: string | null;
  status: string;

  student: {
    id: string;
    name: string | null;
    email: string;
    rollNumber: string | null;
  };

  teacher: {
    id: string;
    name: string | null;
    email: string;
  };
};

export default function AdminAttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/attendance", {
        cache: "no-store",
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = JSON.parse(text);

      if (!data.success) {
        throw new Error(
          data.message || "Failed to load attendance"
        );
      }

      setRecords(data.records || []);
    } catch (error) {
      console.error("ATTENDANCE ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const total = records.length;

  const present = records.filter(
    (item) => item.status.toLowerCase() === "present"
  ).length;

  const absent = records.filter(
    (item) => item.status.toLowerCase() === "absent"
  ).length;

  const percentage =
    total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <p className="text-blue-600 font-semibold">
            Admin Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
            Attendance Overview
          </h1>

          <p className="text-slate-500 mt-2">
            View all student attendance records.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <p className="text-slate-500">Total Records</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {total}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <p className="text-slate-500">Present</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {present}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <p className="text-slate-500">Attendance</p>
            <h2 className="text-4xl font-bold text-purple-600 mt-2">
              {percentage}%
            </h2>

            <p className="text-sm text-red-500 mt-2">
              Absent: {absent}
            </p>
          </div>

        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">
              All Attendance Records
            </h2>

            <button
              onClick={loadAttendance}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Loading attendance...
            </div>
          ) : records.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No attendance records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="bg-slate-50 border-b">
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Student</th>
                    <th className="text-left p-4">Roll No.</th>
                    <th className="text-left p-4">Teacher</th>
                    <th className="text-left p-4">Subject</th>
                    <th className="text-left p-4">Course</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-4">
                        {formatDate(record.date)}
                      </td>

                      <td className="p-4">
                        <p className="font-semibold">
                          {record.student.name || "Student"}
                        </p>
                        <p className="text-sm text-slate-400">
                          {record.student.email}
                        </p>
                      </td>

                      <td className="p-4">
                        {record.student.rollNumber || "-"}
                      </td>

                      <td className="p-4">
                        {record.teacher.name || "Teacher"}
                      </td>

                      <td className="p-4">
                        {record.subject || "General"}
                      </td>

                      <td className="p-4">
                        {record.course || "-"}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            record.status.toLowerCase() === "present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {record.status}
                        </span>
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