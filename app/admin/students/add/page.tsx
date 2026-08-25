"use client";

import { useState } from "react";

export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    semester: "",
    section: "",
    rollNumber: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("Saving...");

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        setMessage("Something went wrong");
        return;
      }

      if (data.success) {
        setMessage("Student added successfully!");

        setFormData({
          name: "",
          email: "",
          password: "",
          course: "",
          semester: "",
          section: "",
          rollNumber: "",
        });
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Add Student
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-xl"
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

        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          placeholder="Semester"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Section"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          placeholder="Roll Number"
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Save Student
        </button>

        {message && (
          <p className="mt-4 font-semibold">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}