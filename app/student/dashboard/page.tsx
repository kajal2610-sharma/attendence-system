
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  name: string | null;
  email: string;
  course: string | null;
  semester: string | null;
  section: string | null;
  rollNumber: string | null;
};

export default function StudentDashboard() {
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    loadStudent();
  }, []);

  async function loadStudent() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/students/dashboard", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load dashboard"
        );
      }

      setStudent(data.student);
    } catch (error) {
      console.error("DASHBOARD ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  }

  // LOGOUT
  async function handleLogout() {
    try {
      setLoggingOut(true);

      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      router.replace("/login");
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to logout"
      );
    } finally {
      setLoggingOut(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-lg text-slate-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          
          <div>
            <p className="text-blue-600 font-semibold">
              Student Panel
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
              Welcome, {student?.name || "Student"} 👋
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your profile, attendance and timetable.
            </p>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* STUDENT INFO */}
        {student && (
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Student Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Course
                </p>
                <p className="font-semibold text-slate-800 mt-1">
                  {student.course || "-"}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Semester
                </p>
                <p className="font-semibold text-slate-800 mt-1">
                  {student.semester || "-"}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Section
                </p>
                <p className="font-semibold text-slate-800 mt-1">
                  {student.section || "-"}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Roll Number
                </p>
                <p className="font-semibold text-slate-800 mt-1">
                  {student.rollNumber || "-"}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* QUICK ACTIONS */}
        <h2 className="text-2xl font-bold text-slate-800 mb-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* MY PROFILE */}
          <Link href="/student/profile">
            <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">

              <div className="text-4xl mb-4">👤</div>

              <h3 className="text-xl font-bold text-slate-800">
                My Profile
              </h3>

              <p className="text-slate-500 mt-2">
                View your personal and academic information.
              </p>

            </div>
          </Link>

          {/* MY ATTENDANCE */}
          <Link href="/student/report">
            <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">

              <div className="text-4xl mb-4">📊</div>

              <h3 className="text-xl font-bold text-slate-800">
                My Attendance
              </h3>

              <p className="text-slate-500 mt-2">
                Check your attendance percentage and history.
              </p>

            </div>
          </Link>

          {/* TIMETABLE */}
          <Link href="/student/timetable">
            <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">

              <div className="text-4xl mb-4">📅</div>

              <h3 className="text-xl font-bold text-slate-800">
                Timetable
              </h3>

              <p className="text-slate-500 mt-2">
                View your class timetable.
              </p>

            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}

