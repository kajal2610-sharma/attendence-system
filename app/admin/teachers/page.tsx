"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Teacher = {
  id: string;
  name: string;
  email: string;
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  async function getTeachers() {
    try {
      const response = await fetch("/api/teachers");
      const data = await response.json();

      if (data.success) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Teacher Management
        </h1>

        <Link href="/admin/teachers/add">
          <button className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700">
            + Add Teacher
          </button>
        </Link>

      </div>

      {/* Teacher Table */}
      <div className="bg-white rounded-lg shadow p-6">

        {loading ? (
          <p>Loading teachers...</p>
        ) : teachers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No Teachers Found
            </p>

            <Link href="/admin/teachers/add">
              <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded">
                Add First Teacher
              </button>
            </Link>
          </div>
        ) : (
          <table className="w-full">

            <thead>
              <tr className="border-b">

                <th className="text-left p-3">
                  Name
                </th>

                <th className="text-left p-3">
                  Email
                </th>

                <th className="text-left p-3">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {teacher.name}
                  </td>

                  <td className="p-3">
                    {teacher.email}
                  </td>

                  <td className="p-3">

                    <a
                      href={`/admin/teachers/edit?id=${teacher.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 inline-block"
                    >
                      Edit
                    </a>

                    <button
                      onClick={async () => {
                        const confirmDelete = confirm(
                          `Delete ${teacher.name}?`
                        );

                        if (!confirmDelete) return;

                        try {
                          const response = await fetch(
                            `/api/teachers/${teacher.id}`,
                            {
                              method: "DELETE",
                            }
                          );

                          const data = await response.json();

                          if (data.success) {
                            setTeachers((prev) =>
                              prev.filter((t) => t.id !== teacher.id)
                            );
                          } else {
                            alert(data.message || "Delete failed");
                          }
                        } catch (error) {
                          console.error(error);
                          alert("Something went wrong");
                        }
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}