"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function EditStudentForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    semester: "",
    section: "",
    rollNumber: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchStudent();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function fetchStudent() {
    try {
      const response = await fetch(`/api/students/${id}`);
      const data = await response.json();

      if (data.success) {
        setFormData({
          name: data.student.name || "",
          email: data.student.email || "",
          course: data.student.course || "",
          semester: data.student.semester || "",
          section: data.student.section || "",
          rollNumber: data.student.rollNumber || "",
        });
      } else {
        setMessage(data.message || "Failed to load student");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load student");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!id) {
      setMessage("Student ID is missing");
      return;
    }

    setMessage("Updating...");

    try {
      const response = await fetch(
        `/api/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "Student updated successfully!"
        );
      } else {
        setMessage(
          data.message || "Update failed"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  }

  if (!id) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Student ID missing
        </h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading student...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Edit Student
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
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Update Student
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

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <p>Loading edit student page...</p>
    </div>
  );
}

export default function EditStudentPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EditStudentForm />
    </Suspense>
  );
}