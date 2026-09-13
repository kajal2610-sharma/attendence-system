"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
  await signIn("google", {
    callbackUrl: "/",
  });
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-6">

      <div className="fixed -top-32 -left-32 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="fixed -bottom-32 -right-32 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />

      <div className="relative w-full max-w-2xl">

        {/* Logo */}
        <div className="text-center mb-4">
          <Link href="/" className="inline-flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">
              A
            </div>

            <div className="text-left">
              <h1 className="text-xl font-extrabold text-slate-900">
                Attend<span className="text-blue-600">Ease</span>
              </h1>

              <p className="text-[9px] text-slate-400 uppercase tracking-widest">
                Smart Attendance
              </p>
            </div>

          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/70 p-6 md:p-8">

          {/* Heading */}
          <div className="text-center mb-6">

            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-3">
              ✨
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Create Account
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Join AttendEase and manage attendance easily.
            </p>

          </div>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-xl outline-none text-black focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border text-black border-slate-200 bg-slate-50 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

            </div>

            {/* Password + Role */}
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full border text-black border-slate-200 bg-slate-50 px-4 py-3 pr-12 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

                <p className="text-[11px] text-slate-400 mt-1.5">
                  Minimum 6 characters
                </p>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Register As
                </label>

                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`p-3 rounded-xl border text-left transition ${
                      role === "student"
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 bg-slate-50 hover:border-blue-300"
                    }`}
                  >
                    <div className="text-xl">🎓</div>

                    <p className="font-bold text-sm text-slate-800">
                      Student
                    </p>

                    <p className="text-[10px] text-slate-500">
                      Track attendance
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("teacher")}
                    className={`p-3 rounded-xl border text-left transition ${
                      role === "teacher"
                        ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                        : "border-slate-200 bg-slate-50 hover:border-indigo-300"
                    }`}
                  >
                    <div className="text-xl">👨‍🏫</div>

                    <p className="font-bold text-sm text-slate-800">
                      Teacher
                    </p>

                    <p className="text-[10px] text-slate-500">
                      Manage attendance
                    </p>
                  </button>

                </div>
              </div>

            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span>→</span>
                </>
              )}
            </button>

            {/* OR */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 border-t border-slate-200" />
              <span className="text-sm text-slate-400">OR</span>
              <div className="flex-1 border-t border-slate-200" />
            </div>

            {/* Google Register Button */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-3"
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full text-lg font-bold">
                G
              </span>
              Continue with Google
            </button>

          </form>

          {/* Login */}
          <div className="text-center mt-5 pt-5 border-t border-slate-100">

            <p className="text-sm text-slate-500">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="inline-block mt-1 text-blue-600 font-bold hover:text-blue-700 hover:underline"
            >
              Login to AttendEase →
            </Link>

          </div>

          {/* Admin Notice */}
          <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-center">
            <p className="text-[11px] text-slate-500">
              🔐 Admin accounts are created separately for security.
            </p>
          </div>

        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          © 2026 AttendEase. All rights reserved.
        </p>

      </div>
    </main>
  );
}
