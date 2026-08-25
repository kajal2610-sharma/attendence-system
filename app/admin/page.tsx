"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DashboardStats = {
  students: number;
  teachers: number;
  timetables: number;
  attendance: number;

  today: {
    present: number;
    absent: number;
    total: number;
    percentage: number;
  };
};

export default function AdminPage() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/dashboard",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to load dashboard"
        );
      }

      setStats(data.stats);
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

  async function handleLogout() {
    try {
      setLoggingOut(true);

      const response = await fetch(
        "/api/logout",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      window.location.href = "/login";
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again."
      );

      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <p className="text-blue-600 font-semibold">
              Attendance Management System
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
              Admin Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Manage students, teachers, timetable and
              attendance.
            </p>

          </div>

          {/* Logout Button */}

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-xl transition shadow-sm"
          >
            {loggingOut ? "Logging out..." : "🚪 Logout"}
          </button>

        </div>

        {/* Error */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (

          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border">

            <p className="text-slate-500">
              Loading dashboard...
            </p>

          </div>

        ) : (

          <>

            {/* Statistics */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Students */}

              <div className="bg-white rounded-2xl p-6 shadow-sm border">

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-slate-500 font-medium">
                      Students
                    </p>

                    <h2 className="text-4xl font-bold text-blue-600 mt-3">
                      {stats?.students || 0}
                    </h2>

                    <p className="text-sm text-slate-400 mt-2">
                      Registered students
                    </p>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                    👨‍🎓
                  </div>

                </div>

              </div>

              {/* Teachers */}

              <div className="bg-white rounded-2xl p-6 shadow-sm border">

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-slate-500 font-medium">
                      Teachers
                    </p>

                    <h2 className="text-4xl font-bold text-green-600 mt-3">
                      {stats?.teachers || 0}
                    </h2>

                    <p className="text-sm text-slate-400 mt-2">
                      Registered teachers
                    </p>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                    👨‍🏫
                  </div>

                </div>

              </div>

              {/* Timetable */}

              <div className="bg-white rounded-2xl p-6 shadow-sm border">

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-slate-500 font-medium">
                      Timetable
                    </p>

                    <h2 className="text-4xl font-bold text-purple-600 mt-3">
                      {stats?.timetables || 0}
                    </h2>

                    <p className="text-sm text-slate-400 mt-2">
                      Timetable entries
                    </p>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                    🗓️
                  </div>

                </div>

              </div>

              {/* Attendance */}

              <div className="bg-white rounded-2xl p-6 shadow-sm border">

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-slate-500 font-medium">
                      Total Attendance
                    </p>

                    <h2 className="text-4xl font-bold text-orange-600 mt-3">
                      {stats?.attendance || 0}
                    </h2>

                    <p className="text-sm text-slate-400 mt-2">
                      Records in system
                    </p>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                    📊
                  </div>

                </div>

              </div>

            </div>

            {/* Today's Attendance */}

            <div className="mt-8">

              <div className="bg-white rounded-2xl shadow-sm border p-6">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h2 className="text-xl font-bold text-slate-800">
                      Today's Attendance
                    </h2>

                    <p className="text-slate-500 mt-1">
                      Current attendance status for today
                    </p>

                  </div>

                  <div className="text-3xl font-bold text-blue-600">
                    {stats?.today.percentage || 0}%
                  </div>

                </div>

                {/* Progress */}

                <div className="mt-6">

                  <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">

                    <div
                      className="bg-blue-600 h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          stats?.today.percentage || 0,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Present / Absent */}

                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="bg-green-50 rounded-xl p-4">

                    <p className="text-green-700 text-sm">
                      Present
                    </p>

                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {stats?.today.present || 0}
                    </p>

                  </div>

                  <div className="bg-red-50 rounded-xl p-4">

                    <p className="text-red-700 text-sm">
                      Absent
                    </p>

                    <p className="text-2xl font-bold text-red-600 mt-1">
                      {stats?.today.absent || 0}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Quick Actions */}

            <div className="mt-8">

              <h2 className="text-2xl font-bold text-slate-800 mb-5">
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Manage Students */}

                <Link
                  href="/admin/students"
                  className="bg-blue-600 text-white p-5 rounded-xl hover:bg-blue-700 transition"
                >

                  <div className="text-2xl mb-2">
                    👨‍🎓
                  </div>

                  <h3 className="font-bold">
                    Manage Students
                  </h3>

                  <p className="text-blue-100 text-sm mt-1">
                    Add and manage students
                  </p>

                </Link>

                {/* Manage Teachers */}

                <Link
                  href="/admin/teachers"
                  className="bg-green-600 text-white p-5 rounded-xl hover:bg-green-700 transition"
                >

                  <div className="text-2xl mb-2">
                    👨‍🏫
                  </div>

                  <h3 className="font-bold">
                    Manage Teachers
                  </h3>

                  <p className="text-green-100 text-sm mt-1">
                    Add and manage teachers
                  </p>

                </Link>

                {/* Attendance */}

                <Link
                  href="/admin/attendance"
                  className="bg-purple-600 text-white p-5 rounded-xl hover:bg-purple-700 transition"
                >

                  <div className="text-2xl mb-2">
                    📊
                  </div>

                  <h3 className="font-bold">
                    Attendance
                  </h3>

                  <p className="text-purple-100 text-sm mt-1">
                    View attendance records
                  </p>

                </Link>

                {/* Timetable */}

                <Link
                  href="/admin/timetable"
                  className="bg-orange-600 text-white p-5 rounded-xl hover:bg-orange-700 transition"
                >

                  <div className="text-2xl mb-2">
                    🗓️
                  </div>

                  <h3 className="font-bold">
                    Timetable
                  </h3>

                  <p className="text-orange-100 text-sm mt-1">
                    Manage class timetable
                  </p>

                </Link>

              </div>

            </div>

            {/* System Overview */}

            <div className="mt-8 bg-white rounded-2xl border shadow-sm p-6">

              <h2 className="text-xl font-bold text-slate-800">
                System Overview
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mt-6">

                {/* Student Management */}

                <div className="border-l-4 border-blue-500 pl-4">

                  <p className="text-sm text-slate-500">
                    Student Management
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    Active
                  </p>

                </div>

                {/* Teacher Management */}

                <div className="border-l-4 border-green-500 pl-4">

                  <p className="text-sm text-slate-500">
                    Teacher Management
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    Active
                  </p>

                </div>

                {/* Attendance System */}

                <div className="border-l-4 border-purple-500 pl-4">

                  <p className="text-sm text-slate-500">
                    Attendance System
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    Active
                  </p>

                </div>

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
}