"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export default function AddTeacherPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("Saving...");

      const response = await fetch("/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Failed to add teacher");
        return;
      }

      setMessage("Teacher added successfully! ✅");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("ADD TEACHER ERROR:", error);
      setMessage("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Add Teacher
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-3 rounded mb-4"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-3 rounded mb-4"
            required
          />

          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {saving ? "Saving..." : "Save Teacher"}
          </button>

          {message && (
            <p className="mt-4 font-semibold">
              {message}
            </p>
          )}
        </form>

      </div>
    </div>
  );
}