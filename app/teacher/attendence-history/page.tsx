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
};

type Summary = {
  total: number;
  present: number;
  absent: number;
  percentage: number;
};

export default function AttendanceHistoryPage() {
  const [records, setRecords] = useState<
    AttendanceRecord[]
  >([]);

  const [subjects, setSubjects] = useState<string[]>(
    []
  );

  const [summary, setSummary] = useState<Summary>({
    total: 0,
    present: 0,
    absent: 0,
    percentage: 0,
  });

  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (date) {
        params.append("date", date);
      }

      if (subject !== "all") {
        params.append("subject", subject);
      }

      const url =
        `/api/teachers/attendence-history?${params.toString()}`;

      const response = await fetch(url, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to load attendance"
        );
      }

      setRecords(data.records || []);

      setSubjects(data.subjects || []);

      setSummary({
        total: data.summary?.total || 0,
        present: data.summary?.present || 0,
        absent: data.summary?.absent || 0,
        percentage:
          data.summary?.percentage || 0,
      });

    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    return new Date(
      dateString
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function clearFilters() {
    setDate("");
    setSubject("all");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <p className="text-blue-600 font-semibold">
            Teacher Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
            Attendance History
          </h1>

          <p className="text-slate-500 mt-2">
            View and filter attendance records taken by you.
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Filters */}

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">

          <h2 className="text-lg font-bold text-slate-800 mb-5">
            Filter Attendance
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {/* Date */}

            <div>

              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full border border-slate-300 rounded-lg p-3"
              />

            </div>

            {/* Subject */}

            <div>

              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Subject
              </label>

              <select
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                className="w-full border border-slate-300 rounded-lg p-3"
              >

                <option value="all">
                  All Subjects
                </option>

                {subjects.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* Buttons */}

            <div className="flex items-end gap-3">

              <button
                onClick={loadAttendance}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Apply Filter
              </button>

              <button
                onClick={clearFilters}
                className="bg-slate-200 text-slate-700 px-5 py-3 rounded-lg font-semibold hover:bg-slate-300"
              >
                Clear
              </button>

            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6 border shadow-sm">

            <p className="text-slate-500">
              Total Records
            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">
              {summary.total}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 border shadow-sm">

            <p className="text-slate-500">
              Present
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {summary.present}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 border shadow-sm">

            <p className="text-slate-500">
              Absent
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {summary.absent}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 border shadow-sm">

            <p className="text-slate-500">
              Attendance
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {summary.percentage}%
            </h2>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-xl font-bold text-slate-800">
              Attendance Records
            </h2>

          </div>

          {loading ? (

            <div className="p-10 text-center">
              <p className="text-slate-500">
                Loading attendance...
              </p>
            </div>

          ) : records.length === 0 ? (

            <div className="p-10 text-center">

              <div className="text-4xl mb-3">
                📋
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
                      Student
                    </th>

                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                      Roll No.
                    </th>

                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                      Subject
                    </th>

                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                      Course
                    </th>

                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                      Semester
                    </th>

                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {records.map((record) => (

                    <tr
                      key={record.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4 text-slate-700">
                        {formatDate(record.date)}
                      </td>

                      <td className="p-4">

                        <p className="font-semibold text-slate-800">
                          {record.student.name ||
                            "Student"}
                        </p>

                        <p className="text-sm text-slate-400">
                          {record.student.email}
                        </p>

                      </td>

                      <td className="p-4 text-slate-700">
                        {record.student.rollNumber ||
                          "-"}
                      </td>

                      <td className="p-4 text-slate-700">
                        {record.subject ||
                          "General"}
                      </td>

                      <td className="p-4 text-slate-700">
                        {record.course || "-"}
                      </td>

                      <td className="p-4 text-slate-700">
                        {record.semester || "-"}
                      </td>

                      <td className="p-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                            record.status.toLowerCase() ===
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

      </div>

    </div>
  );
}