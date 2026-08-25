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

type Attendance = {
  id: string;
  date: string;
  subject: string | null;
  status: string;
};

type ReportData = {
  total: number;
  present: number;
  absent: number;
  percentage: number;
};

export default function StudentReportPage() {
  const [student, setStudent] = useState<Student | null>(null);

  const [summary, setSummary] = useState<ReportData>({
    total: 0,
    present: 0,
    absent: 0,
    percentage: 0,
  });

  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {
      setLoading(true);
      setError("");

      // ==================================
      // GET STUDENT PROFILE
      // ==================================

      const profileResponse = await fetch(
        "/api/students/profile",
        {
          cache: "no-store",
        }
      );

      if (!profileResponse.ok) {
        throw new Error(
          `Profile API Error: ${profileResponse.status}`
        );
      }

      const profileData =
        await profileResponse.json();

      if (!profileData.success) {
        throw new Error(
          profileData.message ||
            "Failed to load profile"
        );
      }

      const currentStudent = profileData.user;

      setStudent(currentStudent);

      // ==================================
      // GET ATTENDANCE REPORT
      // ==================================

      const reportResponse = await fetch(
        `/api/teachers/student-report?studentId=${encodeURIComponent(
          currentStudent.id
        )}`,
        {
          cache: "no-store",
        }
      );

      if (!reportResponse.ok) {
        throw new Error(
          `Report API Error: ${reportResponse.status}`
        );
      }

      const reportData =
        await reportResponse.json();

      if (!reportData.success) {
        throw new Error(
          reportData.message ||
            "Failed to load attendance"
        );
      }

      // ==================================
      // SET DATA
      // ==================================

      setSummary({
        total: reportData.summary?.total || 0,
        present: reportData.summary?.present || 0,
        absent: reportData.summary?.absent || 0,
        percentage:
          reportData.summary?.percentage || 0,
      });

      setAttendance(
        reportData.attendance || []
      );

    } catch (error) {
      console.error(
        "STUDENT REPORT ERROR:",
        error
      );

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
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-slate-600">
            Loading attendance report...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-blue-600 font-semibold">
            Student Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
            Attendance Report
          </h1>

          <p className="text-slate-500 mt-2">
            View your complete attendance record.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* STUDENT INFORMATION */}

        {student && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 md:p-8 mb-8 shadow-lg">

            <div className="flex flex-col md:flex-row md:items-center gap-6">

              <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold">

                {(student.name || "S")
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {student.name || "Student"}
                </h2>

                <p className="text-blue-100 mt-1">
                  {student.email}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    Roll No: {student.rollNumber || "-"}
                  </span>

                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {student.course || "-"}
                  </span>

                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    Semester {student.semester || "-"}
                  </span>

                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    Section {student.section || "-"}
                  </span>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* SUMMARY */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Percentage */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-slate-500">
              Attendance
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">
              {summary.percentage}%
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Overall percentage
            </p>

          </div>

          {/* Total */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-slate-500">
              Total Classes
            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-3">
              {summary.total}
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Classes recorded
            </p>

          </div>

          {/* Present */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-slate-500">
              Present
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              {summary.present}
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Classes attended
            </p>

          </div>

          {/* Absent */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-slate-500">
              Absent
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-3">
              {summary.absent}
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Classes missed
            </p>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold text-slate-800">
              Attendance Progress
            </h2>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                summary.percentage >= 75
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {summary.percentage >= 75
                ? "Good"
                : "Low"}
            </span>

          </div>

          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

            <div
              className={`h-full rounded-full ${
                summary.percentage >= 75
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${Math.min(
                  summary.percentage,
                  100
                )}%`,
              }}
            />

          </div>

          <div className="flex justify-between text-sm text-slate-500 mt-2">

            <span>
              Current: {summary.percentage}%
            </span>

            <span>
              Required: 75%
            </span>

          </div>

        </div>

        {/* ATTENDANCE HISTORY */}

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-xl font-bold text-slate-800">
              Attendance History
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Your recent attendance records
            </p>

          </div>

          {attendance.length === 0 ? (

            <div className="p-10 text-center">

              <div className="text-4xl mb-3">
                📅
              </div>

              <p className="text-slate-500">
                No attendance records found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 border-b">

                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                      Date
                    </th>

                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                      Subject
                    </th>

                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {attendance.map((record) => (

                    <tr
                      key={record.id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >

                      <td className="p-4 text-slate-700">
                        {formatDate(record.date)}
                      </td>

                      <td className="p-4 text-slate-700">
                        {record.subject || "General"}
                      </td>

                      <td className="p-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                            record.status
                              .toLowerCase() ===
                            "present"
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

        {/* BACK BUTTON */}

        <div className="mt-6">

          <a
            href="/student/dashboard"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </a>

        </div>

      </div>

    </div>
  );
}