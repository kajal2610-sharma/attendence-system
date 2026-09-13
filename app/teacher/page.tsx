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

export default function TeacherDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const response = await fetch("/api/students", {
        cache: "no-store",
      });

      const data = await response.json();

      if (data.success) {
        setStudents(data.students || []);
      }
    } catch (error) {
      console.error("Student loading error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-black">

      {/* TOP NAVBAR */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Attend<span className="text-blue-600">Pro</span>
            </h1>

            <p className="text-sm text-slate-500">
              Teacher Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">
              <p className="font-semibold text-slate-800">
                Teacher
              </p>

              <p className="text-xs text-slate-500">
                Faculty
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              T
            </div>

          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* WELCOME */}
        <div className="mb-8">
          <p className="text-blue-600 font-medium">
            Welcome back 👋
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-1">
            Teacher Dashboard
          </h2>

          <p className="text-slate-500 mt-2">
            Manage attendance, students and timetable from one place.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Students */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-slate-500">
                  Total Students
                </p>

                <h3 className="text-3xl font-bold text-slate-800 mt-2">
                  {loading ? "..." : students.length}
                </h3>

                <p className="text-xs text-green-600 mt-2">
                  Registered students
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                👨‍🎓
              </div>

            </div>
          </div>

          {/* Attendance */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-slate-500">
                  Today's Attendance
                </p>

                <h3 className="text-3xl font-bold text-slate-800 mt-2">
                  --
                </h3>

                <p className="text-xs text-slate-500 mt-2">
                  Attendance percentage
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                📊
              </div>

            </div>
          </div>

          {/* Classes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-slate-500">
                  Today's Classes
                </p>

                <h3 className="text-3xl font-bold text-slate-800 mt-2">
                  --
                </h3>

                <p className="text-xs text-purple-600 mt-2">
                  Scheduled classes
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                📚
              </div>

            </div>
          </div>

          {/* Timetable */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-slate-500">
                  Timetable
                </p>

                <h3 className="text-3xl font-bold text-slate-800 mt-2">
                  ✓
                </h3>

                <p className="text-xs text-orange-600 mt-2">
                  Schedule available
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                📅
              </div>

            </div>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">

          <div className="mb-5">
            <h3 className="text-xl font-bold text-slate-800">
              Quick Actions
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Quickly access your daily teaching activities.
            </p>
          </div>

          {/* Changed to 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Attendance */}
            <Link
              href="/teacher/attendence"
              className="group rounded-xl border border-blue-200 bg-blue-50 p-6 hover:bg-blue-600 transition"
            >
              <div className="text-3xl mb-4">
                📝
              </div>

              <h4 className="font-bold text-lg text-slate-800 group-hover:text-white">
                Mark Attendance
              </h4>

              <p className="text-sm text-slate-500 mt-2 group-hover:text-blue-100">
                Mark present or absent for students.
              </p>

              <div className="mt-4 text-blue-600 font-semibold group-hover:text-white">
                Open Attendance →
              </div>
            </Link>

            {/* Reports */}
            <Link
              href="/teacher/student-report"
              className="group rounded-xl border border-purple-200 bg-purple-50 p-6 hover:bg-purple-600 transition"
            >
              <div className="text-3xl mb-4">
                📈
              </div>

              <h4 className="font-bold text-lg text-slate-800 group-hover:text-white">
                Student Reports
              </h4>

              <p className="text-sm text-slate-500 mt-2 group-hover:text-purple-100">
                Check individual attendance performance.
              </p>

              <div className="mt-4 text-purple-600 font-semibold group-hover:text-white">
                View Reports →
              </div>
            </Link>

            {/* Timetable */}
            <Link
              href="/teacher/timetable"
              className="group rounded-xl border border-orange-200 bg-orange-50 p-6 hover:bg-orange-600 transition"
            >
              <div className="text-3xl mb-4">
                📅
              </div>

              <h4 className="font-bold text-lg text-slate-800 group-hover:text-white">
                My Timetable
              </h4>

              <p className="text-sm text-slate-500 mt-2 group-hover:text-orange-100">
                View your daily class schedule.
              </p>

              <div className="mt-4 text-orange-600 font-semibold group-hover:text-white">
                View Timetable →
              </div>
            </Link>

            {/* MY PROFILE - NEW */}
            <Link
              href="/teacher/profile"
              className="group rounded-xl border border-green-200 bg-green-50 p-6 hover:bg-green-600 transition"
            >
              <div className="text-3xl mb-4">
                👨‍🏫
              </div>

              <h4 className="font-bold text-lg text-slate-800 group-hover:text-white">
                My Profile
              </h4>

              <p className="text-sm text-slate-500 mt-2 group-hover:text-green-100">
                View and manage your personal information.
              </p>

              <div className="mt-4 text-green-600 font-semibold group-hover:text-white">
                View Profile →
              </div>
            </Link>

          </div>

        </div>

        {/* STUDENT OVERVIEW */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

          <div className="p-6 border-b flex items-center justify-between">

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Student Overview
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Recently registered students
              </p>
            </div>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              {students.length} Students
            </span>

          </div>

          {loading ? (

            <div className="p-10 text-center text-slate-500">
              Loading students...
            </div>

          ) : students.length === 0 ? (

            <div className="p-10 text-center">

              <div className="text-4xl mb-3">
                👨‍🎓
              </div>

              <p className="text-slate-500">
                No students found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="bg-slate-50 border-b">

                    <th className="text-left p-4 text-sm text-slate-600">
                      Roll No.
                    </th>

                    <th className="text-left p-4 text-sm text-slate-600">
                      Student
                    </th>

                    <th className="text-left p-4 text-sm text-slate-600">
                      Course
                    </th>

                    <th className="text-left p-4 text-sm text-slate-600">
                      Semester
                    </th>

                    <th className="text-left p-4 text-sm text-slate-600">
                      Section
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {students.slice(0, 5).map((student) => (

                    <tr
                      key={student.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4 font-medium">
                        {student.rollNumber || "-"}
                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                            {(student.name || "S").charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {student.name || "-"}
                            </p>

                            <p className="text-xs text-slate-500">
                              {student.email}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="p-4">
                        {student.course || "-"}
                      </td>

                      <td className="p-4">
                        {student.semester || "-"}
                      </td>

                      <td className="p-4">
                        {student.section || "-"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}
