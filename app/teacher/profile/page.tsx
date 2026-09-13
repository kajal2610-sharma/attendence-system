"use client";

import { useEffect, useState } from "react";

type Teacher = {
  id: string;
  name: string | null;
  email: string;
  role: string;
};

export default function TeacherProfilePage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  // LOAD PROFILE
  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/teachers/profile", {
        cache: "no-store",
      });

      const text = await response.text();

      if (!response.ok) {
        setError(`Failed to load profile (${response.status})`);
        return;
      }

      const data = JSON.parse(text);

      if (!data.success) {
        setError(data.message || "Failed to load profile");
        return;
      }

      setTeacher(data.user);

      setName(data.user.name || "");
      setEmail(data.user.email || "");
    } catch (error) {
      console.error("PROFILE ERROR:", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // START EDITING
  function startEditing() {
    if (!teacher) return;

    setName(teacher.name || "");
    setEmail(teacher.email);

    setMessage("");
    setError("");

    setEditing(true);
  }

  // CANCEL EDITING
  function cancelEditing() {
    if (!teacher) return;

    setName(teacher.name || "");
    setEmail(teacher.email);

    setMessage("");
    setError("");

    setEditing(false);
  }

  // SAVE PROFILE
  async function saveProfile() {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch("/api/teachers/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      const text = await response.text();

      console.log("UPDATE PROFILE STATUS:", response.status);
      console.log("UPDATE PROFILE RESPONSE:", text);

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to update profile");
        return;
      }

      setTeacher(data.user);

      setName(data.user.name || "");
      setEmail(data.user.email || "");

      setEditing(false);

      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);
      setError("Something went wrong while updating profile");
    } finally {
      setSaving(false);
    }
  }

  // LOGOUT
 // LOGOUT
async function logout() {
  try {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    window.location.href = "/login";
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-slate-700">
            Loading profile...
          </div>

          <p className="text-slate-500 mt-2">
            Please wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <p className="text-blue-600 font-semibold">
            Teacher Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
            My Profile
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your teacher account information.
          </p>

        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-xl mb-6">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {teacher && (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

            {/* PROFILE HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">

              <div className="flex flex-col sm:flex-row items-center gap-6">

                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg">

                  {(teacher.name || "T")
                    .charAt(0)
                    .toUpperCase()}

                </div>

                {/* Teacher Info */}
                <div className="text-center sm:text-left text-white">

                  <h2 className="text-3xl font-bold">
                    {teacher.name || "Teacher"}
                  </h2>

                  <p className="text-blue-100 mt-1">
                    {teacher.email}
                  </p>

                  <span className="inline-block mt-3 bg-white/20 px-4 py-1 rounded-full text-sm">
                    Teacher
                  </span>

                </div>

              </div>

            </div>

            {/* ACCOUNT INFORMATION */}
            <div className="p-8">

              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Account Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                {/* NAME */}
                <div>

                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={
                      editing
                        ? name
                        : teacher.name || ""
                    }
                    readOnly={!editing}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className={`w-full border border-slate-300 text-black rounded-lg p-3 ${
                      editing
                        ? "bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                        : "bg-slate-50"
                    }`}
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={
                      editing
                        ? email
                        : teacher.email
                    }
                    readOnly={!editing}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className={`w-full border border-slate-300 text-black rounded-lg p-3 ${
                      editing
                        ? "bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                        : "bg-slate-50"
                    }`}
                  />

                </div>

                {/* ROLE */}
                <div>

                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Role
                  </label>

                  <input
                    type="text"
                    value={teacher.role}
                    readOnly
                    className="w-full border border-slate-300 text-black rounded-lg p-3 bg-slate-50 capitalize"
                  />

                </div>

                {/* STATUS */}
                <div>

                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Account Status
                  </label>

                  <div className="w-full border border-green-200 rounded-lg p-3 bg-green-50 text-green-700 font-semibold">
                    ● Active
                  </div>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="border-t mt-10 pt-8 flex flex-col sm:flex-row gap-4">

                {!editing ? (
                  <>
                    <button
                      onClick={startEditing}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={logout}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={saveProfile}
                      disabled={saving}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
                    >
                      {saving
                        ? "Saving..."
                        : "Save Changes"}
                    </button>

                    <button
                      onClick={cancelEditing}
                      disabled={saving}
                      className="bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-300 transition"
                    >
                      Cancel
                    </button>
                  </>
                )}

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
