"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function EditTeacherForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getTeacher();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function getTeacher() {
    try {
      const response = await fetch(
        `/api/teachers/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setName(data.teacher.name || "");
        setEmail(data.teacher.email || "");
      } else {
        setMessage("Teacher not found");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function updateTeacher(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!id) {
      setMessage("Teacher ID missing");
      return;
    }

    setMessage("Updating...");

    try {
      const response = await fetch(
        `/api/teachers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "Teacher updated successfully!"
        );

        setTimeout(() => {
          router.push("/admin/teachers");
        }, 1000);
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
          Teacher ID missing
        </h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading teacher...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Edit Teacher
      </h1>

      <form
        onSubmit={updateTeacher}
        className="bg-white p-6 rounded-lg shadow-md max-w-xl"
      >

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="New Password (optional)"
          className="w-full border p-3 rounded mb-4"
        />

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Update Teacher
          </button>

          <button
            type="button"
            onClick={() =>
              router.push("/admin/teachers")
            }
            className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

        </div>

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
      <p>Loading edit teacher page...</p>
    </div>
  );
}

export default function EditTeacherPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EditTeacherForm />
    </Suspense>
  );
}