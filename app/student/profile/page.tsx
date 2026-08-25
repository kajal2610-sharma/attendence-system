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

export default function StudentProfilePage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/students/profile", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to load profile");
        return;
      }

      setStudent(data.user);
    } catch (error) {
      console.error("PROFILE ERROR:", error);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-blue-600 font-semibold">
            Student Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
            My Profile
          </h1>

          <p className="text-slate-500 mt-2">
            View your account and academic information.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* PROFILE */}
        {student && (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

            {/* TOP SECTION */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">

              <div className="flex flex-col sm:flex-row items-center gap-6">

                <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold">
                  {(student.name || "S").charAt(0).toUpperCase()}
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="text-3xl font-bold">
                    {student.name || "Student"}
                  </h2>

                  <p className="text-blue-100 mt-2">
                    {student.email}
                  </p>

                  <p className="text-blue-100 mt-1">
                    Roll No: {student.rollNumber || "-"}
                  </p>
                </div>

              </div>

            </div>

            {/* INFORMATION */}
            <div className="p-6 md:p-8">

              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Academic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="border rounded-xl p-5">
                  <p className="text-sm text-slate-500">
                    Course
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {student.course || "-"}
                  </p>
                </div>

                <div className="border rounded-xl p-5">
                  <p className="text-sm text-slate-500">
                    Semester
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {student.semester || "-"}
                  </p>
                </div>

                <div className="border rounded-xl p-5">
                  <p className="text-sm text-slate-500">
                    Section
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {student.section || "-"}
                  </p>
                </div>

                <div className="border rounded-xl p-5">
                  <p className="text-sm text-slate-500">
                    Roll Number
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {student.rollNumber || "-"}
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* BACK BUTTON */}
        <div className="mt-6">
          <a
            href="/student/dashboard"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            ← Back to Dashboard
          </a>
        </div>

      </div>
    </div>
  );
}